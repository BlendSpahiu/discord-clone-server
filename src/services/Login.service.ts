import { UserRoleEnums } from '../interfaces/enums/UserRoles.enums';
import { StatusCodeEnums } from '../interfaces/enums/StatusCode.enums';
import UserModel from '../models/User.model';
import { ok, failure, generateJWT, comparePassword } from '../utils/index';

export const LoginService = {
    login: async (email: string, password: string) => {
        // Check if user with this email exists
        const user = await UserModel.query().findOne({ email });

        if (!user) {
            return failure('User not found!', StatusCodeEnums.INVALID_CREDENTIALS, 404);
        }

        // Check if password matches
        const match = await comparePassword(password, user.password);

        if (!match) return failure('Invalid Credentials!', StatusCodeEnums.INVALID_CREDENTIALS, 401);

        // return the generated token
        return ok({ token: generateJWT(user) });
    },
};
