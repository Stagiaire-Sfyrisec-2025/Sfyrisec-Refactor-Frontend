// Placeholder for format.ts

/**
 * Formats file size in bytes to a human-readable string (KB, MB, GB).
 * @param bytes - The file size in bytes.
 * @returns A human-readable file size string.
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']; // Added TB for larger files
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Add other utility functions as needed.
