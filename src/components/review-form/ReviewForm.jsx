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
export const ReviewForm = () => {
  const [form, dispatch] = useReducer(reducer, DEFAULT_STATE);

  const { name, review, rating } = form;
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <label htmlFor="name">Имя</label>
        <input
          id="name"
          type="text"
          value={name}
          placeholder="Введите ваше имя"
          onChange={(e) =>
            dispatch({ type: ACTION_TYPES.SET_NAME, payload: e.target.value })
          }
        />
      </div>
      <div>
        <label htmlFor="review">Отзыв</label>
        <textarea
          id="review"
          value={review}
          placeholder="Введите ваш отзыв"
          onChange={(e) =>
            dispatch({ type: ACTION_TYPES.SET_REVIEW, payload: e.target.value })
          }
        ></textarea>
      </div>
      <div>
        <label htmlFor="rating">Рейтинг</label>
        <select
          id="rating"
          value={rating}
          onChange={(e) =>
            dispatch({ type: ACTION_TYPES.SET_RATING, payload: e.target.value })
          }
        >
          {[1, 2, 3, 4, 5].map((n) => {
            return (
              <option key={n} value={n.toString()}>
                {n}
              </option>
            );
          })}
        </select>
      </div>
      <button onClick={() => dispatch({ type: ACTION_TYPES.CLEAR_FORM })}>
        Очистить
      </button>
      <button type="submit">Отправить</button>
    </form>
  );
};
