import { contribuildApi } from "../instance";

const LIMIT = process.env.REACT_APP_PRODUCT_FETCH_LIMIT || 18;


export const GET_WALLET = async (data: {
    user_id?: string | number;
}) => {
    return contribuildApi.get(`/wallet/get`, {
        params: {
            ...data
        }
    })
}

export const GET_TRANSACTIONS = async (data: {
    type?: string;
    user_id?: string | number;
}) => {
    return contribuildApi.get(`/wallet/transactions`, {
        params: {
            ...data,
            limit: LIMIT
        }
    });
}