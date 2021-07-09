import UserModel from '../models/User.model';
import ResetPasswordModel from '../models/ResetPassword.model';
import { StatusCodeEnums } from '../interfaces/enums/StatusCode.enums';
import { ok, failure, comparePassword, hashPassword } from '../utils';

export const ResetPasswordService = {
    resetPassword: async (token: string, password: string) => {
        // Check if user exists
        const resetToken = await ResetPasswordModel.query().where('token', token);
        const user = await UserModel.query().where('email', 'ILIKE', resetToken[0].email);

        const now = new Date();
        const expire_at = new Date(resetToken[0].expire_at);

        const timeDifference = Math.floor((expire_at.getTime() - now.getTime()) / 60000);

        // Return failure if token is invalid - doesn't exists or it is expired
        if (resetToken.length === 0 || timeDifference < 0 || timeDifference >= 30) {
            return failure('Token has expired', StatusCodeEnums.INVALID_TOKEN);
        }

        const match = await comparePassword(password, user[0].password);

        // If is the new password match the old password
        if (match) {
            return failure('Password is the same as the old password', StatusCodeEnums.INVALID_CREDENTIALS);
        }

        const hashedPwd = await hashPassword(password);
        await UserModel.query().findById(user[0].id).patch({ password: hashedPwd });

        return ok({});
    },
};
