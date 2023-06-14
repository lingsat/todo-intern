import { useSelector } from "react-redux";

import { selectUser } from "@Store/reducers/userReducer";

export const useAuth = () => {
  const { user, isLoading } = useSelector(selectUser);

  return { isAuth: !!user, user, isLoading };
};
