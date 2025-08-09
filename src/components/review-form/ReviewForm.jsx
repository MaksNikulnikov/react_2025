import { useForm } from "./useForm";
import styles from "./review-form.module.css";
import { Button } from "../button/Button";
import { useCreateReviewMutation } from "../../redux/services/api";
import { useParams } from "react-router";

export const ReviewForm = () => {
  const { restaurantId } = useParams();
  const { form, setName, setReview, setRating, clear } = useForm();
  const { name, review, rating } = form;

  const [createReview, { isLoading }] = useCreateReviewMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        restaurantId,
        body: { user: name, text: review, rating: Number(rating) },
      }).unwrap();
      clear();
    } catch (err) {
      console.error("Ошибка при отправке отзыва:", err);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="name">
          Имя
        </label>
        <input
          className={styles.input}
          id="name"
          type="text"
          value={name}
          placeholder="Введите ваше имя"
          onChange={setName}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="review">
          Отзыв
        </label>
        <textarea
          className={styles.textarea}
          id="review"
          value={review}
          placeholder="Введите ваш отзыв"
          onChange={setReview}
        ></textarea>
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="rating">
          Рейтинг
        </label>
        <select
          className={styles.select}
          id="rating"
          value={rating}
          onChange={setRating}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n.toString()}>
              {n}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.actions}>
        <Button onClick={clear} name="Очистить" />
        <Button
          type="submit"
          color="Blue"
          name={isLoading ? "Отправка..." : "Отправить"}
        />
      </div>
    </form>
  );
};
