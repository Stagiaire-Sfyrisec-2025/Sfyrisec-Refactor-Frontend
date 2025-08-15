import React, { useState } from 'react';
import RefactorForm from '@/components/RefactorForm';
import ResultsDisplay from '@/components/ResultsDisplay';
import { UploadedFile, RefactorOptions } from '@/types/project';
import { uploadAndAnalyseFiles } from '@/services/api';
import { transformAnalysisReport } from '@/utils/transformAnalysis';

type RefactorStatus = 'idle' | 'analyzing' | 'analyzed' | 'refactoring' | 'refactored' | 'error';

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

  const handleAnalysisStart = async () => {
    setStatus('analyzing');
    try {
      const result = await uploadAndAnalyseFiles(selectedFiles, options);
      const transformedResult = transformAnalysisReport(result);
      setAnalysisResult(transformedResult);
      setStatus('analyzed');
    } catch (error) {
      console.error('Failed to analyse code:', error);
      setAnalysisResult(null);
      setStatus('error');
    }
  };

  const handleRefactorStart = async () => {
    setStatus('refactoring');

    // Simulate refactoring process by creating a new, improved analysis result
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create a new simulated result with improved metrics
    const refactoredResult = { ...analysisResult };
    refactoredResult.summary = {
      ...refactoredResult.summary,
      cyclomaticComplexity: Math.floor(analysisResult.summary.cyclomaticComplexity * 0.7),
      deadCode: Math.floor(analysisResult.summary.deadCode * 0.2),
      redundancy: Math.floor(analysisResult.summary.redundancy * 0.3),
      conventionIssues: Math.floor(analysisResult.summary.conventionIssues * 0.5),
    };
    // Here you could also update fileDetails to show 'Refactorisé' status, etc.

    setAnalysisResult(refactoredResult);
    setStatus('refactored');
  };

  const handleReset = () => {
    setStatus('idle');
    setSelectedFiles([]);
    setAnalysisResult(null);
  };

  if (['analyzing', 'analyzed', 'refactoring', 'refactored', 'error'].includes(status)) {
    return (
      <ResultsDisplay
        status={status}
        onReset={handleReset}
        analysisResult={analysisResult}
        onRefactor={handleRefactorStart}
        options={options}
        onOptionChange={handleOptionChange}
      />
    );
  }

  return (
    <RefactorForm
      selectedFiles={selectedFiles}
      onFilesSelected={handleFilesSelected}
      onRemoveFile={handleRemoveFile}
      onSubmit={handleAnalysisStart}
    />
  );
};

export default RefactorPage;
