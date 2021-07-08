import { StatusCodeEnums } from '../interfaces/enums/StatusCode.enums';
import UserModel from '../models/User.model';
import { RegisterModel } from '../interfaces/models/Register.model';
import { ok, failure, generateJWT, hashPassword } from '../utils/index';
import { RoleUsersEnums } from '../interfaces/enums/RoleUsers.enums';

export const RegisterService = {
    register: async (data: RegisterModel) => {
        const { first_name, last_name, email, password } = data;

        // Check if user with this email exists
        const users = await UserModel.query().where('email', 'ILIKE', email);

        if (users.length !== 0) return failure('This user already exists!', StatusCodeEnums.USER_EXISTS);

        // hash password
        const hashedPassword = await hashPassword(password);

        const insertUser = await UserModel.query().insert({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            role: RoleUsersEnums.USER,
        });

        return ok({ token: generateJWT(insertUser) });
    },
};
