import crypto from 'crypto';
import { failure, ok } from '../utils/responses';
import { StatusCodeEnums } from '../interfaces/enums/StatusCode.enums';
import UserModel from '../models/User.model';
import ResetPassword from '../models/ResetPassword.model';
import { Event } from '../events/App.event';

export const ForgotPasswordService = {
    forgotPassword: async (email: string) => {
        const users = await UserModel.query().where('email', 'ILIKE', email);
        if (users.length === 0) {
            return failure('Invalid credentials', StatusCodeEnums.INVALID_CREDENTIALS);
        }

        const expire_at = new Date();
        expire_at.setMinutes(expire_at.getMinutes() + 30);
        const token = crypto.randomBytes(64).toString('hex');

        await ResetPassword.query().insert({
            email,
            token,
            expire_at,
        });

        try {
            Event.emit('reset::password', {
                email,
                token,
            });
        } catch (error) {
            return failure({ error: StatusCodeEnums.UNEXPECTED });
        }

        return ok({});
    },
};
