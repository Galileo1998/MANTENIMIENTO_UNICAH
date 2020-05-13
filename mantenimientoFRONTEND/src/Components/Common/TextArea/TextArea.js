import React from 'react';
import './Campo.css';
export default ( { caption , type, value, name , onChange, ...props } )=>{
  return (
    <fieldset>
      <legend>{caption}</legend>
      <textarea
        type={type||"text"}
        value={value||""}
        name={name}
        maxLength={300}
        required
        rows={5}
        onChange={(onChange||function(){})}
      />
    </fieldset>
  );
};
