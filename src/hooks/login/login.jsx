import './login.css'
import SpotifyLogin from '../spotify/spotify-login'

const Login = () => {

  return (
    <div className='login-component'>
        <span className='font-dazzle title-logo' style={{fontSize: '110px'}}>Datafy</span>
      <form style={{marginTop: '5%'}}>
        <SpotifyLogin/>
      </form>
    </div>
  )  
}

export default Login