import { tmcApi } from "./instance";

export const GET_DASHBOARD_OVERVIEW = async (data: {
    user_id?: string | number
}) => {
    return tmcApi.post(`/user/dashboard-overview`, {
        params: {
            ...data,
        }
    });
}

export const GET_USERS = async (data: {
    search?: string;
    with_trashed?: boolean;
    offset?: number;
    suspended?: boolean;
    type?: string;
    role?: string;
    limit?: number;
}) => {
    return tmcApi.get(`/user/filter-users`, {
        params: {
            ...data,
            limit: data?.limit || 20
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
    user_id?: string;
    limit?: number;
}) => {
    return tmcApi.get(`/event/filter-event`, {
        params: {
            ...data,
            limit: data?.limit || 20
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

export const GET_ATTENDEES = async (data: {
    id: string | number,
    offset: number,
}) => {
    return tmcApi.get(`/event/attendees`, {
        params: {
            ...data,
            limit: 20
        }
    });
}

export const GET_TRANSACTIONS = async (data: {
    search?: string;
    status?: string;
    offset?: number;
    type?: string;
    user_id?: string;
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
    user_id?: string;
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

export const GET_MESSAGES = async (data: {
    offset?: number
}) => {
    return tmcApi.get(`/message/list-messages`, {
        params: {
            ...data,
            limit: 20
        }
    });
}

export const GET_MESSAGE = async (data: {
    id?: number
}) => {
    return tmcApi.get(`/message/get-message`, {
        params: {
            ...data,
        }
    });
}

export const GET_USER_WALLET = async (data: {
    user_id?: number
}) => {
    return tmcApi.get(`/wallet/get`, {
        params: {
            ...data,
        }
    });
}

export const GET_USER_SUBSCRIPTIONS = async (data: {
    user_id?: number,
    offset?: number
}) => {
    return tmcApi.get(`/subscription/subscriptions`, {
        params: {
            ...data,
        }
    });
}

export const GET_FEEDBACKS = async (data: {
    offset?: number
}) => {
    return tmcApi.get(`/feedback/list-feedbacks`, {
        params: {
            ...data,
            limit: 20
        }
    });
}

export const GET_FEEDBACK = async (data: {
    id?: number
}) => {
    return tmcApi.get(`/feedback/get-feedback`, {
        params: {
            ...data,
        }
    });
}

export const GET_RESPONSE = async (data: {
    id?: number,
    offset?: number
}) => {
    return tmcApi.get(`/feedback/list-responses`, {
        params: {
            ...data,
            limit: 40
        }
    });
}