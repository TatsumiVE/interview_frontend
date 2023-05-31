import PropTypes from "prop-types";
export const Radio = ({ checked, labelName, value, name, onChange }) => {
  return (
    <div>
      <label>
        {labelName}
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

Radio.propTypes = {
  checked: PropTypes.bool.isRequired,
  labelName: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
