import styles from "./Button.module.scss";

export default function Button({
  children,
  className,
  disabled,
  onClick,
  type = "button",
}) {
  return (
    <button
      type={type}
      className={`${styles.btn} ${className}`}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      {children}
    </button>
  );
}
