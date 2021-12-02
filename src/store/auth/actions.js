import { api } from 'boot/axios'

export function register ({ commit }, form) {
  return api.post('register', form)
  .then(response => {
    console.log('response', response);
    // api.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token
    commit('setAuth', {token: response.data.token, user: response.data.user})
  })

}
