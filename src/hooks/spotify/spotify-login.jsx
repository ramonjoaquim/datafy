import { setUserContext, clearUserContext, isUserLogged } from '../../context/user-context'
import React, { useEffect, useState } from "react";
import Toast  from '../toast/toast'
import { useNavigate } from 'react-router-dom'

const SpotifyLogin = (props) => {

  const CLIENT_ID = "1f243e6fb66f447f92caf335279d1c3f"; // insert your client id here from spotify
  const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
  const REDIRECT_URL_AFTER_LOGIN = "http://localhost:5173/spotify-wrapped/";
  const SPACE_DELIMITER = "%20";
  const SCOPES = [
    "user-read-currently-playing",
    "user-read-playback-state",
    "playlist-read-private",
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
  const [notify, setNotify] = useState(false);


  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } =
        getReturnedParamsFromSpotifyAuth(window.location.hash);

      clearUserContext()
      setUserContext(access_token, token_type, expires_in)
    }
    
    if (isUserLogged()) {
      navigate('/home')
    }
  });

  const  handleLogin = () =>  {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  };

//   function showNotification() {
//     setNotify(!notify);
//   }


//   if (window.location.toString().includes('?error=access_denied')) {
//     showNotification()
// }

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
    
    <Toast show={notify}
      setNotify={setNotify}
      autoCloseable={false}
      title={'titulo teste'}
      message={'messageeeee'}
      type='success' />
    </>
  )

}

export default SpotifyLogin