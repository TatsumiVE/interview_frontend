import PropTypes from "prop-types";

export const Button = ({ type, btnColor, onClick, text }) => {
  return (
    <div>
      <button
        type={type ? type : "button"}
        className={`btn btn-${btnColor}`}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  btnColor: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
