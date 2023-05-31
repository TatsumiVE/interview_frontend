const Rating = ({ value, children }) => {
  let stars = [];
  for (let i = 1; i <= 5; i++) {
    const star = (
      <i key={i} className={`fa-${i <= value ? "solid" : "regular"} fa-star`} />
    );
    stars.push(star);
  }

  return (
    <span className="rating">
      {stars} <span>{children}</span>
    </span>
  );
};

export default Rating;
