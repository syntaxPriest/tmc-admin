import { tmcApi } from "./../instance";

export const CREATE_EVENT = async (data: FormData) => {
    return tmcApi.post(`/event/create-event`, data);
}

export const CREATE_INVENTORY = async (data: FormData) => {
    return tmcApi.post(`/inventory/create-product`, data);
}

export const DECLINE_ORDER = async (data:{
    id: string;
    reason: string;
    status: string;
}) => {
    return tmcApi.post(`/order/update-status`, data);
}