import { useSelector } from "react-redux";
import { RootState } from "../index";

export const useCurrentUser = () => {
  const userState = useSelector(
    (storeState: RootState) => storeState.userState,
  );
  return userState;
};
