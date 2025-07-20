import { useForm } from "./useForm";
import styles from "./review-form.module.css";

export const ReviewForm = () => {
  const { form, setName, setReview, setRating, clear } = useForm();
  const { name, review, rating } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Отправка формы:", form);
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
        <button className={`${styles.button} ${styles.clear}`} onClick={clear}>
          Очистить
        </button>
        <button className={styles.button} type="submit">
          Отправить
        </button>
      </div>
    </form>
  );
};
