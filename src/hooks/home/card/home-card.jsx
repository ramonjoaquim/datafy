import spotifyLogo from '../../../assets/spotify-logo.png'
import './home-card.css'

const HomeCard = () => {

  return (
    <section>
          <div className='card-container-home'>
            <div className='card-box-home'>
              <center>
                <div className='card-title-home'>Drake</div>
              </center>
              <center>
                <img src={spotifyLogo} alt="spotify-logo" className='sotify-logo-home' />
              </center>
            </div>
            </div>
          </section>
  )
}

export default HomeCard