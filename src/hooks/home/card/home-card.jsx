import { BsPerson } from 'react-icons/bs'
import { GiMusicSpell } from 'react-icons/gi'
import { RiFolderMusicFill } from 'react-icons/ri'

import './home-card.css'

const HomeCard = (props) => {

  const type = {
    artist: <BsPerson size={90}/>,
    song: <GiMusicSpell size={90}/>,
    genre: <RiFolderMusicFill size={90}/>
  }

  return (
    <section>
          <div className={`card-container-home  ${props.blocked ? 'blocked-box' : ''}`}>
            <div className='card-box-home'>
              <center>
                <div className='card-title-home'>{props.title}</div>
              </center>
              <center>
                <div className='icon-card'>
                  {type[props.type]}
                </div>
              </center>
            </div>
            </div>
          </section>
  )
}

export default HomeCard