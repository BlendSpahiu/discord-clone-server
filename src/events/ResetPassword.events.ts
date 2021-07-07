import { Event } from './App.event';
import { failure, loadView, mailClient } from '../utils';
import { MAIL_FROM_ADDRESS } from '../config/mail';
import { APP_URL_RESET_PASSWORD, APP_URL } from '../config/app';

Event.on('reset::password', async ({ email, token }) => {
    const html = await loadView('resetPassword.html', {
        token,
        APP_URL_RESET_PASSWORD,
        APP_URL,
    });

    const mailOptions = {
        from: MAIL_FROM_ADDRESS,
        to: email,
        subject: 'Password reset link',
        html,
    };

    const { error } = await mailClient.send(mailOptions);

    if (error) {
        return failure({ 'Something went wrong sending the email': error });
    }
});
