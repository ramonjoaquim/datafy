import { setUserContext, clearUserContext, isUserLogged , getUserContext, setMarketContext } from '../../context/user-context'
import React, { useEffect, useState } from "react";
import Toast  from '../toast/toast'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SpotifyLogin = (props) => {

  const CLIENT_ID = "1f243e6fb66f447f92caf335279d1c3f"; // insert your client id here from spotify
  const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
  const REDIRECT_URL_AFTER_LOGIN = "http://localhost:5173/spotify-wrapped/";
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
  const [notify, setNotify] = useState(false);


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
    axios.get(`https://api.spotify.com/v1/me`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getUserContext().accessToken}`
      }
    }).then(res => {
      setMarketContext(res.data.country)
    })
  }

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