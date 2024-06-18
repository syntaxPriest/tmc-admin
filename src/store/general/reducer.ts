import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface messageCreationDataProps {
  channels?: string[],
  receivers?: Array<string | number>,
  headline?: string,
  message?: string;
}
type GeneralState = {
  /**
   * detect if a route is changing
   */
  routeIsChanging: boolean;
  proposedMessageData: messageCreationDataProps | null
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
    updateProposedMessageData: (state, action: PayloadAction<messageCreationDataProps | null>) => {
      return {
        ...state,
        proposedMessageData: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleRouteIsChanging, updateProposedMessageData } = GeneralStateSlice.actions;

export default GeneralStateSlice.reducer;
