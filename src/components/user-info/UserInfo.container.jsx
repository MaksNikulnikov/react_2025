import { useSelector } from "react-redux";
import { selectUserById } from "../../redux/entities/users/slice";
import { UserInfo } from "./UserInfo";

export const UserInfoContainer = ({ userId }) => {
  const user = useSelector((state) => selectUserById(state, userId));
  return <UserInfo user={user} />;
};
