'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import DeliveryChart from '@/components/DeliveryChart';
import StatusDonutChart from '@/components/StatusDonutChart';
import RecentActivity from '@/components/RecentActivity';
import ChartCard from '@/components/ChartCard';
import { 
  CubeIcon as PackageIcon, 
  TruckIcon, 
  CheckCircleIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline';

interface Colis {
  id: number;
  colis_nom: string;
  numero_commande: string;
  proprietaire_nom: string;
  date_commande: string;
  statut_delivered: boolean;
}

export default function AdminPage() {
  const [colis, setColis] = useState<Colis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    enCours: 0,
    livres: 0,
    enAttente: 0
  });

  useEffect(() => {
    const fetchColis = async () => {
      try {
        const response = await fetch('/api/colis');
        
        if (!response.ok) {
          throw new Error('Une erreur est survenue lors de la récupération des colis');
        }
        
        const data = await response.json();
        setColis(data);
        
        // Calculer les statistiques
        const total = data.length;
        const livres = data.filter((item: Colis) => item.statut_delivered).length;
        const enCours = total - livres;
        const enAttente = Math.floor(enCours * 0.3); // Estimation pour l'exemple
        
        setStats({
          total,
          enCours,
          livres,
          enAttente
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchColis();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Erreur: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-500">Bienvenue dans votre espace d'administration</p>
      </div>
      
      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div 
          className="rounded-lg shadow-sm p-6"
          style={{ backgroundColor: 'rgba(37, 78, 157, 0.1)' }}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total des colis</p>
              <h3 className="text-2xl font-bold" style={{ color: '#254e9d' }}>{stats.total}</h3>
              <div className="flex items-center mt-2">
                <span className="text-xs font-medium text-green-600">+12%</span>
                <span className="text-xs text-gray-500 ml-1">vs dernier mois</span>
              </div>
            </div>
            <div 
              className="p-3 rounded-full" 
              style={{ backgroundColor: 'rgba(37, 78, 157, 0.2)' }}
            >
              <div className="w-6 h-6" style={{ color: '#254e9d' }}>
                <PackageIcon />
              </div>
            </div>
          </div>
        </div>

        <div 
          className="rounded-lg shadow-sm p-6"
          style={{ backgroundColor: 'rgba(253, 126, 20, 0.1)' }}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Colis en cours</p>
              <h3 className="text-2xl font-bold" style={{ color: '#fd7e14' }}>{stats.enCours}</h3>
              <div className="flex items-center mt-2">
                <span className="text-xs font-medium text-green-600">+5%</span>
                <span className="text-xs text-gray-500 ml-1">vs dernier mois</span>
              </div>
            </div>
            <div 
              className="p-3 rounded-full" 
              style={{ backgroundColor: 'rgba(253, 126, 20, 0.2)' }}
            >
              <div className="w-6 h-6" style={{ color: '#fd7e14' }}>
                <TruckIcon />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Colis livrés</p>
              <h3 className="text-2xl font-bold text-green-700">{stats.livres}</h3>
              <div className="flex items-center mt-2">
                <span className="text-xs font-medium text-green-600">+18%</span>
                <span className="text-xs text-gray-500 ml-1">vs dernier mois</span>
              </div>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <div className="w-6 h-6 text-green-700">
                <CheckCircleIcon />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-red-50 rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">En attente</p>
              <h3 className="text-2xl font-bold text-red-700">{stats.enAttente}</h3>
              <div className="flex items-center mt-2">
                <span className="text-xs font-medium text-red-600">-3%</span>
                <span className="text-xs text-gray-500 ml-1">vs dernier mois</span>
              </div>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <div className="w-6 h-6 text-red-700">
                <ClockIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <ChartCard 
          title="Évolution des livraisons" 
          subtitle="12 derniers mois" 
          className="lg:col-span-2"
        >
          <DeliveryChart />
        </ChartCard>
        
        <ChartCard 
          title="Répartition des statuts" 
          subtitle="Vue d'ensemble"
        >
          <StatusDonutChart />
        </ChartCard>
      </div>
      
      {/* Activités récentes et liste des colis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Derniers colis</h3>
              <Link 
                href="/admin/colis" 
                className="text-sm hover:opacity-80"
                style={{ color: '#254e9d' }}
              >
                Voir tous
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-52">
                      Description du colis
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      N° Commande
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {colis.slice(0, 5).map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.id}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 max-w-[200px] truncate">
                        {item.colis_nom}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.numero_commande}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.statut_delivered 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.statut_delivered ? 'Livré' : 'En cours'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link 
                          href={`/admin/edit/${item.id}`} 
                          className="mr-3 hover:opacity-80"
                          style={{ color: '#254e9d' }}
                        >
                          Modifier
                        </Link>
                        <Link 
                          href={`/track/${item.numero_commande}`} 
                          className="hover:opacity-80"
                          style={{ color: '#22c55e' }}
                        >
                          Voir
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}