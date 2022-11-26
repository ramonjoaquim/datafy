import './login.css'
import SpotifyLogin from '../../spotify/spotify-login'

const Login = () => {

  return (
    <div className='login-component'>
        <span className='font-barcode title-logo' style={{fontSize: '110px'}}>Datafy</span>
      <form className={'form-login'}>
        <SpotifyLogin/>
      </form>
    </div>
  )
}

export default Login