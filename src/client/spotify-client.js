import axios from "axios"
import { getUserContext } from "../context/user-context"
import { encryptStorage } from "../utils/storage"
import Buffer from 'buffer'

const API = 'https://api.spotify.com/v1'
const API_ACCOUNTS = 'https://accounts.spotify.com/api'
const limit = 10
const offset = 0
const headerAccept = 'application/json'


axios.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    const accessToken = getUserContext().accessToken
    if (error?.response?.status === 401 && accessToken) {
      encryptStorage.clear()
      window.location.reload()
    }
    return Promise.reject(error)
  }
)

const getArtists = (time_range) => {
  return axios.get(`${API}/me/top/artists`, {
    params: { time_range, limit, offset },
    headers: {
      Accept: headerAccept,
      'Content-Type': headerAccept,
      'Authorization': `${getUserContext().tokenType} ${getUserContext().accessToken}`
    }
  })
}

const getArtistTopTracks = (idArtist) => {
  return axios.get(`${API}/artists/${idArtist}/top-tracks`, {
      params: {
        market: getUserContext().market
      },
      headers: {
        Accept: headerAccept,
        'Content-Type': headerAccept,
        'Authorization': `${getUserContext().tokenType} ${getUserContext().accessToken}`
      }
    })
}

const getTopSongs = (time_range) => {
  return axios.get(`${API}/me/top/tracks`, {
    params: { time_range, limit, offset },
    headers: {
      Accept: headerAccept,
      'Content-Type': headerAccept,
      'Authorization': `${getUserContext().tokenType} ${getUserContext().accessToken}`
    }
  })
}

const getMe = () => {
  return axios.get(`${API}/me`, {
    headers: {
      Accept: headerAccept,
      'Content-Type': headerAccept,
      'Authorization': `${getUserContext().tokenType} ${getUserContext().accessToken}`
    }
  })
}

const playSongFromAlbum = (uriAlbum, songPosition) => {
  axios.put(`${API}/me/player/play`, {
    'context_uri': uriAlbum,
    'offset': {
      'position': songPosition-1
    },
    'position_ms': 0
  },
  {
    headers: {
      Accept: headerAccept,
      'Content-Type': headerAccept,
      'Authorization': `${getUserContext().tokenType} ${getUserContext().accessToken}`
    }
  })
}

const handleCallBack = (code) => {
  return axios.post(`${API_ACCOUNTS}/token`, {
    code,
    redirect_uri: import.meta.env.VITE_BASE_URL,
    grant_type: 'authorization_code'
  }, {
    headers: {
      'Authorization': `Basic ${Buffer.Buffer.from(import.meta.env.VITE_SPOTIFY_CLIENT + ':' + import.meta.env.VITE_SPOTIFY_SECRET).toString('base64')}`,
      'Content-Type' : 'application/x-www-form-urlencoded'
    },
  })
}

export { 
  getArtists, 
  getArtistTopTracks, 
  getTopSongs, 
  getMe, 
  handleCallBack, 
  playSongFromAlbum 
}