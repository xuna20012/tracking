'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import Swal from 'sweetalert2';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  ArrowPathIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  TrashIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

// Type complet correspondant au modèle Prisma
interface Colis {
  id: number;
  colis_nom: string;
  numero_commande: string;
  proprietaire_nom: string;
  proprietaire_email: string;
  proprietaire_telephone: string;
  date_commande: string;
  date_reception: string;
  estimation_livraison: string;
  description: string;
  statut_validated: boolean;
  statut_preparing: boolean;
  statut_departure: boolean;
  statut_attente_douane: boolean;
  statut_delivered: boolean;
  statut_en_cours_de_reparation: boolean;
  statut_reparation_terminee: boolean;
}

export default function ColisPage() {
  const [colis, setColis] = useState<Colis[]>([]);
  const [filteredColis, setFilteredColis] = useState<Colis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState('tous');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState<{success: boolean; message: string} | null>(null);
  
  // Fonction pour récupérer les colis
  useEffect(() => {
    const fetchColis = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/colis');
        
        if (!response.ok) {
          throw new Error('Une erreur est survenue lors de la récupération des colis');
        }
        
        const data = await response.json();
        setColis(data);
        setFilteredColis(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchColis();
  }, []);

  // Filtrer et rechercher les colis
  useEffect(() => {
    let result = [...colis];
    
    // Filtre par statut
    if (statusFilter !== 'tous') {
      result = result.filter(item => {
        switch(statusFilter) {
          case 'commandé':
            return item.statut_validated && !item.statut_preparing;
          case 'en_préparation':
            return item.statut_preparing && !item.statut_departure;
          case 'départ':
            return item.statut_departure && !item.statut_attente_douane;
          case 'dédouanement':
            return item.statut_attente_douane && !item.statut_delivered && !item.statut_en_cours_de_reparation;
          case 'livré':
            return item.statut_delivered;
          case 'en_réparation':
            return item.statut_en_cours_de_reparation && !item.statut_reparation_terminee;
          case 'réparation_terminée':
            return item.statut_reparation_terminee;
          default:
            return true;
        }
      });
    }
    
    // Recherche
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(item => 
        item.colis_nom.toLowerCase().includes(searchLower) ||
        item.numero_commande.toLowerCase().includes(searchLower) ||
        item.proprietaire_nom.toLowerCase().includes(searchLower) ||
        item.proprietaire_email.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredColis(result);
    setCurrentPage(1); // Retour à la première page après filtrage
  }, [searchTerm, statusFilter, colis]);

  // Calculer la pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredColis.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredColis.length / itemsPerPage);

  // Formater les dates
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      // Vérifier les dates invalides
      if (dateString.includes('0000-00-00')) return 'N/A';
      
      const date = new Date(dateString);
      
      // Vérifier si la date est valide
      if (isNaN(date.getTime())) return 'N/A';
      
      return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(date);
    } catch (e) {
      console.error('Erreur lors du formatage de la date:', e);
      return 'N/A';
    }
  };

  // Déterminer le statut actuel d'un colis
  const getColisStatus = (colis: Colis) => {
    if (colis.statut_delivered) return { label: 'Livré', color: 'bg-green-100 text-green-800' };
    if (colis.statut_reparation_terminee) return { label: 'Réparation terminée', color: 'bg-teal-100 text-teal-800' };
    if (colis.statut_en_cours_de_reparation) return { label: 'En cours de réparation', color: 'bg-orange-100 text-orange-800' };
    if (colis.statut_attente_douane) return { label: 'En attente de dédouanement', color: 'bg-purple-100 text-purple-800' };
    if (colis.statut_departure) return { label: 'Départ', color: 'bg-blue-100 text-blue-800' };
    if (colis.statut_preparing) return { label: 'En préparation', color: 'bg-indigo-100 text-indigo-800' };
    if (colis.statut_validated) return { label: 'Commandé', color: 'bg-gray-100 text-gray-800' };
    return { label: 'Non défini', color: 'bg-gray-100 text-gray-800' };
  };

  // Rafraîchir les données
  const refreshData = async () => {
    try {
      setLoading(true);
      setDeleteStatus(null);
      const response = await fetch('/api/colis');
      
      if (!response.ok) {
        throw new Error('Une erreur est survenue lors de la récupération des colis');
      }
      
      const data = await response.json();
      setColis(data);
      setFilteredColis(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour confirmer la suppression avec SweetAlert
  const confirmDelete = (id: number, colisName: string) => {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: `Vous êtes sur le point de supprimer le colis "${colisName}". Cette action est irréversible!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#254e9d',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteColis(id);
      }
    });
  };

  // Fonction pour supprimer le colis
  const deleteColis = async (id: number) => {
    try {
      setLoading(true);
      setDeleteStatus(null);
      
      const response = await fetch(`/api/colis/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Une erreur est survenue lors de la suppression du colis');
      }
      
      // Mettre à jour la liste des colis
      setColis(prevColis => prevColis.filter(c => c.id !== id));
      setFilteredColis(prevColis => prevColis.filter(c => c.id !== id));
      
      // Afficher le message de succès avec SweetAlert
      Swal.fire({
        title: 'Supprimé!',
        text: 'Le colis a été supprimé avec succès.',
        icon: 'success',
        confirmButtonColor: '#254e9d'
      });
    } catch (err) {
      // Afficher l'erreur avec SweetAlert
      Swal.fire({
        title: 'Erreur!',
        text: err instanceof Error ? err.message : 'Une erreur est survenue lors de la suppression',
        icon: 'error',
        confirmButtonColor: '#254e9d'
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && colis.length === 0) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: '#254e9d' }}></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Erreur: </strong>
          <span className="block sm:inline">{error}</span>
          <button 
            className="mt-2 bg-red-100 hover:bg-red-200 text-red-700 py-1 px-3 rounded-md transition-colors flex items-center" 
            onClick={refreshData}
          >
            <ArrowPathIcon className="h-4 w-4 mr-1" /> Réessayer
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des colis</h1>
        
        <div className="flex space-x-2">
          <button
            onClick={refreshData}
            className="p-2 text-gray-600 rounded-md hover:bg-gray-100"
            title="Rafraîchir les données"
          >
            <ArrowPathIcon className="h-5 w-5" />
          </button>
          
          <Link 
            href="/admin/new" 
            className="flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            style={{ backgroundColor: '#254e9d' }}
          >
            <PlusIcon className="h-5 w-5 mr-1" />
            Ajouter un colis
          </Link>
        </div>
      </div>

      {/* Message de succès ou d'erreur pour la suppression */}
      {deleteStatus && (
        <div 
          className={`${deleteStatus.success ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'} px-4 py-3 rounded relative mb-4 flex items-start`} 
          role="alert"
        >
          {deleteStatus.success ? (
            <svg className="h-5 w-5 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <XCircleIcon className="h-5 w-5 mr-2 mt-0.5" />
          )}
          <span>{deleteStatus.message}</span>
          <button 
            className="absolute top-0 right-0 p-1.5 text-green-500"
            onClick={() => setDeleteStatus(null)}
          >
            <span className="sr-only">Fermer</span>
            <XCircleIcon className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Barre de recherche et filtres */}
      <div className="bg-white p-4 mb-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Rechercher par nom, numéro, destinataire..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500"
            >
              <FunnelIcon className="h-4 w-4 mr-1" />
              Filtrer
            </button>
            
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value={5}>5 par page</option>
              <option value={10}>10 par page</option>
              <option value={25}>25 par page</option>
              <option value={50}>50 par page</option>
            </select>
          </div>
        </div>
        
        {/* Filtres déroulants */}
        {isFilterOpen && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="tous">Tous les statuts</option>
                  <option value="commandé">Commandé</option>
                  <option value="en_préparation">En préparation</option>
                  <option value="départ">Départ</option>
                  <option value="dédouanement">En attente de dédouanement</option>
                  <option value="livré">Livré</option>
                  <option value="en_réparation">En cours de réparation</option>
                  <option value="réparation_terminée">Réparation terminée</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tableau des colis */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex justify-center items-center z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: '#254e9d' }}></div>
          </div>
        )}
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 table-fixed">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="w-48 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description du colis
                </th>
                <th scope="col" className="w-32 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  N° Commande
                </th>
                <th scope="col" className="w-40 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Destinataire
                </th>
                <th scope="col" className="w-32 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date de commande
                </th>
                <th scope="col" className="w-24 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th scope="col" className="w-36 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    Aucun colis trouvé
                  </td>
                </tr>
              ) : (
                currentItems.map((item) => {
                  const status = getColisStatus(item);
                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-3 py-4 text-sm font-medium text-gray-900 truncate max-w-[12rem]">
                        {item.colis_nom}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 truncate">
                        {item.numero_commande}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 truncate max-w-[10rem]">
                        {item.proprietaire_nom}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {formatDate(item.date_commande)}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.color}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium">
                        <Link 
                          href={`/admin/edit/${item.id}`} 
                          className="text-blue-600 hover:text-blue-900 mr-3"
                          style={{ color: '#254e9d' }}
                        >
                          Modifier
                        </Link>
                        <button
                          onClick={() => confirmDelete(item.id, item.colis_nom)}
                          className="text-red-600 hover:text-red-900 inline-flex items-center"
                        >
                          <TrashIcon className="h-4 w-4 mr-1" />
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {filteredColis.length > 0 && (
          <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Affichage de <span className="font-medium">{indexOfFirstItem + 1}</span> à{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastItem, filteredColis.length)}
                  </span>{' '}
                  sur <span className="font-medium">{filteredColis.length}</span> résultats
                </p>
              </div>
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                      currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <span className="sr-only">Précédent</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  
                  {/* Pages */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page => {
                      // Toujours montrer la première page, la dernière page, et les pages autour de la page courante
                      return page === 1 || page === totalPages || 
                             Math.abs(page - currentPage) <= 1;
                    })
                    .map((page, i, array) => {
                      // Ajouter des ellipsis
                      const prevPage = array[i - 1];
                      const showEllipsisBefore = prevPage && prevPage !== page - 1;
                      
                      return (
                        <div key={page}>
                          {showEllipsisBefore && (
                            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                              ...
                            </span>
                          )}
                          <button
                            onClick={() => setCurrentPage(page)}
                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                              page === currentPage
                                ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                                : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                            }`}
                            style={page === currentPage ? { backgroundColor: '#254e9d' } : {}}
                          >
                            {page}
                          </button>
                        </div>
                      );
                    })}
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                      currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <span className="sr-only">Suivant</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 