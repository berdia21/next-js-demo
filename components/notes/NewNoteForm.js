import { useRef } from "react";

import Card from "../ui/Card";
import classes from "./NewNoteForm.module.scss";

function NewNoteForm(props) {
  const titleInputRef = useRef();
  const contentInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredContent = contentInputRef.current.value;

    const noteData = {
      title: enteredTitle,
      content: enteredContent,
    };

    props.onAddNote(noteData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Title</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            required
            rows="5"
            ref={contentInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add Note</button>
        </div>
      </form>
    </Card>
  );
}

export default NewNoteForm;
