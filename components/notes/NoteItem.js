import { useRouter } from "next/router";

import Card from "../ui/Card";
import styles from "./NoteItem.module.scss";

function NoteItem(props) {
  const router = useRouter();

  function showDetailsHandler(noteId) {
    router.push(`/${props.id}`);
  }

  return (
    <li className={styles.item}>
      <Card>
        <div className={styles["note-item"]}>
          <div className={styles.content}>
            <h3>{props.title}</h3>
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
