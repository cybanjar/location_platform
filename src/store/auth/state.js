import { SessionStorage } from "quasar";

export default function () {
  return {
    isAuth: false,
    credential: null,
    token: SessionStorage.getItem("auth"),
    user: {},
    open: false
  }
}
