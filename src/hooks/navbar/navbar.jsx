import { FaBars } from 'react-icons/fa'
import { IoMdExit } from 'react-icons/io'
import { GoHome } from 'react-icons/go'
import { GiMusicSpell } from 'react-icons/gi'
import { NavLink as Link, useNavigate } from 'react-router-dom'

import logoImg from '../../assets/logo.png'
import './navbar.css'

const Navbar = () => {
  const navigate = useNavigate();
  let isExpanded = false;

  window.addEventListener('resize', handleResize);

  setInterval(() => {
    checkWindow();
  }, 500);


  function checkWindow() {
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

  function handleResize() {
    if (window.innerWidth < 758) {
      unexpandNavBar();
    }
  }

  function handleMenu() {
    if (isExpanded) {
      unexpandNavBar();
      isExpanded = false;
    } else {
      expandNavBar();
     isExpanded = true;
    }
  }

  function expandNavBar() {
    let nav = document.getElementById('nav');
    nav.style.height = '170px';
    nav.style.transition = 'width 350ms ease-out, height 350ms ease-out';
    let logoNav = document.getElementById('logo-nav-bar');
    logoNav.style.position = 'fixed';
    let navMenuMobile = document.getElementById('nav-menu-mobile');
    setTimeout(() => {
      navMenuMobile.style.display = 'grid';
    }, 500);
  }

  function unexpandNavBar() {
    let nav = document.getElementById('nav');
    nav.style.height = '84px';
    let logoNav = document.getElementById('logo-nav-bar');
    logoNav.style.position = '';
    let navMenuMobile = document.getElementById('nav-menu-mobile');
    navMenuMobile.style.display = 'none';
    navMenuMobile.style.transition = 'width 350ms ease-out, height 350ms ease-out';
  }

  function toHome() {
    navigate('/home')
  }

  return (
      <> 
        <div className='nav' id="nav">
          <img src={logoImg} className="logo-nav-bar" id="logo-nav-bar" onClick={toHome} alt="logo spotify wrapped" />
          <FaBars className='bars' onClick={handleMenu} />
          <div className='nav-menu'>
            <Link className='nav-link' to='/home' activeStyle>
              Home
            </Link>
            <Link className='nav-link' to='/my-wrapped' activeStyle>
              my wrapped
            </Link>
          </div>

          {/* mobile */}
          <div className='nav-menu-mobile' id="nav-menu-mobile">
            <Link className='menu-item' to='/home' activeStyle>
              <GoHome/> Home
            </Link>
            <Link className='menu-item' to='/my-wrapped' activeStyle>
             <GiMusicSpell/> My wrapped
            </Link>
            <Link className='menu-item-label btn-sing-out-mobile' to='/login' activeStyle>
             <IoMdExit/> Sign out
            </Link>
          </div>
          {/* mobile */}
          <div className='nav-btn'>
            <Link className='nav-btn-link' to='/login'>Sign out</Link>
          </div>
        </div>
      </>
    );
}

export default Navbar