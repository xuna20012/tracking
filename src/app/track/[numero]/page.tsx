'use client';

import { useEffect, useState } from 'react';
import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  CheckCircleIcon, 
  TruckIcon, 
  ClockIcon, 
  ExclamationCircleIcon,
  ShoppingBagIcon,
  BuildingOffice2Icon,
  ArrowPathIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import SimpleFooter from '@/components/SimpleFooter';

interface Colis {
  id: number;
  colis_nom: string;
  description: string;
  date_commande: string;
  date_reception: string;
  numero_commande: string;
  estimation_livraison: string;
  proprietaire_nom: string;
  proprietaire_email: string;
  proprietaire_telephone: string;
  statut_validated: boolean;
  statut_preparing: boolean;
  statut_departure: boolean;
  statut_attente_douane: boolean;
  statut_delivered: boolean;
  statut_en_cours_de_reparation: boolean;
  statut_reparation_terminee: boolean;
  description_validated: string;
  description_preparing: string;
  description_departure: string;
  description_attente_douane: string;
  description_delivered: string;
  date_ajout: string;
  prise_rendez_vous_active: boolean;
  description_en_cours_de_reparation: string;
  description_reparation_terminee: string;
  rendez_vous_date: string | null;
  rendez_vous_statut: string | null;
  details_supplementaires_visible: boolean;
  details_supplementaires: string | null;
  etapes_suivi: string | null;
}

interface TrackingStep {
  status: boolean;
  title: string;
  description: string;
  date: string | null;
  icon: React.ReactNode;
  color: string;
}

export default function TrackingPage() {
  const { numero } = useParams<{ numero: string }>();
  const [colis, setColis] = useState<Colis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trackingSteps, setTrackingSteps] = useState<TrackingStep[]>([]);
  const [currentStatus, setCurrentStatus] = useState<string>('');
  const [estimatedDelivery, setEstimatedDelivery] = useState<string>('');
  const [progressPercentage, setProgressPercentage] = useState<number>(0);

  // Couleurs de la marque
  const brandBlue = '#254e9d';
  const brandOrange = '#fd7e14';

  // Fonction pour nettoyer les anciennes entrées de consultation du localStorage
  const cleanOldConsultations = () => {
    const now = Date.now();
    const oneDayAgo = now - (24 * 60 * 60 * 1000); // 24 heures en millisecondes
    
    // Parcourir toutes les clés du localStorage
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key && key.startsWith('consultation_')) {
        const timestamp = localStorage.getItem(key);
        if (timestamp && parseInt(timestamp) < oneDayAgo) {
          localStorage.removeItem(key);
        }
      }
    }
  };

  useEffect(() => {
    // Nettoyer les anciennes consultations au chargement
    cleanOldConsultations();
    
    const fetchColis = async () => {
      try {
        const response = await fetch(`/api/track/${numero}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Colis non trouvé. Vérifiez votre numéro de suivi.');
          }
          throw new Error('Une erreur est survenue lors de la recherche du colis.');
        }
        
        const data = await response.json();
        setColis(data);
        
        // Enregistrer la consultation (avec protection contre les doublons)
        // Vérifier si on a déjà enregistré cette consultation récemment
        const lastConsultationKey = `consultation_${numero}`;
        const lastConsultationTime = localStorage.getItem(lastConsultationKey);
        const now = Date.now();
        const fiveMinutesAgo = now - (5 * 60 * 1000); // 5 minutes en millisecondes
        
        // N'enregistrer que si aucune consultation n'a été faite dans les 5 dernières minutes
        if (!lastConsultationTime || parseInt(lastConsultationTime) < fiveMinutesAgo) {
          try {
            await fetch('/api/consultation-history', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                numero_commande: numero,
                client_email: data.proprietaire_email,
                client_nom: data.proprietaire_nom
              })
            });
            
            // Marquer cette consultation comme enregistrée
            localStorage.setItem(lastConsultationKey, now.toString());
          } catch (consultationError) {
            // Ignorer les erreurs de consultation pour ne pas affecter l'expérience utilisateur
            console.warn('Impossible d\'enregistrer la consultation:', consultationError);
          }
        }
        
        // Calculer le statut actuel et les étapes
        processTrackingData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchColis();
  }, [numero]);

  const processTrackingData = (data: Colis) => {
    if (!data) return;

    // Déterminer le statut actuel
    let status = 'Commandé';
    let progress = 0;
    
    if (data.statut_reparation_terminee) {
      status = 'Réparation terminée';
      progress = 100;
    } else if (data.statut_en_cours_de_reparation) {
      status = 'En cours de réparation';
      progress = 85;
    } else if (data.statut_delivered) {
      status = 'Livré';
      progress = 100;
    } else if (data.statut_attente_douane) {
      status = 'En attente de dédouanement';
      progress = 60;
    } else if (data.statut_departure) {
      status = 'Départ';
      progress = 40;
    } else if (data.statut_preparing) {
      status = 'En préparation';
      progress = 20;
    } else if (data.statut_validated) {
      status = 'Commandé';
      progress = 10;
    }

    setCurrentStatus(status);
    setProgressPercentage(progress);
    setEstimatedDelivery(formatDate(data.estimation_livraison));

    // Créer les étapes de suivi
    const steps: TrackingStep[] = [
      {
        status: data.statut_validated,
        title: 'Commandé',
        description: data.description_validated || 'Votre commande a été reçue et validée.',
        date: formatDate(data.date_commande),
        icon: <ShoppingBagIcon className="h-7 w-7" />,
        color: data.statut_validated ? brandOrange : 'gray'
      },
      {
        status: data.statut_preparing,
        title: 'En préparation',
        description: data.description_preparing || 'Votre commande est en cours de préparation dans nos entrepôts.',
        date: data.statut_preparing ? formatDate(data.date_reception) : null,
        icon: <BuildingOffice2Icon className="h-7 w-7" />,
        color: data.statut_preparing ? brandOrange : 'gray'
      },
      {
        status: data.statut_departure,
        title: 'Départ',
        description: data.description_departure || 'Votre colis a quitté nos entrepôts.',
        date: data.statut_departure ? getCurrentDate() : null,
        icon: <TruckIcon className="h-7 w-7" />,
        color: data.statut_departure ? brandOrange : 'gray'
      },
      {
        status: data.statut_attente_douane,
        title: 'En attente de dédouanement',
        description: data.description_attente_douane || 'Votre colis est en cours de dédouanement.',
        date: data.statut_attente_douane ? getCurrentDate() : null,
        icon: <ClockIcon className="h-7 w-7" />,
        color: data.statut_attente_douane ? brandOrange : 'gray'
      }
    ];

    // Ajouter les étapes conditionnelles
    if (data.statut_en_cours_de_reparation || data.statut_reparation_terminee) {
      steps.push({
        status: data.statut_en_cours_de_reparation,
        title: 'En cours de réparation',
        description: data.description_en_cours_de_reparation || 'Votre article est en cours de réparation.',
        date: data.statut_en_cours_de_reparation ? getCurrentDate() : null,
        icon: <ArrowPathIcon className="h-7 w-7" />,
        color: data.statut_en_cours_de_reparation ? brandOrange : 'gray'
      });
      
      steps.push({
        status: data.statut_reparation_terminee,
        title: 'Réparation terminée',
        description: data.description_reparation_terminee || 'La réparation de votre article est terminée.',
        date: data.statut_reparation_terminee ? getCurrentDate() : null,
        icon: <CheckCircleIcon className="h-7 w-7" />,
        color: data.statut_reparation_terminee ? brandOrange : 'gray'
      });
    } else {
      // Parcours normal de livraison
      steps.push({
        status: data.statut_delivered,
        title: 'Livré',
        description: data.description_delivered || 'Votre colis a été livré avec succès.',
        date: data.statut_delivered ? getCurrentDate() : null,
        icon: <CheckCircleIcon className="h-7 w-7" />,
        color: data.statut_delivered ? brandOrange : 'gray'
      });
    }

    setTrackingSteps(steps);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      // Si la chaîne contient '0000-00-00', retourner une chaîne vide
      if (dateString.includes('0000-00-00')) return '';
      
      const date = new Date(dateString);
      // Vérifier si la date est valide
      if (isNaN(date.getTime())) return '';
      
      return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (e) {
      console.error('Erreur lors du formatage de la date:', e);
      return '';
    }
  };

  const getCurrentDate = () => {
    return formatDate(new Date().toISOString());
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4" style={{ borderColor: brandBlue }}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-8 py-6 rounded-lg shadow-lg max-w-2xl mx-auto my-12" role="alert">
        <div className="flex items-center mb-4">
          <ExclamationCircleIcon className="h-8 w-8 mr-3 text-red-500" />
          <strong className="font-bold text-xl">Erreur</strong>
        </div>
        <p className="mb-6 text-lg">{error}</p>
        <Link 
          href="/track" 
          className="inline-flex items-center px-5 py-3 rounded-md text-white transition-colors hover:bg-blue-700"
          style={{ backgroundColor: brandBlue }}
        >
          Essayer un autre numéro
        </Link>
      </div>
    );
  }

  if (!colis) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-8 py-6 rounded-lg shadow-lg max-w-2xl mx-auto my-12" role="alert">
        <div className="flex items-center mb-4">
          <ExclamationCircleIcon className="h-8 w-8 mr-3 text-yellow-500" />
          <strong className="font-bold text-xl">Aucun résultat</strong>
        </div>
        <p className="mb-6 text-lg">Aucun colis trouvé avec ce numéro de suivi.</p>
        <Link 
          href="/track" 
          className="inline-flex items-center px-5 py-3 rounded-md text-white transition-colors hover:bg-blue-700"
          style={{ backgroundColor: brandBlue }}
        >
          Essayer un autre numéro
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-10 bg-white">
        {/* En-tête avec logo et informations de base */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="mr-4 hidden md:block">
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" style={{ color: brandBlue }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: brandBlue }}>Suivi de colis</h1>
              <p className="text-gray-700">Numéro de suivi: <span className="font-semibold">{colis.numero_commande}</span></p>
            </div>
          </div>
          <Link 
            href="/track" 
            className="inline-flex items-center px-4 py-2 rounded-md text-white transition-colors hover:bg-opacity-90"
            style={{ backgroundColor: brandBlue }}
          >
            Suivre un autre colis
          </Link>
        </div>

        {/* Carte principale de statut */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-gray-800">{colis.colis_nom}</h2>
                <p className="text-gray-700 mb-4">Expédié le {formatDate(colis.date_commande)}</p>
                
                <div className="flex items-center mb-3 bg-gray-50 py-2 px-3 rounded-md inline-block">
                  <div 
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: progressPercentage === 100 ? '#10B981' : brandOrange }}
                  ></div>
                  <span className="font-medium text-lg text-gray-800">{currentStatus}</span>
                </div>
                
                {!colis.statut_delivered && !colis.statut_reparation_terminee && (
                  <p className="text-gray-700 mt-2">
                    <span className="font-medium">Livraison estimée:</span> {estimatedDelivery || 'Non disponible'}
                  </p>
                )}
              </div>
              
              <div className="mt-6 md:mt-0 flex flex-col items-end">
                <div className="text-right bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-700 mb-1">Destinataire</p>
                  <p className="font-medium text-lg text-gray-800">{colis.proprietaire_nom}</p>
                  <p className="text-sm text-gray-700 mt-2">{colis.proprietaire_email}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Barre de progression */}
          <div className="px-6 py-5 bg-gray-50">
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div 
                className="h-3 rounded-full transition-all duration-500 ease-in-out" 
                style={{ 
                  width: `${progressPercentage}%`,
                  backgroundColor: progressPercentage === 100 ? '#10B981' : brandOrange
                }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-700 font-medium">
              <span>Commandé</span>
              <span>Livré</span>
            </div>
          </div>
        </div>

        {/* Détails de suivi */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-semibold mb-6" style={{ color: brandBlue }}>Détails du suivi</h3>
            
            <div className="space-y-8 pl-2">
              {trackingSteps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Ligne de connexion verticale */}
                  {index < trackingSteps.length - 1 && (
                    <div 
                      className="absolute left-4 top-10 w-1 h-full -ml-px"
                      style={{ backgroundColor: step.status ? brandOrange : '#E5E7EB' }}
                    ></div>
                  )}
                  
                  <div className="flex items-start">
                    <div 
                      className={`flex items-center justify-center w-9 h-9 rounded-full mr-5 ${
                        step.status ? 'text-white shadow-sm' : 'text-gray-400 bg-gray-100'
                      }`}
                      style={{ backgroundColor: step.status ? step.color : undefined }}
                    >
                      <div className="h-7 w-7">
                        {step.icon}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center bg-gray-50 p-3 rounded-md mb-2">
                        <h4 className="font-semibold text-lg text-gray-800">{step.title}</h4>
                        {step.date && <span className="text-sm text-gray-700 md:ml-4 md:bg-white md:px-3 md:py-1 md:rounded-md">{step.date}</span>}
                      </div>
                      <p className="text-gray-700 ml-1">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Détails du colis et informations destinataire */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-md mr-3" style={{ backgroundColor: `${brandBlue}20` }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" style={{ color: brandBlue }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold" style={{ color: brandBlue }}>Détails du colis</h3>
              </div>
              <div className="space-y-4 mt-5">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-700">La description du colis</span>
                  <span className="font-medium text-gray-800">{colis.colis_nom}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-700">Numéro de commande</span>
                  <span className="font-medium text-gray-800">{colis.numero_commande}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-700">Date de commande</span>
                  <span className="font-medium text-gray-800">{formatDate(colis.date_commande)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-700">Description</span>
                  <span className="font-medium text-right text-gray-800 max-w-[60%]">{colis.description}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-md mr-3" style={{ backgroundColor: `${brandOrange}20` }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" style={{ color: brandOrange }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold" style={{ color: brandBlue }}>Informations du destinataire</h3>
              </div>
              <div className="space-y-4 mt-5">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-700">Nom</span>
                  <span className="font-medium text-gray-800">{colis.proprietaire_nom}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-700">Email</span>
                  <span className="font-medium text-gray-800">{colis.proprietaire_email}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-700">Téléphone</span>
                  <span className="font-medium text-gray-800">{colis.proprietaire_telephone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Détails supplémentaires si disponibles */}
        {colis.details_supplementaires_visible && colis.details_supplementaires && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mt-8">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-md mr-3" style={{ backgroundColor: `${brandBlue}20` }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" style={{ color: brandBlue }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold" style={{ color: brandBlue }}>Informations supplémentaires</h3>
              </div>
              <p className="text-gray-700 mt-4 bg-gray-50 p-4 rounded-md">{colis.details_supplementaires}</p>
            </div>
          </div>
        )}

        {/* Rendez-vous si actif */}
        {colis.prise_rendez_vous_active && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mt-8 border-l-4" style={{ borderColor: brandBlue }}>
            <div className="p-6">
              <div className="flex items-start">
                <div className="p-2 rounded-md mr-3 bg-blue-50">
                  <MapPinIcon className="h-6 w-6" style={{ color: brandBlue }} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: brandBlue }}>Rendez-vous de livraison</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-gray-700 mb-3">
                      <span className="font-medium">Date:</span> {colis.rendez_vous_date ? formatDate(colis.rendez_vous_date) : 'Non définie'}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Statut:</span> <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">{colis.rendez_vous_statut || 'En attente'}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Footer avec lien vers la page d'accueil */}
        <div className="mt-10 text-center">
          <Link href="/" className="text-sm text-gray-700 hover:text-gray-900 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour à l'accueil
          </Link>
        </div>
      </div>
      <SimpleFooter />
    </>
  );
} 