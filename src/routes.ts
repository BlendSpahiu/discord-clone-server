import { Application, Router } from 'express';
import { PingController } from './controllers/Ping.controller';
import { LoginController } from './controllers/Login.controller';
import { RegisterUserController } from './controllers/RegisterUser.controller';

const _routes: [string, Router][] = [
    ['/ping', PingController],
    ['/login', LoginController],
    ['/register', RegisterUserController],
];

export const routes = (app: Application) => {
    _routes.forEach((route) => {
        const [url, controller] = route;
        app.use(url, controller);
    });
};
