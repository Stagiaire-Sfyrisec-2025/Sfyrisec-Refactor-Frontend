// Placeholder for project.ts

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface Project {
  id: string;
  name: string;
  language: string;
  status: 'Terminé' | 'En cours' | 'Partiel' | 'Échoué';
  lastRefactored: string; // Could be a Date object or string
  improvement?: string; // e.g., "+42%"
  fileCount?: number;
  icon?: IconDefinition;
  // Add other project-related fields as needed
}

export interface UploadedFile {
  id: string; // Or use File object directly if ID isn't needed before upload
  name: string;
  size: number;
  type: string; // MIME type
  // rawFile: File; // The actual File object
}

export interface RefactorOptions {
  level: 'Basique' | 'Standard' | 'Avancé';
  mainLanguage: string; // Or 'Détection automatique'
  addComments: boolean;
  optimizeVariableNames: boolean;
  detectDeadCode: boolean;
  restructureModules: boolean;
}

export interface RefactorResultSummary {
  cyclomaticComplexityChange?: string; // e.g., "-32%"
  deadCodeRemovedLines?: string; // e.g., "142 lignes"
  commentsAdded?: string; // e.g., "28 commentaires"
}

export interface RefactorFileDetail {
  fileName: string;
  language: string;
  type: 'Refactorisé' | 'Optimisé' | 'Partiel' | 'Non modifié';
  changesSummary: string; // e.g., "12 améliorations"
  details?: string; // e.g., "3 variables renommées"
  status: 'Succès' | 'Avertissement' | 'Échec';
  iconClass?: string; // e.g., 'fab fa-js text-yellow-400'
}

// Add other types as the application develops.

// Props for the ProjectCard component, moved from ProjectCard.tsx
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface ProjectCardProps {
  id: number | string;
  name: string;
  langIcon: IconDefinition;
  langColor: string;
  time: string;
  status: string;
  statusColor: string;
  iconBg: string;
}
