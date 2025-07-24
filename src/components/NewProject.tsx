import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faPlay } from '@fortawesome/free-solid-svg-icons';

const NewProject = () => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      console.log(e.dataTransfer.files);
      alert(`${e.dataTransfer.files.length} fichier(s) prêt(s) pour l'analyse !`);
      e.dataTransfer.clearData();
    }
  };

  return (
    <section id="new-project-section" className="p-6">
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-6">Nouveau projet</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom du projet</label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Langage principal</label>
            <select className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Sélectionner un langage</option>
              <option>JavaScript</option>
              <option>TypeScript</option>
              <option>Python</option>
              <option>Java</option>
              <option>C#</option>
              <option>PHP</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Uploader des fichiers</label>
          <div
            className={`border-2 border-dashed border-gray-300 rounded-lg p-8 text-center ${
              isDragging ? 'border-blue-400 bg-blue-50' : ''
            }`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center">
              <FontAwesomeIcon icon={faCloudUploadAlt} className="text-4xl text-gray-400 mb-2" />
              <p className="text-gray-500 mb-2">Glissez-déposez vos fichiers ici ou</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Parcourir les fichiers
              </button>
              <p className="text-xs text-gray-500 mt-2">Fichiers .zip, .tar.gz ou fichiers individuels acceptés</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Options de refactoring</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="dead-code"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="dead-code" className="ml-2 block text-sm text-gray-700">
                Détection de code mort
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="complexity"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                defaultChecked
              />
              <label htmlFor="complexity" className="ml-2 block text-sm text-gray-700">
                Analyse de complexité
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="duplicates"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                defaultChecked
              />
              <label htmlFor="duplicates" className="ml-2 block text-sm text-gray-700">
                Détection de duplications
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="style"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="style" className="ml-2 block text-sm text-gray-700">
                Correction de style
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="optimize"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                defaultChecked
              />
              <label htmlFor="optimize" className="ml-2 block text-sm text-gray-700">
                Optimisations
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="security"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="security" className="ml-2 block text-sm text-gray-700">
                Analyse de sécurité
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <FontAwesomeIcon icon={faPlay} className="mr-2" /> Lancer l'analyse
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-6">Projets récents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">API Gateway</h4>
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                Node.js
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-3">Analyse terminée - 10/06/2023</p>
            <div className="flex justify-between text-sm">
              <span className="text-green-600">+15% perf</span>
              <span>-20 lignes</span>
            </div>
          </div>
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">React Components</h4>
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                React
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-3">Analyse terminée - 08/06/2023</p>
            <div className="flex justify-between text-sm">
              <span className="text-green-600">+25% perf</span>
              <span>-35 lignes</span>
            </div>
          </div>
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">Data Processing</h4>
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                Python
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-3">Analyse terminée - 05/06/2023</p>
            <div className="flex justify-between text-sm">
              <span className="text-green-600">+40% perf</span>
              <span>-50 lignes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewProject;
