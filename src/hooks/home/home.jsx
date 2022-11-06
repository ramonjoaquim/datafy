import Loading from '../loading/loading'
import Navbar from '../navbar/navbar'
import spotifyLogo from '../../assets/spotify-logo.png'
import './home.css'
import RadioSwitch from '../datafy-search/radio-switch/radio-switch'


const Home = () => {

  const fonts = ['bunnge', 'lecker', 'megrim', 'nabla', 'rennie', 'rubik', 'syncopate']

  function getRandomFont() {
    return fonts[Math.floor(Math.random()*fonts.length)];
  }

  return (
    <>
      <Navbar />
      <RadioSwitch />
      {/* <Loading></Loading> */}

      <div className='card-container'>
        <div className='card-box'>
          <center>
            <div className={`card-title font-${getRandomFont()}`}>My Top artist</div>
          </center>
          <center>
            <img src={spotifyLogo} alt="spotify-logo" className='sotify-logo' />
          </center>
          <center>
            <button type='button' className='btn'>Generate</button>
          </center>
        </div>

        <div className='card-box '>
          <center>
            <div className={`card-title font-${getRandomFont()}`}>My Top Song</div>
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
            <div className={`card-title font-${getRandomFont()}`}># whats next</div>
          </center>
          <center>
            <img src={spotifyLogo} alt="spotify-logo" className='sotify-logo' />
          </center>
          <center>
            <button type='button' className='btn'>Generate</button>
          </center>
        </div>
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