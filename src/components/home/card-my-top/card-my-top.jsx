import './card-my-top.css'
import { useState } from 'react'
import Loading from '../../loading/loading'
import Toast from '../../toast/toast'
import PopUp from '../../pop-up/pop-up'
import { getFont } from '../../../context/app-context'
import { drawCanvas } from '../../../canvas/canvas'

//icons
import { GiSoundWaves, GiStarSwirl, GiRollingEnergy, GiBeastEye, GiPlayButton } from 'react-icons/gi'
import { BsPersonLinesFill } from 'react-icons/bs'
import { RiShareFill } from  'react-icons/ri'
import { SiGooglepodcasts } from 'react-icons/si'

//backgrounds-images
import black from '../../../assets/my-tops/black-background.jpg'
import black02 from '../../../assets/my-tops/black-02-background.jpg'
import blue from '../../../assets/my-tops/blue-background.jpg'
import blue02 from '../../../assets/my-tops/blue-02-background.jpg'
import glitch from '../../../assets/my-tops/glitch-background.jpg'
import gray from '../../../assets/my-tops/gray-background.jpg'
import xmas from '../../../assets/my-tops/xmas-background.jpg'

//backgrounds-solids
import solidBlue from '../../../assets/solid-background/blue.png'
import solidBlue02 from '../../../assets/solid-background/blue02.png'
import solidCian from '../../../assets/solid-background/cian.png'
import solidGreen from '../../../assets/solid-background/green.png'
import solidGreen02 from '../../../assets/solid-background/green02.png'
import solidLightPurple from '../../../assets/solid-background/light-purple.png'
import solidPurple from '../../../assets/solid-background/purple.png'

const CardMyTop = (props) => {
  const icon = {
    artist: <BsPersonLinesFill size={100} className='icon-type-my-top'/>,
    song: <GiSoundWaves size={100} className='icon-type-my-top'/>,
    top10Song: <SiGooglepodcasts size={100} className='icon-type-my-top'/>,
    top10Artist: <GiStarSwirl size={100} className='icon-type-my-top'/>,
    top10Genre: <GiRollingEnergy size={100} className='icon-type-my-top'/>,
  }

  const backgrounds = [
    black, 
    black02, 
    blue, 
    blue02, 
    glitch, 
    gray, 
    xmas,
    solidBlue,
    solidBlue02,
    solidCian,
    solidGreen,
    solidGreen02,
    solidLightPurple,
    solidPurple,
  ]

  const [background, setBackground] = useState(backgrounds[0])
  const [currentIndexBackground, setCurrentIndexBackground] = useState(0)
  const [backgroundNext, setbackgroundNext] = useState(true)
  const [backgroundPrev, setbackgroundPrev] = useState(true)
  const [notify, setNotify] = useState(false)
  const [loadingShare, setLoadingShare] = useState(false)
  const [popup, setPopup] = useState(false)
  const [content, setContent] = useState()

  function changeBackground(position) {
      let index = currentIndexBackground
      if (position === 'right') {
        if (index < backgrounds.length-1) {
          index++
          setbackgroundNext(true)
          setbackgroundPrev(true)
        } else {
          setbackgroundNext(false)
        }
      } else if (index > 0) {
        index--
        setbackgroundPrev(true)
        setbackgroundNext(true)
      } else {
        setbackgroundPrev(false)
      }
      setCurrentIndexBackground(index)
      setBackground(backgrounds[index])
  }

  setTimeout(() => {
    const cardBox = Array.from(document.getElementsByClassName('card-box-my-top'))
    cardBox.forEach(card => {
      card.style.animation = 'breath 30s linear infinite'
    })
  }, 4000)

  function generate() {
    if (!props.filter) {
      setNotify(true)
      return
    }

    setLoadingShare(true)
    drawCanvas(props, background, setLoadingShare)
  }

  function preview() {
    if (!props.filter) {
      setNotify(true)
      return
    }

    setContent(<center><Loading color={'whitesmoke'}/></center>)
    drawCanvas(props, background, setLoadingShare, true).then(data => {
      setContent({
        typeContent: 'IMAGE',
        value: data
      })
    })
    setPopup(!popup)
  }
 
  return (
    <><div className='card-box-my-top' style={{
      backgroundImage: `url(${background})`,
      animation: 'slideUp 1s',
      animationTimingFunction: 'ease-out',
    }}>
      <center>
        <div className={`card-title font-${getFont()}`}>{props.title}</div>
      </center>
      {props.loading
        ? <center><Loading /></center>
        : <center>
          <div className={(props.songImage || props.artistImage) ? props.type === 'artist' ? 'text-container-top-artist' : 'text-container-top-song' : ''}>
            <span>
              <h1 className={`font-${getFont()}`} style={{ fontSize: '200%' }}>{props.artistName || props.songName || '#???'}</h1>
            </span>
            <span>
              <h3 className={`font-${getFont()} artist-text`}>{props.songArtist}</h3>
            </span>
          </div>
          <div className='arrows-change-background'>
            <button
              disabled={!backgroundPrev}
              type='button'
              className='btn-card-my-top btn-left'
              onClick={() => changeBackground('left')}>
              <GiPlayButton size={40} className='icon-arrow-left inverted' />
            </button>
            {(props.songImage || props.artistImage)
              ? <img className='imageArtistSong' src={props.songImage ?? props.artistImage} />
              : <div className='fake-art'>
                <span className='fake-top-icon'>
                  {icon[props.type]}
                </span>
              </div>}
            <button
              disabled={!backgroundNext}
              type='button'
              className='btn-card-my-top btn-right'
              onClick={() => changeBackground('right')}>
              <GiPlayButton size={40} className='icon-arrow-right' />
            </button>
          </div>
        </center>}
      <center>
        <button type='button' className='btn btn-generate' disabled={loadingShare} onClick={() => preview()} title="Preview"><GiBeastEye size={30} /></button>
        <button type='button' className='btn btn-generate' disabled={loadingShare} onClick={() => generate()} title="Share"><RiShareFill size={30} /></button>
      </center>
      <canvas id="idCanvas" width="500" height="899"
        style={{
          display: 'none',
          width: '500px',
          height: '899px'
        }} />
      <img id="imgRendered" width={500} height={899} style={{ display: 'none' }} />
      <Toast
        show={notify}
        setNotify={setNotify}
        type={'warn'}
        title={'Ops'}
        message={'Select a period'} />
    </div>
    <PopUp
        show={popup}
        setPopup={setPopup}
        title={'Preview'} 
        data={content}/>
        </>    
  )
}

export default CardMyTop