# Fonctionnalité : Historique des consultations

## Description

Cette fonctionnalité permet de tracker et visualiser les consultations des clients sur leurs colis. Chaque fois qu'un client visite la page de suivi de son colis, une entrée est automatiquement enregistrée dans l'historique.

## Fonctionnalités ajoutées

### 1. Enregistrement automatique des consultations
- Chaque visite sur `/track/[numero]` est automatiquement enregistrée
- Informations collectées :
  - Numéro de commande
  - Adresse IP du visiteur
  - User-Agent (navigateur)
  - Date et heure de consultation
  - Email et nom du client (si disponible)

### 2. Colonne "Consultations" dans l'interface admin
- Nouvelle colonne dans le tableau des colis (`/admin/colis`)
- Affiche le nombre total de consultations pour chaque colis
- Badge coloré : bleu si consultations > 0, gris sinon
- Cliquable pour voir les détails

### 3. Modal de détails des consultations
- Accessible en cliquant sur le nombre de consultations
- Affiche l'historique complet des consultations
- Informations détaillées :
  - Date et heure précise
  - Nom et email du client
  - Type de navigateur
  - Adresse IP
  - Numéro de consultation

## Installation

### 1. Migration de la base de données

Exécutez le script SQL suivant dans votre base de données :

```sql
-- Contenu du fichier migration-consultation-history.sql
CREATE TABLE IF NOT EXISTS `consultation_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numero_commande` varchar(20) NOT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text,
  `consultation_date` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `client_email` varchar(255) DEFAULT NULL,
  `client_nom` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `consultation_history_numero_commande_idx` (`numero_commande`),
  KEY `consultation_history_consultation_date_idx` (`consultation_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 2. Génération du client Prisma

```bash
npx prisma generate
```

### 3. Redémarrage de l'application

```bash
npm run dev
```

## Utilisation

### Pour les administrateurs

1. Accédez à `/admin/colis`
2. Consultez la colonne "Consultations" pour voir le nombre de vues par colis
3. Cliquez sur le badge de consultations pour voir les détails
4. Le modal affiche l'historique complet avec toutes les informations

### Pour les clients

- Aucun changement dans l'expérience utilisateur
- Les consultations sont enregistrées automatiquement et de manière transparente
- Aucune donnée personnelle sensible n'est collectée

## APIs ajoutées

### POST `/api/consultation-history`
Enregistre une nouvelle consultation
```json
{
  "numero_commande": "CMD123",
  "client_email": "client@example.com",
  "client_nom": "Nom Client"
}
```

### GET `/api/consultation-history?numero_commande=CMD123`
Récupère l'historique des consultations pour un colis

### GET `/api/colis/consultations`
Récupère le nombre de consultations pour tous les colis

## Composants ajoutés

- `ConsultationModal.tsx` : Modal pour afficher les détails des consultations
- Modèle Prisma `ConsultationHistory` : Structure de données pour l'historique

## Sécurité et confidentialité

- Les adresses IP sont collectées uniquement à des fins de statistiques
- Aucune donnée sensible n'est stockée
- Les informations sont utilisées uniquement pour le suivi des consultations
- Respect des bonnes pratiques de protection des données

## Performance

- Index sur `numero_commande` pour des requêtes rapides
- Index sur `consultation_date` pour le tri chronologique
- Requêtes optimisées avec Prisma
- Gestion d'erreur gracieuse (les erreurs de consultation n'affectent pas l'expérience utilisateur)

## Maintenance

- La table `consultation_history` peut être purgée périodiquement si nécessaire
- Surveillance de la taille de la table recommandée
- Possibilité d'ajouter des filtres par date dans le futur 