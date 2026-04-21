import { useState } from "react";
import { useUser } from "../user-context/use-user";
import { ReviewListItem } from "./ReviewListItem";
import { useGetUsersQuery } from "../../redux/services/api";
import { StatusMessage } from "../status-message/StatusMessage";

export const ReviewListItemContainer = ({ review }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { userId } = useUser();
  const { data, isLoading, isError } = useGetUsersQuery();

  if (isLoading) {
    return (
      <StatusMessage as="li" tone="loading" compact title="Loading author..." />
    );
  }

  if (isError) {
    return (
      <StatusMessage as="li" tone="error" compact title="Author unavailable.">
        Review details are temporarily incomplete.
      </StatusMessage>
    );
  }

  const user = data.find((entry) => entry.id === review.userId);

  return (
    <ReviewListItem
      review={review}
      user={user}
      isFormVisible={isFormVisible}
      setIsFormVisible={setIsFormVisible}
      isOwn={userId === review.userId}
    />
  );
};
