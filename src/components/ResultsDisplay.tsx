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
import { RefactorFileDetail, RefactorOptions } from '../types/project';

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

const SummaryCard = ({ icon, label, value, color }: { icon: any, label: string, value: number | string, color: string }) => {
  const colors: { [key: string]: { bg: string, text: string, iconBg: string } } = {
    blue: { bg: 'bg-blue-50 dark:bg-blue-900/50', text: 'text-blue-600 dark:text-blue-300', iconBg: 'bg-blue-100 dark:bg-blue-900' },
    green: { bg: 'bg-green-50 dark:bg-green-900/50', text: 'text-green-600 dark:text-green-300', iconBg: 'bg-green-100 dark:bg-green-900' },
    yellow: { bg: 'bg-yellow-50 dark:bg-yellow-900/50', text: 'text-yellow-600 dark:text-yellow-300', iconBg: 'bg-yellow-100 dark:bg-yellow-900' },
    purple: { bg: 'bg-purple-50 dark:bg-purple-900/50', text: 'text-purple-600 dark:text-purple-300', iconBg: 'bg-purple-100 dark:bg-purple-900' },
  };
  const selectedColor = colors[color] || colors.blue;

  return (
    <div className={`${selectedColor.bg} overflow-hidden shadow rounded-lg`}>
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className={`flex-shrink-0 ${selectedColor.iconBg} rounded-md p-3`}>
            <FontAwesomeIcon icon={icon} className={`${selectedColor.text} text-xl`} />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary truncate">{label}</dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900 dark:text-dark-text-main">{value}</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ResultsDisplayProps {
  status: 'analyzing' | 'analyzed' | 'refactoring' | 'refactored' | 'error';
  onReset: () => void;
  analysisResult: any;
  onRefactor: () => void;
  options: RefactorOptions;
  onOptionChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
  originalCode?: string;
  refactoredCode?: string;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ status, onReset, analysisResult, onRefactor, options, onOptionChange, originalCode, refactoredCode }) => {
  const handleDownloadReport = () => {
    if (!analysisResult) return;
    const reportJson = JSON.stringify(analysisResult, null, 2);
    const blob = new Blob([reportJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const originalFileName = analysisResult?.fileDetails?.[0]?.fileName || 'refactor_report';
    const reportName = originalFileName.includes('.')
      ? `${originalFileName.split('.').slice(0, -1).join('.')}_report.json`
      : `${originalFileName}_report.json`;
    a.download = reportName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadCode = () => {
    if (!refactoredCode) return;
    const fileName = analysisResult?.fileDetails?.[0]?.fileName ? `refactored_${analysisResult.fileDetails[0].fileName}` : 'refactored_code.txt';
    const blob = new Blob([refactoredCode], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (status === 'error') {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-red-500">Erreur</h2>
        <p className="text-gray-600 dark:text-gray-400">Les résultats de l&apos;analyse ne sont pas disponibles.</p>
        <button
          onClick={onReset}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-dark-btn-primary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2 h-4 w-4" />
          Retour
        </button>
      </div>
    );
  }

  const summary = analysisResult?.summary;
  const fileDetails = analysisResult?.fileDetails;

  const getTitle = () => {
    switch (status) {
      case 'analyzing':
        return "Analyse en cours...";
      case 'analyzed':
        return "Analyse des améliorations potentielles";
      case 'refactoring':
        return "Refactorisation en cours...";
      case 'refactored':
        return "Résultats de la refactorisation";
      default:
        return "Résultats";
    }
  };

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

          {(status === 'analyzing' || status === 'refactoring') && (
            <div className="text-center">
              <FontAwesomeIcon icon={faSpinner} spin size="3x" className="text-primary dark:text-dark-link mb-4" />
              <h2 className="text-2xl font-bold text-dark dark:text-dark-text-main">{getTitle()}</h2>
              <p className="text-gray-500 dark:text-dark-text-secondary">Veuillez patienter pendant que nous analysons et améliorons votre code.</p>
            </div>
          )}

          {(status === 'analyzed' || status === 'refactored') && summary && fileDetails && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-dark dark:text-dark-text-main">{getTitle()}</h2>
                <div>
                  {status === 'refactored' && (
                    <>
                      <button
                        type="button"
                        onClick={handleDownloadReport}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-dark-border shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-dark-text-secondary bg-white dark:bg-dark-btn-secondary hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 mr-2"
                      >
                        <FontAwesomeIcon icon={faDownload} className="mr-2 h-4 w-4" /> Télécharger le rapport
                      </button>
                      <button
                        type="button"
                        onClick={handleDownloadCode}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-dark-btn-primary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <FontAwesomeIcon icon={faCode} className="mr-2 h-4 w-4" /> Télécharger le code
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-white dark:bg-dark-card-bg shadow-lg dark:shadow-none rounded-lg overflow-hidden mb-8">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-dark-border">
                  <h3 className="text-lg leading-6 font-medium text-dark dark:text-dark-text-main">
                    {status === 'analyzed' ? 'Améliorations potentielles' : 'Résumé des améliorations'}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-dark-text-secondary">
                    {status === 'analyzed'
                      ? 'Voici les améliorations potentielles qui peuvent être apportées à votre code.'
                      : 'Statistiques sur les changements apportés à votre code'}
                  </p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <SummaryCard icon={faChartLine} label="Complexité Cyclomatique" value={summary.cyclomaticComplexity} color="blue" />
                    <SummaryCard icon={faTrashAlt} label="Instances de Code Mort" value={summary.deadCode} color="green" />
                    <SummaryCard icon={faCode} label="Redondances" value={summary.redundancy} color="yellow" />
                    <SummaryCard icon={faComment} label="Problèmes de Convention" value={summary.conventionIssues} color="purple" />
                  </div>

                  {status === 'refactored' && (
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
                            {fileDetails.map((file: RefactorFileDetail, index: number) => (
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
                  )}
                </div>
              </div>

              {status === 'refactored' && originalCode && refactoredCode && (
                <CodeComparer
                  originalCode={originalCode}
                  refactoredCode={refactoredCode}
                />
              )}

              {status === 'analyzed' && (
                <div className="mt-12 bg-white dark:bg-[#161b22] rounded-2xl shadow-md p-8">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
                    ⚙️ Paramètres de refactorisation
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                        Niveau
                      </label>
                      <select
                        name="level"
                        value={options.level}
                        onChange={onOptionChange}
                        className="w-full bg-gray-50 dark:bg-[#0d1117] text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3"
                      >
                        <option>Basique (nettoyage simple)</option>
                        <option>Standard (recommandé)</option>
                        <option>Avancé (restructuration complète)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                        Langage principal
                      </label>
                      <select
                        name="mainLanguage"
                        value={options.mainLanguage}
                        onChange={onOptionChange}
                        className="w-full bg-gray-50 dark:bg-[#0d1117] text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3"
                      >
                        <option>Détection automatique</option>
                        <option>JavaScript</option>
                        <option>Python</option>
                        <option>Java</option>
                        <option>PHP</option>
                        <option>C#</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {[
                      { id: 'addComments', label: 'Ajouter des commentaires', desc: 'Documenter les fonctions clés' },
                      { id: 'optimizeVariableNames', label: 'Optimiser les noms', desc: 'Renommer les variables de façon claire' },
                      { id: 'detectDeadCode', label: 'Détecter code mort', desc: 'Supprimer les blocs inutilisés' },
                      { id: 'restructureModules', label: 'Modulariser le code', desc: 'Organiser le code en modules' },
                    ].map(opt => (
                      <label
                        key={opt.id}
                        className="flex items-start gap-3 bg-gray-50 dark:bg-[#0d1117] hover:bg-gray-100 dark:hover:bg-[#161b22] p-4 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors"
                      >
                        <input
                          type="checkbox"
                          name={opt.id}
                          checked={options[opt.id as keyof RefactorOptions]}
                          onChange={onOptionChange}
                          className="mt-1 h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <div>
                          <span className="font-medium text-gray-800 dark:text-gray-100">{opt.label}</span>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{opt.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="mt-10 text-center">
                    <button
                      onClick={onRefactor}
                      className="inline-flex items-center gap-2 px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-md font-semibold shadow-lg transition"
                    >
                      <FontAwesomeIcon icon={faCode} className="mr-2 h-4 w-4" />
                      Lancer la refactorisation
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
