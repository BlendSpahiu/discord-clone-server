import { StatusCodeEnums } from '../interfaces/enums/StatusCode.enums';
import { UserRoleEnums } from '../interfaces/enums/UserRoles.enums';
import UserModel from '../models/User.model';
import { failure, hashPassword } from '../utils';
import { ok } from '../utils';

export const UserService = {
    getAllUsers: async () => {
        const users = await UserModel.query();

        return ok({ users });
    },

    getUserById: async (id: number) => {
        const user = await UserModel.query().findById(id);

        return ok({ user });
    },

    createUser: async (data: UserModel) => {
        // check if user exists
        const userExists = await UserModel.query().findOne({ email: data.email });
        if (userExists) {
            return failure('User already exists!', StatusCodeEnums.USER_EXISTS);
        }

        // create user
        const { username, email, password } = data;

        const user = await UserModel.query().insert({
            email,
            username: `${username}#${Math.floor(1000 + Math.random() * 9000)}`,
            password,
        });

        return ok({ user });
    },

    updateUser: async (id: number, data: UserModel) => {
        const { username, password, email } = data;
        if (!username && !password && !email) {
            return failure('Data must not be empty!', StatusCodeEnums.INVALID_CREDENTIALS);
        }

        // check if user exists
        const userExists = await UserModel.query().findById(id);

        console.log(data);

        // update if exists
        if (userExists) {
            const updatedUser = await UserModel.query()
                .where({ id })
                .update({
                    username: username || userExists.username,
                    password: (await hashPassword(password)) || userExists.password,
                    email: email || userExists.email,
                    updated_at: new Date(),
                });

            return ok({ updatedUser });
        } else {
            return failure("User doesn't exist!", StatusCodeEnums.NOT_FOUND);
        }
    },
};
