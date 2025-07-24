import Head from 'next/head';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCode, faBell, faBars, faUserCircle, faTachometerAlt, faHistory, faCog, faTimes, faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/joy/Box';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const { isAuthenticated, user, login, logout, isLoading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById('user-menu-dropdown');
      const button = document.getElementById('user-menu');
      if (menu && !menu.contains(event.target as Node) && button && !button.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinkClasses = (path: string) =>
    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
      router.pathname === path
        ? 'border-primary text-dark dark:text-dark-link'
        : 'border-transparent text-gray-500 dark:text-dark-text-secondary hover:border-gray-300 dark:hover:border-dark-border hover:text-gray-700 dark:hover:text-dark-text-main'
    }`;

  const mobileNavLinkClasses = (path: string) =>
    `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
      router.pathname === path
        ? 'bg-primary-50 dark:bg-dark-card-bg border-primary dark:border-dark-link text-primary dark:text-dark-link'
        : 'border-transparent text-gray-500 dark:text-dark-text-secondary hover:bg-gray-50 dark:hover:bg-dark-card-bg hover:border-gray-300 dark:hover:border-dark-border hover:text-gray-700 dark:hover:text-dark-text-main'
    }`;

  const sidebarLinkClasses = (path: string) =>
    `sidebar-link group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
        router.pathname === path ? 'active bg-gray-100 dark:bg-dark-card-bg text-gray-900 dark:text-dark-link' : 'text-gray-700 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-dark-card-bg hover:text-gray-900 dark:hover:text-dark-text-main'
    }`;

  return (
    <>
      <Head>
        <title>CodeRefactor - Plateforme de refactorisation</title>
        <meta name="description" content="CodeRefactor - Plateforme de refactorisation intelligente" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-100 dark:bg-dark-main-bg">
        {isAuthenticated && (
          <>
            <nav className="bg-white dark:bg-dark-card-bg shadow-sm fixed w-full top-0 z-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 flex items-center">
                      <FontAwesomeIcon icon={faCode} className="text-primary dark:text-dark-link text-2xl mr-2" />
                      <span className="text-xl font-bold text-dark dark:text-dark-text-main">CodeRefactor</span>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                      <Link href="/" legacyBehavior><a className={navLinkClasses('/')}>Tableau de bord</a></Link>
                      <Link href="/refactor" legacyBehavior><a className={navLinkClasses('/refactor')}>Refactoriser</a></Link>
                      <Link href="/history" legacyBehavior><a className={navLinkClasses('/history')}>Historique</a></Link>
                    </div>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:items-center">
                    <button className="bg-white dark:bg-dark-card-bg p-1 rounded-full text-gray-400 dark:text-dark-text-secondary hover:text-gray-500 dark:hover:text-dark-text-main focus:outline-none">
                      <span className="sr-only">Notifications</span>
                      <FontAwesomeIcon icon={faBell} className="h-6 w-6" />
                    </button>
                    <div className="ml-3 relative">
                      <div>
                        <button
                          className="bg-white dark:bg-dark-card-bg rounded-full flex text-sm focus:outline-none"
                          id="user-menu"
                          onClick={() => setUserMenuOpen(!userMenuOpen)}
                        >
                          <span className="sr-only">Ouvrir le menu utilisateur</span>
                          <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" />
                        </button>
                      </div>
                      {userMenuOpen && (
                        <div
                          id="user-menu-dropdown"
                          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-dark-card-bg ring-1 ring-black dark:ring-dark-border ring-opacity-5 focus:outline-none z-50"
                          role="menu" aria-orientation="vertical" aria-labelledby="user-menu"
                        >
                           <Link href="/profile" legacyBehavior>
                             <a className="block px-4 py-2 text-sm text-gray-700 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-dark-main-bg" role="menuitem" onClick={() => setUserMenuOpen(false)}>Profil</a>
                           </Link>
                           <Link href="/settings" legacyBehavior>
                             <a className="block px-4 py-2 text-sm text-gray-700 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-dark-main-bg" role="menuitem" onClick={() => setUserMenuOpen(false)}>Paramètres</a>
                           </Link>
                          <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); handleLogout(); }}
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-dark-main-bg"
                            role="menuitem"
                          >
                            Déconnexion
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="-mr-2 flex items-center sm:hidden">
                    <button
                      className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-dark-text-secondary hover:text-gray-500 dark:hover:text-dark-text-main hover:bg-gray-100 dark:hover:bg-dark-card-bg focus:outline-none"
                      id="mobile-menu-button"
                      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                      <span className="sr-only">Ouvrir le menu principal</span>
                      <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              </div>
              <div className={`${mobileMenuOpen ? 'block' : 'hidden'} sm:hidden bg-white dark:bg-dark-card-bg`} id="mobile-menu">
                <div className="pt-2 pb-3 space-y-1">
                  <Link href="/" legacyBehavior><a onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClasses('/')}>Tableau de bord</a></Link>
                  <Link href="/refactor" legacyBehavior><a onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClasses('/refactor')}>Refactoriser</a></Link>
                  <Link href="/history" legacyBehavior><a onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClasses('/history')}>Historique</a></Link>
                </div>
                <div className="pt-4 pb-3 border-t border-gray-200 dark:border-dark-border">
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800 dark:text-dark-text-main">{user?.name || 'Utilisateur'}</div>
                      <div className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">{user?.email || 'email@example.com'}</div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                     <Link href="/profile" legacyBehavior>
                       <a className="block px-4 py-2 text-base font-medium text-gray-500 dark:text-dark-text-secondary hover:text-gray-800 dark:hover:text-dark-text-main hover:bg-gray-100 dark:hover:bg-dark-card-bg" onClick={() => setMobileMenuOpen(false)}>Profil</a>
                     </Link>
                     <Link href="/settings" legacyBehavior>
                       <a className="block px-4 py-2 text-base font-medium text-gray-500 dark:text-dark-text-secondary hover:text-gray-800 dark:hover:text-dark-text-main hover:bg-gray-100 dark:hover:bg-dark-card-bg" onClick={() => setMobileMenuOpen(false)}>Paramètres</a>
                     </Link>
                    <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); handleLogout(); }}
                      className="block px-4 py-2 text-base font-medium text-gray-500 dark:text-dark-text-secondary hover:text-gray-800 dark:hover:text-dark-text-main hover:bg-gray-100 dark:hover:bg-dark-card-bg"
                    >
                      Déconnexion
                    </a>
                  </div>
                </div>
              </div>
            </nav>

            <div className="flex flex-1 pt-16">
              <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:pt-16">
                <div className="flex flex-col flex-grow bg-white dark:bg-dark-card-bg overflow-y-auto border-r border-gray-200 dark:border-dark-border">
                  <div className="flex items-center flex-shrink-0 px-4 pt-5">
                     <img className="h-8 w-8 rounded-full mr-2" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" />
                    <span className="font-medium text-gray-800 dark:text-dark-text-main">{user?.name || 'Utilisateur'}</span>
                  </div>
                  <div className="mt-5 flex-grow flex flex-col">
                    <nav className="flex-1 px-2 pb-4 space-y-1">
                      <Link href="/" legacyBehavior><a className={sidebarLinkClasses('/')}><FontAwesomeIcon icon={faTachometerAlt} className="text-gray-500 dark:text-dark-text-secondary group-hover:text-primary mr-3 flex-shrink-0 h-5 w-5" />Tableau de bord</a></Link>
                      <Link href="/refactor" legacyBehavior><a className={sidebarLinkClasses('/refactor')}><FontAwesomeIcon icon={faCode} className="text-gray-500 dark:text-dark-text-secondary group-hover:text-primary mr-3 flex-shrink-0 h-5 w-5" />Refactoriser</a></Link>
                      <Link href="/history" legacyBehavior><a className={sidebarLinkClasses('/history')}><FontAwesomeIcon icon={faHistory} className="text-gray-500 dark:text-dark-text-secondary group-hover:text-primary mr-3 flex-shrink-0 h-5 w-5" />Historique</a></Link>
                      <Link href="/profile" legacyBehavior><a className={sidebarLinkClasses('/profile')}><FontAwesomeIcon icon={faUserCircle} className="text-gray-500 dark:text-dark-text-secondary group-hover:text-primary mr-3 flex-shrink-0 h-5 w-5" />Profil</a></Link>
                      <Link href="/settings" legacyBehavior><a className={sidebarLinkClasses('/settings')}><FontAwesomeIcon icon={faCog} className="text-gray-500 dark:text-dark-text-secondary group-hover:text-primary mr-3 flex-shrink-0 h-5 w-5" />Paramètres</a></Link>
                    </nav>
                  </div>
                  <div className="mt-auto p-2 border-t border-gray-200 dark:border-dark-border">
                    <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); handleLogout(); }}
                      className="sidebar-link group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-dark-card-bg hover:text-gray-900 dark:hover:text-dark-text-main"
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} className="text-gray-500 dark:text-dark-text-secondary group-hover:text-primary mr-3 flex-shrink-0 h-5 w-5" />
                      Déconnexion
                    </a>
                  </div>
                </div>
              </div>

              <Box component="main" sx={{ flex: 1, bgcolor: 'background.body', p: 3, ml: { md: '16rem' } }}>
                {children}
              </Box>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Layout;
