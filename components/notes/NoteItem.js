import { useRouter } from "next/router";

import Card from "../ui/Card";
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
    <li className={styles.item}>
      <Card>
        <div className={styles["note-item"]}>
          <div className={styles.content}>
            <h3>{props.title}</h3>
            {formattedDate && <em>{formattedDate}</em>}
          </div>
          <div className={styles.actions}>
            <button onClick={showDetailsHandler}>Show Details</button>
          </div>
        </div>
      </Card>
    </li>
  );
}

export default NoteItem;
