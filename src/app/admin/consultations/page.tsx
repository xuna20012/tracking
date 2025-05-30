'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  MagnifyingGlassIcon, 
  ArrowPathIcon,
  EyeIcon,
  CalendarIcon,
  ComputerDesktopIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DocumentChartBarIcon
} from '@heroicons/react/24/outline';

interface Consultation {
  id: number;
  numero_commande: string;
  ip_address: string | null;
  user_agent: string | null;
  consultation_date: string;
  client_email: string | null;
  client_nom: string | null;
}

interface ConsultationWithColis extends Consultation {
  colis_nom?: string;
}

export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState<ConsultationWithColis[]>([]);
  const [filteredConsultations, setFilteredConsultations] = useState<ConsultationWithColis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    thisWeek: 0,
    uniquePackages: 0
  });

  useEffect(() => {
    fetchConsultations();
  }, []);

  useEffect(() => {
    // Filtrer les consultations par recherche
    let result = [...consultations];
    
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(item => 
        item.numero_commande.toLowerCase().includes(searchLower) ||
        item.client_nom?.toLowerCase().includes(searchLower) ||
        item.client_email?.toLowerCase().includes(searchLower) ||
        item.ip_address?.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredConsultations(result);
    setCurrentPage(1);
  }, [searchTerm, consultations]);

  const fetchConsultations = async () => {
    try {
      setLoading(true);
      
      // Récupérer toutes les consultations (on va créer cette API)
      const response = await fetch('/api/admin/consultations');
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des consultations');
      }
      
      const data = await response.json();
      setConsultations(data.consultations || []);
      
      // Calculer les statistiques
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - 7);
      
      const todayCount = data.consultations.filter((c: Consultation) => 
        new Date(c.consultation_date) >= today
      ).length;
      
      const weekCount = data.consultations.filter((c: Consultation) => 
        new Date(c.consultation_date) >= weekStart
      ).length;
      
      const uniquePackages = new Set(data.consultations.map((c: Consultation) => c.numero_commande)).size;
      
      setStats({
        total: data.consultations.length,
        today: todayCount,
        thisWeek: weekCount,
        uniquePackages
      });
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  // Calculer la pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredConsultations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredConsultations.length / itemsPerPage);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  const getBrowserInfo = (userAgent: string | null) => {
    if (!userAgent) return 'Inconnu';
    
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Autre';
  };

  const refreshData = async () => {
    await fetchConsultations();
  };

  if (loading && consultations.length === 0) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: '#254e9d' }}></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Historique des consultations</h1>
          <p className="text-gray-500 mt-1">Suivi des consultations des colis par les clients</p>
        </div>
        
        <button
          onClick={refreshData}
          className="p-2 text-gray-600 rounded-md hover:bg-gray-100 transition-colors"
          title="Rafraîchir les données"
        >
          <ArrowPathIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-blue-50 rounded-lg shadow-sm p-6 border border-blue-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-blue-600 mb-1">Total consultations</p>
              <h3 className="text-2xl font-bold text-blue-900">{stats.total}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <EyeIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg shadow-sm p-6 border border-green-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-green-600 mb-1">Aujourd'hui</p>
              <h3 className="text-2xl font-bold text-green-900">{stats.today}</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CalendarIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-orange-50 rounded-lg shadow-sm p-6 border border-orange-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-orange-600 mb-1">Cette semaine</p>
              <h3 className="text-2xl font-bold text-orange-900">{stats.thisWeek}</h3>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <DocumentChartBarIcon className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg shadow-sm p-6 border border-purple-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-purple-600 mb-1">Colis uniques</p>
              <h3 className="text-2xl font-bold text-purple-900">{stats.uniquePackages}</h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <ComputerDesktopIcon className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="bg-white p-4 mb-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Rechercher par numéro de commande, client, email ou IP..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="block w-full md:w-auto pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value={10}>10 par page</option>
            <option value={20}>20 par page</option>
            <option value={50}>50 par page</option>
            <option value={100}>100 par page</option>
          </select>
        </div>
      </div>

      {/* Tableau des consultations */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex justify-center items-center z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: '#254e9d' }}></div>
          </div>
        )}
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date/Heure
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  N° Commande
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Navigateur
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Adresse IP
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    {error ? (
                      <div className="text-red-600">
                        <p>{error}</p>
                        <button 
                          onClick={refreshData}
                          className="mt-2 text-blue-600 hover:text-blue-800 underline"
                        >
                          Réessayer
                        </button>
                      </div>
                    ) : (
                      'Aucune consultation trouvée'
                    )}
                  </td>
                </tr>
              ) : (
                currentItems.map((consultation) => (
                  <tr key={consultation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(consultation.consultation_date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Link 
                        href={`/track/${consultation.numero_commande}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                        target="_blank"
                      >
                        {consultation.numero_commande}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div>
                        <p className="font-medium">{consultation.client_nom || 'N/A'}</p>
                        <p className="text-xs text-gray-400">{consultation.client_email || 'N/A'}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getBrowserInfo(consultation.user_agent)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                      {consultation.ip_address || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link 
                        href={`/admin/colis`}
                        className="text-blue-600 hover:text-blue-900"
                        style={{ color: '#254e9d' }}
                      >
                        Voir colis
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {filteredConsultations.length > 0 && (
          <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Affichage de <span className="font-medium">{indexOfFirstItem + 1}</span> à{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastItem, filteredConsultations.length)}
                  </span>{' '}
                  sur <span className="font-medium">{filteredConsultations.length}</span> résultats
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
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i;
                    } else {
                      pageNumber = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                          pageNumber === currentPage
                            ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                            : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                        }`}
                        style={pageNumber === currentPage ? { backgroundColor: '#254e9d' } : {}}
                      >
                        {pageNumber}
                      </button>
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