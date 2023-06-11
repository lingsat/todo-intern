import { useSelector } from "react-redux";

import { userSelector } from "@Store/store";

export const useAuth = () => {
  const user = useSelector(userSelector);

  return { isAuth: !!user, user };
};
