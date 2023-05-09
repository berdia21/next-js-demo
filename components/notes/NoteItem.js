import { useRouter } from "next/router";
import styles from "./NoteItem.module.scss";

function NoteItem(props) {
  const router = useRouter();

  function showDetailsHandler(noteId) {
    router.push(`/${props.id}`);
  }

  const formattedDate = new Date(props.createDate).toLocaleString("ka-GE", {
    hour: "numeric",
    minute: "numeric",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <li className={styles["note-item"]} onClick={showDetailsHandler}>
      <div className={styles.content}>
        <h3>{props.title}</h3>
        <div className={styles["content-text"]}>{props.content}</div>
        {formattedDate && <em>{formattedDate}</em>}
      </div>
      <span className={styles["view-badge"]}> View </span>
    </li>
  );
}

export default NoteItem;
