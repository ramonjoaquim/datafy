import {
    Routes,
    Route,
    useNavigate
} from 'react-router-dom'
import Login from './components/pages/login/login'
import Home from './components/pages/home/home'
import DatafySearch from './components/pages/datafy-stats/datafy-stats'
import Privacy from './components/pages/privacy/privacy'
import About from "./components/pages/about/about";
import DownloadPage from "./components/pages/download/download-page";

// icons
import {SlSocialLinkedin, SlSocialSpotify, SlSocialTwitter, SlSocialGithub} from 'react-icons/sl'
import {BiUpArrow} from 'react-icons/bi'
import PrivateRoute from './components/private-route/private-route'

//fonts
import './fonts/Bungee_Inline/BungeeInline-Regular.ttf'
import './fonts/Leckerli_One/LeckerliOne-Regular.ttf'
import './fonts/Megrim/Megrim-Regular.ttf'
import './fonts/Nabla/Nabla-Regular.ttf'
import './fonts/Reenie_Beanie/ReenieBeanie-Regular.ttf'
import './fonts/Rubik_Dirt/RubikDirt-Regular.ttf'
import './fonts/Syncopate/Syncopate-Regular.ttf'

//style
import './app.css'

export function App() {
    const navigate = useNavigate()
    const socialLinks = {
        linkedin: 'https://www.linkedin.com/in/ramonjoaquimlimas',
        twitter: 'https://twitter.com/shinobidanuvem',
        spotify: 'https://open.spotify.com/user/q5bldk137di87l9q4byprgeec',
        github: 'https://github.com/ramonjoaquim'
    }
    const pixelsLimit = 100


    window.onscroll = () => {
        scrollFunction()
    }

    function scrollFunction() {
        const mybutton = document.getElementById("btnScrollTop")
        mybutton.style.display = document.body.scrollTop > pixelsLimit || document.documentElement.scrollTop > pixelsLimit ? "block" : "none"
    }

    function topFunction() {
        document.body.scrollTop = 0 // For Safari
        document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
    }

    const toDpPage = () => {
        navigate('/dp')
    }

    return (
        <>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="*" element={<Login/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="home" element={<PrivateRoute Component={Home}/>}/>
                <Route path="datafy-stats" element={<PrivateRoute Component={DatafySearch}/>}/>
                <Route path="privacy" element={<PrivateRoute Component={Privacy}/>}/>
                <Route path="about" element={<PrivateRoute Component={About}/>}/>
                <Route path="dp" element={<PrivateRoute Component={DownloadPage}/>}/>
            </Routes>
            <center>
                <div className='footer'>
                    <span>
                      <div style={{
                          display: 'block',
                          marginBottom: '0',
                          marginTop: '20px',
                          justifyContent: 'center',
                      }}>
                          Developed By <span onDoubleClick={() => toDpPage()}>Ramon J. Limas</span>
                      <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className='icon-footer'>
                        <SlSocialLinkedin size={20}/>
                      </a>
                      <a href={socialLinks.spotify} target="_blank" rel="noopener noreferrer" className='icon-footer'>
                        <SlSocialSpotify size={20}/>
                      </a>
                      <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className='icon-footer'>
                        <SlSocialTwitter size={20}/>
                      </a>
                      <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className='icon-footer'>
                        <SlSocialGithub size={20}/>
                      </a>
                      </div>
                    </span>
                </div>
            </center>
            <button type='button' onClick={topFunction} id="btnScrollTop" title="Go to top">
                <BiUpArrow size={20}/>
            </button>
        </>
    )
}
