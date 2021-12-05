import axios, { api } from 'boot/axios'
import { Cookies, SessionStorage } from 'quasar';

export function register (context, { name, email, password }) {
  return api.post('register', {
    name: name,
    email: email,
    password: password
  })
  .then(function(response) {
    return response;
  })
  // .catch(function(error) {
  //   return error;
  //   // const err = error.response;
  //   // if(err.data.success === false) {
  //   //   return error;
  //   // }
  // })
}

export function login (context, { email, password }) {
  return api.post('login', {
    email: email,
    password: password
  })
  .then(function(response) {
    api.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
    const token = 'Bearer ' + response.data.access_token;
    SessionStorage.set('auth', token);
    
    return response;
  })
}

export function forgotPassword (context, { email }) {
  return api.post('forgot-password', {
    email: email
  })
  .then(function(response) {
    
    return response;
  })
}

export function revokeToken (context) {
  const token = SessionStorage.getItem('auth');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  }

  const body = {
    email: 'attacker@bp.id'
  }
  
  return api.post("logout", {
    body,
    config
  })
  
  .then(function(response) {

    return response;
  })
}