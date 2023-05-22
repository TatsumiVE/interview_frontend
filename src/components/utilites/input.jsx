import PropTypes from "prop-types";

export const Input = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <>
      <label>
        {labelName}
        <input
          className={name}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </label>
    </>
  );
};

Input.propTypes = {
  labelName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
