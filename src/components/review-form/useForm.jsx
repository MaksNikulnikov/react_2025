import { useReducer } from "react";

const ACTION_TYPES = {
  SET_REVIEW: "SET_REVIEW",
  SET_RATING: "SET_RATING",
  SET_ALL: "SET_ALL",
  CLEAR_FORM: "CLEAR_FORM",
};

const DEFAULT_STATE = {
  review: "",
  rating: 5,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_REVIEW:
      return { ...state, review: action.payload };
    case ACTION_TYPES.SET_RATING:
      return { ...state, rating: action.payload };
    case ACTION_TYPES.SET_ALL:
      return {
        ...state,
        review: action.payload.text,
        rating: action.payload.rating ?? state.rating,
      };
    case ACTION_TYPES.CLEAR_FORM:
      return DEFAULT_STATE;
    default:
      return state;
  }
};

export const useForm = (reviewData) => {
  const initialState = reviewData
    ? {
        review: reviewData.text,
        rating: reviewData.rating,
      }
    : DEFAULT_STATE;

  const [form, dispatch] = useReducer(reducer, initialState);

  const setReview = (e) =>
    dispatch({ type: ACTION_TYPES.SET_REVIEW, payload: e.target.value });
  const setRating = (e) =>
    dispatch({ type: ACTION_TYPES.SET_RATING, payload: e.target.value });
  const clear = () => dispatch({ type: ACTION_TYPES.CLEAR_FORM });
  const setAll = (values) =>
    dispatch({ type: ACTION_TYPES.SET_ALL, payload: values });

  return { form, setReview, setRating, clear, setAll };
};
