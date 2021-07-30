import UserModel from '../models/User.model';
import CompanyModel from '../models/Company.model';
import { ok, failure, generateJWT, hashPassword } from '../utils/index';
import { RoleUsersEnums } from '../interfaces/enums/RoleUsers.enums';
import { StatusUserEnums } from '../interfaces/enums/StatusUser.enums';
import { StatusCodeEnums } from '../interfaces/enums/StatusCode.enums';
import { RegisterCompanyModel } from '../interfaces/models/RegisterCompany.model';

export const RegisterCompanyService = {
    registerCompany: async (data: RegisterCompanyModel) => {
        const { first_name, last_name, email, password, company_name, business_number, file_id } = data;

        // Check if user with this email exists
        const users = await UserModel.query().where('email', 'ILIKE', email);
        if (users.length !== 0) return failure('User exists!', StatusCodeEnums.USER_EXISTS);

        // Check if companies with this business number exists
        const companies = await CompanyModel.query().where('business_number', 'ILIKE', business_number);
        if (companies.length !== 0) return failure('Company exists!', StatusCodeEnums.USER_EXISTS);

        const hashedPwd = await hashPassword(password);

        const insertUser = await UserModel.query().insert(
            file_id
                ? { email, last_name, first_name, password: hashedPwd, role: RoleUsersEnums.COMPANY, file_id }
                : { email, last_name, first_name, password: hashedPwd, role: RoleUsersEnums.COMPANY }
        );

        if (insertUser) {
            const insertCompany = await CompanyModel.query().insert({
                business_number,
                name: company_name,
                user_id: insertUser.id,
                status: StatusUserEnums.PENDING,
            });
        }

        // return the generated token
        return ok({ token: generateJWT({ id: insertUser.id.toString(), role: RoleUsersEnums.COMPANY }) });
    },
};
