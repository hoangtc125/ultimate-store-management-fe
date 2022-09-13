async function USMENV() {
  return fetch('env.json')
    .then(response => response.json())
}

export default USMENV