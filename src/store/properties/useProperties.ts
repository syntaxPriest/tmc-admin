import { useSelector } from "react-redux";
import { RootState } from "../index";

export const useProperties = () => {
  const propertiesState = useSelector(
    (storeState: RootState) => storeState.propertiesState,
  );
  return propertiesState;
};
