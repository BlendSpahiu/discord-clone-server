import jwt, { Algorithm } from 'jsonwebtoken';
import { JWT_ALGORITHM, JWT_SECRET, JWT_EXPIRES_IN } from '../config/jwt';
import UserModel from '../models/User.model';

export const generateJWT = (user: UserModel) => {
    const payload = {
        'https://hasura.io/jwt/claims': {
            'x-hasura-allowed-roles': ['user', user.role.toString()],
            'x-hasura-default-role': 'user',
            'x-hasura-user-id': user.id.toString(),
            'x-hasura-role': user.role.toString(),
        },
    };

    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
        algorithm: JWT_ALGORITHM as Algorithm,
    });
};
