import { useRef } from "react";
import { useSession } from "next-auth/react";
import styles from "./NewNoteForm.module.scss";
import { useTranslation } from "next-i18next";
import Button from "../common/Button";

function NewNoteForm(props) {
  const session = useSession();
  const titleInputRef = useRef();
  const contentInputRef = useRef();
  const { t } = useTranslation("common");

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
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.control}>
        <label htmlFor="title"> {t("title")} </label>
        <input type="text" required id="title" ref={titleInputRef} />
      </div>
      <div className={styles.control}>
        <label htmlFor="content">{t("content")}</label>
        <textarea
          id="content"
          required
          rows="5"
          ref={contentInputRef}
        ></textarea>
      </div>
      <div className={styles.actions}>
        <Button type="submit">{t("save")}</Button>
      </div>
    </form>
  );
}

export default NewNoteForm;
