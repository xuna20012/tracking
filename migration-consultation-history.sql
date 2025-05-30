-- Migration pour créer la table consultation_history
-- À exécuter manuellement dans la base de données

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