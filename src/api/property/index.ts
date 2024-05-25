import { contribuildApi } from "../instance";

const LIMIT = process.env.REACT_APP_PRODUCT_FETCH_LIMIT || 18;

export const GET_PROPERTIES = async (data: {
    beds?: string | number,
    baths?: string | number,
    status?: string,
    location?: string,
    min_price?: string | number,
    max_price?: string | number,
    type?: string,
    search?: string 
}) => {
    return contribuildApi.get(`/propy/filter-properties`, {
        params: {
            ...data,
            limit: LIMIT
        }
    });
}

export const GET_SAVED_PROPERTIES = async (data: {
    user_id: string
}) => {
    return contribuildApi.get(`/propy/list-saved-properties`, {
        params: {
            ...data,
            limit: LIMIT
        }
    });
}

export const GET_PROPERTIES_BY_ID = async (data: {
    id?: string | number
}) => {
    return contribuildApi.get(`/propy/get-property`, {
        params: {
            id: data?.id
        }
    });
}

export const SAVE_PROPERTIES_BY_ID = async (data: {
    id?: string | number
}) => {
    return contribuildApi.post(`/propy/save-property`, {...data});
}

export const UNSAVE_PROPERTIES_BY_ID = async (data: {
    id?: string | number
}) => {
    return contribuildApi.post(`/propy/unsave-property`, {...data});
}