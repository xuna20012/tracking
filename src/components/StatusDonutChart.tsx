'use client';

import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface StatusDonutChartProps {
  className?: string;
}

export default function StatusDonutChart({ className = '' }: StatusDonutChartProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          boxWidth: 12,
          padding: 15,
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '70%',
  };
  
  const data = {
    labels: [
      'Livré', 
      'En cours de livraison', 
      'En préparation', 
      'En attente de dédouanement',
      'En cours de réparation',
      'Commandé'
    ],
    datasets: [
      {
        data: [48, 23, 19, 14, 8, 12],
        backgroundColor: [
          '#22c55e',  // vert - livré
          '#254e9d',  // bleu - en cours de livraison
          '#fd7e14',  // orange - en préparation
          '#9333ea',  // violet - dédouanement
          '#f97316',  // orange foncé - réparation
          '#6b7280'   // gris - commandé
        ],
        borderWidth: 0,
      },
    ],
  };
  
  return (
    <div className={`w-full h-64 ${className}`}>
      <Doughnut options={options} data={data} />
    </div>
  );
} 