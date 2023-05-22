import PropTypes from "prop-types";

export const Dropdown = ({ options, selectedValue, onChange, labelName }) => {
  if (!options) {
    return null;
  }

  return (
    <label>
      {labelName}
      <select value={selectedValue} onChange={onChange} className="select">
        <option value="" disabled>
          Select {labelName}
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </label>
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
