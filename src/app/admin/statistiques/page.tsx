'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import ChartCard from '@/components/ChartCard';
import DeliveryChart from '@/components/DeliveryChart';
import StatusDonutChart from '@/components/StatusDonutChart';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function StatistiquesPage() {
  // Configuration pour le graphique à barres
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const barData = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [
      {
        label: 'Colis reçus',
        data: [12, 19, 15, 8, 22, 14, 5],
        backgroundColor: 'rgba(37, 78, 157, 0.6)',
      },
      {
        label: 'Colis livrés',
        data: [8, 15, 12, 7, 19, 10, 3],
        backgroundColor: 'rgba(253, 126, 20, 0.6)',
      },
    ],
  };

  // Données pour le tableau de performance
  const performanceData = [
    { region: 'Paris', livraisons: 245, tempsLivraison: '1.2 jours', satisfaction: '4.8/5' },
    { region: 'Lyon', livraisons: 187, tempsLivraison: '1.5 jours', satisfaction: '4.6/5' },
    { region: 'Marseille', livraisons: 163, tempsLivraison: '1.8 jours', satisfaction: '4.5/5' },
    { region: 'Bordeaux', livraisons: 112, tempsLivraison: '1.4 jours', satisfaction: '4.7/5' },
    { region: 'Lille', livraisons: 98, tempsLivraison: '1.3 jours', satisfaction: '4.9/5' },
  ];

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Statistiques</h1>
        <p className="text-gray-500">Analyse des performances et des tendances</p>
      </div>

      {/* Première rangée de graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard 
          title="Évolution des livraisons" 
          subtitle="12 derniers mois"
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

      {/* Deuxième rangée */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard 
          title="Activité hebdomadaire" 
          subtitle="Dernière semaine"
        >
          <div className="h-72">
            <Bar options={barOptions} data={barData} />
          </div>
        </ChartCard>
        
        <ChartCard 
          title="Performance par région" 
          subtitle="Top 5 des régions"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Région
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Livraisons
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Temps moyen
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Satisfaction
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {performanceData.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.region}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.livraisons}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.tempsLivraison}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.satisfaction}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>
      </div>

      {/* Résumé des statistiques */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Résumé des performances</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-primary-light/10 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-500">Taux de livraison</p>
            <div className="flex items-end space-x-2 mt-2">
              <span className="text-2xl font-bold text-primary">94.8%</span>
              <span className="text-xs text-green-600 mb-1">+2.4%</span>
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-500">Satisfaction client</p>
            <div className="flex items-end space-x-2 mt-2">
              <span className="text-2xl font-bold text-green-700">4.7/5</span>
              <span className="text-xs text-green-600 mb-1">+0.2</span>
            </div>
          </div>
          
          <div className="bg-secondary-light/10 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-500">Délai moyen</p>
            <div className="flex items-end space-x-2 mt-2">
              <span className="text-2xl font-bold text-secondary">1.4j</span>
              <span className="text-xs text-green-600 mb-1">-0.3j</span>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-500">Colis retournés</p>
            <div className="flex items-end space-x-2 mt-2">
              <span className="text-2xl font-bold text-gray-700">2.3%</span>
              <span className="text-xs text-green-600 mb-1">-0.5%</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 