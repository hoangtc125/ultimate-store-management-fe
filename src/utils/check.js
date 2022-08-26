const isRole = (role) => {
  return role === window.localStorage.getItem("USM_ROLE")
}

const isMode = (mode) => {
  return mode === window.localStorage.getItem("USM_MODE")
}

export { isRole, isMode }