import { tmcApi } from "./instance";

export const GET_USERS = async (data: {
    search?: string;
    with_trashed?: boolean;
    offset?: number;
    suspended?: boolean;
    type?: string;
}) => {
    return tmcApi.get(`/user/filter-users`, {
        params: {
            ...data,
            limit: 20
        }
    });
}

export const GET_EVENTS = async (data: {
    search?: string;
    status?: string;
    offset?: number;
    type?: string;
}) => {
    return tmcApi.get(`/event/filter-event`, {
        params: {
            ...data,
            limit: 20
        }
    });
}

export const GET_SINGLE_EVENT = async (data: {
    id: string | number
}) => {
    return tmcApi.get(`/event/get-event`, {
        params: {
            ...data,
        }
    });
}

export const GET_TRANSACTIONS = async (data: {
    search?: string;
    status?: string;
    offset?: number;
    type?: string;
}) => {
    return tmcApi.get(`/wallet/list-all-transactions`, {
        params: {
            ...data,
            limit: 20
        }
    });
}

export const GET_BOOKINGS = async (data: {
    search?: string;
    status?: string;
    offset?: number;
    type?: string;
}) => {
    return tmcApi.get(`/booking/filter-booking`, {
        params: {
            ...data,
            limit: 20
        }
    });
}