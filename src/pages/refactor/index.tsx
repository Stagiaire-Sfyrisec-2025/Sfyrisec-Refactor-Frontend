import React, { useState, useContext } from 'react';
import RefactorForm from '@/components/RefactorForm';
import ResultsDisplay from '@/components/ResultsDisplay';
import { UploadedFile, RefactorOptions } from '@/types/project';
import { uploadAndAnalyseFiles } from '@/services/api';
import { transformAnalysisReport } from '@/utils/transformAnalysis';
import { RefactoringHistoryContext } from '@/context/RefactoringHistoryContext';

type RefactorStatus = 'idle' | 'analyzing' | 'analyzed' | 'refactoring' | 'refactored' | 'error';

const RefactorPage = () => {
  const [status, setStatus] = useState<RefactorStatus>('idle');
  const [selectedFiles, setSelectedFiles] = useState<UploadedFile[]>([]);
  const [projectName, setProjectName] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [initialAnalysis, setInitialAnalysis] = useState<any>(null); // To store the 'before' state
  const { addHistoryEntry } = useContext(RefactoringHistoryContext);
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
      setInitialAnalysis(transformedResult); // Save the initial state
      setStatus('analyzed');
    } catch (error) {
      console.error('Failed to analyse code:', error);
      setAnalysisResult(null);
      setStatus('error');
    }
  };

  const handleRefactorStart = async () => {
    setStatus('refactoring');

    await new Promise(resolve => setTimeout(resolve, 2000));

    const refactoredResult = { ...analysisResult };
    refactoredResult.summary = {
      ...refactoredResult.summary,
      cyclomaticComplexity: Math.floor(analysisResult.summary.cyclomaticComplexity * 0.7),
      deadCode: Math.floor(analysisResult.summary.deadCode * 0.2),
      redundancy: Math.floor(analysisResult.summary.redundancy * 0.3),
      conventionIssues: Math.floor(analysisResult.summary.conventionIssues * 0.5),
    };

    addHistoryEntry({
      initialAnalysis,
      refactoredAnalysis: refactoredResult,
      options,
      projectName: projectName || 'Projet sans nom',
    });

    setAnalysisResult(refactoredResult);
    setStatus('refactored');
  };

  const handleReset = () => {
    setStatus('idle');
    setSelectedFiles([]);
    setProjectName('');
    setAnalysisResult(null);
    setInitialAnalysis(null);
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
      projectName={projectName}
      onProjectNameChange={(e) => setProjectName(e.target.value)}
    />
  );
};

export default RefactorPage;
