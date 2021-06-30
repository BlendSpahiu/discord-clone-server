import bcrypt from 'bcryptjs';

export const hashPassword = async (pwd: string) => await bcrypt.hash(pwd, 10);
