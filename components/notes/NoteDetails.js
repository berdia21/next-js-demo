import styles from "./NoteDetails.module.scss";

export default function NoteDetails(props) {
  return (
    <section className={styles.detail}>
      <h1>{props.title}</h1>

      <div className={styles["content-board"]}>{props.content}</div>
    </section>
  );
}
