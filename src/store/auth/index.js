import state from './state'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'
import { Cookies } from 'quasar';

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state,
  Cookies
}
