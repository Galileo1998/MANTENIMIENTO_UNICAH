import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';

import { register } from '../../actions/auth.js';

import './signup.scss';

const input = ({ input, name, label, type, meta: { touched, error, active } }) => (
  <label className='signup__label'> {label}
    <input className='signup__input' {...input} type={type} name={name} placeholder={label} />
    {!active && touched && (error && <span className='signup__error'>{error}</span>)}
  </label>
);

const validate = values => {
  const errors = {};
  values.email = 'mantenimiento100@unicah.edu';
  values.password = 'Mantenimiento2020'
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[\w-_]+@\w+.\w{2,4}$/i.test(values.email)) {
    errors.email = 'Dirección de correo inválida'
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Must be more than 6 and less than 20 characters'
  }
  if (!values.repeat) {
    errors.repeat = 'Required';
  } else if (values.repeat !== values.password) {
    errors.repeat = 'Must match the "Password" field';
  }
  return errors;
}

const Signup = ({ handleSubmit }) => (
  <form id='signup' className='auth__signup signup' onSubmit={handleSubmit(register)}>
    <h2 className='signup__head'>Crear calendario</h2>
    <button className='signup__button' type='submit'>Crear</button>
  </form>
);

Signup.propTypes = {
  handleSubmit: PropTypes.func,
  submit: PropTypes.func
};

export default reduxForm({
  form: 'signup',
  validate
})(Signup);