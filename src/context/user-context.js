
function setUserContext({ accessToken, tokenType, expiresIn, market }) {
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('tokenType', tokenType)
  localStorage.setItem('expiresIn', expiresIn)
  localStorage.setItem('market', market)
}

function setMarketContext(market) {
  localStorage.setItem('market', market)
}

function setUserDisplayName(userDisplayName) {
  localStorage.setItem('userDisplayName', userDisplayName)
}

function setUserProfileImage(userProfileImage) {
  localStorage.setItem('userProfileImage', userProfileImage)
}

function getUserContext() {
  return {
    accessToken: localStorage.getItem('accessToken'),
    tokenType: localStorage.getItem('tokenType'),
    expiresIn: localStorage.getItem('expiresIn'),
    market: localStorage.getItem('market'),
    userDisplayName: localStorage.getItem('userDisplayName'),
    userProfileImage: localStorage.getItem('userProfileImage')
  }
}

function clearUserContext() {
  localStorage.clear()
}

function isUserLogged() {
  return !!localStorage.getItem('accessToken')
}


export { isUserLogged, clearUserContext, getUserContext, setUserContext, setMarketContext, setUserDisplayName, setUserProfileImage }