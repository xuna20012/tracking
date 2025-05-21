'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import { ExclamationCircleIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';

interface Colis {
  id: number;
  colis_nom: string;
  description: string;
  date_commande: string;
  date_reception?: string;
  numero_commande: string;
  estimation_livraison: string;
  proprietaire_nom: string;
  proprietaire_email: string;
  proprietaire_telephone: string;
  conseiller_technique_email?: string;
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

export default function EditColisPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [colis, setColis] = useState<Colis | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchColis = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/colis/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Colis non trouvé');
          }
          const errorData = await response.json();
          throw new Error(errorData.error || 'Une erreur est survenue lors de la récupération du colis');
        }
        
        const data = await response.json();
        
        // S'assurer que les champs booléens sont correctement typés
        const formattedColis = {
          ...data,
          statut_validated: Boolean(data.statut_validated),
          statut_preparing: Boolean(data.statut_preparing),
          statut_departure: Boolean(data.statut_departure),
          statut_attente_douane: Boolean(data.statut_attente_douane),
          statut_delivered: Boolean(data.statut_delivered),
          statut_en_cours_de_reparation: Boolean(data.statut_en_cours_de_reparation),
          statut_reparation_terminee: Boolean(data.statut_reparation_terminee),
          prise_rendez_vous_active: Boolean(data.prise_rendez_vous_active),
          details_supplementaires_visible: Boolean(data.details_supplementaires_visible),
        };
        
        setColis(formattedColis);
      } catch (err) {
        console.error('Erreur lors de la récupération du colis:', err);
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchColis();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const dateCommande = formData.get('date_commande') as string;
    const data = {
      colis_nom: formData.get('colis_nom') as string,
      description: formData.get('description') as string,
      date_commande: dateCommande,
      // date_reception field is no longer needed, it will be set to date_commande on the server
      numero_commande: formData.get('numero_commande') as string,
      estimation_livraison: formData.get('estimation_livraison') as string,
      proprietaire_nom: formData.get('proprietaire_nom') as string,
      proprietaire_email: formData.get('proprietaire_email') as string,
      proprietaire_telephone: formData.get('proprietaire_telephone') as string,
      conseiller_technique_email: formData.get('conseiller_technique_email') as string || undefined,
      statut_validated: formData.get('statut_validated') === 'on',
      statut_preparing: formData.get('statut_preparing') === 'on',
      statut_departure: formData.get('statut_departure') === 'on',
      statut_attente_douane: formData.get('statut_attente_douane') === 'on',
      statut_delivered: formData.get('statut_delivered') === 'on',
      statut_en_cours_de_reparation: formData.get('statut_en_cours_de_reparation') === 'on',
      statut_reparation_terminee: formData.get('statut_reparation_terminee') === 'on',
      prise_rendez_vous_active: formData.get('prise_rendez_vous_active') === 'on',
      description_validated: formData.get('description_validated') as string || '',
      description_preparing: formData.get('description_preparing') as string || '',
      description_departure: formData.get('description_departure') as string || '',
      description_attente_douane: formData.get('description_attente_douane') as string || '',
      description_delivered: formData.get('description_delivered') as string || '',
      description_en_cours_de_reparation: formData.get('description_en_cours_de_reparation') as string || '',
      description_reparation_terminee: formData.get('description_reparation_terminee') as string || '',
      rendez_vous_date: formData.get('rendez_vous_date') as string || null,
      rendez_vous_statut: formData.get('rendez_vous_statut') as string || null,
      details_supplementaires_visible: formData.get('details_supplementaires_visible') === 'on',
      details_supplementaires: formData.get('details_supplementaires') as string || null,
    };

    try {
      const response = await fetch(`/api/colis/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Une erreur est survenue lors de la mise à jour du colis');
      }
      
      setSuccess("Colis mis à jour avec succès");
      
      // Rediriger vers la liste des colis après 2 secondes
      setTimeout(() => {
        router.push('/admin/colis');
      }, 2000);
    } catch (err) {
      console.error('Erreur lors de la mise à jour:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return '';
    
    try {
      // Si la chaîne contient '0000-00-00', retourner une chaîne vide
      if (dateString.includes('0000-00-00')) return '';
      
      const date = new Date(dateString);
      // Vérifier si la date est valide
      if (isNaN(date.getTime())) return '';
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    } catch (e) {
      console.error('Erreur lors du formatage de la date:', e);
      return '';
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: '#254e9d' }}></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error && !colis) {
    return (
      <DashboardLayout>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative max-w-2xl mx-auto" role="alert">
          <strong className="font-bold">Erreur: </strong>
          <span className="block sm:inline">{error}</span>
          <div className="mt-4">
            <Link href="/admin/colis" className="text-blue-600 hover:underline" style={{ color: '#254e9d' }}>
              Retour à la liste
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!colis) {
    return (
      <DashboardLayout>
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded relative max-w-2xl mx-auto" role="alert">
          <strong className="font-bold">Aucun résultat: </strong>
          <span className="block sm:inline">Colis non trouvé.</span>
          <div className="mt-4">
            <Link href="/admin/colis" className="text-blue-600 hover:underline" style={{ color: '#254e9d' }}>
              Retour à la liste
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto pb-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Modifier le colis #{colis.numero_commande}</h1>
          <Link 
            href="/admin/colis" 
            className="flex items-center text-blue-600 hover:text-blue-800"
            style={{ color: '#254e9d' }}
          >
            <ChevronLeftIcon className="h-4 w-4 mr-1" />
            Retour à la liste
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-6 flex items-start" role="alert">
            <ExclamationCircleIcon className="h-5 w-5 mr-2 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative mb-6 flex items-start" role="alert">
            <svg className="h-5 w-5 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{success}</span>
          </div>
        )}

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="colis_nom" className="block text-sm font-medium text-gray-700 mb-1">
                  Détails du colis *
                </label>
                <textarea
                  id="colis_nom"
                  name="colis_nom"
                  defaultValue={colis.colis_nom}
                  rows={3}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                ></textarea>
              </div>

              <div>
                <label htmlFor="numero_commande" className="block text-sm font-medium text-gray-700 mb-1">
                  Numéro de commande *
                </label>
                <input
                  type="text"
                  id="numero_commande"
                  name="numero_commande"
                  defaultValue={colis.numero_commande}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>

              <div>
                <label htmlFor="date_commande" className="block text-sm font-medium text-gray-700 mb-1">
                  Date de commande *
                </label>
                <input
                  type="date"
                  id="date_commande"
                  name="date_commande"
                  defaultValue={formatDate(colis.date_commande)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>

              <div>
                <label htmlFor="estimation_livraison" className="block text-sm font-medium text-gray-700 mb-1">
                  Estimation de livraison *
                </label>
                <input
                  type="date"
                  id="estimation_livraison"
                  name="estimation_livraison"
                  defaultValue={formatDate(colis.estimation_livraison)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>

              <div>
                <label htmlFor="proprietaire_nom" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du destinataire *
                </label>
                <input
                  type="text"
                  id="proprietaire_nom"
                  name="proprietaire_nom"
                  defaultValue={colis.proprietaire_nom}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>

              <div>
                <label htmlFor="proprietaire_email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email du destinataire *
                </label>
                <input
                  type="email"
                  id="proprietaire_email"
                  name="proprietaire_email"
                  defaultValue={colis.proprietaire_email}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>

              <div>
                <label htmlFor="proprietaire_telephone" className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone du destinataire *
                </label>
                <input
                  type="tel"
                  id="proprietaire_telephone"
                  name="proprietaire_telephone"
                  defaultValue={colis.proprietaire_telephone}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>

              <div>
                <label htmlFor="conseiller_technique_email" className="block text-sm font-medium text-gray-700 mb-1">
                  Mail conseiller technique
                </label>
                <input
                  type="email"
                  id="conseiller_technique_email"
                  name="conseiller_technique_email"
                  defaultValue={colis.conseiller_technique_email || ''}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
                <p className="text-xs text-gray-500 mt-1">Ce mail recevra également les notifications</p>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  defaultValue={colis.description}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                ></textarea>
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">Statut du colis</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1 md:col-span-2 mb-2">
                  <p className="text-sm text-gray-500">Cochez les statuts applicables et ajoutez une description pour chacun.</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="statut_validated"
                      name="statut_validated"
                      defaultChecked={colis.statut_validated}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="statut_validated" className="ml-2 block text-sm text-gray-900">
                      Commandé
                    </label>
                  </div>
                  <div className="pl-6">
                    <textarea
                      id="description_validated"
                      name="description_validated"
                      rows={2}
                      defaultValue={colis.description_validated || ''}
                      placeholder="Description pour le statut Commandé"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 text-sm"
                    ></textarea>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="statut_preparing"
                      name="statut_preparing"
                      defaultChecked={colis.statut_preparing}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="statut_preparing" className="ml-2 block text-sm text-gray-900">
                      En préparation
                    </label>
                  </div>
                  <div className="pl-6">
                    <textarea
                      id="description_preparing"
                      name="description_preparing"
                      rows={2}
                      defaultValue={colis.description_preparing || ''}
                      placeholder="Description pour le statut En préparation"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 text-sm"
                    ></textarea>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="statut_departure"
                      name="statut_departure"
                      defaultChecked={colis.statut_departure}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="statut_departure" className="ml-2 block text-sm text-gray-900">
                      Départ
                    </label>
                  </div>
                  <div className="pl-6">
                    <textarea
                      id="description_departure"
                      name="description_departure"
                      rows={2}
                      defaultValue={colis.description_departure || ''}
                      placeholder="Description pour le statut Départ"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 text-sm"
                    ></textarea>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="statut_attente_douane"
                      name="statut_attente_douane"
                      defaultChecked={colis.statut_attente_douane}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="statut_attente_douane" className="ml-2 block text-sm text-gray-900">
                      En attente de dédouanement
                    </label>
                  </div>
                  <div className="pl-6">
                    <textarea
                      id="description_attente_douane"
                      name="description_attente_douane"
                      rows={2}
                      defaultValue={colis.description_attente_douane || ''}
                      placeholder="Description pour le statut En attente de dédouanement"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 text-sm"
                    ></textarea>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="statut_delivered"
                      name="statut_delivered"
                      defaultChecked={colis.statut_delivered}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="statut_delivered" className="ml-2 block text-sm text-gray-900">
                      Livré
                    </label>
                  </div>
                  <div className="pl-6">
                    <textarea
                      id="description_delivered"
                      name="description_delivered"
                      rows={2}
                      defaultValue={colis.description_delivered || ''}
                      placeholder="Description pour le statut Livré"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 text-sm"
                    ></textarea>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="statut_en_cours_de_reparation"
                      name="statut_en_cours_de_reparation"
                      defaultChecked={colis.statut_en_cours_de_reparation}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="statut_en_cours_de_reparation" className="ml-2 block text-sm text-gray-900">
                      En cours de réparation
                    </label>
                  </div>
                  <div className="pl-6">
                    <textarea
                      id="description_en_cours_de_reparation"
                      name="description_en_cours_de_reparation"
                      rows={2}
                      defaultValue={colis.description_en_cours_de_reparation || ''}
                      placeholder="Description pour le statut En cours de réparation"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 text-sm"
                    ></textarea>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="statut_reparation_terminee"
                      name="statut_reparation_terminee"
                      defaultChecked={colis.statut_reparation_terminee}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="statut_reparation_terminee" className="ml-2 block text-sm text-gray-900">
                      Réparation terminée
                    </label>
                  </div>
                  <div className="pl-6">
                    <textarea
                      id="description_reparation_terminee"
                      name="description_reparation_terminee"
                      rows={2}
                      defaultValue={colis.description_reparation_terminee || ''}
                      placeholder="Description pour le statut Réparation terminée"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 text-sm"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">Options supplémentaires</h2>
              
              <div className="mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="details_supplementaires_visible"
                    name="details_supplementaires_visible"
                    defaultChecked={colis.details_supplementaires_visible}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="details_supplementaires_visible" className="ml-2 block text-sm text-gray-900">
                    Afficher les détails supplémentaires
                  </label>
                </div>
                
                <div className="mt-2">
                  <textarea
                    id="details_supplementaires"
                    name="details_supplementaires"
                    rows={3}
                    defaultValue={colis.details_supplementaires || ''}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="Détails supplémentaires à afficher"
                  ></textarea>
                </div>
              </div>
              
              <div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="prise_rendez_vous_active"
                    name="prise_rendez_vous_active"
                    defaultChecked={colis.prise_rendez_vous_active}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="prise_rendez_vous_active" className="ml-2 block text-sm text-gray-900">
                    Activer la prise de rendez-vous
                  </label>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <label htmlFor="rendez_vous_date" className="block text-sm font-medium text-gray-700 mb-1">
                      Date du rendez-vous
                    </label>
                    <input
                      type="date"
                      id="rendez_vous_date"
                      name="rendez_vous_date"
                      defaultValue={formatDate(colis.rendez_vous_date)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="rendez_vous_statut" className="block text-sm font-medium text-gray-700 mb-1">
                      Statut du rendez-vous
                    </label>
                    <select
                      id="rendez_vous_statut"
                      name="rendez_vous_statut"
                      defaultValue={colis.rendez_vous_statut || ''}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    >
                      <option value="">Sélectionner un statut</option>
                      <option value="En attente">En attente</option>
                      <option value="Confirmé">Confirmé</option>
                      <option value="Annulé">Annulé</option>
                      <option value="Reporté">Reporté</option>
                      <option value="Terminé">Terminé</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Link
                href="/admin/colis"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Annuler
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-blue-300"
                style={{ backgroundColor: '#254e9d' }}
              >
                {isSubmitting ? 'Mise à jour en cours...' : 'Mettre à jour le colis'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
} 