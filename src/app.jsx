import './app.css'
import {
  BrowserRouter, 
  Routes,
  Route,
} from 'react-router-dom'
import Login from './hooks/login/login'
import Home from './hooks/home/home'
import MyWrapped from './hooks/my-wrapped/my-wrapped'

// icons
import { SlSocialLinkedin, SlSocialSpotify, SlSocialTwitter, SlSocialGithub} from 'react-icons/sl'

export function App() {

  const socialLinks = {
    linkedin: 'https://www.linkedin.com/in/ramonjoaquimlimas',
    twitter: 'https://twitter.com/shinobidanuvem',
    spotify: 'https://open.spotify.com/user/q5bldk137di87l9q4byprgeec',
    github: 'https://github.com/ramonjoaquim'
  }

  return (
    <>
      <BrowserRouter basename='/spotify-wrapped/'>
        <Routes>
          <Route path="*" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="my-wrapped" element={<MyWrapped />} />
        </Routes>
      </BrowserRouter>
      <div className='footer'>
        <span>
          <div style={{
            display: 'flex',
            columnGap: '30px',
            marginBottom: '20px',
            marginTop: '5px'
          }}>
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className='icon-footer'>
            <SlSocialLinkedin size={26}/>
          </a>
          <a href={socialLinks.spotify} target="_blank" rel="noopener noreferrer" className='icon-footer'>
            <SlSocialSpotify size={26}/> 
          </a>
          <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className='icon-footer'>
            <SlSocialTwitter size={30}/>
          </a>
          <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className='icon-footer'>
            <SlSocialGithub size={30}/>
          </a>
          </div>
        </span>
      </div>
    </>
  )
}
