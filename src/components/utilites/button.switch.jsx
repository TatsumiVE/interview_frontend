import PropTypes from "prop-types";

export const ButtonSwitch = ({ handleClick, isOn, label }) => {
  return (
    <div onClick={handleClick} className="btn-switch">
      <button className={isOn ? "active" : ""} disabled={isOn}>
        {label[0]}
      </button>
      <button className={isOn ? "" : "active"} disabled={!isOn}>
        {label[1]}
      </button>
    </div>
  );
};

ButtonSwitch.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isOn: PropTypes.bool.isRequired,
  label: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
