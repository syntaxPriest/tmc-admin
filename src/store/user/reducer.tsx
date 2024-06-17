import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type User = {
  id: number;
  role: string;
  title: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  phone: string;
  is_first_time_login: number;
  avatar: string;
  status: string;
  phone_verified: string;
  roles: "user" | "seller" | "buyer";
  country: string;
  state: string;
  city: string;
  region: string;
  address: null;
  whatsapp_number: string;
  account_bvn: string;
  employment_status: null;
  pension_fund_admin: null;
  others: null;
  created_at: string;
  current_employer: null;
  monthly_net_salary: null;
  date_of_birth: null;
  nature_of_business: null;
  years_in_business: null;
  monthly_turnover: null;
  preferred_property_location: null;
};

type UserState = {
  /**
   * logged in user
   */
  user: null | User;
  wallet: any;
};

const initialState: UserState = {
  user: null,
  wallet: null
};

export const UserStateSlice = createSlice({
  name: "UserState",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      return {
        ...state,
        user: action.payload,
      };
    },
    setWallet: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        wallet: action.payload,
      };
    },
    updateRole: (state, action: PayloadAction<"buyer" | "seller">) => {
      if (state.user) {
        return {
          ...state,
          user: {
            ...state.user,
            roles: action.payload,
          },
        };
      }
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setWallet, updateRole } = UserStateSlice.actions;

export default UserStateSlice.reducer;
