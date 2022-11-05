import './login.css'
import logoImg from '../../assets/logo.png'
import logoImgHover from '../../assets/logo-hover.png'
import { useState } from 'react'
import SpotifyLogin from '../spotify/spotify-login'

const Login = () => {
  const [changeLogo, setChangeLogo] = useState(0);
  const logo = [
    {
      title: 'Logo',
      source: logoImg
    },
    {
      title: 'Logo Hover',
      source: logoImgHover
    }
  ]

  function changeLogoOut() {
    setChangeLogo(0)
  }

  function changeLogoIn() {
    setChangeLogo(1)
  }

  let data = <>
    <div>
      <label>Email </label>
      <input type="email"  />
      <br />
      <label htmlFor="">Password</label>
      <input type="password" name="" id="" />
      <button>Log in</button>
    </div>
    <footer>footer</footer>
  </>

  return (
    <div className='login-component'>
      <img className='logoImg' src={logo[changeLogo].source} alt={logo[changeLogo].title} />
      <form>
        <SpotifyLogin changeLogoIn={changeLogoIn} changeLogoOut={changeLogoOut}/>
      </form>
    </div>
  )  
}

export default Login