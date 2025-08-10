import { RefactorFileDetail } from '../types/project';

export const transformAnalysisResult = (apiResult: any): any => {
  if (!apiResult || apiResult.status !== 'success' || !apiResult['analyse result']) {
    return null;
  }

  const analysis = apiResult['analyse result'];

  const fileDetails: RefactorFileDetail[] = [
    {
      fileName: apiResult.filename,
      language: apiResult.language,
      type: 'Refactorisé', // Defaulting to this as we don't have more info
      changesSummary: `Complexity: ${analysis.complexity?.length || 0}, Redundancy: ${analysis.redundancy?.length || 0}`,
      details: `Convention issues: ${Object.keys(analysis.convention || {}).length}`,
      status: 'Succès', // Assuming success if we get this far
    },
  ];


  const summary = {
    cyclomaticComplexityChange: analysis.complexity ? analysis.complexity.length : 0,
    deadCodeRemovedLines: analysis.redundancy ? analysis.redundancy.length : 0,
    commentsAdded: 0, 
  };

  // The API response does not contain the original or refactored code.
  const originalCode = '';
  const refactoredCode = '';

  return {
    summary,
    fileDetails,
    originalCode,
    refactoredCode,
  };
};
