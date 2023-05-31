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
