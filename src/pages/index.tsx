import { useEffect } from 'react';
import { useRouter } from 'next/router';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard');
  }, [router]);

  return <div>Redirecting to dashboard...</div>;
};

export default HomePage;
