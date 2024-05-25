import { useSelector } from "react-redux";
import { RootState } from "../index";

export const useGeneralState = () => {
  const generalState = useSelector(
    (storeState: RootState | any) => storeState.generalState,
  );
  return generalState;
};
