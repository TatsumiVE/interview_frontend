import PropTypes from "prop-types";

export const InputCheckbox = ({
  labelName,
  type,
  name,
  value,
  checked,
  onChange,
}) => {
  return (
    <div className="checkbox-input">
      <label> 
         
        <input
          type={type}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
        />  
         {" " + labelName}  
      </label>
    </div>
  );
};

InputCheckbox.propTypes = {
  labelName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
