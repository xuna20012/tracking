'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon, EyeIcon, CalendarIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

interface Consultation {
  id: number;
  numero_commande: string;
  ip_address: string | null;
  user_agent: string | null;
  consultation_date: string;
  client_email: string | null;
  client_nom: string | null;
}

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  numeroCommande: string;
  colisNom: string;
}

export default function ConsultationModal({ isOpen, onClose, numeroCommande, colisNom }: ConsultationModalProps) {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && numeroCommande) {
      fetchConsultations();
    }
  }, [isOpen, numeroCommande]);

  const fetchConsultations = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/consultation-history?numero_commande=${numeroCommande}`);
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des consultations');
      }
      
      const data = await response.json();
      setConsultations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  const getBrowserInfo = (userAgent: string | null) => {
    if (!userAgent) return 'Navigateur inconnu';
    
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Autre navigateur';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Historique des consultations</h3>
            <p className="text-sm text-gray-500 mt-1">
              Colis: <span className="font-medium">{colisNom}</span> - N° {numeroCommande}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600">{error}</p>
            </div>
          ) : consultations.length === 0 ? (
            <div className="text-center py-8">
              <EyeIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Aucune consultation enregistrée pour ce colis.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {consultations.map((consultation, index) => (
                <div key={consultation.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">
                          {formatDate(consultation.consultation_date)}
                        </span>
                      </div>
                      
                      {consultation.client_nom && (
                        <p className="text-sm text-gray-700 mb-1">
                          <span className="font-medium">Client:</span> {consultation.client_nom}
                        </p>
                      )}
                      
                      {consultation.client_email && (
                        <p className="text-sm text-gray-700 mb-1">
                          <span className="font-medium">Email:</span> {consultation.client_email}
                        </p>
                      )}
                      
                      <div className="flex items-center text-xs text-gray-500 mt-2">
                        <ComputerDesktopIcon className="h-3 w-3 mr-1" />
                        <span className="mr-4">{getBrowserInfo(consultation.user_agent)}</span>
                        {consultation.ip_address && (
                          <span>IP: {consultation.ip_address}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Vue #{consultations.length - index}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
} 