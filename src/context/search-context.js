import moment from "moment"
import { encryptStorage } from "../utils/storage"

const isExpiredCache = (date) => {
  return moment(date).isBefore(moment())
}

function setTopArtistContext(topArtist, filter) {
  setExpirationCache()
  encryptStorage.setItem(`topArtist-${filter}`, JSON.stringify(topArtist))
}

function setTopSongContext(topSong, filter) {
  setExpirationCache()
  encryptStorage.setItem(`topSong-${filter}`, JSON.stringify(topSong))
}

function setTopSongStatsContext(topSongStats, filter) {
  setExpirationCache()
  encryptStorage.setItem(`topSongStats-${filter}`, JSON.stringify(topSongStats))
}

function setTopArtistStatsContext(topArtistStats, filter) {
  setExpirationCache()
  encryptStorage.setItem(`topArtistStats-${filter}`, JSON.stringify(topArtistStats))
}

function setExpirationCache() {
  if (encryptStorage.getItem('expirationCache') == null) {
    encryptStorage.setItem('expirationCache', moment().add(30, 'minutes'))
  }
}

function getSearchContext(filter) {
  const expirationTime = encryptStorage.getItem('expirationCache')
  if (expirationTime != null && isExpiredCache(expirationTime)) {
    clear()
    setExpirationCache()
  }
  const storageItem = encryptStorage.getItem(filter)
  return storageItem ?? null
}

function clear() {
  encryptStorage.removeItem('expirationCache')

  encryptStorage.removeItem('topSong-short_term')
  encryptStorage.removeItem('topSong-long_term')
  encryptStorage.removeItem('topSong-medium_term')

  encryptStorage.removeItem('topArtist-medium_term')
  encryptStorage.removeItem('topArtist-short_term')
  encryptStorage.removeItem('topArtist-long_term')

  encryptStorage.removeItem('topArtistStats-medium_term')
  encryptStorage.removeItem('topArtistStats-short_term')
  encryptStorage.removeItem('topArtistStats-long_term')

  encryptStorage.removeItem('topSongStats-medium_term')
  encryptStorage.removeItem('topSongStats-short_term')
  encryptStorage.removeItem('topSongStats-long_term')
}

export { 
  setTopArtistContext, 
  setTopArtistStatsContext, 
  setTopSongContext, 
  setTopSongStatsContext,
  getSearchContext
}
