import { useState } from "react";
import { useUser } from "../user-context/use-user";
import { ReviewListItem } from "./ReviewListItem";
import { useGetUsersQuery } from "../../redux/services/api";

export const ReviewListItemContainer = ({ review }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { userId } = useUser();
  const CURRENT_USER_ID = "mock-user-id";
  const { data, isLoading, isError } = useGetUsersQuery();

  if (isLoading) return "...Loading";
  if (isError) return null;

  const user = data.find((user) => user.id === userId);

  return (
    <ReviewListItem
      review={review}
      user={user}
      isFormVisible={isFormVisible}
      setIsFormVisible={setIsFormVisible}
      isOwn={userId === CURRENT_USER_ID}
    />
  );
};
