import { setUserContext, clearUserContext, isUserLogged , setMarketContext, setUserProfileImage, setUserDisplayName } from '../../context/user-context'
import React, { useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { getMe, handleCallBack } from '../../client/spotify-client'

const SpotifyLogin = (props) => {

  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT 
  const SPOTIFY_AUTHORIZE_ENDPOINT = import.meta.env.VITE_SPOTIFY_AUTH
  const REDIRECT_URL_AFTER_LOGIN = import.meta.env.VITE_BASE_URL
  const SPACE_DELIMITER = "%20"
  const SCOPES = [
    'user-read-private',
    'user-read-email',
    'user-read-playback-state',
    'user-top-read',
    'streaming'
  ]
  const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER)

  const getReturnedParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1)
    const paramsInUrl = stringAfterHashtag.split("&")
    const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
      const [key, value] = currentValue.split("=")
      accumulater[key] = value
      return accumulater
    }, {})

    return paramsSplitUp
  }

  const navigate = useNavigate()

  useEffect(() => {
    if (window.location.search) {
      const { code } = getReturnedParamsFromSpotifyAuth(window.location.search)

      handleCallBack(code).then(res => {
        clearUserContext()
        setUserContext({
          accessToken: res?.data?.access_token, 
          refreshToken: res?.data?.refresh_token,
          tokenType: res?.data?.token_type, 
          expiresIn: res?.data?.expires_in,
          scope: res?.data?.scope
        })
        getProfile()
        if (isUserLogged()) {
          navigate('/home')
        }
      })
      
    }
  })

  const getProfile = () => {
    getMe().then(res => {
      setMarketContext(res?.data?.country)
      setUserProfileImage(res?.data?.images[0].url)
      setUserDisplayName(res?.data?.display_name)
    })
  }

  const generateState = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let text = ''
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  }

  const  handleLogin = () =>  {
    // dont break the value
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=code&show_dialog=true&state=${generateState(16)}`
  }
  


  return (
    <button
      className='button-login'
      type='button'
      onClick={handleLogin}
      onMouseOver={props.changeLogoIn}
      onMouseLeave={props.changeLogoOut}>
      Login to Spotify
    </button>
  )

}

export default SpotifyLogin