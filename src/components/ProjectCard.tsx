import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProjectCardProps } from '../types/project';

const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  langIcon,
  langColor,
  time,
  status,
  statusColor,
  iconBg
}) => {
  return (
    <li className="px-6 py-4 bg-white dark:bg-dark-card-bg rounded-lg mb-4">
      <div className="flex items-center">
        <div className={`flex-shrink-0 h-10 w-10 rounded-full ${iconBg} flex items-center justify-center`}>
          <FontAwesomeIcon icon={langIcon} className={`${langColor} text-xl`} />
        </div>
        <div className="ml-4">
          <div className="text-sm font-medium text-dark dark:text-dark-text-main">{name}</div>
          <div className="text-sm text-gray-500 dark:text-dark-text-secondary">Refactorisé {time}</div>
        </div>
        <div className="ml-auto">
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}`}>
            {status}
          </span>
        </div>
      </div>
    </li>
  );
};

export default ProjectCard;
