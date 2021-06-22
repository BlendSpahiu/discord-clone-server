import crypto from 'crypto';

export const generateRandomPassword = (length: number): string => crypto.randomBytes(length).toString('hex');
