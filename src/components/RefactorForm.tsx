import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagic, faFileAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import FileUploader from './FileUploader';
import { RefactorOptions, UploadedFile } from '../types/project';

interface RefactorFormProps {
  onRefactorComplete: () => void;
}

const RefactorForm: React.FC<RefactorFormProps> = ({ onRefactorComplete }) => {
  const [selectedFiles, setSelectedFiles] = useState<UploadedFile[]>([]);
  const [options, setOptions] = useState<RefactorOptions>({
    level: 'Standard',
    mainLanguage: 'Détection automatique',
    addComments: true,
    optimizeVariableNames: true,
    detectDeadCode: true,
    restructureModules: false,
  });

  const handleFilesSelected = (files: File[]) => {
    const newUploadedFiles: UploadedFile[] = files.map(file => ({
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      type: file.type,
    }));
    setSelectedFiles(prevFiles => [...prevFiles, ...newUploadedFiles]);
  };

  const handleRemoveFile = (fileIdToRemove: string) => {
    setSelectedFiles(prevFiles => prevFiles.filter(file => file.id !== fileIdToRemove));
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setOptions(prevOptions => ({ ...prevOptions, [name]: checked }));
    } else {
      setOptions(prevOptions => ({ ...prevOptions, [name]: value }));
    }
  };

  const handleSubmitRefactor = () => {
    if (selectedFiles.length > 0) {
      onRefactorComplete();
    } else {
      alert("Veuillez sélectionner des fichiers à refactoriser.");
    }
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

        <div className="bg-gray-50 dark:bg-[#161b22] border border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 shadow-sm">
          <FileUploader
            onFilesSelected={handleFilesSelected}
            selectedFiles={selectedFiles}
            onRemoveFile={handleRemoveFile}
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
                    onClick={() => handleRemoveFile(file.id)}
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
                onChange={handleOptionChange}
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
                onChange={handleOptionChange}
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
                  checked={options[opt.id]}
                  onChange={handleOptionChange}
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
              onClick={handleSubmitRefactor}
              className="inline-flex items-center gap-2 px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-md font-semibold shadow-lg transition"
            >
              <FontAwesomeIcon icon={faMagic} />
              Lancer la refactorisation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RefactorForm;
