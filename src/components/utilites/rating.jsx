import PropTypes from "prop-types";

const Rating = (props) => {
  let stars = [];
  let value = 6 - props.value;
  for (let i = 1; i <= 5; i++) {
    const star = (
      <i key={i} className={`fa-${i <= value ? "solid" : "regular"} fa-star`} />
    );
    stars.push(star);
  }

  return (
    <span className="rating">
      {stars} <span>{props.children}</span>
    </span>
  );
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  children: PropTypes.node,
};

export default Rating;
