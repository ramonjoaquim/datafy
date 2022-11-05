  
function setUserContext({accessToken, tokenType, expiresIn, market}) {
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('tokenType', tokenType)
  localStorage.setItem('expiresIn', expiresIn)
  localStorage.setItem('market', market)
}

function setMarketContext(market) {
  localStorage.setItem('market', market)
}

function getUserContext() {
  return {
    accessToken: localStorage.getItem('accessToken'),
    tokenType: localStorage.getItem('tokenType'),
    expiresIn: localStorage.getItem('expiresIn'),
    market: localStorage.getItem('market'),
  }
}

function clearUserContext() {
  localStorage.clear()
}

function isUserLogged() {
  return !!localStorage.getItem('accessToken')
}


export { isUserLogged, clearUserContext, getUserContext, setUserContext, setMarketContext }