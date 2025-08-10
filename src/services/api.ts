import { UploadedFile, RefactorOptions } from '../types/project';

export const uploadAndAnalyseFiles = async (files: UploadedFile[], options: RefactorOptions): Promise<any> => {
  const formData = new FormData();

  files.forEach(file => {
    formData.append('file', file.rawFile, file.name);
  });

  const optionsBlob = new Blob([JSON.stringify(options)], { type: 'application/json' });
  formData.append('options', optionsBlob);

  const response = await fetch('http://localhost:8000/api/v1/upload/', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    // Try to get error details from the body
    const errorBody = await response.text();
    throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorBody}`);
  }

  return response.json();
};
