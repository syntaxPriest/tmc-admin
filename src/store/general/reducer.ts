import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type GeneralState = {
  /**
   * detect if a route is changing
   */
  routeIsChanging: boolean;
  proposedMessageData: {
    channels?: string[],
    receivers?: Array<string | number>,
    headline?: string,
    message?: string;
  }
};

const initialState: GeneralState = {
  routeIsChanging: false,
  proposedMessageData: {}
};

export const GeneralStateSlice = createSlice({
  name: "GeneralState",
  initialState,
  reducers: {
    toggleRouteIsChanging: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        routeIsChanging: action.payload,
      };
    },
    updateProposedMessageData: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        routeIsChanging: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleRouteIsChanging } = GeneralStateSlice.actions;

export default GeneralStateSlice.reducer;
