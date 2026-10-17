import "../Input/Input.scss";
import "./Select.scss";

export default function Select({ label, id, options = [], className = "", ...props }) {
  return (
    <label className={`field ${className}`.trim()} htmlFor={id}>
      {label && <span className="field__label">{label}</span>}
      <span className="select">
        <select className="field__control select__control" id={id} {...props}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </span>
    </label>
  );
}
