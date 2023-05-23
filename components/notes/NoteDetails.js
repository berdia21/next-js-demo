import styles from "./NoteDetails.module.scss";
import { useTranslation } from "next-i18next";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function NoteDetails(props) {
  const { push, locale } = useRouter();
  const { t } = useTranslation("common");
  const [formattedDate, setFormattedDate] = useState();

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
    <section className={styles.detail}>
      <div className={styles["details__header"]}>
        <span className={styles["details__title"]}>{props.title}</span>
        <span className={styles["details__date"]}> {formattedDate} </span>
      </div>

      <div className={styles["content-board"]}>{props.content}</div>
    </section>
  );
}
