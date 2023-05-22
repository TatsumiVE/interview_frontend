import PropTypes from "prop-types";

export const Button = ({ type, className, onClick, text }) => {
  return (
    <>
      <button
        type={type ? type : "button"}
        className={`btn ${className}`}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
};

// Button.propTypes = {
//   type: PropTypes.string,
//   className: PropTypes.string.isRequired,
//   onClick: PropTypes.func.isRequired,
//   text: PropTypes.string.isRequired,
// };
