import { SubmissionError, reset } from 'redux-form';
import { LOGIN, LOGIN_ERROR, LOGOUT, REGISTER, REGISTER_ERROR } from '../constants/actions.js';
import { serverRequest } from '../utils/server.js';

export function login(user, dispatch) {
  return serverRequest(user, '/login', 'POST')
    .then(([response, json]) => {
      if (response.status !== 200) throw new SubmissionError({_error: 'Login Failed'}); 
      if (json.errors) throw new SubmissionError(json.errors);
      else {
        localStorageSave(json);
        dispatch({type: LOGIN, email: json.user});
        dispatch(reset('signin'));
        resolve();
      }
    });
}

export function register(user, dispatch) {
  return serverRequest(user, '/register', 'POST')
    .then(([response, json]) => {
      if (response.status !== 200) throw new SubmissionError({_error: 'Login Failed'});
      if (json.errors) {
        const jsonErr = json.errors;
        const errors = {};
          for (let prop in jsonErr) {
            if (jsonErr.hasOwnProperty(prop)) {
              errors[prop] = jsonErr[prop] instanceof Object ?
                errors[prop] = jsonErr[prop].message :
                errors[prop] = jsonErr[prop];
            }
          }
        throw new SubmissionError(errors);
      }
      else {
        localStorageSave(json);
        dispatch({type: LOGIN, email: json.user});
        dispatch(reset('Iniciar Sesión'));
        resolve();
      }
    })
}

export function auth(token) {
  return dispatch => {
    return fetch('/auth', {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    })
    .then(res => {
      if (res.status !== 200) throw new Error();
      return res.json()
    })
    .then(data => {
      if (data.errors) throw new Error();
      const user = localStorage.getItem('user');
      localStorageSave(data);
      dispatch({type: LOGIN, email: user});
    })
    .catch((err) => {
      localStorageClear();
      dispatch({type: LOGOUT});
    });
  }
};

export function logout() {
  return dispatch => {
    dispatch({type: LOGOUT});
    localStorageClear();
  }
};


function localStorageSave(data) {
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', data.user);
}

function localStorageClear() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}