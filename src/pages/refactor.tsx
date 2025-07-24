import React, { useState } from 'react';
import RefactorForm from '../components/RefactorForm';
import ResultsDisplay from '../components/ResultsDisplay';

type RefactorStatus = 'idle' | 'loading' | 'complete';

const RefactorPage = () => {
  const [status, setStatus] = useState<RefactorStatus>('idle');

  const handleRefactorStart = () => {
    setStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setStatus('complete');
    }, 3000);
  };

  const handleReset = () => {
    setStatus('idle');
  };

  if (status === 'loading' || status === 'complete') {
    return <ResultsDisplay status={status} onReset={handleReset} />;
  }

  return <RefactorForm onRefactorComplete={handleRefactorStart} />;
};

export default RefactorPage;
