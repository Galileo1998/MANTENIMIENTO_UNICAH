import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';

import { login } from '../../actions/auth.js';

import './signin.scss';

const input = ({ input, name, label, type, meta: { touched, error, active } }) => (
  <label className='signin__label'> {label}
    <input className='signin__input' {...input} type={type} name={name} placeholder={label} />
    {!active && touched && (error && <span className='signin__error'>{error}</span>)}
  </label>
);

const validate = values => {
  const errors = {};
  values.email = 'mantenimiento100@unicah.edu';
  values.password = 'Mantenimiento2020'
  if (!values.email) {
    errors.email = 'Requerido';
  } else if (!/^[\w-_]+@\w+.\w{2,4}$/i.test(values.email)) {
    errors.email = 'Dirección de correo inválida'
  }
  if (!values.password) {
    errors.password = 'Requerido';
  } else if (values.password.length < 6) {
    errors.password = 'La extensión de la contraseña debe ser mayor a 6 caracteres';
  }
  return errors;
}

const Signin = ({ handleSubmit }) => (
  <form id='sign' className='auth__signin signin' onSubmit={handleSubmit(login)}>
		<h2 className='signin__head'> INICIAR SESIÓN</h2>
		<Field component={input} type='text' name='email' label='Email'/>
		<Field component={input} type='password' name='password' label='Password' />
		<button className='signin__button'>ENTRAR</button>
	</form>
);

Signin.propTypes = {
  handleSubmit: PropTypes.func,
  submit: PropTypes.func
};

export default reduxForm({
  validate
})(Signin);