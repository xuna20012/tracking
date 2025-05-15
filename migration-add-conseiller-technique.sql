-- Ajouter le champ conseiller_technique_email à la table wp_tracking_colis
ALTER TABLE wp_tracking_colis
ADD COLUMN conseiller_technique_email VARCHAR(255) NULL
AFTER proprietaire_telephone;

-- Ajouter le champ conseiller_technique_email à la table tracking_colis
ALTER TABLE tracking_colis
ADD COLUMN conseiller_technique_email VARCHAR(255) NULL
AFTER proprietaire_telephone; 