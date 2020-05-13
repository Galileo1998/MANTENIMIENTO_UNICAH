import React from 'react';
import './Campo.css';
export default ( { caption , type, value, name , onChange, ...props } )=>{
  return (
    <fieldset>
      <legend>{caption}</legend>
      <input
        type={"file"}
        value={value||""}
        name={name}
      />
    </fieldset>
  );
};
