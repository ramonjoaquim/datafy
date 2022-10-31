
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import './pop-up.css'


const PopUp = (props) => {
  const modal = document.getElementById("myModal");

  window.onclick = (event) => {
    if (event.target === modal) {
      props.setPopup(false)
    }
  } 

  return (
    <>
    <div className='popup-background' id='myModal' style={{
        visibility: props.show ? 'visible' : 'hidden',
      }}>
      <div className="popup-content" id="modalContent" style={{
        animation: props.show ? 'slideUp 1s' : 'slideDown 1s',
        animationTimingFunction: props.show ? 'ease-in' : 'ease-out',
      }}>
        <div>
          <header>
            <h3 className='title-popup'>{props.title}</h3>
          </header>
          <main>
          {props.data}
          </main>
          <footer className='footer'>
            <span onClick={() => props.setPopup(false)}>
              <MdOutlineKeyboardArrowDown size={40} className='icon-arrow-down'/>
            </span>
          </footer>
        </div>
      </div>
    </div>
    </>
  )
}

export default PopUp