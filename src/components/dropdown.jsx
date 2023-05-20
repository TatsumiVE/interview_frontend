export const Dropdown = ({ options, selectedValue, onChange,labelName}) => {
  if (!options) {
    return null;
  }

  return (
    <label>{labelName}
    <select value={selectedValue} onChange={onChange} className="select">
      <option value="">Select</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
    </label>
  );
};
