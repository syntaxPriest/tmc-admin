import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type MortgageApplication = {
  isUserEmployed: boolean;
  hasUserVerifiedEmployment: boolean;
};
type OutrightPayment = {
  hasAcceptedOffer: boolean;
  hasVerifiedDocuments: boolean;
};

type PropertiesState = {
  /**
   * current property search
   */
  searchTerm: string;
  /**
   * active property for mortgage or outright payment
   */
  activeProperty: any | null;
  activeBlock: any | null;
  /**
   * details of current mortgage application
   */
  mortgageApplicationDetails: MortgageApplication | null;
  /**
   * details of outright purchase
   */
  isOutrightPayment: OutrightPayment | null;
  /**
   * slug of active property
   */
  propertySlug: string | null;
    /**
   * calculator result
   */
  calculatorPlan: string | null;
  currentBill: string | number | null;
  result: any | null
};

const initialState: PropertiesState = {
  searchTerm: "",
  activeProperty: null,
  activeBlock: null,
  mortgageApplicationDetails: null,
  isOutrightPayment: null,
  propertySlug: null,
  result: null,
  currentBill: null,
  calculatorPlan: null
};

export const PropertiesStateSlice = createSlice({
  name: "PropertiesState",
  initialState,
  reducers: {
    setPropertySearchTerm: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        searchTerm: action.payload,
      };
    },
    setPropertySlug: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        propertySlug: action.payload,
      };
    },
    setMortgageApplicationDetails: (
      state,
      action: PayloadAction<MortgageApplication>,
    ) => {
      return {
        ...state,
        mortgageApplicationDetails: action.payload,
      };
    },
    clearMortgageApplicationDetails: (state) => {
      return {
        ...state,
        mortgageApplicationDetails: initialState.mortgageApplicationDetails,
      };
    },
    setActiveProperty: (state, action: PayloadAction<string | null>) => {
      return {
        ...state,
        activeProperty: action.payload,
      };
    },
    setActiveBlock: (state, action: PayloadAction<any | null>) => {
      return {
        ...state,
        activeBlock: action.payload,
      };
    },
    setCalculatorPlan: (state, action: PayloadAction<string | null>) => {
      return {
        ...state,
        calculatorPlan: action.payload
      }
    },
    setCurrentBill: (state, action: PayloadAction<string | number | null>) => {
      return {
        ...state,
        currentBill: action.payload
      }
    },
    setOutrightPaymentDetails: (
      state,
      action: PayloadAction<OutrightPayment | null>,
    ) => {
      return {
        ...state,
        isOutrightPayment: action.payload,
      };
    },
    clearState: () => initialState,
    setCalculatorResult: (state, action:PayloadAction<any | null>)=>{
      return ({
        ...state,
        result: action.payload
      })
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  setPropertySearchTerm,
  setPropertySlug,
  setMortgageApplicationDetails,
  clearMortgageApplicationDetails,
  setActiveProperty,
  setActiveBlock,
  setOutrightPaymentDetails,
  clearState,
  setCalculatorResult,
  setCurrentBill,
  setCalculatorPlan,
} = PropertiesStateSlice.actions;

export default PropertiesStateSlice.reducer;
