import React, { useState } from 'react';
import RefactorForm from '@/components/RefactorForm';
import ResultsDisplay from '@/components/ResultsDisplay';
import { UploadedFile, RefactorOptions } from '@/types/project';
import { uploadAndAnalyseFiles } from '@/services/api';
import { transformAnalysisResult } from '@/utils/transformAnalysis';

type RefactorStatus = 'idle' | 'loading' | 'complete';

const RefactorPage = () => {
  const [status, setStatus] = useState<RefactorStatus>('idle');
  const [selectedFiles, setSelectedFiles] = useState<UploadedFile[]>([]);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [options, setOptions] = useState<RefactorOptions>({
    level: 'Standard (recommandé)',
    mainLanguage: 'Détection automatique',
    addComments: false,
    optimizeVariableNames: false,
    detectDeadCode: false,
    restructureModules: false,
  });

  const handleFilesSelected = (files: File[]) => {
    const mapped = files.map(file => ({
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      rawFile: file,
    }));
    setSelectedFiles(prev => [...prev, ...mapped]);
  };

  const handleRemoveFile = (fileId: string) => {
    setSelectedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setOptions(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRefactorStart = async () => {
    setStatus('loading');
    try {
      const result = await uploadAndAnalyseFiles(selectedFiles, options);
      const transformedResult = transformAnalysisResult(result);
      setAnalysisResult(transformedResult);
    } catch (error) {
      console.error('Failed to refactor code:', error);
      setAnalysisResult(null); // Ensure we show the error state
    } finally {
      setStatus('complete');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setSelectedFiles([]);
    setAnalysisResult(null);
  };

  if (status === 'loading' || status === 'complete') {
    return <ResultsDisplay status={status} onReset={handleReset} analysisResult={analysisResult} />;
  }

  return (
    <RefactorForm
      selectedFiles={selectedFiles}
      options={options}
      onFilesSelected={handleFilesSelected}
      onRemoveFile={handleRemoveFile}
      onOptionChange={handleOptionChange}
      onSubmit={handleRefactorStart}
    />
  );
};

export default RefactorPage;
