export const TextArea = ({
  labelName,
  name,
  onChange,
  placeholder,
  className,
  text,
}) => {
  return (
    <div className="textarea-input">
      <label>{labelName}</label>
      <textarea
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
        value={text}
      ></textarea>
    </div>
  );
};
