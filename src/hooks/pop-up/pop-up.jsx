import { useState } from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import './pop-up.css'


const PopUp = (props) => {
  const modal = document.getElementById("myModal");
  const [firstHide, setFirstHide] = useState(true);

  window.onclick = (event) => {
    if (event.target === modal) {
      hidePopup()
    }
  }
  
  function hidePopup() {
    props.setPopup(false)
    setFirstHide(false)
  }

  return (
    <div className='popup-background' id='myModal' style={{
        visibility: props.show ? 'visible' : 'hidden',
      }}>
      <div className="popup-content" id="modalContent" style={{
        animation: props.show ? 'slideUp 1s' :  firstHide ? '' : 'slideDown 1s',
        animationTimingFunction: props.show ? 'ease-in' : 'ease-out',
      }}>
        <div>
          <center>
          <header>
            <h2 className='title-popup font-bunge'>{props.title}</h2>
          </header>
          </center>
          <main>
          {props.data}
          </main>
          <footer className='footer-popup'>
            <span onClick={() => hidePopup()}>
              <MdOutlineKeyboardArrowDown size={40} className='icon-arrow-down'/>
            </span>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default PopUp