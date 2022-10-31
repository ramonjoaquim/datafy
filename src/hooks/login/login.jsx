import './login.css'
import logoImg from '../../assets/logo.png'
import logoImgHover from '../../assets/logo-hover.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PopUp from '../pop-up/pop-up'
import { Store } from 'react-notifications-component'

const Login = () => {
  const navigate = useNavigate();
  const [changeLogo, setChangeLogo] = useState(0);
  const [popup, setPopup] = useState(false);
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

  function callLogin() {
    navigate('/home')
  }

  function changeLogoOut() {
    setChangeLogo(0)
  }

  function changeLogoIn() {
    setChangeLogo(1)
  }

  function showNotification() {
    Store.addNotification({
      title: "Wonderful!",
      message: "teste my message",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true
      }
    });
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
        <button 
          className='button-login' 
          type='button' 
          onClick={callLogin} 
          onMouseOver={changeLogoIn} 
          onMouseLeave={changeLogoOut}>
            My wrapped
        </button>
        <button 
          className='button-login' 
          type='button' 
          onClick={() => setPopup(true)}
          onMouseOver={changeLogoIn} 
          onMouseLeave={changeLogoOut}>
            Login
        </button>
        <button 
          className='button-login' 
          type='button' 
          onClick={() => showNotification()}>
            test notification
        </button>
      </form>
      <PopUp show={popup} 
             setPopup={setPopup} 
             data={data}
             title='Login'>
      </PopUp>
    </div>
  )  
}

export default Login