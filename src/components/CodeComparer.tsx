import React from 'react';
import { diffLines, Change } from 'diff';
interface CodeComparerProps {
  originalCode: string;
  refactoredCode: string;
}

const DiffViewer: React.FC<CodeComparerProps> = ({ originalCode, refactoredCode }) => {
  const differences = diffLines(originalCode, refactoredCode);

  const renderDiff = (diff: Change[]) => {
    return diff.map((part, index) => {
      const style = {
        backgroundColor: part.added ? 'rgba(46, 160, 67, 0.2)' : part.removed ? 'rgba(248, 81, 73, 0.2)' : 'transparent',
        display: 'block',
        whiteSpace: 'pre-wrap' as 'pre-wrap',
        paddingLeft: '1em',
        textIndent: '-1em',
      };

      const prefix = part.added ? '+ ' : part.removed ? '- ' : '  ';
      const value = part.value.endsWith('\n') ? part.value : `${part.value}\n`;

      return (
        <span key={index} style={style}>
          <span style={{ marginRight: '1em' }}>{prefix}</span>
          <code>{value}</code>
        </span>
      );
    });
  };

  return (
    <pre className="code-block text-sm text-gray-800 whitespace-pre-wrap break-all">
      {renderDiff(differences)}
    </pre>
  );
};

const CodeComparer: React.FC<CodeComparerProps> = ({ originalCode, refactoredCode }) => {
  // Fallback si aucun code n'est fourni
  if (!originalCode && !refactoredCode) {
    return (
      <div className="bg-white shadow rounded-lg overflow-hidden mt-8 p-6">
        <h3 className="text-lg leading-6 font-medium text-dark">Comparaison du code</h3>
        <p className="mt-1 text-sm text-gray-500">Aucun code à comparer.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-dark-card-bg shadow-lg dark:shadow-none rounded-lg overflow-hidden mt-8">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-dark-border">
        <h3 className="text-lg leading-6 font-medium text-dark dark:text-dark-text-main">Comparaison du code</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-dark-text-secondary">Visualisez les changements apportés à votre code</p>
      </div>
      <div className="p-6">
        <div className="border border-gray-200 dark:border-dark-border rounded-md overflow-hidden">
          <div className="p-4 overflow-auto max-h-[600px] bg-[#f7f7f7] dark:bg-[#0d1117]">
            <DiffViewer originalCode={originalCode || ''} refactoredCode={refactoredCode || ''} />
          </div>
        </div>
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-dark-text-main mb-2">Légende des changements</h4>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center">
              <div className="w-4 h-4" style={{ backgroundColor: 'rgba(46, 160, 67, 0.2)' }}></div>
              <span className="ml-2 text-xs text-gray-600 dark:text-dark-text-secondary">Nouveau code ajouté</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4" style={{ backgroundColor: 'rgba(248, 81, 73, 0.2)' }}></div>
              <span className="ml-2 text-xs text-gray-600 dark:text-dark-text-secondary">Code supprimé</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeComparer;
