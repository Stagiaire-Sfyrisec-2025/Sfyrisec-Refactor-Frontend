import React from 'react';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const { login } = useAuth();
  const router = useRouter();

  const handleLoginSuccess = (data: { email: string }) => {
    login(data);
    router.push('/');
  };

  return <LoginForm onLoginSuccess={handleLoginSuccess} />;
};

export default LoginPage;
