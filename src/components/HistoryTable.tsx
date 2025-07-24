import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJs, faPython, faJava, faPhp } from '@fortawesome/free-brands-svg-icons';
import { faDownload, faEye } from '@fortawesome/free-solid-svg-icons';
import { Project } from '../types/project';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import HistoryChart from './HistoryChart';

const sampleHistoryData: Project[] = [
  { id: '1', name: 'E-commerce API', language: 'JavaScript', lastRefactored: '15 juin 2023 - 14:32', status: 'Terminé', improvement: '+42%', fileCount: 12, icon: faJs },
  { id: '2', name: 'Data Analysis', language: 'Python', lastRefactored: '10 juin 2023 - 09:15', status: 'Terminé', improvement: '+38%', fileCount: 8, icon: faPython },
  { id: '3', name: 'Inventory App', language: 'Java', lastRefactored: '2 juin 2023 - 16:48', status: 'Terminé', improvement: '+29%', fileCount: 23, icon: faJava },
  { id: '4', name: 'CMS Backend', language: 'PHP', lastRefactored: '28 mai 2023 - 11:20', status: 'Partiel', improvement: '+18%', fileCount: 17, icon: faPhp },
  { id: '5', name: 'Utility Scripts', language: 'Python', lastRefactored: '25 mai 2023 - 10:00', status: 'Terminé', improvement: '+55%', fileCount: 5, icon: faPython },
  { id: '6', name: 'Frontend UI Kit', language: 'JavaScript', lastRefactored: '20 mai 2023 - 18:30', status: 'Terminé', improvement: '+33%', fileCount: 30, icon: faJs },
];

const getStatusBadgeClass = (status: Project['status']) => {
  switch (status) {
    case 'Terminé': return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200';
    case 'Partiel': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200';
    case 'En cours': return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200';
    case 'Échoué': return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  }
};

const getImprovementBarClass = (status: Project['status']) => {
  switch (status) {
    case 'Terminé': return 'bg-green-600 dark:bg-green-400';
    case 'Partiel': return 'bg-yellow-400';
    default: return 'bg-gray-400 dark:bg-gray-600';
  }
};

const getIconColor = (language: string) => {
  switch (language.toLowerCase()) {
    case 'javascript': return 'text-yellow-400';
    case 'python': return 'text-blue-500 dark:text-blue-400';
    case 'java': return 'text-red-500 dark:text-red-400';
    case 'php': return 'text-purple-600 dark:text-purple-400';
    default: return 'text-gray-400';
  }
};

const ITEMS_PER_PAGE = 4;

const HistoryTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const historyData = sampleHistoryData;

  const totalPages = Math.ceil(historyData.length / ITEMS_PER_PAGE);
  const paginatedData = historyData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, historyData.length);

  return (
    <div id="history-section" className="p-6 bg-gray-50 dark:bg-dark-main-bg min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="px-4 py-6 sm:px-0">

          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-dark-text-main mb-8">Historique des refactorisations</h2>

          <div className="mb-10">
            <HistoryChart data={historyData} />
          </div>

          <div className="bg-white dark:bg-dark-card-bg shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 dark:border-dark-border">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text-main">Vos projets précédents</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-dark-text-secondary">Liste complète de vos refactorisations passées</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-border">
                <thead className="bg-gray-100 dark:bg-dark-card-bg">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-dark-text-secondary uppercase tracking-wider">Nom du projet</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-dark-text-secondary uppercase tracking-wider">Langage</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-dark-text-secondary uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-dark-text-secondary uppercase tracking-wider">Statut</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-dark-text-secondary uppercase tracking-wider">Amélioration</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-dark-card-bg divide-y divide-gray-200 dark:divide-dark-border">
                  {paginatedData.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-dark-main-bg transition-colors duration-200 cursor-pointer">
                      <td className="px-6 py-4 whitespace-nowrap flex items-center">
                        <div className={`flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-dark-main-bg ${getIconColor(project.language)}`}>
                          <FontAwesomeIcon icon={project.icon} className="h-6 w-6" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-dark-text-main">{project.name}</div>
                          <div className="text-xs text-gray-500 dark:text-dark-text-secondary">{project.fileCount} fichiers</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-dark-text-main text-sm">{project.language}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="text-gray-900 dark:text-dark-text-main">{project.lastRefactored.split(' - ')[0]}</div>
                        <div className="text-gray-500 dark:text-dark-text-secondary">{project.lastRefactored.split(' - ')[1]}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(project.status)}`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap w-40">
                        <div className="text-sm font-semibold text-gray-900 dark:text-dark-text-main">{project.improvement}</div>
                        {project.improvement && (
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1 overflow-hidden">
                            <div
                              className={`${getImprovementBarClass(project.status)} h-2 rounded-full transition-all duration-500`}
                              style={{ width: project.improvement.replace('%', '').replace('+', '') + '%' }}
                            ></div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-4">
                          <a href="#" className="inline-flex items-center gap-2 text-indigo-600 dark:text-dark-link hover:text-indigo-800 dark:hover:text-white transition-all duration-200 hover:scale-105">
                            <FontAwesomeIcon icon={faEye} className="text-base" />
                            <span className="text-sm font-medium">Voir</span>
                          </a>
                          <a href="#" className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-white transition-all duration-200 hover:scale-105">
                            <FontAwesomeIcon icon={faDownload} className="text-base" />
                            <span className="text-sm font-medium">Télécharger</span>
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 dark:bg-dark-card-bg px-6 py-3 flex items-center justify-between border-t border-gray-200 dark:border-dark-border">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-dark-border rounded-md text-gray-700 dark:text-dark-text-secondary bg-white dark:bg-dark-btn-secondary hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 transition"
                >
                  Précédent
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-dark-border rounded-md text-gray-700 dark:text-dark-text-secondary bg-white dark:bg-dark-btn-secondary hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 transition"
                >
                  Suivant
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <p className="text-sm text-gray-700 dark:text-dark-text-secondary">
                  Affichage de <span className="font-medium">{startItem}</span> à <span className="font-medium">{endItem}</span> sur <span className="font-medium">{historyData.length}</span> résultats
                </p>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-btn-secondary text-gray-500 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 transition"
                  >
                    <span className="sr-only">Précédent</span>
                    <ChevronLeftIcon className="h-5 w-5" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      aria-current={pageNumber === currentPage ? 'page' : undefined}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                        ${pageNumber === currentPage
                          ? 'z-10 bg-indigo-100 border-indigo-500 text-indigo-600 dark:bg-dark-link dark:border-dark-link dark:text-white'
                          : 'bg-white dark:bg-dark-btn-secondary border-gray-300 dark:border-dark-border text-gray-500 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700'
                        } transition`}
                    >
                      {pageNumber}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-btn-secondary text-gray-500 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 transition"
                  >
                    <span className="sr-only">Suivant</span>
                    <ChevronRightIcon className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryTable;
