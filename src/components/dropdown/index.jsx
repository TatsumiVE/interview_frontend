const Dropdown = ({ options, selectedValue, onChange }) => {
  if (!options) {
    return null;
  }

  return (
    <select value={selectedValue} onChange={onChange}>
      <option value="">Select</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
