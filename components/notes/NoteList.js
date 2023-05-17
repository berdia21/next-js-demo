import NoteItem from "./NoteItem";
import classes from "./NoteList.module.scss";

function NoteList(props) {
  return (
    <ul className={classes.list}>
      {props?.notes?.map((note) => (
        <NoteItem
          key={note._id}
          id={note._id}
          title={note.title}
          content={note.content}
          createDate={note.createDate}
        />
      ))}
    </ul>
  );
}

export default NoteList;
