import { rename } from 'node:fs/promises';
import path from 'node:path';
import { getEnvVar } from './getEnvVar.js';

export const saveFileToUploads = async ({ path: tempPath, filename }) => {
  const targetPath = path.resolve('uploads', filename);
  await rename(tempPath, targetPath);

  return `${getEnvVar('APP_DOMAIN')}/uploads/${filename}`;
};
