import { useSelector } from "react-redux";

import { selectUser } from "@Store/reducers/userReducer";

export const useAuth = () => {
  const { user, isLoading } = useSelector(selectUser);

  const userId = user ? user.id : null;

  return { isAuth: !!user, user, userId, isLoading };
};
