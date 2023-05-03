import classes from "./NoteDetails.module.scss";

export default function NoteDetails(props) {
  return (
    <section className={classes.detail}>
      <h1>
        <strong> Title:</strong> {props.title}
      </h1>

      <p>
        <strong>Content: </strong> {props.content}
      </p>
    </section>
  );
}
