import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagic, faFileAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import FileUploader from './FileUploader';
import { RefactorOptions, UploadedFile } from '../types/project';

interface RefactorFormProps {
  selectedFiles: UploadedFile[];
  projectName: string;
  onProjectNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilesSelected: (files: File[]) => void;
  onRemoveFile: (fileId: string) => void;
  onSubmit: () => void;
}

const RefactorForm: React.FC<RefactorFormProps> = ({
  selectedFiles = [], // fallback si non fourni
  projectName,
  onProjectNameChange,
  onFilesSelected,
  onRemoveFile,
  onSubmit,
}) => {
  const handleSubmitRefactor = () => {
    onSubmit();
  };

  return (
    <section id="refactor-section" className="p-8 md:p-12 bg-white dark:bg-[#0d1117] min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">✨ Refactorisation intelligente</h1>
          <p className="mt-3 text-gray-500 dark:text-gray-400 text-lg">
            Optimisez et restructurez vos fichiers automatiquement
          </p>
        </header>

        <div className="mb-6">
          <label htmlFor="project-name" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
            Nom du Projet
          </label>
          <input
            type="text"
            id="project-name"
            value={projectName}
            onChange={onProjectNameChange}
            className="w-full bg-white dark:bg-dark-main-bg border border-gray-300 dark:border-dark-border rounded-md py-2 px-3 text-gray-900 dark:text-dark-text-main focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Ex: Mon Projet de Refactorisation"
          />
        </div>

        <div className="bg-gray-50 dark:bg-[#161b22] border border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 shadow-sm">
          <FileUploader
            onFilesSelected={onFilesSelected}
            selectedFiles={selectedFiles}
            onRemoveFile={onRemoveFile}
          />

          {selectedFiles.length > 0 && (
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {selectedFiles.map(file => (
                <li
                  key={file.id}
                  className="bg-white dark:bg-[#0d1117] rounded-lg p-4 shadow flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faFileAlt} className="text-primary-600" />
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                      {file.name}
                    </span>
                  </div>
                  <button
                    onClick={() => onRemoveFile(file.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Supprimer"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-10 text-center">
            <button
              onClick={handleSubmitRefactor}
              disabled={selectedFiles.length === 0}
              className="inline-flex items-center gap-2 px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-md font-semibold shadow-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <FontAwesomeIcon icon={faMagic} />
              Lancer l&apos;analyse
            </button>
          </div>
      </div>
    </section>
  );
};

export default RefactorForm;
