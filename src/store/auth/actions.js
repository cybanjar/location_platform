import axios, { api } from 'boot/axios'
import { Cookies, SessionStorage } from 'quasar';
import { getUser } from './getters';

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
    email: 'admin@adventure.id'
  }
  
  return api.post("logout",
    body,
    config
  )
  
  .then(function(response) {

    return response;
  })
  .catch(function(error){
    console.log(error.response);

    return error.response;
  })
}

export function resetPassword (context, {token, email, password, password_confirmation }) {
  return api.post('reset-password', {
    token: token,
    email: email,
    password: password,
    password_confirmation: password_confirmation,
  })
  .then(function(response) {
    
    return response;
  })
  .catch(function(error) {

    return error.response;
  })
}

export function verify (context, { email }) {
  const token = SessionStorage.getItem('auth');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  }

  return api.post('email/verification-notification', {
    email,
    config
  })
  .then(function(response) {
    console.log('response action: ', response);
    
    return response;
  })
  .catch(function(error){
    console.log(error.response);

    return error.response;
  })
}

export function handleRefresh (context) {
  const token = SessionStorage.getItem('auth');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  }
  return api.get("user",
    config
  )
  
  .then(function(response) {
    return response;
  })
  .catch(function(error){
    console.log(error.response);

    return error.response;
  })
}

export function updateProfile (context) {
  const token = SessionStorage.getItem('auth');
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `${token}`
    }
  }

  return api.post("user", config)
  .then(function(response) {
    return response;
  })
  .catch(function(error){
    console.log(error.response);

    return error.response;
  })
}