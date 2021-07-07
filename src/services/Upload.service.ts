import { StatusCodeEnums } from '../interfaces/enums/StatusCode.enums';
import FileImagesModel from '../models/FileImages.model';
import { failure, ok } from '../utils/index';

export const UploadService = {
    upload: async (file: any) => {
        const insertFileImages = await FileImagesModel.query().insert({
            original_name: file.originalname,
            file_name: file.key,
            file_size: file.size,
            mime_type: file.mimetype,
            file_path: file.location,
        });

        if (!insertFileImages.id) return failure('UNPROCESSABLE ENTITY', StatusCodeEnums.UNPROCESSABLE_ENTITY);

        return ok({});
    },
};
