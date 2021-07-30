import jwt, { Algorithm } from 'jsonwebtoken';
import { JWT_ALGORITHM, JWT_SECRET, JWT_EXPIRES_IN } from '../config/jwt';

interface generateJWTProps {
    id: string;
    role?: string;
}

export const generateJWT = ({ id, role }: generateJWTProps) => {
    const payload = {
        'https://hasura.io/jwt/claims': {
            'x-hasura-allowed-roles': role ? [role, 'user'] : ['user'],
            'x-hasura-default-role': role ? role : 'user',
            'x-hasura-user-id': id,
        },
    };

    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
        algorithm: JWT_ALGORITHM as Algorithm,
    });
};
