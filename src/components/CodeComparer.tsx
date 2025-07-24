import React from 'react';

interface CodeComparerProps {
  originalCode?: string;
  refactoredCode?: string;
}

const CodeComparer: React.FC<CodeComparerProps> = ({
  originalCode = `function processData(data) {
    let r = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].active) {
            let t = {
                n: data[i].name,
                v: data[i].value * 1.2
            };
            r.push(t);
        }
    }
    return r;
}

function calc(a, b) {
    return a + b;
}`,
  refactoredCode = `/**
 * Process active items and apply 20% markup
 * @param {Array} items - Array of items to process
 * @returns {Array} Processed items with name and marked up value
 */
function processActiveItemsWithMarkup(items) {
    return items
        .filter(item => item.active)
        .map(activeItem => ({
            name: activeItem.name,
            value: activeItem.value * 1.2
        }));
}

// Unused function removed during refactoring
// function calc(a, b) {
//     return a + b;
// }`
}) => {
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
                <code>{originalCode}</code>
              </pre>
            </div>
          </div>
          <div className="w-1/2">
            <div className="p-4 overflow-auto max-h-96">
              <pre className="code-block text-sm text-gray-800 whitespace-pre-wrap break-all">
                <code>{refactoredCode}</code>
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
