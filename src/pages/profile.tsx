import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faSave, faEdit } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import LanguageChart from '../components/LanguageChart';
import ProjectsChart from '../components/ProjectsChart';

const ProfilePage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [profile, setProfile] = useState({
    fullName: 'Rojo',
    username: 'Rojodoe',
    email: 'Rojo.doe@example.com',
    phone: '+1 (555) 123-4567',
    bio: "Développeur full-stack avec 5 ans d'expérience. Passionné par les bonnes pratiques de code et l'optimisation des performances.",
    avatar: 'https://via.placeholder.com/150',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          avatar: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = () => {
    console.log('Saving profile:', profile);
    alert('Profil enregistré !');
    setIsEditMode(false);
  };

  return (
    <section id="profile-section" className="p-6 bg-gray-50 dark:bg-dark-main-bg">
      <div className="bg-white dark:bg-dark-card-bg p-8 rounded-xl shadow-md mb-8">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-dark-text-main mb-8">Profil</h3>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="flex flex-col items-center bg-gray-100 dark:bg-dark-main-bg p-6 rounded-lg">
              <img src={profile.avatar} alt="Profile" className="rounded-full w-32 h-32 mb-4 border-4 border-white dark:border-dark-border shadow-sm" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <label
                htmlFor="avatar-upload"
                className="text-blue-600 dark:text-dark-link hover:text-blue-800 dark:hover:text-white text-sm cursor-pointer"
              >
                <FontAwesomeIcon icon={faCamera} className="mr-1" /> Changer la photo
              </label>
            </div>

            <div className="mt-6">
              <h4 className="font-medium text-gray-800 dark:text-dark-text-main mb-2">Langages préférés</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200 text-xs rounded-full">JavaScript</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-200 text-xs rounded-full">TypeScript</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200 text-xs rounded-full">Python</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200 text-xs rounded-full">Java</span>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-medium text-gray-800 dark:text-dark-text-main mb-2">Liens</h4>
              <div className="flex items-center text-sm text-blue-600 dark:text-dark-link hover:text-blue-800 dark:hover:text-white mb-2">
                <FontAwesomeIcon icon={faGithub} className="mr-2" />
                <a href="#" target="_blank">github.com/Rojodoe</a>
              </div>
              <div className="flex items-center text-sm text-blue-600 dark:text-dark-link hover:text-blue-800 dark:hover:text-white">
                <i className="fas fa-globe mr-2"></i>
                <a href="#" target="_blank">portfolio.Rojodoe.dev</a>
              </div>
            </div>
          </div>

          <div className="md:w-2/3">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-dark-text-main">Informations personnelles</h4>
              <button
                onClick={() => isEditMode ? handleSave() : setIsEditMode(true)}
                className="text-blue-600 dark:text-dark-link hover:text-blue-800 dark:hover:text-white"
              >
                <FontAwesomeIcon icon={isEditMode ? faSave : faEdit} className="mr-1" />
                {isEditMode ? 'Enregistrer' : 'Modifier'}
              </button>
            </div>

            {isEditMode ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">Nom complet</label>
                    <input type="text" name="fullName" value={profile.fullName} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-dark-main-bg text-gray-900 dark:text-dark-text-main border-gray-300 dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">Nom d'utilisateur</label>
                    <input type="text" name="username" value={profile.username} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-dark-main-bg text-gray-900 dark:text-dark-text-main border-gray-300 dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">Email</label>
                    <input type="email" name="email" value={profile.email} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-dark-main-bg text-gray-900 dark:text-dark-text-main border-gray-300 dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">Téléphone</label>
                    <input type="tel" name="phone" value={profile.phone} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-dark-main-bg text-gray-900 dark:text-dark-text-main border-gray-300 dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">Bio</label>
                  <textarea name="bio" value={profile.bio} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-dark-main-bg text-gray-900 dark:text-dark-text-main border-gray-300 dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3}></textarea>
                </div>
              </>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-100 dark:bg-dark-main-bg p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">Nom complet</p>
                  <p className="text-gray-800 dark:text-dark-text-main">{profile.fullName}</p>
                </div>
                <div className="bg-gray-100 dark:bg-dark-main-bg p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">Nom d'utilisateur</p>
                  <p className="text-gray-800 dark:text-dark-text-main">{profile.username}</p>
                </div>
                <div className="bg-gray-100 dark:bg-dark-main-bg p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">Email</p>
                  <p className="text-gray-800 dark:text-dark-text-main">{profile.email}</p>
                </div>
                <div className="bg-gray-100 dark:bg-dark-main-bg p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">Téléphone</p>
                  <p className="text-gray-800 dark:text-dark-text-main">{profile.phone}</p>
                </div>
                <div className="col-span-2 bg-gray-100 dark:bg-dark-main-bg p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">Bio</p>
                  <p className="text-gray-800 dark:text-dark-text-main">{profile.bio}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-dark-card-bg p-8 rounded-xl shadow-md">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-dark-text-main mb-8">Statistiques</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-gray-100 dark:bg-dark-main-bg rounded-lg p-6">
            <div className="flex items-center mb-2">
              <div className="bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 p-3 rounded-full mr-4">
                <i className="fas fa-code"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-dark-text-secondary">Projets analysés</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-dark-text-main">24</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-dark-main-bg rounded-lg p-6">
            <div className="flex items-center mb-2">
              <div className="bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 p-3 rounded-full mr-4">
                <i className="fas fa-check-circle"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-dark-text-secondary">Lignes optimisées</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-dark-text-main">1,245</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-dark-main-bg rounded-lg p-6">
            <div className="flex items-center mb-2">
              <div className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 p-3 rounded-full mr-4">
                <i className="fas fa-chart-line"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-dark-text-secondary">Performance moyenne</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-dark-text-main">+28%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-gray-100 dark:bg-dark-main-bg p-6 rounded-lg">
            <h4 className="text-xl font-semibold text-gray-700 dark:text-dark-text-main mb-4">Répartition par langage</h4>
            <div className="h-64 flex items-center justify-center">
              <LanguageChart />
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-dark-main-bg p-6 rounded-lg">
            <h4 className="text-xl font-semibold text-gray-700 dark:text-dark-text-main mb-4">Projets par mois</h4>
            <div className="h-64 flex items-center justify-center">
              <ProjectsChart />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProfilePage;
