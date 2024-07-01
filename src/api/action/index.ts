import { QuestionLineObject } from "../../components/dashboard/feedbackComps/create";
import { messageCreationDataProps } from "../../store/general/reducer";
import { User } from "../../utils/types";
import { tmcApi } from "./../instance";

export const CREATE_EVENT = async (data: FormData) => {
    return tmcApi.post(`/event/create-event`, data);
}

export const EDIT_EVENT = async (data: FormData) => {
    return tmcApi.post(`/event/edit-event`, data);
}

export const CREATE_INVENTORY = async (data: FormData) => {
    return tmcApi.post(`/inventory/create-product`, data);
}

export const EDIT_INVENTORY = async (data: FormData) => {
    return tmcApi.post(`/inventory/edit-product`, data);
}

export const EDIT_USER = async (data: User) => {
    return tmcApi.post(`/user/edit-user`, data);
}

export const INVITE_MEMBER = async (data: {
    email: string;
    membership_type: string;
    membership_id: string;
}) => {
    return tmcApi.post(`/auth/invite-member`, data);
}

export const INVITE_ADMIN = async (data: {
    first_name: string;
    middle_name?: string;
    last_name: string;
    email: string;
    phone: string;
}) => {
    return tmcApi.post(`/user/add-admin`, data);
}

export const SUSPEND_UNSUSPEND_ACTION = async (data: User) => {
    return tmcApi.post(`/user/suspend-user`, data);
}

export const DELETE_USER = async (data: User) => {
    return tmcApi.post(`/user/delete-user`, data);
}

export const DELETE_INVENTORY = async (data: {id: string}) => {
    return tmcApi.post(`/inventory/delete-product`, data);
}

export const DECLINE_ORDER = async (data:{
    id: string;
    reason: string;
    status: string;
}) => {
    return tmcApi.post(`/order/update-status`, data);
}

export const POST_MESSAGE = async (data: messageCreationDataProps) => {
    return tmcApi.post(`/message/send-message`, data);
}

export const EDIT_MESSAGE = async (data: messageCreationDataProps) => {
    return tmcApi.post(`/message/edit-message`, data);
}

export const DELETE_MESSAGE = async (data: {id: string}) => {
    return tmcApi.post(`/message/delete-message`, data);
}

export const UPDATE_ORDER_STATUS = async (data:{
    id: string | undefined;
    status: string | undefined;
}) => {
    return tmcApi.post(`/order/update-status`, data);
}

export const CANCEL_SUBSCRIPTION = async (data:{
    id: number | undefined;
}) => {
    return tmcApi.post(`/event/cancel-subscription`, data);
}

export const CREATE_FEEDBACK = async (data:{
    event_id: number | undefined,
    questions: QuestionLineObject[]
}) => {
    return tmcApi.post(`/feedback/create-feedback`, data);
}