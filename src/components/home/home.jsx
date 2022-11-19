import Navbar from '../navbar/navbar'
import RadioSwitch from '../radio-switch/radio-switch'
import CardMyTop from './card-my-top/card-my-top'
import { useState, useEffect } from 'react'
import { getArtists, getTopSongs } from '../../client/spotify-client'
import { 
  setTopArtistContext, 
  setTopSongContext, 
  setTop10SongContext,
  setTop10ArtistsContext, 
  getSearchContext 
} from '../../context/search-context'

import './home.css'

const Home = () => {
    const [filter, setFilter] = useState('short_term')
    const [topArtist, setTopArtist] = useState()
    const [topSong, setTopSong] = useState()
    const [top10Song, setTop10Song] = useState([])
    const [top10Artist, setTop10Artist] = useState([])
    const [top10Genre, setTop10Genre] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      getTopArtistFrom()
      getTop10ArtistsFrom()
      
      getTopSongFrom()
      getTop10SongFrom()
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
    }

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
    }

    const getTop10SongFrom = () => {
      if (!filter) return

      let fromContext = getSearchContext(`top10Song-${filter}`)
      if (fromContext != null) {
        setTop10Song(fromContext)
        return
      }

      setLoading(true)
      getTopSongs(filter).then(res => {
        setTop10Song(res.data.items)
        setLoading(false)
        setTop10SongContext(res.data.items, filter)
      })
    }

    const getTop10ArtistsFrom = () => {
      if (!filter) return

      let fromContext = getSearchContext(`top10Artists-${filter}`)
      if (fromContext != null) {
        setTop10Artist(fromContext)
        getTopGenres(fromContext)
        return
      }

      setLoading(true)
      getArtists(filter).then(res => {
        setTop10Artist(res.data.items)
        getTopGenres(res.data.items)
        setLoading(false)
        setTop10ArtistsContext(res.data.items, filter)
      })
    }

    const getTopGenres = artists => {
      let genresMap = artists.map(a => a.genres)
      let allGenres = []
      genresMap.forEach(genres => allGenres.push(genres[0]));
      let allSingleGenres = allGenres.filter((value, index, array) => array.indexOf(value) === index)
      let ten = allSingleGenres.slice(0, 10)
      setTop10Genre(ten)
    }

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
            type={'top10Song'} 
            top10Song={top10Song}
            loading={loading}
            filter={filter}/>

          <CardMyTop 
            title={'My Top 10 Artists'} 
            type={'top10Artist'} 
            top10Artist={top10Artist}
            loading={loading}
            filter={filter}/>

          <CardMyTop 
            title={"My Top 10 Genre's"} 
            type={'top10Genre'} 
            top10Genre={top10Genre}
            loading={loading}
            filter={filter}/>
        </div>
      </>
    )
}

export default Home