export interface RegisterCompanyModel {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    company_name: string;
    business_number: number;
    file_id?: number | null;
}
