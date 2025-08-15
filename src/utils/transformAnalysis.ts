import { RefactorFileDetail } from '../types/project';

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

  for (const filePath in report) {
    const result = report[filePath];
    if (!result) continue;

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
      language: 'Python', // Assuming python from the script context
      type: 'Analysé',
      changesSummary: `Complexité: ${complexity}, Redondance: ${redundancy}`,
      details: `Problèmes de convention: ${convention}, Code mort: ${deadCode}`,
      status: 'Succès', // Assuming success if analysis ran
    });
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
  };
};
