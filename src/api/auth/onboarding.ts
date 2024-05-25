import { contribuildApi } from "../instance";

export const REGISTER_USER = async (data: {
    first_name : string,
    last_name : string,
    phone : string,
    email : string,
    password : string
}) => {
    return contribuildApi.post('/onboarding/register', data);
}

export const VERIFY_OTP = async (data: {
    otp: string,
    user_id?: string | number | null,
}) => {
    return contribuildApi.post(`/onboarding/verify-otp`, data);
}

export const CHECK_OTP = async (data: {
    otp: string,
    identifier?: string | null,
}) => {
    return contribuildApi.post(`/onboarding/check-otp`, data);
}

export const RESEND_OTP = async (data: {
    user_id?: string | number | null,
}) => {
    return contribuildApi.post('/onboarding/resend-otp', data);
}

export const LOGIN_USER = async (data: {
    identifier: string,
    password: string
}) => {
    return contribuildApi.post('/onboarding/login', data);
}

export const REQUEST_RESET = async (data: {
    identifier?: string | null,
}) => {
    return contribuildApi.post('/onboarding/init-reset-password', data);
}

export const CREATE_PASSWORD = async (data: {
    identifier: string | null,
    password: string,
    confirm_password: string,
    otp: string | null,
}) => {
    return contribuildApi.post('/onboarding/reset-password', data);

}