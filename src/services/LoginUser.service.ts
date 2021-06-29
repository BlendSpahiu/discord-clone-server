// enums
import { StatusCodeEnums } from '../interfaces/enums/StatusCode.enums';

// models
import UserModel from '../models/User.model';

// utils
import { ok, failure, generateJWT, comparePassword } from '../utils/index';

export const LoginUserService = {
    login: async (email: string, password: string) => {
        // Check if user with this email exists
        const users = await UserModel.query().where('email', 'ILIKE', email);

        if (users.length === 0) return failure('Invalid Credentials!', StatusCodeEnums.INVALID_CREDENTIALS);

        // Check if password matches
        const match = await comparePassword(password, users[0].password);

        if (!match) return failure('Incorrect Password', StatusCodeEnums.INCORRECT_PASSWORD);

        // Generate the token
        return ok({ accessToken: generateJWT(users[0]) });
    },
};
