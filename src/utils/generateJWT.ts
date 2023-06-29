import jwt, { Algorithm } from 'jsonwebtoken';
import { JWT_ALGORITHM, JWT_SECRET, JWT_EXPIRES_IN } from '../config/jwt';
import UserModel from '../models/User.model';
import { UserRoleEnums } from '../interfaces/enums/UserRoles.enums';

export const generateJWT = (user: UserModel) => {
    return jwt.sign(
        {
            'https://hasura.io/jwt/claims': {
                'x-hasura-allowed-roles': [UserRoleEnums.USER, UserRoleEnums.ADMIN, UserRoleEnums.OWNER],
                'x-hasura-default-role': UserRoleEnums.USER,
                'x-hasura-user-id': user.id.toString(),
                'x-hasura-role': UserRoleEnums.USER,
            },
        },
        JWT_SECRET,
        {
            expiresIn: JWT_EXPIRES_IN,
            algorithm: JWT_ALGORITHM as Algorithm,
        }
    );
};
