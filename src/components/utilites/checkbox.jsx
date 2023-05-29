import React from 'react'

export const InputCheckbox = ({ labelName, type, name, value, placeholder, onChange }) => {
    return (
        <div className='checkbox-input'>
            <input
                // className={className}
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}>
                {/* checked={check} */}
            </input>
            &nbsp;
            <label>{labelName}</label>
        </div>
    )
}
