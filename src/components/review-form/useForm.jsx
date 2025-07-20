import { useReducer } from "react";
const DEFAULT_STATE = {
  name: "",
  review: "",
  rating: 1,
};

const ACTION_TYPES = {
  SET_NAME: "SET_NAME",
  SET_REVIEW: "SET_REVIEW",
  SET_RATING: "SET_RATING",
  CLEAR_FORM: "CLEAR_FORM",
};
const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_NAME:
      return { ...state, name: action.payload };
    case ACTION_TYPES.SET_REVIEW:
      return { ...state, review: action.payload };
    case ACTION_TYPES.SET_RATING:
      return { ...state, rating: action.payload };
    case ACTION_TYPES.CLEAR_FORM:
      return DEFAULT_STATE;
    default:
      return state;
  }
};

export const useForm = () => {
  const [form, dispatch] = useReducer(reducer, DEFAULT_STATE);

  const setName = (e) =>
    dispatch({ type: ACTION_TYPES.SET_NAME, payload: e.target.value });
  const setReview = (e) =>
    dispatch({ type: ACTION_TYPES.SET_REVIEW, payload: e.target.value });
  const setRating = (e) =>
    dispatch({ type: ACTION_TYPES.SET_RATING, payload: e.target.value });
  const clear = () => dispatch({ type: ACTION_TYPES.CLEAR_FORM });
  return {
    form,
    setName,
    setReview,
    setRating,
    clear,
  };
};
