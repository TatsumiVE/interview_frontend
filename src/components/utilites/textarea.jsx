import PropTypes from "prop-types";
export const TextArea = ({
  labelName,
  name,
  onChange,
  placeholder,
  className,
  text,
  errorMessage,
}) => {
  return (
    <div className="input-form">
      <label>
        {labelName} <span className="txt-danger">{errorMessage}</span>
      </label>
      <textarea
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
        value={text}
        rows={3}
      ></textarea>
    </div>
  );
};
TextArea.propTypes = {
  labelName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  text: PropTypes.string,
  errorMessage: PropTypes.string,
};
