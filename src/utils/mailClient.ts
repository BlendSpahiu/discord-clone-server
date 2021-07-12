import Mail from 'nodemailer/lib/mailer';
import nodemailer from 'nodemailer';
import { smtpConfig } from '../config/mail';
import { failure } from './responses';

const client = () => {
    const transporter = nodemailer.createTransport(smtpConfig);

    transporter.verify((error, success) => {
        if (error) {
            return failure({
                'Something went wrong sending the email': error,
            });
        } else if (success) {
            console.log('Server is ready to send the emails');
        }
    });

    return {
        send: async (options: Mail.Options) => {
            try {
                const result = transporter.sendMail(options);
                return { result };
            } catch (e) {
                return { error: e };
            }
        },
    };
};

export const mailClient = client();
