import Navbar from '../navbar/navbar'
import spotifyLogo from '../../assets/spotify-logo.png'
import './my-wrapped.css'

const MyWrapped = () => {

return (
  <>
    <Navbar />
    <div className='card-container'>
        <div className='card-box'>
          <center>
            <div className='card-title'># First wrapped</div>
          </center>
          <center>
            <img src={spotifyLogo} alt="spotify-logo" className='sotify-logo' />
          </center>
          <center>
            <div>
              <button type='button' className='btn'>Generate</button>
            </div>
          </center>
        </div>

        <div className='card-box blocked-box'>
          <center>
            <div className='card-title'># blocked wrapped</div>
          </center>
          <center>
            <img src={spotifyLogo} alt="spotify-logo" className='sotify-logo' />
          </center>
          <center>
            <div>
              <button type='button' className='btn'>Generate</button>
            </div>
          </center>
        </div>

        {/* <Loading></Loading> */}
      </div>
  </>
)
}

export default MyWrapped