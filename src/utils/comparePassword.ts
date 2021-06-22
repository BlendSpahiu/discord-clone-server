import bcrypt from 'bcryptjs';

export const comparePassword = async (pwd: string, hashedPwd: string) => {
    return new Promise((resolve, reject) => {
        try {
            resolve(bcrypt.compareSync(pwd, hashedPwd));
        } catch (e) {
            reject(e);
        }
    });
};
