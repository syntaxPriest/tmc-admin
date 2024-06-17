import { tmcApi } from "../instance";

export const REGISTER_USER = async (data: {
    first_name : string,
    last_name : string,
    phone : string,
    email : string,
    password : string
}) => {
    return tmcApi.post('/onboarding/register', data);
}

export const VERIFY_OTP = async (data: {
    otp: string,
    user_id?: string | number | null,
}) => {
    return tmcApi.post(`/onboarding/verify-otp`, data);
}

export const CHECK_OTP = async (data: {
    otp: string,
    identifier?: string | null,
}) => {
    return tmcApi.post(`/onboarding/check-otp`, data);
}

export const RESEND_OTP = async (data: {
    user_id?: string | number | null,
}) => {
    return tmcApi.post('/onboarding/resend-otp', data);
}

export const LOGIN_USER = async (data: {
    identifier: string,
    password: string
}) => {
    return tmcApi.post('/auth/login', data);
}

export const REQUEST_RESET = async (data: {
    identifier?: string | null,
}) => {
    return tmcApi.post('/onboarding/init-reset-password', data);
}

export const INIT_PASSWORD_CHANGE = async (data: {
    password?: string | null,
}) => {
    return tmcApi.post('/user/init-change-password', data);
}

export const CREATE_PASSWORD = async (data: {
    identifier: string | null,
    password: string,
    confirm_password: string,
    otp: string | null,
}) => {
    return tmcApi.post('/onboarding/reset-password', data);

}