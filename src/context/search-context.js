function setTopArtistContext(topArtist, filter) {
  localStorage.setItem(`topArtist-${filter}`, JSON.stringify(topArtist))
}

function setTopSongContext(topSong, filter) {
  localStorage.setItem(`topSong-${filter}`, JSON.stringify(topSong))
}

function setTopSongStatsContext(topSongStats, filter) {
  localStorage.setItem(`topSongStats-${filter}`, JSON.stringify(topSongStats))
}

function setTopArtistStatsContext(topArtistStats, filter) {
  localStorage.setItem(`topArtistStats-${filter}`, JSON.stringify(topArtistStats))
}

function getSearchContext(filter) {
  return JSON.parse(localStorage.getItem(filter))
}


export { 
  setTopArtistContext, 
  setTopArtistStatsContext, 
  setTopSongContext, 
  setTopSongStatsContext,
  getSearchContext
}
