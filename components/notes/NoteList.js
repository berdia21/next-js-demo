import NoteItem from "./NoteItem";
import classes from "./NoteList.module.scss";

function NoteList(props) {
  return (
    <ul className={classes.list}>
      {props.notes.map((note) => (
        <NoteItem
          key={note.id}
          id={note.id}
          title={note.title}
          createDate={note.createDate}
        />
      ))}
    </ul>
  );
}

export default NoteList;
