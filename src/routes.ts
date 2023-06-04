import { Application, Router } from 'express';
import { PingController } from './controllers/Ping.controller';
import { LoginController } from './controllers/Login.controller';
import { RegisterController } from './controllers/Register.controller';
import { UploadController } from './controllers/Upload.controller';
import { ResetPasswordController } from './controllers/ResetPassword.controller';
import { ForgotPasswordController } from './controllers/ForgotPassword.controller';
import { ArchivePostsController } from './controllers/ArchivePosts.controller';
import { PostController } from './controllers/Post.controller';
import { UserController } from './controllers/User.controller';
import { ServerController } from './controllers/Server.controller';

const _routes: [string, Router][] = [
    ['/ping', PingController],
    ['/login', LoginController],
    ['/register', RegisterController],
    ['/upload', UploadController],
    ['/reset-password', ResetPasswordController],
    ['/forgot-password', ForgotPasswordController],
    ['/archive-posts', ArchivePostsController],
    ['/posts', PostController],
    ['/users', UserController],
    ['/servers', ServerController],
];

export const routes = (app: Application): void => {
    _routes.forEach((route) => {
        const [url, controller] = route;
        app.use(url, controller);
    });
};
