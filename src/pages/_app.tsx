import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { AuthProvider } from '../context/AuthContext'; // Import AuthProvider

// Font Awesome configuration
// This ensures that Font Awesome icons work correctly with Next.js SSR and SSG.
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the CSS
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's already imported

import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Layout from '../components/Layout';

const customTheme = extendTheme({
  colorSchemes: {
    light: {

      // palette: {
      //   primary: {
      //     solidBg: '#0B6BCB', // Example light mode primary button
      //   },
      //   background: {
      //     body: '#F0F4F8',
      //     surface: '#FFFFFF',
      //   }
      // }
    },
    dark: {
      palette: {
        primary: {
          '500': '#6366F1', 
          main: '#6366F1',
          solidBg: '#6366F1',
          solidHoverBg: '#5255D4',
          solidActiveBg: '#4144B7',
          plainColor: '#8B5CF6', 
          outlinedColor: '#8B5CF6',
          outlinedBorder: '#6366F1',
          softColor: '#8B5CF6', 
          softBg: '#3E3E5A',    
          softHoverBg: '#4B4B6E',
          softActiveBg: '#585882',
        },
        neutral: {
          outlinedBorder: '#4B4B5E', 
         
        },
        background: {
          body: '#1E1E2F',       
          surface: '#2A2A3C',       
       
        },
        text: {
          primary: '#FFFFFF',       
          secondary: '#C0C0D0',    
          tertiary: '#88889A',      
        },
        divider: '#3A3A4C',       
        focusVisible: '#8B5CF6',      
      },
    },
  },

  defaultColorScheme: 'dark',

});

import React from 'react';
import { useColorScheme } from '@mui/joy/styles';


function ThemeApplicator({ children }: { children: React.ReactNode }) {
  const { mode } = useColorScheme();

  React.useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  return <>{children}</>;
}


import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated && router.pathname !== '/login') {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || (!isAuthenticated && router.pathname !== '/login')) {
    return <div>Loading...</div>; //  proper loading spinner
  }

  return <>{children}</>;
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isLoginPage = router.pathname === '/login';

  return (
    <AuthProvider>
      <CssVarsProvider theme={customTheme} disableTransitionOnChange>
        <ThemeApplicator>
          <CssBaseline />
          <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </Head>
          {isLoginPage ? (
            <Component {...pageProps} />
          ) : (
            <AuthGuard>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </AuthGuard>
          )}
        </ThemeApplicator>
      </CssVarsProvider>
    </AuthProvider>
  );
}

export default MyApp;
