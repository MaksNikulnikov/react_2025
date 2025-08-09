import { UserInfo } from "./UserInfo";
import { useGetUsersQuery } from "../../redux/services/api";

export const UserInfoContainer = ({ userId }) => {
  const { data: users, isError, isLoading } = useGetUsersQuery();

  if (isLoading) return "...Loading";

  if (isError) return null;

  const user = users.find((user) => user.id === userId);
  return <UserInfo user={user} />;
};
