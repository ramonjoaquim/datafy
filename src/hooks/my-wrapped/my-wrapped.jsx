import Navbar from '../navbar/navbar'
import HomeCard from '../home/card/home-card'
import './my-wrapped.css'
import RadioSwitch from './radio-switch/radio-switch'

const MyWrapped = () => {

  const bandNames = ['Beach Bunny', 'Drake', 'Slipknot', 'Foo Fighters', 'Eminem', 'Snoop Dog', 'Daughter', '50 Cent', 'Halo', 'Ice cube']
  const songNames = ['Stress', 'Nobody knows', 'Issa Vibe', 'Have me all', 'All on me', 'Show me', 'Can you', 'Lemon', 'Body flow']
  const genreNames = ['Pop', 'Rock', 'Eletronic', 'Indie', 'Indie Rock', 'lofi', 'house', 'EDM', 'funk', 'Country', 'Jazz']
  
  function getRandomBandName() {
    return bandNames[Math.floor(Math.random()*bandNames.length)];
  }

  function getRandomSongsdName() {
    return songNames[Math.floor(Math.random()*songNames.length)];
  }

  function getRandomGenreName() {
    return genreNames[Math.floor(Math.random()*genreNames.length)];
  }

return (
  <>
      <Navbar />
      <RadioSwitch/>
      <div className='box-home'>
        <h2>Top Artist's</h2>
        <section className='box-section'>
          {Array.apply(0, Array(2)).map(() => <HomeCard title={getRandomBandName()} type='artist' blocked={true}></HomeCard>)}
        </section>
        <h2>Top Song's</h2>
        <section className='box-section'>
        {Array.apply(0, Array(4)).map(() => <HomeCard title={getRandomSongsdName()} type='song' blocked={true}></HomeCard>)}
        </section>
        <h2>Top genres's</h2>
        <section className='box-section'>
        {Array.apply(0, Array(6)).map(() => <HomeCard title={getRandomGenreName()} type='genre' blocked={true}></HomeCard>)}
        </section>
      </div>
    </>
)
}

export default MyWrapped