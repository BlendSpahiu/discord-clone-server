import UserModel from '../models/User.model';
import  CompanyModel  from '../models/Company.model';
import  ProfileImagesModel  from '../models/ProfileImages.model';
import { ok, failure, generateJWT } from '../utils/index';
import { RoleUsersEnums } from '../interfaces/enums/RoleUsers.enums';
import { StatusUserEnums } from '../interfaces/enums/StatusUser.enums';
import { StatusCodeEnums } from '../interfaces/enums/StatusCode.enums';
import { RegisterCompanyModel } from '../interfaces/models/RegisterCompany.model';

export const RegisterCompanyService = {
    registerCompany: async (data: RegisterCompanyModel) => {
        const { last_name, first_name, email, password, company_name, business_number, image } = data;
        // const { name, base64str, mime_type, size } = data.image;
         
        // Check if user with this email exists
        const users = await UserModel.query().where('email', 'ILIKE', data.email);
        users.length === 0 && failure(StatusCodeEnums.INVALID_CREDENTIALS);
        
        // Check if companies with this business number exists
        const companies = await CompanyModel.query().where('business', 'ILIKE', data.business_number);
        companies.length === 0 && failure(StatusCodeEnums.INVALID_CREDENTIALS);

        UserModel.query().insert({
            first_name,
            last_name,
            email,
            password,
            role_name: RoleUsersEnums.COMPANY,
        });

        CompanyModel.query().insert({
            name: company_name,
            business_number,
            status: StatusUserEnums.PENDING,
        });

        ProfileImagesModel.query().insert({
            ...image, path: ''
        });

        // return the generated token
        return ok({ token: generateJWT(users[0]) });
    },
};
