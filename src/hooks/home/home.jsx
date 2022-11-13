import Navbar from '../navbar/navbar'
import RadioSwitch from '../radio-switch/radio-switch'
import CardMyTop from './card-my-top/card-my-top'
import { useState, useEffect } from 'react'
import { getArtists, getTopSongs } from '../../client/spotify-client'
import { setTopArtistContext, setTopSongContext, getSearchContext } from '../../context/search-context'

import './home.css'

const Home = () => {
    const [filter, setFilter] = useState('short_term')
    const [topArtist, setTopArtist] = useState()
    const [topSong, setTopSong] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      getTopArtistFrom()
      getTopSongFrom()
    }, [filter])

    const getTopArtistFrom = () => {
      if (!filter) return

      let fromContext = getSearchContext(`topArtist-${filter}`)
      if (fromContext != null) {
        setTopArtist(fromContext)
        return
      }

      setLoading(true)
      getArtists(filter).then(res => {
        setTopArtist(res.data.items[0])
        setLoading(false)
        setTopArtistContext(res.data.items[0], filter)
      })
    };

    const getTopSongFrom = () => {
      if (!filter) return

      let fromContext = getSearchContext(`topSong-${filter}`)
      if (fromContext != null) {
        setTopSong(fromContext)
        return
      }

      setLoading(true)
      getTopSongs(filter).then(res => {
        setTopSong(res.data.items[0])
        setLoading(false)
        setTopSongContext(res.data.items[0], filter)
      })
    };

    return (
      <>
        <Navbar />
        <RadioSwitch setFilter={setFilter} value={filter}/>
        <div className='card-container'>
          <CardMyTop 
            title={'My Top Arstist'} 
            type={'artist'} 
            artistName={topArtist?.name}
            artistImage={topArtist?.images[0].url}
            loading={loading}
            filter={filter}/>

          <CardMyTop 
            title={'My Top Song'} 
            type={'song'} 
            songName={topSong?.name} 
            songArtist={topSong?.artists[0].name}
            songImage={topSong?.album.images[0].url}
            loading={loading}
            filter={filter}/>

          <CardMyTop 
            title={'My Top 10 Songs'} 
            type={'topSongs'} 
            songName={topSong?.name} 
            songArtist={topSong?.artists[0].name}
            songImage={topSong?.album.images[0].url}
            loading={loading}
            filter={filter}/>

          <CardMyTop 
            title={'My Top 10 Artists'} 
            type={'topArtists'} 
            songName={topSong?.name} 
            songArtist={topSong?.artists[0].name}
            songImage={topSong?.album.images[0].url}
            loading={loading}
            filter={filter}/>

          <CardMyTop 
            title={"My Top 10 Genre's"} 
            type={'topGenres'} 
            songName={topSong?.name} 
            songArtist={topSong?.artists[0].name}
            songImage={topSong?.album.images[0].url}
            loading={loading}
            filter={filter}/>
        </div>
      </>
    )
}

export default Home