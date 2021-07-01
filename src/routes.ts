import { Application, Router } from 'express';
import { PingController } from './controllers/Ping.controller';
import { LoginController } from './controllers/Login.controller';
import { RegisterCompanyController } from './controllers/RegisterCompany.controller';

const _routes: [string, Router][] = [
    ['/ping', PingController],
    ['/login', LoginController],
    ['/register-company', RegisterCompanyController],
];

export const routes = (app: Application) => {
    _routes.forEach((route) => {
        const [url, controller] = route;
        app.use(url, controller);
    });
};
