import React from 'react';
import './Campo.css';
export default ( { caption , type, value, name ,placeholder, onChange, readOnly, ...props } )=>{
  return (
    <fieldset>
      <legend class="texto">{caption}</legend>
      <input
        type={type||"text"}
        value={value||""}
        name={name}
        onChange={(onChange||function(){})}
        placeholder={placeholder}
        readOnly
      />
    </fieldset>
  );
};
