import { Request, Response, NextFunction, Router } from 'express';
import { UploadService } from '../services/Upload.service';
import { upload } from '../utils/s3Upload';

export const UploadController: Router = Router();

UploadController.post('/', upload().single('file'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { file } = req;

        const result = await UploadService.upload(file);

        res.status(result.httpCode).send(result.data);
    } catch (err) {
        next(err);
    }
});
