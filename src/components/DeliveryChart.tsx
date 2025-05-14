'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface DeliveryChartProps {
  className?: string;
}

export default function DeliveryChart({ className = '' }: DeliveryChartProps) {
  const labels = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
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
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
  };
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Colis livrés',
        data: [45, 53, 57, 68, 72, 67, 74, 79, 85, 95, 115, 120],
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.3,
      },
      {
        label: 'Colis en cours',
        data: [28, 32, 35, 42, 45, 39, 48, 52, 58, 68, 75, 79],
        borderColor: '#254e9d',
        backgroundColor: 'rgba(37, 78, 157, 0.1)',
        fill: true,
        tension: 0.3,
      },
      {
        label: 'Colis en réparation',
        data: [5, 6, 8, 7, 9, 8, 11, 12, 15, 18, 21, 24],
        borderColor: '#f97316',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        fill: true,
        tension: 0.3,
      }
    ],
  };
  
  return (
    <div className={`w-full h-72 ${className}`}>
      <Line options={options} data={data} />
    </div>
  );
} 