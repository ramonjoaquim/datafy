import { BsPerson } from 'react-icons/bs'
import { GiMusicSpell } from 'react-icons/gi'
import { SiYoutubemusic } from 'react-icons/si'
import { MdOutlinePlayCircleFilled } from 'react-icons/md'
import { getFont } from '../../../context/app-context'
import './card.css'

const Card = (props) => {
  const colors = ['#FCDDB0', '#D58BDD', '#81C6E8', '#ABD9FF', '#FD841F', '#C8B6E2', '#D3EBCD', '#377D71', '#839AA8', '#FBF46D']

  const getRandomColors = () => {
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const type = {
    artist: <BsPerson size={90} />,
    song: <SiYoutubemusic size={90} />,
    genre: <GiMusicSpell size={90} color={getRandomColors()} />
  }

  const playMusic = () => {
    props.setSong(props.song)

  }

  return (
    <section>
      <div className={`${props.clickeable ? 'card-container-home' : 'card-container-home-disabled-click'}  ${props.blocked ? 'blocked-box' : ''}`} onClick={props.onClick} style={{
        animation: 'slideUp 1s',
        animationTimingFunction: 'ease-out',
      }}>
        <div className='card-box-home'>
          <center>
            <div className={`card-title-home font-${getFont()}`}>{props.title}</div>
            <small className='band-name' style={{ display: props.nameBand ?? 'none' }}>({props.nameBand})</small>
          </center>
          <center>
            <div className='icon-card' style={{ marginTop: props.type === 'genre' ? '30px' : '' }}>
              {props.imageUrl ? <>
                <img src={props.imageUrl} className={props.type !== 'song' ? 'img-artist' : 'img-band'} alt="artists photo" />
              </> : type[props.type]}
            </div>
          </center>

        </div>
      </div>
      <div className='container-icon-player' title='Play on Spotify' onClick={() => playMusic()} style={{ display: props.playMusic ? 'block' : 'none' }}>
        <MdOutlinePlayCircleFilled size={45} />
      </div>
    </section>
  )
}

export default Card