# Guide d'importation des données WordPress

Ce guide explique comment importer des données depuis une base WordPress vers l'application Oh Pieces Logistique.

## Prérequis

- Node.js (v14 ou supérieur)
- Accès à la base de données WordPress
- Accès à la base de données de l'application Oh Pieces Logistique

## Configuration

1. Installez les dépendances requises :

```bash
npm install mysql2 dotenv
```

2. Créez un fichier `.env` à la racine du projet avec les informations suivantes :

```
DATABASE_URL="mysql://user:password@host:port/nom_base_donnees_nextjs"
WP_DATABASE_URL="mysql://user:password@host:port/nom_base_donnees_wordpress"
```

Remplacez les valeurs par vos informations de connexion aux bases de données.

## Exécution du script d'importation

Pour lancer le processus d'importation, exécutez la commande suivante :

```bash
node scripts/import-wp-data.js
```

Le script va :
1. Se connecter aux deux bases de données
2. Récupérer la structure de la table `wp_tracking_colis`
3. Créer une table `tracking_colis` dans la base Next.js
4. Transférer toutes les données

## Structure des tables

La structure des tables est identique entre WordPress et l'application Next.js :

```sql
CREATE TABLE `tracking_colis` (
  `id` mediumint(9) NOT NULL,
  `colis_nom` text NOT NULL,
  `description` text NOT NULL,
  `date_commande` date NOT NULL,
  `date_reception` date NOT NULL,
  `numero_commande` varchar(20) NOT NULL,
  `statut_ordered` tinyint(1) NOT NULL DEFAULT 0,
  `statut_in_transit` tinyint(1) NOT NULL DEFAULT 0,
  `statut_out_of_delivery` tinyint(1) NOT NULL DEFAULT 0,
  `statut_delivered` tinyint(1) NOT NULL DEFAULT 0,
  `estimation_livraison` date NOT NULL,
  `proprietaire_nom` varchar(255) NOT NULL,
  `proprietaire_email` varchar(255) NOT NULL,
  `proprietaire_telephone` varchar(20) NOT NULL,
  `statut_validated` tinyint(1) NOT NULL DEFAULT 0,
  `statut_preparing` tinyint(1) NOT NULL DEFAULT 0,
  `statut_departure` tinyint(1) NOT NULL DEFAULT 0,
  `statut_attente_douane` tinyint(1) NOT NULL DEFAULT 0,
  `description_validated` text NOT NULL,
  `description_preparing` text NOT NULL,
  `description_departure` text NOT NULL,
  `description_attente_douane` text NOT NULL,
  `description_delivered` text NOT NULL,
  `date_ajout` datetime NOT NULL,
  `statut_en_cours_de_reparation` tinyint(1) NOT NULL DEFAULT 0,
  `statut_reparation_terminee` tinyint(1) NOT NULL DEFAULT 0,
  `prise_rendez_vous_active` tinyint(1) NOT NULL DEFAULT 0,
  `description_en_cours_de_reparation` text NOT NULL,
  `description_reparation_terminee` text NOT NULL,
  `rendez_vous_date` date DEFAULT NULL,
  `rendez_vous_statut` varchar(255) DEFAULT NULL,
  `details_supplementaires_visible` tinyint(1) DEFAULT 0,
  `details_supplementaires` longtext DEFAULT NULL,
  `etapes_suivi` text DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
```

## Après l'importation

Une fois l'importation terminée, vérifiez que les données sont correctement importées en consultant la table `tracking_colis` dans la base de données Next.js.

Pour vérifier via Prisma, vous pouvez exécuter :

```bash
npx prisma studio
```

Cela ouvrira une interface web pour explorer votre base de données.

## Notes importantes

- Le script supprime la table `tracking_colis` si elle existe déjà. Assurez-vous de sauvegarder vos données existantes si nécessaire.
- Les valeurs sérialisées (comme `etapes_suivi` ou `details_supplementaires`) sont importées telles quelles et peuvent nécessiter un traitement supplémentaire dans l'application. 