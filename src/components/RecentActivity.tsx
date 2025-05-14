'use client';

import React, { useState, useEffect } from 'react';

interface ActivityItem {
  id: number;
  colisNom: string;
  numeroCommande: string;
  status: string;
  timestamp: string;
  icon: 'check' | 'truck' | 'box' | 'clock' | 'customs' | 'repair' | 'tool';
}

interface Colis {
  id: number;
  colis_nom: string;
  numero_commande: string;
  statut_ordered: boolean;
  statut_validated: boolean;
  statut_preparing: boolean;
  statut_departure: boolean;
  statut_in_transit: boolean;
  statut_out_of_delivery: boolean;
  statut_delivered: boolean;
  statut_attente_douane: boolean;
  statut_en_cours_de_reparation: boolean;
  statut_reparation_terminee: boolean;
  date_ajout: string;
}

// Fonction pour déterminer le statut d'un colis
const getColisStatus = (colis: Colis): { status: string; icon: ActivityItem['icon'] } => {
  if (colis.statut_delivered) return { status: 'Livré', icon: 'check' };
  if (colis.statut_reparation_terminee) return { status: 'Réparation terminée', icon: 'tool' };
  if (colis.statut_en_cours_de_reparation) return { status: 'En cours de réparation', icon: 'repair' };
  if (colis.statut_attente_douane) return { status: 'En attente de dédouanement', icon: 'customs' };
  if (colis.statut_out_of_delivery) return { status: 'En cours de livraison', icon: 'truck' };
  if (colis.statut_in_transit) return { status: 'En transit', icon: 'truck' };
  if (colis.statut_departure) return { status: 'Départ', icon: 'truck' };
  if (colis.statut_preparing) return { status: 'En préparation', icon: 'box' };
  if (colis.statut_validated || colis.statut_ordered) return { status: 'Commandé', icon: 'clock' };
  return { status: 'Non défini', icon: 'clock' };
};

// Fonction pour générer des timestamps récents
const generateRecentTimestamp = (daysAgo: number, hoursAgo: number, minutesAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(date.getHours() - hoursAgo);
  date.setMinutes(date.getMinutes() - minutesAgo);
  return date.toISOString();
};

// Données statiques de secours en cas d'échec du chargement
const fallbackActivities: ActivityItem[] = [
  {
    id: 1,
    colisNom: 'Pièces moteur BMW X5',
    numeroCommande: 'OP-TDR782',
    status: 'En cours de livraison',
    timestamp: generateRecentTimestamp(0, 3, 40),
    icon: 'truck'
  },
  {
    id: 2,
    colisNom: 'Alternateur Mercedes Classe C',
    numeroCommande: 'OP-ALT475',
    status: 'En attente de dédouanement',
    timestamp: generateRecentTimestamp(0, 5, 12),
    icon: 'customs'
  },
  {
    id: 3,
    colisNom: 'Compresseur climatisation Audi',
    numeroCommande: 'OP-CLA302',
    status: 'En préparation',
    timestamp: generateRecentTimestamp(0, 7, 25),
    icon: 'box'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Livré':
      return 'bg-green-100 text-green-800';
    case 'En cours de livraison':
      return 'bg-blue-100 text-blue-800';
    case 'En préparation':
      return 'bg-yellow-100 text-yellow-800';
    case 'En attente de dédouanement':
      return 'bg-purple-100 text-purple-800';
    case 'Commandé':
      return 'bg-gray-100 text-gray-800';
    case 'En cours de réparation':
      return 'bg-orange-100 text-orange-800';
    case 'Réparation terminée':
      return 'bg-teal-100 text-teal-800';
    case 'En transit':
      return 'bg-blue-100 text-blue-800';
    case 'Départ':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getIcon = (icon: string) => {
  switch (icon) {
    case 'check':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    case 'truck':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      );
    case 'box':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      );
    case 'clock':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'customs':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    case 'repair':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case 'tool':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
        </svg>
      );
    default:
      return null;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export default function RecentActivity() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchColis = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/colis');
        
        if (!response.ok) {
          throw new Error('Une erreur est survenue lors de la récupération des colis');
        }
        
        const data: Colis[] = await response.json();
        
        // Convertir les données des colis au format ActivityItem
        // Prendre les 7 derniers colis pour affichage dans l'activité récente
        const recentActivities: ActivityItem[] = data
          .slice(0, 7)
          .map(colis => {
            const { status, icon } = getColisStatus(colis);
            return {
              id: colis.id,
              colisNom: colis.colis_nom,
              numeroCommande: colis.numero_commande,
              status,
              timestamp: colis.date_ajout || new Date().toISOString(),
              icon
            };
          });
        
        setActivities(recentActivities);
      } catch (err) {
        console.error('Erreur lors du chargement des activités récentes:', err);
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        setActivities(fallbackActivities); // Utiliser les données de secours en cas d'erreur
      } finally {
        setLoading(false);
      }
    };

    fetchColis();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Activités récentes</h3>
      </div>
      
      <div className="divide-y divide-gray-200 max-h-[400px] overflow-y-auto">
        {loading ? (
          <div className="p-4 flex justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="p-4 text-center text-red-500">
            <p>{error}</p>
          </div>
        ) : activities.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <p>Aucune activité récente</p>
          </div>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-full ${getStatusColor(activity.status)}`}>
                  {getIcon(activity.icon)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.colisNom}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    N° {activity.numeroCommande}
                  </p>
                  <div className="flex items-center mt-1">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(activity.status)}`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 whitespace-nowrap">
                  {formatDate(activity.timestamp)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <button className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Voir toutes les activités
        </button>
      </div>
    </div>
  );
} 