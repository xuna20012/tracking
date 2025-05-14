/**
 * Script d'importation des données WordPress vers la base de données Next.js
 * 
 * Ce script permet de migrer les données depuis une table wp_tracking_colis vers tracking_colis
 * tout en préservant la structure et les données.
 * 
 * Usage:
 * 1. Créez un fichier .env avec les variables:
 *    - WP_DATABASE_URL=mysql://user:password@host:port/wordpress_db
 *    - DATABASE_URL=mysql://user:password@host:port/nextjs_db
 * 2. Exécutez: node scripts/import-wp-data.js
 *    Pour tester sans importer: node scripts/import-wp-data.js --test
 */

const mysql = require('mysql2/promise');
require('dotenv').config();

// Déterminer si nous sommes en mode test
const isTestMode = process.argv.includes('--test');

async function importData() {
  console.log(`Début de l'${isTestMode ? 'analyse' : 'importation'} des données WordPress...`);

  // Connexion à la base WordPress
  const wpConnection = await mysql.createConnection(process.env.WP_DATABASE_URL);
  console.log('Connexion à la base WordPress établie');

  // En mode test, nous n'avons pas besoin de la connexion à la base Next.js
  let nextConnection = null;
  if (!isTestMode) {
    // Connexion à la base Next.js
    nextConnection = await mysql.createConnection(process.env.DATABASE_URL);
    console.log('Connexion à la base Next.js établie');
  }

  try {
    // 1. Vérifier si la table wp_tracking_colis existe
    console.log('Vérification de la table wp_tracking_colis...');
    const [wpTables] = await wpConnection.query(
      `SELECT TABLE_NAME FROM information_schema.TABLES 
       WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'wp_tracking_colis'`,
      [process.env.WP_DATABASE_URL.split('/').pop()]
    );

    if (wpTables.length === 0) {
      throw new Error('La table wp_tracking_colis n\'existe pas dans la base WordPress');
    }

    if (!isTestMode) {
      // Vérifier si la table existe déjà dans la base Next.js
      const [tables] = await nextConnection.query(
        `SELECT TABLE_NAME FROM information_schema.TABLES 
         WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'tracking_colis'`,
        [process.env.DATABASE_URL.split('/').pop()]
      );

      // Supprimer la table tracking_colis si elle existe pour réinitialiser
      if (tables.length > 0) {
        console.log('La table tracking_colis existe déjà, suppression en cours...');
        await nextConnection.query('DROP TABLE tracking_colis');
        console.log('Table tracking_colis supprimée');
      }
    }

    // 2. Récupérer la structure de la table wp_tracking_colis
    console.log('Récupération de la structure de la table wp_tracking_colis...');
    const [createTableResult] = await wpConnection.query('SHOW CREATE TABLE wp_tracking_colis');
    
    if (!createTableResult || !createTableResult[0]) {
      throw new Error('Impossible de récupérer la structure de la table wp_tracking_colis');
    }
    
    let createTableSql = createTableResult[0]['Create Table'];
    
    // Remplacer le nom de la table wp_tracking_colis par tracking_colis
    createTableSql = createTableSql.replace('`wp_tracking_colis`', '`tracking_colis`');
    
    console.log('Structure de la table récupérée :');
    console.log(createTableSql);
    
    if (!isTestMode) {
      // 3. Créer la table tracking_colis dans la base Next.js
      console.log('Création de la table tracking_colis dans la base Next.js...');
      await nextConnection.query(createTableSql);
      console.log('Table tracking_colis créée avec succès');
    }
    
    // 4. Récupérer les données de wp_tracking_colis
    console.log('Récupération des données de wp_tracking_colis...');
    const [wpData] = await wpConnection.query('SELECT * FROM wp_tracking_colis LIMIT 100');
    console.log(`${wpData.length} enregistrements trouvés dans wp_tracking_colis (limité à 100 pour l'analyse)`);
    
    if (wpData.length === 0) {
      console.log('Aucune donnée à importer');
      return;
    }
    
    // Afficher un exemple de données pour vérification
    console.log('\nExemple d\'enregistrement:');
    console.log(JSON.stringify(wpData[0], null, 2));
    
    // En mode test, nous affichons juste les informations
    if (isTestMode) {
      console.log('\nMODE TEST: Aucune modification n\'a été apportée à la base de données');
      console.log('Pour importer les données, exécutez la commande sans l\'option --test');
      return;
    }
    
    // 5. Compter le nombre total d'enregistrements
    const [countResult] = await wpConnection.query('SELECT COUNT(*) as total FROM wp_tracking_colis');
    const totalRecords = countResult[0].total;
    console.log(`Nombre total d'enregistrements à importer: ${totalRecords}`);
    
    // 6. Insérer les données dans tracking_colis
    console.log('Insertion des données dans tracking_colis...');
    
    // Récupération de tous les enregistrements
    const [allWpData] = await wpConnection.query('SELECT * FROM wp_tracking_colis');
    
    // Création des lignes d'insertion SQL
    const columns = Object.keys(allWpData[0]).join('`, `');
    const placeholders = Object.keys(allWpData[0]).map(() => '?').join(', ');
    
    const insertSql = `INSERT INTO tracking_colis (\`${columns}\`) VALUES (${placeholders})`;
    
    // Insertion des données par lots pour éviter les timeouts
    const batchSize = 100;
    let inserted = 0;
    
    for (let i = 0; i < allWpData.length; i += batchSize) {
      const batch = allWpData.slice(i, i + batchSize);
      const values = batch.map(row => Object.values(row));
      
      for (const rowValues of values) {
        await nextConnection.query(insertSql, rowValues);
        inserted++;
      }
      
      console.log(`${inserted}/${allWpData.length} enregistrements importés...`);
    }
    
    console.log(`Importation terminée: ${inserted} enregistrements importés avec succès.`);
    
  } catch (error) {
    console.error('Erreur lors de l\'importation:', error);
  } finally {
    // Fermer les connexions
    await wpConnection.end();
    if (nextConnection) await nextConnection.end();
    console.log('Connexions fermées');
  }
}

importData().catch(console.error); 