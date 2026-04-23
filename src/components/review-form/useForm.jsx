import { useReducer } from "react";

const ACTION_TYPES = {
  SET_REVIEW: "SET_REVIEW",
  SET_RATING: "SET_RATING",
  RESET_FORM: "RESET_FORM",
};

const DEFAULT_STATE = {
  review: "",
  rating: 5,
};

const getFormState = (reviewData) =>
  reviewData
    ? {
        review: reviewData.text,
        rating: reviewData.rating,
      }
    : DEFAULT_STATE;

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_REVIEW:
      return { ...state, review: action.payload };
    case ACTION_TYPES.SET_RATING:
      return { ...state, rating: action.payload };
    case ACTION_TYPES.RESET_FORM:
      return action.payload;
    default:
      return state;
  }
};

export const useForm = (reviewData) => {
  const [form, dispatch] = useReducer(reducer, getFormState(reviewData));

  const setReview = (value) =>
    dispatch({ type: ACTION_TYPES.SET_REVIEW, payload: value });
  const setRating = (value) =>
    dispatch({ type: ACTION_TYPES.SET_RATING, payload: value });
  const clear = () =>
    dispatch({
      type: ACTION_TYPES.RESET_FORM,
      payload: getFormState(reviewData),
    });

  return { form, setReview, setRating, clear };
};
