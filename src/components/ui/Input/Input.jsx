import "./Input.scss";

export default function Input({
  label,
  id,
  type = "text",
  className = "",
  multiline = false,
  ...props
}) {
  return (
    <label className={`field ${className}`.trim()} htmlFor={id}>
      {label && <span className="field__label">{label}</span>}
      {multiline ? (
        <textarea className="field__control" id={id} {...props} />
      ) : (
        <input className="field__control" id={id} type={type} {...props} />
      )}
    </label>
  );
}
