import React, { createContext, useState, ReactNode } from 'react';

// Define the shape of a single history entry
export interface HistoryEntry {
  id: string;
  timestamp: Date;
  initialAnalysis: any; // The result from the first analysis
  refactoredAnalysis: any; // The result after refactoring
  options: any; // The options used for refactoring
  projectName: string; // A name for the project/session
}

// Define the shape of the context
interface RefactoringHistoryContextType {
  history: HistoryEntry[];
  addHistoryEntry: (entry: Omit<HistoryEntry, 'id' | 'timestamp'>) => void;
}

// Create the context with a default value
export const RefactoringHistoryContext = createContext<RefactoringHistoryContextType>({
  history: [],
  addHistoryEntry: () => {},
});

// Create the provider component
interface RefactoringHistoryProviderProps {
  children: ReactNode;
}

export const RefactoringHistoryProvider: React.FC<RefactoringHistoryProviderProps> = ({ children }) => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const addHistoryEntry = (entry: Omit<HistoryEntry, 'id' | 'timestamp'>) => {
    const newEntry: HistoryEntry = {
      ...entry,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    };
    setHistory(prevHistory => [...prevHistory, newEntry]);
  };

  return (
    <RefactoringHistoryContext.Provider value={{ history, addHistoryEntry }}>
      {children}
    </RefactoringHistoryContext.Provider>
  );
};
