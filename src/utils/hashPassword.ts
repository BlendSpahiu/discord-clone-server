import bcrypt from 'bcryptjs';

export const HashPassword = async (pwd: string) => await bcrypt.hash(pwd, 10);
