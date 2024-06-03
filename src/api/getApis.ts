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