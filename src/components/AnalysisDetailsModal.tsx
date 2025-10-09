import React from 'react';
import { Project } from '../types/project';
import { HistoryEntry } from '../context/RefactoringHistoryContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faFileCode, faChartLine, faTools } from '@fortawesome/free-solid-svg-icons';

interface AnalysisDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  historyEntry: HistoryEntry | null;
}

const AnalysisDetailsModal: React.FC<AnalysisDetailsModalProps> = ({ isOpen, onClose, project, historyEntry }) => {
  if (!isOpen || !project || !historyEntry) {
    return null;
  }

  const initialAnalysis = historyEntry.initialAnalysis?.summary;
  const refactoredAnalysis = historyEntry.refactoredAnalysis?.summary;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-dark-card-bg rounded-lg shadow-2xl w-full max-w-2xl max-h-full overflow-y-auto">
        <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-dark-border">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-text-main">{project.name} - Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
            <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Initial Analysis */}
            <div className="bg-gray-50 dark:bg-dark-main-bg p-4 rounded-lg">
              <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-dark-text-main flex items-center">
                <FontAwesomeIcon icon={faFileCode} className="mr-2 text-blue-500" />
                Analyse Initiale
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-dark-text-secondary">
                <li>Complexité Cyclomatique: <span className="font-semibold">{initialAnalysis?.cyclomaticComplexity ?? 'N/A'}</span></li>
                <li>Lignes de code: <span className="font-semibold">{initialAnalysis?.loc ?? 'N/A'}</span></li>
                <li>Maintenabilité: <span className="font-semibold">{initialAnalysis?.maintainability?.toFixed(2) ?? 'N/A'}</span></li>
              </ul>
            </div>

            {/* Refactored Analysis */}
            <div className="bg-gray-50 dark:bg-dark-main-bg p-4 rounded-lg">
              <h4 className="font-semibold text-lg mb-3 text-gray-800 dark:text-dark-text-main flex items-center">
                <FontAwesomeIcon icon={faTools} className="mr-2 text-green-500" />
                Analyse Refactorisée
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-dark-text-secondary">
                <li>Complexité Cyclomatique: <span className="font-semibold">{refactoredAnalysis?.cyclomaticComplexity ?? 'N/A'}</span></li>
                <li>Lignes de code: <span className="font-semibold">{refactoredAnalysis?.loc ?? 'N/A'}</span></li>
                <li>Maintenabilité: <span className="font-semibold">{refactoredAnalysis?.maintainability?.toFixed(2) ?? 'N/A'}</span></li>
              </ul>
            </div>
          </div>

          {/* Improvement Summary */}
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
            <h4 className="font-semibold text-lg mb-3 text-indigo-800 dark:text-indigo-300 flex items-center">
              <FontAwesomeIcon icon={faChartLine} className="mr-2" />
              Amélioration
            </h4>
            <div className="flex justify-around text-center">
              <div>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">+{project.improvement}%</p>
                <p className="text-sm text-gray-600 dark:text-dark-text-secondary">Réduction de Complexité</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {initialAnalysis && refactoredAnalysis ? initialAnalysis.loc - refactoredAnalysis.loc : 0}
                </p>
                <p className="text-sm text-gray-600 dark:text-dark-text-secondary">Lignes de code modifiées</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 dark:bg-dark-card-bg border-t border-gray-200 dark:border-dark-border text-right">
            <button onClick={onClose} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Fermer
            </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDetailsModal;