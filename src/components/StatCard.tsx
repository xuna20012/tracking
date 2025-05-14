import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: string | number;
    positive: boolean;
  };
  color?: 'primary' | 'secondary' | 'green' | 'red' | 'gray';
}

const colorClasses = {
  primary: {
    bg: 'bg-primary-light/10',
    text: 'text-primary',
    iconBg: 'bg-primary-light/20',
  },
  secondary: {
    bg: 'bg-secondary-light/10',
    text: 'text-secondary',
    iconBg: 'bg-secondary-light/20',
  },
  green: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    iconBg: 'bg-green-100',
  },
  red: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    iconBg: 'bg-red-100',
  },
  gray: {
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    iconBg: 'bg-gray-100',
  },
};

export default function StatCard({ title, value, icon, change, color = 'primary' }: StatCardProps) {
  const { bg, text, iconBg } = colorClasses[color];
  
  return (
    <div className={`${bg} rounded-lg shadow-sm p-6`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className={`text-2xl font-bold ${text}`}>{value}</h3>
          
          {change && (
            <div className="flex items-center mt-2">
              <span className={`text-xs font-medium ${change.positive ? 'text-green-600' : 'text-red-600'}`}>
                {change.positive ? '+' : ''}{change.value}
              </span>
              <span className="text-xs text-gray-500 ml-1">vs dernier mois</span>
            </div>
          )}
        </div>
        
        <div className={`${iconBg} p-3 rounded-full`}>
          <div className={`w-6 h-6 ${text}`}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
} 