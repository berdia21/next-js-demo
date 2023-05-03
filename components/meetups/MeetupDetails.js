import classes from "./MeetupDetails.module.css";

export default function MeetupDetails(props) {
  return (
    <section className={classes.detail}>
      <img src={props.image} alt={props.title} />
      <h1>
        <strong> Title:</strong> {props.title}
      </h1>
      <address>
        <strong>Address:</strong> {props.address}
      </address>
      <p>
        <strong>Description: </strong> {props.description}
      </p>
    </section>
  );
}
