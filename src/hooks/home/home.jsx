import Loading from '../loading/loading'
import Navbar from '../navbar/navbar'
import RadioSwitch from '../datafy-search/radio-switch/radio-switch'
import CardMyTop from './card-my-top/card-my-top'
import { useState, useEffect } from 'react'
import { getArtists, getTopSongs } from '../../client/spotify-client'

import './home.css'


const Home = () => {
  const [filter, setFilter] = useState('')
  const [topArtist, setTopArtist] = useState()
  const [topSong, setTopSong] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getTopArtistFrom()
    getTopSongFrom()
  }, [filter])
  
  function getTopArtistFrom() {
    if (!filter) return
    setLoading(true)
    getArtists(filter).then(res => {
      setTopArtist(res.data.items[0])
      setLoading(false)
    })
  }

  function getTopSongFrom() {
    if (!filter) return
    setLoading(true)
    getTopSongs(filter).then(res => {
      setTopSong(res.data.items[0])
      setLoading(false)
    })
  }

  return (
    <>
      <Navbar />
      <RadioSwitch setFilter={setFilter} />
      <div className='card-container'>
        <CardMyTop 
          title={'My Top Arstist'} 
          type={'artist'} 
          artistName={topArtist?.name}
          artistImage={topArtist?.images[0].url}
          loading={loading}/>

        <CardMyTop 
          title={'My Top Song'} 
          type={'song'} 
          songName={topSong?.name} 
          songArtist={topSong?.artists[0].name}
          songImage={topSong?.album.images[0].url}
          loading={loading}/>
        
        {/* <Toast 
          show={notify}
          setNotify={setNotify}
          type={'hi'}
          title={'Hi!'}
          message={'Select a period (last month / 6 months / all time)'} /> */}
      </div>
    </>
  )
}

export default Home