import { RoleUsersEnums } from '../interfaces/enums/RoleUsers.enums';
import { StatusCodeEnums } from '../interfaces/enums/StatusCode.enums';
import UserModel from '../models/User.model';
import { ok, failure, generateJWT, comparePassword } from '../utils/index';

export const LoginService = {
    login: async (email: string, password: string) => {
        // Check if user with this email exists
        const users = await UserModel.query().where('email', 'ILIKE', email);

        if (users.length === 0) return failure('Invalid Credentials!', StatusCodeEnums.INVALID_CREDENTIALS);

        // Check if password matches
        const match = await comparePassword(password, users[0].password);

        if (!match) return failure('Invalid Credentials!', StatusCodeEnums.INVALID_CREDENTIALS);

        if (users[0].role === RoleUsersEnums.COMPANY || users[0].role === RoleUsersEnums.ADMIN) {
            return ok({ token: generateJWT({ id: users[0].id.toString(), role: users[0].role }) });
        }

        // return the generated token
        return ok({ token: generateJWT({ id: users[0].id.toString() }) });
    },
};
