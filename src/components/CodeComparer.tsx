import React from 'react';
import { diffLines, Change } from 'diff';

interface CodeComparerProps {
  originalCode: string;
  refactoredCode: string;
}

const CodeComparer: React.FC<CodeComparerProps> = ({ originalCode, refactoredCode }) => {
  const diffs = diffLines(originalCode, refactoredCode);

  const processDiffs = (diffs: Change[]) => {
    const originalLines: { content: string; color: string }[] = [];
    const refactoredLines: { content: string; color: string }[] = [];

    let i = 0;
    while (i < diffs.length) {
      const part = diffs[i];
      const nextPart = diffs[i + 1];

      if (part.removed && nextPart && nextPart.added) {
        // Modification
        const removed = part.value.split('\n').filter(Boolean);
        const added = nextPart.value.split('\n').filter(Boolean);
        const maxLen = Math.max(removed.length, added.length);

        for (let j = 0; j < maxLen; j++) {
          if (removed[j]) {
            originalLines.push({ content: removed[j], color: 'bg-blue-100' });
          }
          if (added[j]) {
            refactoredLines.push({ content: added[j], color: 'bg-blue-100' });
          }
        }
        i += 2;
      } else if (part.added) {
        const lines = part.value.split('\n').filter(Boolean);
        lines.forEach(line => {
          refactoredLines.push({ content: line, color: 'bg-green-100' });
        });
        i++;
      } else if (part.removed) {
        const lines = part.value.split('\n').filter(Boolean);
        lines.forEach(line => {
          originalLines.push({ content: line, color: 'bg-red-100' });
        });
        i++;
      } else {
        const lines = part.value.split('\n').filter(Boolean);
        lines.forEach(line => {
          originalLines.push({ content: line, color: 'bg-transparent' });
          refactoredLines.push({ content: line, color: 'bg-transparent' });
        });
        i++;
      }
    }
    return { originalLines, refactoredLines };
  };

  const { originalLines, refactoredLines } = processDiffs(diffs);

  const renderLines = (lines: { content: string; color: string }[]) => {
    return lines.map((line, index) => (
      <div key={index} className={`${line.color} transition-colors duration-300 ease-in-out`}>
        {line.content}
      </div>
    ));
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden mt-8">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-dark">Comparaison du code</h3>
        <p className="mt-1 text-sm text-gray-500">Visualisez les changements apportés à votre code</p>
      </div>
      <div className="p-6">
        <div className="flex mb-4">
          <div className="w-1/2">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Code original</h4>
          </div>
          <div className="w-1/2 pl-2">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Code refactorisé</h4>
          </div>
        </div>
        <div className="flex border border-gray-200 rounded-md overflow-hidden">
          <div className="w-1/2 border-r border-gray-200">
            <div className="p-4 overflow-auto max-h-96">
              <pre className="code-block text-sm text-gray-800 whitespace-pre-wrap break-all">
                <code>{renderLines(originalLines)}</code>
              </pre>
            </div>
          </div>
          <div className="w-1/2">
            <div className="p-4 overflow-auto max-h-96">
              <pre className="code-block text-sm text-gray-800 whitespace-pre-wrap break-all">
                <code>{renderLines(refactoredLines)}</code>
              </pre>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Légende des changements</h4>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-100 border border-green-300 mr-2"></div>
              <span className="text-xs text-gray-600">Nouveau code ajouté</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-100 border border-red-300 mr-2"></div>
              <span className="text-xs text-gray-600">Code supprimé</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-100 border border-blue-300 mr-2"></div>
              <span className="text-xs text-gray-600">Code modifié</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeComparer;
