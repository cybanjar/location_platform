import { api } from 'boot/axios'

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
    api.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token
    
    return response;
  })
}