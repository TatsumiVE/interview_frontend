import PropTypes from "prop-types";

export const Dropdown = ({
  options,
  selectedValue,
  onChange,
  labelName,
  errorMessage,
  hide,
}) => {
  if (!options) {
    return null;
  }

  return (
    <div className="input-form">
      <label>
        {labelName} <span className="txt-danger">{errorMessage}</span>
      </label>
      <select onChange={onChange} className="select">
        {!hide && (
          <option key="0" value="" disabled>
            Select {labelName}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.id}
            value={option.id}
            selected={option.selected}
            disabled={option.disabled}          
          >
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  labelName: PropTypes.string.isRequired,
};
Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  labelName: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
};
