'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import SimpleFooter from '@/components/SimpleFooter';

export default function TrackPage() {
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
    <>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* En-tête */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2" style={{ color: brandBlue }}>
              Suivi de colis
            </h1>
            <p className="text-gray-600">
              Suivez l'état de votre colis en temps réel
            </p>
          </div>
          
          {/* Formulaire de recherche */}
          <div className="bg-white shadow-lg rounded-lg p-8 mb-10">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                style={{ backgroundColor: brandBlue }}
              >
                {isLoading ? 'Recherche en cours...' : 'Suivre mon colis'}
              </button>
            </form>
            
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>Vous pouvez trouver votre numéro de commande dans votre email de confirmation</p>
            </div>
          </div>
          
          {/* Informations supplémentaires */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center h-12 w-12 rounded-md mb-4" style={{ backgroundColor: brandBlue }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Suivi en temps réel</h3>
              <p className="text-gray-600">Suivez votre colis à chaque étape de son parcours, de la commande à la livraison.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center h-12 w-12 rounded-md mb-4" style={{ backgroundColor: brandOrange }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Estimation précise</h3>
              <p className="text-gray-600">Obtenez des estimations précises sur la date de livraison de votre colis.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center h-12 w-12 rounded-md mb-4" style={{ backgroundColor: brandBlue }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Assistance client</h3>
              <p className="text-gray-600">Notre équipe est disponible pour répondre à toutes vos questions concernant votre livraison.</p>
            </div>
          </div>
          
          {/* Pied de page */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              Besoin d'aide ? <Link href="#" className="text-blue-600 hover:underline" style={{ color: brandBlue }}>Contactez notre service client</Link>
            </p>
          </div>
        </div>
      </div>
      <SimpleFooter />
    </>
  );
} 