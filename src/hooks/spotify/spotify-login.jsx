import { setUserContext, clearUserContext, isUserLogged , setMarketContext } from '../../context/user-context'
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { getMe } from '../../client/spotify-client';

const SpotifyLogin = (props) => {

  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT; 
  const SPOTIFY_AUTHORIZE_ENDPOINT = import.meta.env.VITE_SPOTIFY_AUTH;
  const REDIRECT_URL_AFTER_LOGIN = import.meta.env.VITE_BASE_URL;
  const SPACE_DELIMITER = "%20";
  const SCOPES = [
    'user-read-private',
    'user-read-playback-state',
    'user-top-read'
  ];
  const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

  const getReturnedParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
      const [key, value] = currentValue.split("=");
      accumulater[key] = value;
      return accumulater;
    }, {});

    return paramsSplitUp;
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } =
        getReturnedParamsFromSpotifyAuth(window.location.hash);

      clearUserContext()
      setUserContext({accessToken: access_token, tokenType: token_type, expiresIn: expires_in})
      getProfile()
    }
    
    if (isUserLogged()) {
      navigate('/home')
    }
  });

  const getProfile = () => {
    getMe().then(res => {
      setMarketContext(res.data.country)
    })
  }

  const  handleLogin = () =>  {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  };

  return (
    <>
    <button
      className='button-login'
      type='button'
      onClick={handleLogin}
      onMouseOver={props.changeLogoIn}
      onMouseLeave={props.changeLogoOut}>
      Login to Spotify
    </button>
    </>
  )

}

export default SpotifyLogin