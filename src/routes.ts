import { Application, Router } from 'express';
import { PingController } from './controllers/Ping.controller';
import { LoginUserController } from './controllers/LoginUser.controller';

const _routes: [string, Router][] = [
    ['/ping', PingController],
    ['/login-user', LoginUserController],
];

export const routes = (app: Application) => {
    _routes.forEach((route) => {
        const [url, controller] = route;
        app.use(url, controller);
    });
};
