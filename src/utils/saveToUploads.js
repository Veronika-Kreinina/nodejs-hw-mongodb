import { rename } from 'node:fs/promises';
import path from 'node:path';
import { getEnvVar } from './getEnvVar.js';

export const saveFileToUploads = async (file) => {
  await rename(file.path, path.resolve('uploads', file.filename));

  return `${getEnvVar('APP_DOMAIN')}/uploads/${file.filename}`;
};
