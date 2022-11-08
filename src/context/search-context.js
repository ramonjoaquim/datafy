import moment from "moment"

function setTopArtistContext(topArtist, filter) {
  setExpirationCache()
  localStorage.setItem(`topArtist-${filter}`, JSON.stringify(topArtist))
}

function setTopSongContext(topSong, filter) {
  setExpirationCache()
  localStorage.setItem(`topSong-${filter}`, JSON.stringify(topSong))
}

function setTopSongStatsContext(topSongStats, filter) {
  setExpirationCache()
  localStorage.setItem(`topSongStats-${filter}`, JSON.stringify(topSongStats))
}

function setTopArtistStatsContext(topArtistStats, filter) {
  setExpirationCache()
  localStorage.setItem(`topArtistStats-${filter}`, JSON.stringify(topArtistStats))
}

function setExpirationCache() {
  if (localStorage.getItem('expirationCache') == null) {
    localStorage.setItem('expirationCache', moment().add(30, 'minutes'))
  }
}

function getSearchContext(filter) {
  let expirationTime = localStorage.getItem('expirationCache');
  if (expirationTime != null && isExpiredCache(expirationTime)) {
    clear()
    setExpirationCache()
  }
  return JSON.parse(localStorage.getItem(filter))
}

function clear() {
  localStorage.removeItem('expirationCache')

  localStorage.removeItem('topSong-short_term')
  localStorage.removeItem('topSong-long_term')
  localStorage.removeItem('topSong-medium_term')

  localStorage.removeItem('topArtist-medium_term')
  localStorage.removeItem('topArtist-short_term')
  localStorage.removeItem('topArtist-long_term')

  localStorage.removeItem('topArtistStats-medium_term')
  localStorage.removeItem('topArtistStats-short_term')
  localStorage.removeItem('topArtistStats-long_term')

  localStorage.removeItem('topSongStats-medium_term')
  localStorage.removeItem('topSongStats-short_term')
  localStorage.removeItem('topSongStats-long_term')
}

const isExpiredCache = (date) => {
  console.log(moment(date).isBefore(moment()))
  return moment(date).isBefore(moment());
}

export { 
  setTopArtistContext, 
  setTopArtistStatsContext, 
  setTopSongContext, 
  setTopSongStatsContext,
  getSearchContext
}
