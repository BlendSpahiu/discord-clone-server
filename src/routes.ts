import { Application, Router } from 'express';
import { PingController } from './controllers/Ping.controller';
import { LoginController } from './controllers/Login.controller';
import { RegisterController } from './controllers/Register.controller';
import { UploadController } from './controllers/Upload.controller';
import { ResetPasswordController } from './controllers/ResetPassword.controller';
import { ForgotPasswordController } from './controllers/ForgotPassword.controller';
import { RegisterCompanyController } from './controllers/RegisterCompany.controller';

const _routes: [string, Router][] = [
    ['/ping', PingController],
    ['/login', LoginController],
    ['/register', RegisterController],
    ['/upload', UploadController],
    ['/reset-password', ResetPasswordController],
    ['/forgot-password', ForgotPasswordController],
    ['/register-company', RegisterCompanyController],
];

export const routes = (app: Application): void => {
    _routes.forEach((route) => {
        const [url, controller] = route;
        app.use(url, controller);
    });
};
