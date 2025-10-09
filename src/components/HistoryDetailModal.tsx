import React from 'react';
import { Project } from '../types/project';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface HistoryDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

const HistoryDetailModal: React.FC<HistoryDetailModalProps> = ({ isOpen, onClose, project }) => {
  if (!isOpen || !project) {
    return null;
  }

  const initialAnalysis = project.initialAnalysis?.summary;
  const refactoredAnalysis = project.refactoredAnalysis?.summary;

  const improvement = initialAnalysis?.cyclomaticComplexity && refactoredAnalysis?.cyclomaticComplexity
    ? Math.round(((initialAnalysis.cyclomaticComplexity - refactoredAnalysis.cyclomaticComplexity) / initialAnalysis.cyclomaticComplexity) * 100)
    : 0;

  const complexityReduction = initialAnalysis?.cyclomaticComplexity && refactoredAnalysis?.cyclomaticComplexity
    ? initialAnalysis.cyclomaticComplexity - refactoredAnalysis.cyclomaticComplexity
    : 0;

  const linesOfCodeChanged = project.linesOfCode?.initial && project.linesOfCode?.refactored
    ? project.linesOfCode.refactored - project.linesOfCode.initial
    : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-dark-card-bg rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-dark-border flex justify-between items-center sticky top-0 bg-white dark:bg-dark-card-bg z-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text-main">{project.name} - Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Initial Analysis */}
          <div className="bg-gray-50 dark:bg-dark-main-bg p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-dark-text-main border-b pb-2">Analyse Initiale</h3>
            <div className="space-y-3 text-sm">
              <p><strong>Complexité Cyclomatique:</strong> {initialAnalysis?.cyclomaticComplexity ?? 'N/A'}</p>
              <p><strong>Lignes de code:</strong> {project.linesOfCode?.initial ?? 'N/A'}</p>
              <p><strong>Maintenabilité:</strong> {project.maintainability?.initial ? project.maintainability.initial.toFixed(2) : 'N/A'}</p>
            </div>
          </div>

          {/* Refactored Analysis */}
          <div className="bg-gray-50 dark:bg-dark-main-bg p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-dark-text-main border-b pb-2">Analyse Refactorisée</h3>
            <div className="space-y-3 text-sm">
              <p><strong>Complexité Cyclomatique:</strong> {refactoredAnalysis?.cyclomaticComplexity ?? 'N/A'}</p>
              <p><strong>Lignes de code:</strong> {project.linesOfCode?.refactored ?? 'N/A'}</p>
              <p><strong>Maintenabilité:</strong> {project.maintainability?.refactored ? project.maintainability.refactored.toFixed(2) : 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Summary Metrics */}
        <div className="px-8 pb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-indigo-100 dark:bg-indigo-900/50 p-4 rounded-lg">
                    <p className="text-sm text-indigo-800 dark:text-indigo-200">Amélioration</p>
                    <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">+{isNaN(improvement) ? '0' : improvement}%</p>
                </div>
                <div className="bg-green-100 dark:bg-green-900/50 p-4 rounded-lg">
                    <p className="text-sm text-green-800 dark:text-green-200">Réduction de Complexité</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-300">{isNaN(complexityReduction) ? '0' : complexityReduction}</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">Lignes de code modifiées</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">{linesOfCodeChanged}</p>
                </div>
                 <div className="bg-purple-100 dark:bg-purple-900/50 p-4 rounded-lg">
                    <p className="text-sm text-purple-800 dark:text-purple-200">Maintenabilité</p>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-300">{project.maintainability?.refactored ? project.maintainability.refactored.toFixed(2) : 'N/A'}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryDetailModal;