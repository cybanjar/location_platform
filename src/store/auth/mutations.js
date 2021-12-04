export function SET_USER_DATA (state, { attributes}) {
  const { name, email, password } = attributes;

  state.user = {
    name, email, password
  }
}
