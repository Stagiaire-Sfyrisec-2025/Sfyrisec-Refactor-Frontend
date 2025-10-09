import React, { useState, useContext, useCallback } from 'react';
import RefactorForm from '@/components/RefactorForm';
import ResultsDisplay from '@/components/ResultsDisplay';
import { UploadedFile, RefactorOptions, ProjectFile } from '@/types/project';
import { uploadFiles, analyzeCode, refactorCode } from '@/services/api';
import { transformAnalysisReport } from '@/utils/transformAnalysis';
import { RefactoringHistoryContext } from '@/context/RefactoringHistoryContext';

type RefactorStatus = 'idle' | 'analyzing' | 'analyzed' | 'refactoring' | 'refactored' | 'error';

const RefactorPage = () => {
  const [status, setStatus] = useState<RefactorStatus>('idle');
  const [selectedFiles, setSelectedFiles] = useState<UploadedFile[]>([]);
  const [projectName, setProjectName] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [initialAnalysis, setInitialAnalysis] = useState<any>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [filesData, setFilesData] = useState<Record<string, ProjectFile>>({});
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
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

  const handleAnalysisStart = useCallback(async () => {
    setStatus('analyzing');
    try {
      const uploadResult = await uploadFiles(selectedFiles, options);
      if (!uploadResult.session_id) {
        throw new Error("ID de session non trouvé");
      }
      const newSessionId = uploadResult.session_id;
      setSessionId(newSessionId);

      const analysisData = await analyzeCode(newSessionId);

      const analysisContent = analysisData.type === 'project' ? analysisData.results : analysisData.analysis;
      const transformed = transformAnalysisReport(analysisContent || analysisData);
      setAnalysisResult(transformed);
      setInitialAnalysis(transformed);
      setStatus('analyzed');
    } catch (error) {
      console.error("Analysis failed:", error);
      setStatus('error');
    }
  }, [selectedFiles, options]);

  const handleRefactorStart = useCallback(async () => {
    if (!sessionId) return;

    setStatus('refactoring');
    try {
      const result = await refactorCode(sessionId);

      if (result.type === 'project') {
        const transformed = transformAnalysisReport(result.final_analysis);
        setAnalysisResult(transformed);
        setFilesData(result.files);
        setSelectedFile(Object.keys(result.files)[0] || null);

        addHistoryEntry({
          initialAnalysis,
          refactoredAnalysis: transformed,
          options,
          projectName: projectName || 'Projet sans nom',
          files: result.files,
        });
      } else {
        const transformed = transformAnalysisReport(result.analysis);
        setAnalysisResult(transformed);
        const fileName = Object.keys(result.analysis)[0] || 'file.py';
        const newFilesData = {
          [fileName]: {
            originalCode: result.originalCode,
            refactoredCode: result.refactoredCode,
          }
        };
        setFilesData(newFilesData);
        setSelectedFile(fileName);

        addHistoryEntry({
          initialAnalysis,
          refactoredAnalysis: transformed,
          options,
          projectName: projectName || 'Fichier unique',
          files: newFilesData,
        });
      }

      setStatus('refactored');
    } catch (error) {
      console.error('Refactor failed:', error);
      setStatus('error');
    }
  }, [sessionId, addHistoryEntry, initialAnalysis, options, projectName]);

  const handleReset = () => {
    setStatus('idle');
    setSelectedFiles([]);
    setProjectName('');
    setAnalysisResult(null);
    setInitialAnalysis(null);
    setFilesData({});
    setSelectedFile(null);
  };

  if (['analyzing', 'analyzed', 'refactoring', 'refactored', 'error'].includes(status)) {
    const currentFile = selectedFile ? filesData[selectedFile] : null;
    return (
      <ResultsDisplay
        status={status}
        onReset={handleReset}
        analysisResult={analysisResult}
        onRefactor={handleRefactorStart}
        options={options}
        onOptionChange={handleOptionChange}
        originalCode={currentFile?.originalCode}
        refactoredCode={currentFile?.refactoredCode}
        files={Object.keys(filesData)}
        selectedFile={selectedFile}
        onSelectFile={setSelectedFile}
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
