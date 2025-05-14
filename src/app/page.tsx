'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon, TruckIcon, ClockIcon, PhoneIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Home() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Couleurs de la marque
  const brandBlue = '#254e9d';
  const brandOrange = '#fd7e14';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    if (!trackingNumber.trim()) {
      setError('Veuillez entrer un numéro de suivi');
      setIsLoading(false);
      return;
    }
    
    router.push(`/track/${trackingNumber}`);
  };

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="bg-gradient-to-b from-blue-900 to-blue-700" style={{ backgroundColor: brandBlue }}>
        <div className="max-w-5xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Oh Pieces Logistique
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Suivez vos colis en temps réel, partout dans le monde
          </p>
          
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="tracking" className="block text-sm font-medium text-gray-700 mb-2">
                  Entrez votre numéro de suivi
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="tracking"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="Exemple: OP-ABCDE"
                    style={{ borderColor: error ? '#EF4444' : '#E5E7EB' }}
                  />
                </div>
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-md text-white font-medium transition-colors disabled:opacity-70"
                style={{ backgroundColor: brandOrange }}
              >
                {isLoading ? 'Recherche en cours...' : 'Suivre mon colis'}
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Features section */}
      <div className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: brandBlue }}>
            Nos services de logistique
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center h-12 w-12 rounded-md mb-4" style={{ backgroundColor: brandBlue }}>
                <TruckIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-medium mb-2">Livraison mondiale</h3>
              <p className="text-gray-600">Nous livrons vos colis partout dans le monde avec un suivi en temps réel.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center h-12 w-12 rounded-md mb-4" style={{ backgroundColor: brandOrange }}>
                <ClockIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-medium mb-2">Livraison rapide</h3>
              <p className="text-gray-600">Nos services de livraison express garantissent une livraison rapide de vos colis.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center h-12 w-12 rounded-md mb-4" style={{ backgroundColor: brandBlue }}>
                <PhoneIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-medium mb-2">Support client 24/7</h3>
              <p className="text-gray-600">Notre équipe de support est disponible 24/7 pour répondre à toutes vos questions.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA section */}
      <div className="bg-gray-100 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ color: brandBlue }}>
            Vous avez besoin d'aide ?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Notre équipe de support client est disponible pour vous aider avec toutes vos questions concernant vos livraisons.
          </p>
          <Link 
            href="/track" 
            className="inline-flex items-center px-6 py-3 rounded-md text-white font-medium transition-colors"
            style={{ backgroundColor: brandBlue }}
          >
            Suivre un autre colis
          </Link>
        </div>
      </div>
    </div>
  );
}
