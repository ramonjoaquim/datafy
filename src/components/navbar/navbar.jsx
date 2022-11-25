import { ImMenu3, ImMenu4 } from 'react-icons/im'
import { NavLink as Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { clearUserContext, getUserContext } from '../../context/user-context'
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md'
import './navbar.css'

const Navbar = () => {
    const navigate = useNavigate()
    const [isExpanded, setExpanded] = useState(false)

    const handleResize = () => {
      if (window.innerWidth < 758) {
        unexpandNavBar()
      }
    }

    const handleMenu = () => {
      if (isExpanded) {
        console.log("recolher")
        unexpandNavBar()
        setExpanded(false)
      } else {
        console.log('expand')
        expandNavBar()
        setExpanded(true)
      }
    }

    const expandNavBar = () => {
      let nav = document.getElementById('nav')
      nav.style.height = '170px'
      nav.style.transition = 'width 350ms ease-out, height 350ms ease-out'
      let logoNav = document.getElementById('logo-nav-bar')
      logoNav.style.position = 'fixed'
      let navMenuMobile = document.getElementById('nav-menu-mobile')
      setTimeout(() => {
        navMenuMobile.style.display = 'flex'
        nav.style.display = 'grid'
        nav.style.justifyContent = 'center'
      }, 500)
    }

    const unexpandNavBar = () => {
      let nav = document.getElementById('nav')
      nav.style.height = '84px'
      let logoNav = document.getElementById('logo-nav-bar')
      logoNav.style.position = ''
      let navMenuMobile = document.getElementById('nav-menu-mobile')
      navMenuMobile.style.display = 'none'
      navMenuMobile.style.transition = 'width 350ms ease-out, height 350ms ease-out'
      nav.style.justifyContent = 'flex-start'
      setExpanded(false)
    }

    const toHome = () => {
      navigate('/home')
    }

    const logout = () => {
      clearUserContext()
      window.location.reload()
    }

    const openProfileContent = () => {
      console.log('click')
      let profileImg = document.getElementById('profileContent')
      let dsp = profileImg.style.display
      profileImg.style.display = dsp == 'block' ? 'none' : 'block'
    }

    const openProfile = () => {
      window.open('https://www.spotify.com/us/account/overview/', '_blank').focus();
    }

    window.addEventListener('resize', handleResize)

    return (
        <div className='nav' id="nav">
          <span className='font-dazzle logo-nav-bar' id='logo-nav-bar' onClick={() => toHome()}>Datafy</span>
          <div className='nav-menu'>
            <Link className='nav-link' activeClassName="active" to='/home'>
              <h4>Home</h4>
            </Link>
            <Link className='nav-link' activeClassName="active" to='/datafy-stats'>
              <h4>Stats</h4>
            </Link>
          </div>
          <div className='nav2'>
            <div className='nav-btn'>
            <img src={getUserContext().userProfileImage} alt="profile image" className='profile-img' onClick={() => openProfileContent()} />
            <span className='font-dazzle profile-name' onClick={() => openProfileContent()}>{getUserContext().userDisplayName}</span>
            <MdArrowDropDown size={25} onClick={() => openProfileContent()}></MdArrowDropDown>
            <div className='profile-content' id="profileContent">
             <ul>
             <MdArrowDropUp className='icon-arrow-up' size={40} onClick={() => openProfileContent()}></MdArrowDropUp>
              <li>
                <Link className='' onClick={() => openProfile()}>Profile</Link>
              </li>
              <hr />
              <li>
                <Link className='' onClick={logout}>Sign out</Link>
              </li>
             </ul>
            </div>
            </div>
          </div>

          {/* mobile */}
          {isExpanded 
              ? <ImMenu4 className='bars' size={50} onClick={handleMenu} />
              : <ImMenu3 className='bars' size={50} onClick={handleMenu}/>
          }

          <div className='nav-menu-mobile' id="nav-menu-mobile">
            <div className='menu-mobile'>
              <Link className='menu-item' activeClassName="active" to='/home'>
                Home
              </Link>
              <Link className='menu-item' activeClassName="active" to='/datafy-stats'>
                Stats
              </Link>
              <Link className='menu-item-label btn-sing-out-mobile' onClick={logout}>
                Sign out
              </Link>
            </div>
          </div>
          {/* mobile */}
        </div>
      )
}

export default Navbar