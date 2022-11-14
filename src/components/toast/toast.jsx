import { CgClose } from 'react-icons/cg'
import { MdDoneAll } from 'react-icons/md'
import { ImWarning, ImHappy } from 'react-icons/im'
import { SlClose } from 'react-icons/sl'
import { BsInfoLg } from 'react-icons/bs'

import './toast.css'

const Toast = props => {

  const background = {
    success: '#82c294',
    warn: '#dda339d9',
    error: '#cc3838',
    info: '#1e93cc',
    hi: '#444941'
  }

  const icons = {
    success: <MdDoneAll size={35}/>,
    warn: <ImWarning size={35}/>,
    error: <SlClose size={35}/>,
    info: <BsInfoLg size={35}/>,
    hi: <ImHappy size={35}/>,
  }

  if (props.autoCloseable) setTimeout(() => {
    if (props.show) props.setNotify(false)
  }, 5000); else setTimeout(() => {
    if (props.show) props.setNotify(false)
  }, 10_000);

  return (
      <div className={`notification-container ${props.show ? 'top-right' : 'top-left'}`} style={{
        visibility: props.show ? 'visible' : 'hidden'
        }}>
        <div 
            className={`notification toast top-right`}
            style={{ backgroundColor: props.type ? background[props.type] : background.success }}>
            <button onClick={() => props.setNotify(false)}>
                <CgClose/>
            </button>
            <div className="notification-image">
              {icons[props.type]}
            </div>
            <div>
                <p className="notification-title">{props.title || ''}</p>
                <p className="notification-message">{props.message || ''}</p>
            </div>
        </div>
      </div>
  )
}

export default Toast
