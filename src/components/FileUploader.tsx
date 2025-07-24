import React, { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faFileCode, faTimes } from '@fortawesome/free-solid-svg-icons';
import { UploadedFile } from '../types/project';
import { formatFileSize } from '../utils/format';

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  selectedFiles: UploadedFile[];
  onRemoveFile: (fileIdToRemove: string) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFilesSelected, selectedFiles, onRemoveFile }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelected(Array.from(e.dataTransfer.files));
      e.dataTransfer.clearData();
    }
  }, [onFilesSelected]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(Array.from(e.target.files));
      e.target.value = '';
    }
  };

  return (
    <div className="bg-white dark:bg-dark-card-bg shadow-lg dark:shadow-none rounded-lg overflow-hidden mb-8">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-dark-border">
        <h3 className="text-lg leading-6 font-medium text-dark dark:text-dark-text-main">Soumettre votre code</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-dark-text-secondary">Téléversez vos fichiers ou archives pour analyse et refactorisation</p>
      </div>
      <div className="p-6">
        <div
          id="dropzone"
          className={`file-dropzone flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg cursor-pointer
            ${isDragging
              ? 'border-primary ring-2 ring-primary-200 bg-primary-50 dark:bg-dark-main-bg dark:border-dark-link'
              : 'border-gray-300 dark:border-dark-border hover:border-gray-400 dark:hover:border-dark-link'
            }
          `}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-upload-input')?.click()}
        >
          <FontAwesomeIcon icon={faCloudUploadAlt} className="text-4xl text-primary dark:text-dark-link mb-4" />
          <p className="text-lg font-medium text-gray-700 dark:text-dark-text-main mb-2">Glissez-déposez vos fichiers ici</p>
          <p className="text-sm text-gray-500 dark:text-dark-text-secondary mb-4">ou</p>
          <label
            htmlFor="file-upload-input"
            className="cursor-pointer bg-primary hover:bg-primary-600 dark:bg-dark-btn-secondary dark:hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
          >
            <span>Parcourir les fichiers</span>
          </label>
          <input
            id="file-upload-input"
            name="file-upload"
            type="file"
            className="sr-only"
            multiple
            onChange={handleFileInputChange}
          />
          <p className="text-xs text-gray-500 dark:text-dark-text-secondary mt-3">Formats supportés: .js, .py, .java, .php, .cs, .zip, .rar</p>
        </div>

        {selectedFiles.length > 0 && (
          <div id="file-list" className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-dark-text-main mb-2">Fichiers sélectionnés:</h4>
            <ul className="border border-gray-200 dark:border-dark-border rounded-md divide-y divide-gray-200 dark:divide-dark-border">
              {selectedFiles.map((file) => (
                <li key={file.id} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm bg-white dark:bg-dark-card-bg">
                  <div className="w-0 flex-1 flex items-center">
                    <FontAwesomeIcon icon={faFileCode} className="flex-shrink-0 h-5 w-5 text-gray-400 dark:text-dark-text-secondary" />
                    <span className="ml-2 flex-1 w-0 truncate text-gray-800 dark:text-dark-text-main">{file.name}</span>
                    <span className="ml-2 flex-shrink-0 text-gray-500 dark:text-dark-text-secondary">{formatFileSize(file.size)}</span>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <button
                      onClick={() => onRemoveFile(file.id)}
                      className="bg-white dark:bg-dark-card-bg rounded-md text-gray-400 dark:text-dark-text-secondary hover:text-gray-500 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-dark-card-bg"
                      aria-label={`Remove ${file.name}`}
                    >
                      <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
