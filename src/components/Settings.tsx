import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useColorScheme } from '@mui/joy/styles';

const Settings = () => {
  const { mode, setMode } = useColorScheme();

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMode(event.target.checked ? 'dark' : 'light');
  };

  return (
    <section id="settings-section" className="p-6">
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-6">Paramètres</h3>

        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-4">Apparence</h4>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Thème sombre</p>
                <p className="text-xs text-gray-500">Activez le thème sombre pour un confort visuel</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="dark-mode-toggle"
                  className="sr-only peer"
                  checked={mode === 'dark'}
                  onChange={handleThemeChange}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h4 className="font-medium mb-4">Langue</h4>
            <select className="w-full md:w-1/3 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Français</option>
              <option>English</option>
            </select>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h4 className="font-medium mb-4">Notifications</h4>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="email-notifications"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="email-notifications" className="ml-2 block text-sm text-gray-700">
                  Notifications par email
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="app-notifications"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="app-notifications" className="ml-2 block text-sm text-gray-700">
                  Notifications dans l'application
                </label>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h4 className="font-medium mb-4">Paramètres avancés</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Taille de l'éditeur de code
                </label>
                <select className="w-full md:w-1/3 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Petite</option>
                  <option>Moyenne</option>
                  <option>Grande</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Police de l'éditeur</label>
                <select className="w-full md:w-1/3 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Courier New</option>
                  <option>Fira Code</option>
                  <option>Source Code Pro</option>
                  <option>JetBrains Mono</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-6">Zone dangereuse</h3>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between border border-red-200 rounded-lg p-4 bg-red-50">
            <div className="mb-4 md:mb-0">
              <h4 className="font-medium text-red-800 mb-1">Exporter toutes les données</h4>
              <p className="text-sm text-red-600">
                Téléchargez une archive contenant tous vos projets et analyses
              </p>
            </div>
            <button className="bg-white text-red-600 border border-red-300 px-4 py-2 rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500">
              <FontAwesomeIcon icon={faFileExport} className="mr-2" /> Exporter
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between border border-red-200 rounded-lg p-4 bg-red-50">
            <div className="mb-4 md:mb-0">
              <h4 className="font-medium text-red-800 mb-1">Supprimer le compte</h4>
              <p className="text-sm text-red-600">
                Cette action est irréversible. Toutes vos données seront définitivement supprimées.
              </p>
            </div>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
              <FontAwesomeIcon icon={faTrashAlt} className="mr-2" /> Supprimer le compte
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Settings;
