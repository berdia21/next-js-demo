import { useRef } from "react";
import { useSession } from "next-auth/react";
import classes from "./NewNoteForm.module.scss";

function NewNoteForm(props) {
  const session = useSession();
  const titleInputRef = useRef();
  const contentInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    if (!session?.data?.user?._id)
      throw new Error("note author is not specified");

    const enteredTitle = titleInputRef.current.value;
    const enteredContent = contentInputRef.current.value;

    const noteData = {
      title: enteredTitle,
      content: enteredContent,
      userId: session?.data?.user?._id,
    };

    props.onAddNote(noteData);
  }

  return (
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
  );
}

export default NewNoteForm;
