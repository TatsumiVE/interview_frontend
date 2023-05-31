import { Link } from "react-router-dom";
import PropTypes from "prop-types";
export const ButtonLink = ({
  type,
  className,
  route,
  text,
  linkText,
  icon,
}) => {
  return (
    <>
      <button type={type ? type : "button"} className={`btn ${className}`}>
        <Link to={route} className={linkText}>
          <span className="icon">{icon && <i className={icon}></i>}</span>
          {text}
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
