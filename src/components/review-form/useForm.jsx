import { useReducer } from "react";

const ACTION_TYPES = {
  SET_NAME: "SET_NAME",
  SET_REVIEW: "SET_REVIEW",
  SET_RATING: "SET_RATING",
  SET_ALL: "SET_ALL",
  CLEAR_FORM: "CLEAR_FORM",
};

const DEFAULT_STATE = {
  name: "",
  review: "",
  rating: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_NAME:
      return { ...state, name: action.payload };
    case ACTION_TYPES.SET_REVIEW:
      return { ...state, review: action.payload };
    case ACTION_TYPES.SET_RATING:
      return { ...state, rating: action.payload };
    case ACTION_TYPES.SET_ALL:
      return { ...state, review: action.payload.text };
    case ACTION_TYPES.CLEAR_FORM:
      return DEFAULT_STATE;
    default:
      return state;
  }
};

export const useForm = (reviewData) => {
  const initialState = {
    name: reviewData.name,
    review: reviewData.text,
    rating: reviewData.rating,
  };
  const [form, dispatch] = useReducer(reducer, initialState || DEFAULT_STATE);
  const setName = (e) =>
    dispatch({ type: ACTION_TYPES.SET_NAME, payload: e.target.value });
  const setReview = (e) =>
    dispatch({ type: ACTION_TYPES.SET_REVIEW, payload: e.target.value });
  const setRating = (e) =>
    dispatch({ type: ACTION_TYPES.SET_RATING, payload: e.target.value });
  const clear = () => dispatch({ type: ACTION_TYPES.CLEAR_FORM });
  const setAll = (values) =>
    dispatch({ type: ACTION_TYPES.SET_ALL, payload: values });

  return { form, setName, setReview, setRating, clear, setAll };
};
