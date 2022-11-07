import { FaBars, FaArrowUp } from 'react-icons/fa'
import { IoMdExit } from 'react-icons/io'
import { GoHome } from 'react-icons/go'
import { GiMusicSpell } from 'react-icons/gi'
import { NavLink as Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { clearUserContext } from '../../context/user-context'
import './navbar.css'

const Navbar = () => {
    const navigate = useNavigate();
    const [isExpanded, setExpanded] = useState(false);

    setInterval(() => {
      checkWindow();
    }, 500);


    const checkWindow = () => {
      try {
        let width = screen.availWidth;
        let outerWidth = window.outerWidth;
      
        let height = screen.availHeight;
        let outerHeight = window.outerHeight;
        
        if (width === outerWidth && height === outerHeight) {
          unexpandNavBar();
        }
      } catch (_ignored) {}
    }

    const handleResize = () => {
      if (window.innerWidth < 758) {
        unexpandNavBar();
      }
    }

    const handleMenu = () => {
      if (isExpanded) {
        unexpandNavBar();
        setExpanded(false);
      } else {
        expandNavBar();
        setExpanded(true);
      }
    }

    const expandNavBar = () => {
      let nav = document.getElementById('nav');
      nav.style.height = '170px';
      nav.style.transition = 'width 350ms ease-out, height 350ms ease-out';
      let logoNav = document.getElementById('logo-nav-bar');
      logoNav.style.position = 'fixed';
      let navMenuMobile = document.getElementById('nav-menu-mobile');
      setTimeout(() => {
        navMenuMobile.style.display = 'grid';
      }, 500);
    };

    const unexpandNavBar = () => {
      let nav = document.getElementById('nav');
      nav.style.height = '84px';
      let logoNav = document.getElementById('logo-nav-bar');
      logoNav.style.position = '';
      let navMenuMobile = document.getElementById('nav-menu-mobile');
      navMenuMobile.style.display = 'none';
      navMenuMobile.style.transition = 'width 350ms ease-out, height 350ms ease-out';
    };

    const toHome = () => {
      navigate('/home')
    };

    const logout = () => {
      clearUserContext()
      window.location.reload()
    };

    window.addEventListener('resize', handleResize);

    return (
        <div className='nav' id="nav">
          <span className='font-dazzle logo-nav-bar' id='logo-nav-bar' onClick={() => toHome()}>Datafy</span>
          <div className='nav-menu'>
            <Link className='nav-link' activeClassName="active" to='/home'>
              <h4>Home</h4>
            </Link>
            <Link className='nav-link' activeClassName="active" to='/datafy-search'>
              <h4>Datafy stats</h4>
            </Link>
          </div>
          <div className='nav-btn'>
            <Link className='nav-btn-link' onClick={logout}>Sign out</Link>
          </div>

          {/* mobile */}
          {isExpanded 
              ? <FaArrowUp className='bars' onClick={handleMenu} />
              : <FaBars className='bars' onClick={handleMenu}/>
          }

          <div className='nav-menu-mobile' id="nav-menu-mobile">
            <Link className='menu-item' activeClassName="active" to='/home'>
              <GoHome/> Home
            </Link>
            <Link className='menu-item' activeClassName="active" to='/datafy-search'>
             <GiMusicSpell/> Datafy stats
            </Link>
            <Link className='menu-item-label btn-sing-out-mobile' onClick={logout}>
             <IoMdExit/> Sign out
            </Link>
          </div>
          {/* mobile */}
        </div>
      );
}

export default Navbar