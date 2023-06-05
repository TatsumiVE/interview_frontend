import { Link } from "react-router-dom";
import PropTypes from "prop-types";
export const ButtonLink = ({
  type,
  className,
  route,
  text,
  linkText,
  icon,
  onClick,
}) => {
  return (
    <>
      <button
        type={type ? type : "button"}
        className={`btn ${className}`}
        onClick={onClick}
      >
        <Link to={route} className={linkText}>
          <span className="icon">{icon && <i className={icon}></i>}&nbsp;<span>{text}</span> </span>               
        </Link>
      </button>
    </>
  );
};

ButtonLink.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  route: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  icon: PropTypes.string,
};
