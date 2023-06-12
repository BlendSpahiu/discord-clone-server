import jwt, { Algorithm } from 'jsonwebtoken';
import { JWT_ALGORITHM, JWT_SECRET, JWT_EXPIRES_IN } from '../config/jwt';
import UserModel from '../models/User.model';

export const generateJWT = (user: UserModel) => {
    return jwt.sign(
        {
            user_id: user.id.toString(),
        },
        JWT_SECRET,
        {
            expiresIn: JWT_EXPIRES_IN,
            algorithm: JWT_ALGORITHM as Algorithm,
        }
    );
};
