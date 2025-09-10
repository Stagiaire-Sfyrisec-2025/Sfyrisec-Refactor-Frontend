import { RefactorFileDetail } from '../types/project';

const getLanguageFromPath = (filePath: string): string => {
  const extension = filePath.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'py':
      return 'Python';
    case 'js':
      return 'JavaScript';
    case 'java':
      return 'Java';
    case 'php':
      return 'PHP';
    case 'ts':
      return 'TypeScript';
    default:
      return 'Unknown';
  }
};

// This function processes the raw analysis report from the backend.
export const transformAnalysisReport = (report: any): any => {
  if (!report) {
    return null;
  }

  let totalComplexity = 0;
  let totalDeadCode = 0;
  let totalRedundancy = 0;
  let totalConventionIssues = 0;
  const fileDetails: RefactorFileDetail[] = [];
  const languageCounts: { [key: string]: number } = {};

  for (const filePath in report) {
    const result = report[filePath];
    if (!result) continue;

    const lang = getLanguageFromPath(filePath);
    languageCounts[lang] = (languageCounts[lang] || 0) + 1;

    const complexity = result.complexity?.reduce((acc: number, curr: any) => acc + curr.complexity, 0) || 0;
    const deadCode = result.dead_code?.dead_code?.length || 0;
    const redundancy = result.redundancy?.length || 0;
    const convention = result.convention?.messages?.length || 0;

    totalComplexity += complexity;
    totalDeadCode += deadCode;
    totalRedundancy += redundancy;
    totalConventionIssues += convention;

    fileDetails.push({
      fileName: filePath.split('/').pop() || filePath,
      language: lang,
      type: 'Non modifié',
      changesSummary: `Complexité: ${complexity}, Redondance: ${redundancy}`,
      details: `Problèmes de convention: ${convention}, Code mort: ${deadCode}`,
      status: 'Succès', // Assuming success if analysis ran
    });
  }

  let detectedLanguage = 'Unknown';
  if (Object.keys(languageCounts).length > 0) {
    // Filter out 'Unknown' if other languages are present
    const knownLanguages = Object.keys(languageCounts).filter(l => l !== 'Unknown');
    if (knownLanguages.length > 0) {
      detectedLanguage = knownLanguages.reduce((a, b) => languageCounts[a] > languageCounts[b] ? a : b);
    } else {
      detectedLanguage = 'Unknown';
    }
  }

  const summary = {
    cyclomaticComplexity: totalComplexity,
    deadCode: totalDeadCode,
    redundancy: totalRedundancy,
    conventionIssues: totalConventionIssues,
  };

  // The API response does not contain the original or refactored code.
  // These will be handled separately if needed.
  const originalCode = '';
  const refactoredCode = '';

  return {
    summary,
    fileDetails,
    originalCode,
    refactoredCode,
    detectedLanguage,
  };
};
