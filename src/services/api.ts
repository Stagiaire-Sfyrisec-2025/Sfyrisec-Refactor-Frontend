import { UploadedFile, RefactorOptions } from '../types/project';

const API_BASE_URL = 'http://localhost:8000/api/v1';

class ApiClient {
  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorBody}`);
    }

    return response.json();
  }

  public upload(files: UploadedFile[], options: RefactorOptions): Promise<any> {
    const formData = new FormData();

    files.forEach(file => {
      formData.append('file', file.rawFile, file.name);
    });

    const optionsBlob = new Blob([JSON.stringify(options)], { type: 'application/json' });
    formData.append('options', optionsBlob);

    return this.request('/upload/', {
      method: 'POST',
      body: formData,
    });
  }

  public analyze(sessionId: string): Promise<any> {
    return this.request(`/analyze/${sessionId}`);
  }

  public refactor(sessionId: string): Promise<any> {
    return this.request(`/refactor/${sessionId}`);
  }

  public getHistory(): Promise<any> {
    return this.request('/history/');
  }
}

const apiClient = new ApiClient();

export const uploadFiles = apiClient.upload.bind(apiClient);
export const analyzeCode = apiClient.analyze.bind(apiClient);
export const refactorCode = apiClient.refactor.bind(apiClient);
export const getHistory = apiClient.getHistory.bind(apiClient);
