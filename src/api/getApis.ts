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

export const GET_SINGLE_USERS = async (data: {
    user_id: string | number
}) => {
    return tmcApi.get(`/user/get-user`, {
        params: {
            ...data,
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

export const GET_SINGLE_TRANSACTIONS = async (data: {
    transaction_id: string | number
}) => {
    return tmcApi.get(`/wallet/get-transaction`, {
        params: {
            ...data,
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

export const GET_INVENTORIES = async (data: {
    search?: string;
    status?: string;
    offset?: number;
    type?: string;
}) => {
    return tmcApi.get(`/inventory/filter-products`, {
        params: {
            ...data,
            limit: 20
        }
    });
}

export const GET_SINGLE_INVENTORY = async (data: {
    id: string | number
}) => {
    return tmcApi.get(`/inventory/get-product`, {
        params: {
            ...data,
        }
    });
}

export const GET_ORDERS = async (data: {
    search?: string;
    status?: string;
    offset?: number
}) => {
    return tmcApi.get(`/order/filter-order`, {
        params: {
            ...data,
            limit: 20
        }
    });
}

export const GET_SINGLE_ORDER = async (data: {
    id: string | number
}) => {
    return tmcApi.get(`/order/get-order`, {
        params: {
            ...data,
        }
    });
}