import React, { useState, useContext } from 'react';
import RefactorForm from '@/components/RefactorForm';
import ResultsDisplay from '@/components/ResultsDisplay';
import { UploadedFile, RefactorOptions } from '@/types/project';
import { uploadFiles, analyzeCode, refactorCode } from '@/services/api';
import { transformAnalysisReport } from '@/utils/transformAnalysis';
import { RefactoringHistoryContext } from '@/context/RefactoringHistoryContext';

type RefactorStatus = 'idle' | 'analyzing' | 'analyzed' | 'refactoring' | 'refactored' | 'error';

const RefactorPage = () => {
  const [status, setStatus] = useState<RefactorStatus>('idle');
  const [selectedFiles, setSelectedFiles] = useState<UploadedFile[]>([]);
  const [projectName, setProjectName] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [initialAnalysis, setInitialAnalysis] = useState<any>(null); // To store the 'before' state
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [originalCode, setOriginalCode] = useState<string>('');
  const [refactoredCode, setRefactoredCode] = useState<string>('');
  const { addHistoryEntry } = useContext(RefactoringHistoryContext);
  const [options, setOptions] = useState<RefactorOptions>({
    level: 'Standard',
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
      type: file.type,
      rawFile: file,
    }));
    setSelectedFiles(prev => [...prev, ...mapped]);
  };

  const handleRemoveFile = (fileId: string) => {
    setSelectedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setOptions(prev => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setOptions(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAnalysisStart = async () => {
    setStatus('analyzing');
    try {
      // Étape 1: Charger les fichiers pour obtenir un ID de session
      const uploadResult = await uploadFiles(selectedFiles, options);
      if (!uploadResult.session_id) {
        throw new Error("ID de session non trouvé dans la réponse d'upload");
      }
      const newSessionId = uploadResult.session_id;
      setSessionId(newSessionId);

      // Étape 2: Appeler l'endpoint d'analyse avec l'ID de session
      const analysisResultData = await analyzeCode(newSessionId);

      // Utiliser `analysisResultData.analysis` si la réponse est structurée ainsi
      const transformedResult = transformAnalysisReport(analysisResultData.analysis || analysisResultData);
      setAnalysisResult(transformedResult);
      setInitialAnalysis(transformedResult);
      setStatus('analyzed');
    } catch (error) {
      console.error("Échec de l'analyse du code:", error);
      setAnalysisResult(null);
      setStatus('error');
    }
  };

  const handleRefactorStart = async () => {
    if (!sessionId) {
      console.error('No session ID found for refactoring');
      setStatus('error');
      return;
    }

    setStatus('refactoring');

    try {
      const refactorResult = await refactorCode(sessionId);

      // This is the critical change:
      // The analysis report is now in a nested object.
      const transformedResult = transformAnalysisReport(refactorResult.analysis);

      // Set all state variables from the new API response structure
      setAnalysisResult(transformedResult);
      setOriginalCode(refactorResult.originalCode);
      setRefactoredCode(refactorResult.refactoredCode);

      const finalOptions = { ...options };
      if (options.mainLanguage === 'Détection automatique') {
        finalOptions.mainLanguage = analysisResult.detectedLanguage || 'Unknown';
      }

      addHistoryEntry({
        initialAnalysis,
        refactoredAnalysis: transformedResult,
        options: finalOptions,
        projectName: projectName || 'Projet sans nom',
        originalCode: refactorResult.originalCode,
        refactoredCode: refactorResult.refactoredCode,
      });

      setStatus('refactored');
    } catch (error) {
      console.error('Failed to refactor code:', error);
      setStatus('error');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setSelectedFiles([]);
    setProjectName('');
    setAnalysisResult(null);
    setInitialAnalysis(null);
    setOriginalCode('');
    setRefactoredCode('');
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
        originalCode={originalCode}
        refactoredCode={refactoredCode}
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
