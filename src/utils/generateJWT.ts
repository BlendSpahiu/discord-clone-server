import jwt, { Algorithm } from 'jsonwebtoken';
import { JWT_ALGORITHM, JWT_SECRET, JWT_EXPIRES_IN } from '../config/jwt';
import UserModel from '../models/User.model';

export const generateJWT = (user: UserModel) => {
    return jwt.sign(
        {
            'user-id': user.id.toString(),
            'user-role': user.role.toString(),
        },
        JWT_SECRET,
        {
            expiresIn: JWT_EXPIRES_IN,
            algorithm: JWT_ALGORITHM as Algorithm,
        }
    );
};
