  
function setUserContext(accessToken, tokenType, expiresIn) {
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('tokenType', tokenType)
  localStorage.setItem('expiresIn', expiresIn)
}

function getUserContext() {
  return {
    accessToken: localStorage.getItem('accessToken'),
    tokenType: localStorage.getItem('tokenType'),
    expiresIn: localStorage.getItem('expiresIn'),
  }
}

function clearUserContext() {
  localStorage.clear()
}

function isUserLogged() {
  return !!localStorage.getItem('accessToken')
}


export { isUserLogged, clearUserContext, getUserContext, setUserContext }