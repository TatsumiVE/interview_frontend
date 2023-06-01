import PropTypes from "prop-types";

export const Input = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  onChange,
  errorMessage,
}) => {
  return (
    <div className="input-form">
      <label>
        {labelName} <span className="txt-danger">{errorMessage}</span>
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="off"
        className="input-type"
      />
    </div>
  );
};

Input.propTypes = {
  labelName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.func.isRequired,
};
