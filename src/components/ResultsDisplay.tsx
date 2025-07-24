import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDownload,
  faCode,
  faChartLine,
  faTrashAlt,
  faComment,
  faArrowLeft,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { faJs } from '@fortawesome/free-brands-svg-icons';
import CodeComparer from './CodeComparer';
import { RefactorResultSummary, RefactorFileDetail } from '../types/project';

const sampleSummary: RefactorResultSummary = {
  cyclomaticComplexityChange: '-32%',
  deadCodeRemovedLines: '142 lignes',
  commentsAdded: '28 commentaires',
};

const sampleFileDetails: RefactorFileDetail[] = [
  { fileName: 'api.js', language: 'JavaScript', type: 'Refactorisé', changesSummary: '12 améliorations', details: '3 variables renommées', status: 'Succès', iconClass: 'fab fa-js text-yellow-400' },
  { fileName: 'utils.js', language: 'JavaScript', type: 'Optimisé', changesSummary: '8 améliorations', details: '2 fonctions simplifiées', status: 'Succès', iconClass: 'fab fa-js text-yellow-400' },
  { fileName: 'config.js', language: 'JavaScript', type: 'Partiel', changesSummary: '3 améliorations', details: '1 problème non résolu', status: 'Avertissement', iconClass: 'fab fa-js text-yellow-400' },
];

const getStatusDotClass = (status: 'Succès' | 'Avertissement' | 'Échec') => {
  switch (status) {
    case 'Succès': return 'bg-green-400';
    case 'Avertissement': return 'bg-yellow-400';
    case 'Échec': return 'bg-red-400';
    default: return 'bg-gray-400';
  }
};

const getTypeBadgeClass = (type: RefactorFileDetail['type']) => {
  switch (type) {
    case 'Refactorisé': return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200';
    case 'Optimisé': return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200';
    case 'Partiel': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  }
};

interface ResultsDisplayProps {
  status: 'loading' | 'complete';
  onReset: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ status, onReset }) => {
  const summary = sampleSummary;
  const fileDetails = sampleFileDetails;

  return (
    <div id="results-section" className="p-6 dark:bg-dark-main-bg">
      <div className="max-w-7xl mx-auto">
        <div className="px-4 py-6 sm:px-0">
          <button
            onClick={onReset}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-dark-btn-primary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mb-6"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2 h-4 w-4" />
            Retour
          </button>

          {status === 'loading' && (
            <div className="text-center">
              <FontAwesomeIcon icon={faSpinner} spin size="3x" className="text-primary dark:text-dark-link mb-4" />
              <h2 className="text-2xl font-bold text-dark dark:text-dark-text-main">Refactorisation en cours...</h2>
              <p className="text-gray-500 dark:text-dark-text-secondary">Veuillez patienter pendant que nous analysons et améliorons votre code.</p>
            </div>
          )}

          {status === 'complete' && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-dark dark:text-dark-text-main">Résultats de la refactorisation</h2>
                <div>
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-dark-border shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-dark-text-secondary bg-white dark:bg-dark-btn-secondary hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 mr-2"
                  >
                    <FontAwesomeIcon icon={faDownload} className="mr-2 h-4 w-4" /> Télécharger le rapport
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-dark-btn-primary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <FontAwesomeIcon icon={faCode} className="mr-2 h-4 w-4" /> Télécharger le code
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card-bg shadow-lg dark:shadow-none rounded-lg overflow-hidden mb-8">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-dark-border">
                  <h3 className="text-lg leading-6 font-medium text-dark dark:text-dark-text-main">Résumé des améliorations</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-dark-text-secondary">Statistiques sur les changements apportés à votre code</p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    {summary.cyclomaticComplexityChange && (
                      <div className="bg-blue-50 dark:bg-blue-900/50 overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 rounded-md p-3">
                              <FontAwesomeIcon icon={faChartLine} className="text-blue-600 dark:text-blue-300 text-xl" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                              <dl>
                                <dt className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary truncate">Complexité cyclomatique</dt>
                                <dd className="flex items-baseline">
                                  <div className="text-2xl font-semibold text-gray-900 dark:text-dark-text-main">{summary.cyclomaticComplexityChange}</div>
                                </dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {summary.deadCodeRemovedLines && (
                      <div className="bg-green-50 dark:bg-green-900/50 overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 bg-green-100 dark:bg-green-900 rounded-md p-3">
                              <FontAwesomeIcon icon={faTrashAlt} className="text-green-600 dark:text-green-300 text-xl" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                              <dl>
                                <dt className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary truncate">Code mort supprimé</dt>
                                <dd className="flex items-baseline">
                                  <div className="text-2xl font-semibold text-gray-900 dark:text-dark-text-main">{summary.deadCodeRemovedLines}</div>
                                </dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {summary.commentsAdded && (
                      <div className="bg-purple-50 dark:bg-purple-900/50 overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 bg-purple-100 dark:bg-purple-900 rounded-md p-3">
                              <FontAwesomeIcon icon={faComment} className="text-secondary dark:text-purple-300 text-xl" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                              <dl>
                                <dt className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary truncate">Documentation ajoutée</dt>
                                <dd className="flex items-baseline">
                                  <div className="text-2xl font-semibold text-gray-900 dark:text-dark-text-main">{summary.commentsAdded}</div>
                                </dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-8">
                    <h4 className="text-lg font-medium text-dark dark:text-dark-text-main mb-4">Détails des changements</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-border">
                        <thead className="bg-gray-50 dark:bg-dark-card-bg">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider">Fichier</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider">Changements</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider">Statut</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-dark-card-bg divide-y divide-gray-200 dark:divide-dark-border">
                          {fileDetails.map((file, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <FontAwesomeIcon icon={faJs} className="text-yellow-400 text-xl" />
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900 dark:text-dark-text-main">{file.fileName}</div>
                                    <div className="text-sm text-gray-500 dark:text-dark-text-secondary">{file.language}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeBadgeClass(file.type)}`}>
                                  {file.type}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 dark:text-dark-text-main">{file.changesSummary}</div>
                                {file.details && <div className="text-sm text-gray-500 dark:text-dark-text-secondary">{file.details}</div>}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-dark-text-secondary">
                                <div className="flex items-center">
                                  <div className={`h-2.5 w-2.5 rounded-full ${getStatusDotClass(file.status)} mr-2`} />
                                  {file.status}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <CodeComparer
                originalCode={`function processData(data) { ... }`}
                refactoredCode={`function processActiveItemsWithMarkup(items) { ... }`}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
