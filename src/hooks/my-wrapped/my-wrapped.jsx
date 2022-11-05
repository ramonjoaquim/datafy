import Navbar from '../navbar/navbar'
import Card from './card/card'
import './my-wrapped.css'
import RadioSwitch from './radio-switch/radio-switch'
import PopUp from '../pop-up/pop-up'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { getUserContext } from '../../context/user-context'
import Loading from '../loading/loading'
import Toast from '../toast/toast'

const MyWrapped = () => {
  const genreNames = ['Pop', 'Rock', 'Eletronic', 'Indie', 'Indie Rock', 'lofi']
  const bandNames = ['Beach Bunny', 'Drake', 'Slipknot', 'Foo Fighters', 'Eminem', 'Snoop Dog', 'Daughter', '50 Cent', 'Halo', 'Ice cube']
  const songNames = ['Stress', 'Nobody knows', 'Issa Vibe', 'Have me all', 'All on me', 'Show me', 'Can you', 'Lemon', 'Body flow']

  const [topArtists, setTopArtists] = useState([1, 2])
  const [topGenres, setTopGenres] = useState(genreNames)
  const [defaultGenre, setDefaultGenre] = useState(true)
  const [topSongs, setTopSongs] = useState([1,2,3,4])
  const [topTracksArtist, setTopTracksArtist] = useState([])
  const [filter, setFilter] = useState('')
  const [loadingArtist, setLoadingArtist] = useState(false)
  const [loadingSong, setloadingSong] = useState(false)
  const [loadingTopTracksArtists, setLoadingTopTracksArtists] = useState(false)
  const [popup, setPopup] = useState(false);
  const [titleArtist, setTitleArtist] = useState('');
  const [content, setContent] = useState('');
  const [notify, setNotify] = useState(false);

  useEffect(() => {
    getTopArtist(filter)
    getTopSongs(filter)
  }, [filter])

  function selectArtist(artist) {
    setPopup(!popup)
    setTitleArtist(artist.name)
    getTopTracksArtist(artist.id)
  }

  function getRandomBandName() {
    return bandNames[Math.floor(Math.random()*bandNames.length)];
  }

  function getRandomSongsdName() {
    return songNames[Math.floor(Math.random()*songNames.length)];
  }

  function getTopArtist(filter) {
    if (!filter) return;
    setLoadingArtist(true)
    axios.get('https://api.spotify.com/v1/me/top/artists', {
      params: {
        time_range: filter,
        limit: 10,
        offset: 0
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getUserContext().accessToken}`
      }
    }).then(res => {
      setTopArtists(res.data.items)
      getTopGenres(res.data.items)
      setLoadingArtist(false)
    })
  }

  function getTopTracksArtist(idArtist) {
    if (!idArtist) return;
    setLoadingTopTracksArtists(true)
    axios.get(`https://api.spotify.com/v1/artists/${idArtist}/top-tracks`, {
      params: {
        market: getUserContext().market
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getUserContext().accessToken}`
      }
    }).then(res => {
      setTopTracksArtist(res.data.tracks)
      setContent(<>
        <center>Top tracks</center>
        <center> {loadingTopTracksArtists 
              ? <Loading color={'white'}/> 
              : <>
                {Array.apply(0, topTracksArtist).map((track) => 
                  <span>{track.name}</span>
                )}              
              </>}
        </center>
          </>)
      setLoadingTopTracksArtists(false)
    })
  }

  function getTopSongs(filter) {
    if (!filter) return;
    setloadingSong(true)
    axios.get('https://api.spotify.com/v1/me/top/tracks', {
      params: {
        time_range: filter,
        limit: 10,
        offset: 0
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getUserContext().accessToken}`
      }
    }).then(res => {
      setTopSongs(res.data.items)
      setloadingSong(false)
      setDefaultGenre(false)
    })
  }

  function getTopGenres(artists) {
    let genresMap = artists.map(a => a.genres)
    let allGenres = genresMap.reduce((prev, next) => prev.concat(next));
    let allSingleGenres = allGenres.filter((value, index, array) => array.indexOf(value) === index);
    let ten = allSingleGenres.slice(0, 10)
    setTopGenres(ten)
  }

  return (
    <>
        <Navbar />
        <RadioSwitch setFilter={setFilter}/>
        <div className='box-home'>
          <h2>Top Artist's <small className='label-order'>(Most to least)</small></h2>
          <section className='box-section'>
          {loadingArtist ? <Loading/> : Array.apply(0, topArtists).map((artist) => 
             <Card title={artist.name ?? getRandomBandName()} 
                  type='artist' 
                  imageUrl={artist.id ? artist.images[0].url : null} 
                  blocked={!artist.id}
                  onClick={() => selectArtist(artist)}/>
           )}
          </section>
          <h2>Top Song's <small className='label-order'>(Most to least)</small></h2>
          <section className='box-section'>
          {loadingSong ? <Loading/> : Array.apply(0, topSongs).map((song) => 
             <Card title={song.name ?? getRandomSongsdName()} 
                  nameBand={song.artists ? song.artists[0].name : null}
                  type='song' 
                  imageUrl={song.id ? song.album.images[0].url : null} 
                  blocked={!song.id}/>
           )}
          </section>
          <h2>Top genres's</h2>
          <section className='box-section' style={{cursor: 'none'}}>
          {loadingSong ? <Loading/> : Array.apply(0, topGenres).map((genre) => 
             <Card title={genre} type='genre' blocked={defaultGenre}/>
           )}
          </section>
        </div>

        <PopUp 
          show={popup} 
          setPopup={setPopup} 
          title={titleArtist}
          data={content} />

        <Toast 
          show={notify}
          setNotify={setNotify}
          type={'hi'}
          title={'Hi!'}
          message={'Select a period (last month / 6 months / all time)'} />
      </>
  )
}

export default MyWrapped