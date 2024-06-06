import { tmcApi } from "./../instance";

export const CREATE_EVENT = async (data: FormData) => {
    return tmcApi.post(`/event/create-event`, data);
}