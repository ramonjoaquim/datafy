import { encryptStorage } from "../utils/storage"

const setUserContext = ({ accessToken, refreshToken, scope, tokenType, expiresIn, market }) => {
  encryptStorage.setItem('accessToken', accessToken)
  encryptStorage.setItem('refreshToken', refreshToken)
  encryptStorage.setItem('scope', scope)
  encryptStorage.setItem('tokenType', tokenType)
  encryptStorage.setItem('expiresIn', expiresIn)
  encryptStorage.setItem('market', market)
}

const setMarketContext = market => {
  encryptStorage.setItem('market', market)
}

const setUserDisplayName = userDisplayName => {
  encryptStorage.setItem('userDisplayName', userDisplayName)
}

const setUserProfileImage = userProfileImage => {
  encryptStorage.setItem('userProfileImage', userProfileImage)
}

const setAccessToken = accessToken => {
  encryptStorage.setItem('accessToken', accessToken)
}

const getUserContext = () => {
  return {
    accessToken: encryptStorage.getItem('accessToken'),
    refreshToken: encryptStorage.getItem('refreshToken'),
    scope: encryptStorage.getItem('scope'),
    tokenType: encryptStorage.getItem('tokenType'),
    expiresIn: encryptStorage.getItem('expiresIn'),
    market: encryptStorage.getItem('market'),
    userDisplayName: encryptStorage.getItem('userDisplayName'),
    userProfileImage: encryptStorage.getItem('userProfileImage')
  }
}

const clearUserContext = () => {
  encryptStorage.clear()
}

const isUserLogged = () => {
  return !!encryptStorage.getItem('accessToken')
}


export { 
  isUserLogged, 
  clearUserContext, 
  getUserContext, 
  setUserContext, 
  setMarketContext, 
  setUserDisplayName, 
  setUserProfileImage, 
  setAccessToken 
}