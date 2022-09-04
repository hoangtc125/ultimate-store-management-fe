const isRole = (roles) => {
  if (!roles.includes(window.localStorage.getItem("USM_ROLE"))) {
    return false
  }
  return true
}

const isMode = (modes) => {
  if (!modes.includes(window.localStorage.getItem("USM_MODE"))) {
    return false
  }
  return true
}

const isVisit = (roles) => {
  const role = window.localStorage.getItem("USM_ROLE")
  const mode = window.localStorage.getItem("USM_MODE")
  if (!mode) {
    return false
  }
  if (!roles.includes(role)) {
    return false
  }
  return true
}

export { isRole, isMode, isVisit }