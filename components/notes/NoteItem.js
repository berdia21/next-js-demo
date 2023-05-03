import { useRouter } from "next/router";

import Card from "../ui/Card";
import classes from "./NoteItem.module.scss";

function NoteItem(props) {
  const router = useRouter();

  function showDetailsHandler(noteId) {
    router.push(`/${props.id}`);
  }

  return (
    <li className={classes.item}>
      <Card>
        {/* <div className={classes.image}>
     
        </div> */}
        <div className={classes.content}>
          <h3>{props.title}</h3>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default NoteItem;
