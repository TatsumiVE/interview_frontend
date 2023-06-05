import PropTypes from "prop-types";

export const Button = ({ type, className, onClick, text, disabled }) => {
  return (
    <>
      <button
        type={type ? type : "button"}
        className={`btn ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    </>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
