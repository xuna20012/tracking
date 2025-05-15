'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import { ExclamationCircleIcon, CheckCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

// Fonction utilitaire pour formater les dates
function formatDate(date: Date): string {
  return date.toISOString().substring(0, 10);
}

export default function NewColisPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [generatedTrackingNumber, setGeneratedTrackingNumber] = useState<string>('');
  const [formData, setFormData] = useState({
    colis_nom: '',
    description: '',
    date_commande: formatDate(new Date()),
    numero_commande: '',
    estimation_livraison: formatDate(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)),
    proprietaire_nom: '',
    proprietaire_email: '',
    proprietaire_telephone: '',
    conseiller_technique_email: '',
    statut_validated: false,
    statut_preparing: false,
    statut_departure: false,
    statut_attente_douane: false,
    statut_delivered: false,
    statut_en_cours_de_reparation: false,
    statut_reparation_terminee: false,
    description_validated: '',
    description_preparing: '',
    description_departure: '',
    description_attente_douane: '',
    description_delivered: '',
    description_en_cours_de_reparation: '',
    description_reparation_terminee: '',
    prise_rendez_vous_active: false,
    details_supplementaires_visible: false,
    details_supplementaires: null,
    etapes_suivi: null,
    rendez_vous_date: null,
    rendez_vous_statut: null
  });

  // Générer un numéro de commande au chargement
  useEffect(() => {
    generateTrackingNumber();
  }, []);

  const generateTrackingNumber = () => {
    const prefix = 'OP-';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = prefix;
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setGeneratedTrackingNumber(result);
    setFormData(prev => ({ ...prev, numero_commande: result }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Pour les champs de type checkbox, nous devons traiter la valeur différemment
    if ((e.target as HTMLInputElement).type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const validateForm = () => {
    // Validation basique des champs requis
    if (!formData.colis_nom.trim()) return "Le nom du colis est requis";
    if (!formData.numero_commande.trim()) return "Le numéro de commande est requis";
    if (!formData.proprietaire_nom.trim()) return "Le nom du destinataire est requis";
    if (!formData.proprietaire_email.trim()) return "L'email du destinataire est requis";
    if (!formData.proprietaire_telephone.trim()) return "Le téléphone du destinataire est requis";
    
    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.proprietaire_email)) return "Format d'email invalide";
    
    // Validation des dates
    try {
      // Remove date reception validation
    } catch (e) {
      return "Format de date invalide";
    }
    
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validation du formulaire
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const dataToSend = {
        ...formData,
        // S'assurer que les dates sont au bon format (YYYY-MM-DD)
        date_commande: formData.date_commande,
        // Utiliser la date de commande comme date de réception par défaut
        date_reception: formData.date_commande,
        estimation_livraison: formData.estimation_livraison,
        // Convertir explicitement les booléens
        statut_validated: Boolean(formData.statut_validated),
        statut_preparing: Boolean(formData.statut_preparing),
        statut_departure: Boolean(formData.statut_departure),
        statut_attente_douane: Boolean(formData.statut_attente_douane),
        statut_delivered: Boolean(formData.statut_delivered),
        statut_en_cours_de_reparation: Boolean(formData.statut_en_cours_de_reparation),
        statut_reparation_terminee: Boolean(formData.statut_reparation_terminee),
        prise_rendez_vous_active: Boolean(formData.prise_rendez_vous_active),
        details_supplementaires_visible: Boolean(formData.details_supplementaires_visible),
        // Initialiser les descriptions vides
        description_validated: formData.description_validated || '',
        description_preparing: formData.description_preparing || '',
        description_departure: formData.description_departure || '',
        description_attente_douane: formData.description_attente_douane || '',
        description_delivered: formData.description_delivered || '',
        description_en_cours_de_reparation: formData.description_en_cours_de_reparation || '',
        description_reparation_terminee: formData.description_reparation_terminee || '',
      };

      const response = await fetch('/api/colis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.details && Array.isArray(errorData.details)) {
          throw new Error(errorData.details.join(', '));
        }
        throw new Error(errorData.error || 'Une erreur est survenue lors de la création du colis');
      }

      setSuccess("Le colis a été créé avec succès!");
      setTimeout(() => {
        router.push('/admin/colis');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto pb-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Création d'un nouveau colis</h1>
          <Link 
            href="/admin/colis" 
            className="flex items-center text-blue-600 hover:text-blue-800"
            style={{ color: '#254e9d' }}
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
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
            <CheckCircleIcon className="h-5 w-5 mr-2 mt-0.5" />
            <span>{success}</span>
          </div>
        )}

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">Informations de base</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="colis_nom" className="block text-sm font-medium text-gray-700 mb-1">
                    Description du colis *
                  </label>
                  <textarea
                    id="colis_nom"
                    name="colis_nom"
                    value={formData.colis_nom}
                    onChange={handleChange}
                    rows={3}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="numero_commande" className="block text-sm font-medium text-gray-700 mb-1">
                    Numéro de commande *
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="numero_commande"
                      name="numero_commande"
                      value={formData.numero_commande}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
                    />
                    <button
                      type="button"
                      onClick={generateTrackingNumber}
                      className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-200"
                      title="Générer un numéro"
                    >
                      Générer
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Format recommandé: OP-XXXXX</p>
                </div>
              </div>
              
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">Dates</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="date_commande" className="block text-sm font-medium text-gray-700 mb-1">
                    Date de commande *
                  </label>
                  <input
                    type="date"
                    id="date_commande"
                    name="date_commande"
                    value={formData.date_commande}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
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
                    value={formData.estimation_livraison}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Toutes les dates doivent être au format YYYY-MM-DD</p>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">Informations du destinataire</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="proprietaire_nom" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom du destinataire *
                  </label>
                  <input
                    type="text"
                    id="proprietaire_nom"
                    name="proprietaire_nom"
                    value={formData.proprietaire_nom}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
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
                    value={formData.proprietaire_email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
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
                    value={formData.proprietaire_telephone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
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
                    value={formData.conseiller_technique_email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
                  />
                  <p className="text-xs text-gray-500 mt-1">Ce mail recevra également les notifications</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">Statut initial</h2>
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
                      checked={formData.statut_validated}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="statut_validated" className="ml-2 block text-sm text-gray-700">
                      Commandé
                    </label>
                  </div>
                  <div className="pl-6">
                    <textarea
                      id="description_validated"
                      name="description_validated"
                      rows={2}
                      value={formData.description_validated || ''}
                      onChange={handleChange}
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
                      checked={formData.statut_preparing}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="statut_preparing" className="ml-2 block text-sm text-gray-700">
                      En préparation
                    </label>
                  </div>
                  <div className="pl-6">
                    <textarea
                      id="description_preparing"
                      name="description_preparing"
                      rows={2}
                      value={formData.description_preparing || ''}
                      onChange={handleChange}
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
                      checked={formData.statut_departure}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="statut_departure" className="ml-2 block text-sm text-gray-700">
                      Départ
                    </label>
                  </div>
                  <div className="pl-6">
                    <textarea
                      id="description_departure"
                      name="description_departure"
                      rows={2}
                      value={formData.description_departure || ''}
                      onChange={handleChange}
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
                      checked={formData.statut_attente_douane}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="statut_attente_douane" className="ml-2 block text-sm text-gray-700">
                      En attente de dédouanement
                    </label>
                  </div>
                  <div className="pl-6">
                    <textarea
                      id="description_attente_douane"
                      name="description_attente_douane"
                      rows={2}
                      value={formData.description_attente_douane || ''}
                      onChange={handleChange}
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
                      checked={formData.statut_delivered}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="statut_delivered" className="ml-2 block text-sm text-gray-700">
                      Livré
                    </label>
                  </div>
                  <div className="pl-6">
                    <textarea
                      id="description_delivered"
                      name="description_delivered"
                      rows={2}
                      value={formData.description_delivered || ''}
                      onChange={handleChange}
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
                      checked={formData.statut_en_cours_de_reparation}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="statut_en_cours_de_reparation" className="ml-2 block text-sm text-gray-700">
                      En cours de réparation
                    </label>
                  </div>
                  <div className="pl-6">
                    <textarea
                      id="description_en_cours_de_reparation"
                      name="description_en_cours_de_reparation"
                      rows={2}
                      value={formData.description_en_cours_de_reparation || ''}
                      onChange={handleChange}
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
                      checked={formData.statut_reparation_terminee}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="statut_reparation_terminee" className="ml-2 block text-sm text-gray-700">
                      Réparation terminée
                    </label>
                  </div>
                  <div className="pl-6">
                    <textarea
                      id="description_reparation_terminee"
                      name="description_reparation_terminee"
                      rows={2}
                      value={formData.description_reparation_terminee || ''}
                      onChange={handleChange}
                      placeholder="Description pour le statut Réparation terminée"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 text-sm"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
              ></textarea>
            </div>

            <div className="flex justify-end space-x-3 mt-8">
              <Link
                href="/admin/colis"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Annuler
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-blue-300"
                style={{ backgroundColor: '#254e9d' }}
              >
                {isSubmitting ? 'Création en cours...' : 'Créer le colis'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
} 