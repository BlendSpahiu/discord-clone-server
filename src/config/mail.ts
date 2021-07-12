export const MAIL_DRIVER = process.env.MAIL_DRIVER;
export const MAIL_HOST = process.env.MAIL_HOST || 'smtp.mailhog.ornio.xyz';
export const MAIL_PORT = process.env.MAIL_PORT || 1025;
export const MAIL_USERNAME = process.env.MAIL_USERNAME;
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
export const MAIL_ENCRYPTION = process.env.MAIL_ENCRYPTION;
export const MAIL_FROM_NAME = process.env.MAIL_FROM_NAME || 'RealEstate';
export const MAIL_FROM_ADDRESS = process.env.MAIL_FROM_ADDRESS || 'noreply-realestate@ornio.no';

export const smtpConfig = {
    host: MAIL_HOST,
    port: +MAIL_PORT,
    ...(MAIL_USERNAME && {
        auth: {
            user: MAIL_USERNAME,
            pass: MAIL_PASSWORD,
        },
    }),
};
