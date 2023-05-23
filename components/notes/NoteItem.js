import { useRouter } from "next/router";
import styles from "./NoteItem.module.scss";
import { useTranslation } from "next-i18next";
import { useState, useEffect } from "react";

function NoteItem(props) {
  const { push, locale } = useRouter();
  const { t } = useTranslation("common");
  const [formattedDate, setFormattedDate] = useState();
  function showDetailsHandler(noteId) {
    push(`/note/${props.id}`);
  }

  useEffect(() => {
    const currentLocale = locale === "ge" ? "ka-GE" : "en-US";

    setFormattedDate(
      new Date(props.createDate).toLocaleString(currentLocale, {
        hour: "numeric",
        minute: "numeric",
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    );
  }, [locale]);

  return (
    <li className={styles["note-item"]} onClick={showDetailsHandler}>
      <div className={styles.content}>
        <h3>{props.title}</h3>
        <div className={styles["content-text"]}>{props.content}</div>
        <em>{formattedDate}</em>
      </div>
      <span className={styles["view-badge"]}> {t("view")} </span>
    </li>
  );
}

export default NoteItem;
