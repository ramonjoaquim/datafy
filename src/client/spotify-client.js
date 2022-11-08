import axios from "axios";
import { getUserContext } from "../context/user-context";

const API = 'https://api.spotify.com/v1';
const limit = 10;
const offset = 0;
const headerAccept = 'application/json';

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

export { getArtists, getArtistTopTracks, getTopSongs, getMe }