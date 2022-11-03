import Loading from '../loading/loading'
import Navbar from '../navbar/navbar'
import spotifyLogo from '../../assets/spotify-logo.png'
import './home.css'

const Home = () => {

  

  return (
<>
<Navbar />
<div className='card-container'>
    <div className='card-box'>
      <center>
        <div className='card-title'>My wrapped</div>
      </center>
      <center>
        <img src={spotifyLogo} alt="spotify-logo" className='sotify-logo' />
      </center>
      <center>
          <button type='button' className='btn'>Generate</button>
      </center>
    </div>

    <div className='card-box blocked-box'>
      <center>
        <div className='card-title'># whats next</div>
      </center>
      <center>
        <img src={spotifyLogo} alt="spotify-logo" className='sotify-logo' />
      </center>
      <center>
          <button type='button' className='btn'>Generate</button>
      </center>
    </div>

    {/* <Loading></Loading> */}
  </div>
</>
  )
}

export default Home