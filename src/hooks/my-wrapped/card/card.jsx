import { BsPerson } from 'react-icons/bs'
import { GiMusicSpell } from 'react-icons/gi'
import { SiYoutubemusic } from 'react-icons/si'

import './card.css'

const Card = (props) => {

  const fonts = ['bunnge', 'lecker', 'megrim', 'nabla', 'rennie', 'rubik', 'syncopate']
  const colors = ['#FCDDB0', '#D58BDD', '#81C6E8', '#ABD9FF', '#FD841F', '#C8B6E2', '#D3EBCD', '#377D71', '#839AA8', '#FBF46D']

  const type = {
    artist: <BsPerson size={90}/>,
    song: <SiYoutubemusic size={90}/>,
    genre: <GiMusicSpell size={90} color={getRandomColors()}/>
  }

  function getRandomFont() {
    return fonts[Math.floor(Math.random()*fonts.length)];
  }

  function getRandomColors() {
    return colors[Math.floor(Math.random()*colors.length)];
  }

  return (
    <section>
          <div className={`card-container-home  ${props.blocked ? 'blocked-box' : ''}`} onClick={props.onClick}>
            <div className='card-box-home'>
              <center>
                <div className={`card-title-home font-${getRandomFont()}`}>{props.title}</div>
                <small className='band-name' style={{display: props.nameBand ?? 'none'}}>({props.nameBand})</small>
              </center>
              <center>
                <div className='icon-card' style={{marginTop: props.type === 'genre' ? '30px' : ''}}>
                  {props.imageUrl ? <>
                    <img src={props.imageUrl} className={props.type !== 'song' ? 'img-artist' : 'img-band'} alt="artists photo" />
                    </> : type[props.type]}
                    </div>
              </center>
            </div>
            </div>
          </section>
  )
}

export default Card