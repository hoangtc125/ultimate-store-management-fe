const isRole = (role) => {
  return role === window.localStorage.getItem("USM_ROLE")
}

const isMode = (mode) => {
  return mode === window.localStorage.getItem("USM_MODE")
}

const isVisit = (roles) => {
  if (!roles) {
    return true
  }
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