import React from 'react';
import { Project } from '../types/project';
import { CodeBracketIcon } from '@heroicons/react/24/outline';

interface ModernProjectCardProps {
  project: Project;
}

const getStatusBadgeClass = (status: Project['status'], isDarkMode: boolean) => {
  if (isDarkMode) {
    switch (status) {
      case 'Terminé': return 'bg-green-800 text-green-200';
      case 'Partiel': return 'bg-yellow-800 text-yellow-200';
      case 'En cours': return 'bg-blue-800 text-blue-200';
      case 'Échoué': return 'bg-red-800 text-red-200';
      default: return 'bg-gray-700 text-gray-200';
    }
  }
  switch (status) {
    case 'Terminé': return 'bg-primary-100 text-primary-800';
    case 'Partiel': return 'bg-yellow-100 text-yellow-800';
    case 'En cours': return 'bg-blue-100 text-blue-800';
    case 'Échoué': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getImprovementBarClass = (status: Project['status']) => {
  switch (status) {
    case 'Terminé': return 'bg-primary-600';
    case 'Partiel': return 'bg-yellow-400';
    default: return 'bg-gray-400';
  }
};

const ModernProjectCard: React.FC<ModernProjectCardProps> = ({ project }) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark');
          setIsDarkMode(isDark);
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    setIsDarkMode(document.documentElement.classList.contains('dark'));

    return () => observer.disconnect();
  }, []);

  if (!project) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-dark-card-bg shadow-lg dark:shadow-none rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <CodeBracketIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          </div>
          <div className="ml-4">
            <div className="text-lg font-medium text-gray-900 dark:text-dark-text-main">{project.name}</div>
            <div className="text-sm text-gray-500 dark:text-dark-text-secondary">{project.fileCount} fichiers</div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500 dark:text-dark-text-secondary">{project.language}</div>
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(project.status, isDarkMode)}`}>
              {project.status}
            </span>
          </div>
          <div className="mt-2">
            <div className="text-sm text-gray-900 dark:text-dark-text-main">{project.improvement}</div>
            {project.improvement && (
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                <div className={`${getImprovementBarClass(project.status)} h-1.5 rounded-full`} style={{ width: project.improvement.replace('%', '').replace('+', '') + '%' }}></div>
              </div>
            )}
          </div>
          <div className="mt-4 text-sm text-gray-500 dark:text-dark-text-secondary">
            {project.lastRefactored}
          </div>
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-dark-main-bg px-6 py-3 flex justify-end">
        <a href="#" className="text-primary hover:text-primary-700 dark:text-dark-link dark:hover:text-white mr-4">Voir</a>
        <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-dark-text-secondary dark:hover:text-white">Télécharger</a>
      </div>
    </div>
  );
};

export default ModernProjectCard;
