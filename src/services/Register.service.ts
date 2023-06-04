import { StatusCodeEnums } from '../interfaces/enums/StatusCode.enums';
import UserModel from '../models/User.model';
import { RegisterModel } from '../interfaces/models/Register.model';
import { ok, failure, generateJWT, hashPassword } from '../utils/index';
import { UserRoleEnums } from '../interfaces/enums/UserRoles.enums';

export const RegisterService = {
    register: async (data: RegisterModel) => {
        const { username, email, password } = data;

        // Check if user with this email exists
        const userExists = await UserModel.query().findOne({ email });

        if (userExists) {
            return failure('This user already exists!', StatusCodeEnums.USER_EXISTS);
        }

        // hash password
        const hashedPassword = await hashPassword(password);

        const insertUser = await UserModel.query().insert({
            username,
            tag: Math.floor(1000 + Math.random() * 9000),
            email,
            password: hashedPassword,
            role: UserRoleEnums.USER,
        });

        return ok({ token: generateJWT(insertUser) });
    },
};
