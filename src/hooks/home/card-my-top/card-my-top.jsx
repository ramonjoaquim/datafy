import './card-my-top.css'
import { useState } from 'react'
//icons
import { TfiArrowCircleLeft, TfiArrowCircleRight } from 'react-icons/tfi'
import { GiSoundWaves } from 'react-icons/gi'
import { BsPersonLinesFill } from 'react-icons/bs'

//background
import black from '../../../assets/my-tops/black-background.jpg'
import black02 from '../../../assets/my-tops/black-02-background.jpg'
import blue from '../../../assets/my-tops/blue-background.jpg'
import blue02 from '../../../assets/my-tops/blue-02-background.jpg'
import glitch from '../../../assets/my-tops/glitch-background.jpg'
import gray from '../../../assets/my-tops/gray-background.jpg'
import xmas from '../../../assets/my-tops/xmas-background.jpg'

const CardMyTop = (props) => {
  const type = {
    artist: <BsPersonLinesFill size={100} className='icon-type-my-top'/>,
    song: <GiSoundWaves size={100} className='icon-type-my-top'/>
  }

  const fonts = ['bunnge', 'lecker', 'megrim', 'nabla', 'rennie', 'rubik', 'syncopate']
  const backgrounds = [black, black02, blue, blue02, glitch, gray, xmas]

  const [background, setBackground] = useState(backgrounds[0])
  const [currentIndexBackground, setCurrentIndexBackground] = useState(0)
  const [backgroundNext, setbackgroundNext] = useState(true)
  const [backgroundPrev, setbackgroundPrev] = useState(true)


  function getRandomFont() {
    return fonts[Math.floor(Math.random()*fonts.length)];
  }

  function changeBackground(position) {
      let index = currentIndexBackground
      if (position === 'right') {
        if (index < 6) {
          index++;
        }
      } else if (index > 0) {
        index--;
      }
      setCurrentIndexBackground(index)
      setBackground(backgrounds[index])
  }

  return (
    <div className='card-box-my-top' style={{
      backgroundImage: `url(${background})`
    }}>
      <center>
        <div className={`card-title font-${getRandomFont()}`}>{props.title}</div>
      </center>
      <center>
        <div className='arrows-change-background'>
          <TfiArrowCircleLeft size={40} className='icon-arrow-left' onClick={() => changeBackground('left')}/>
          {type[props.type]}          
          <TfiArrowCircleRight size={40} className='icon-arrow-right' onClick={() => changeBackground('right')}/>
        </div>
      </center>
      <center>
        <button type='button' className='btn'>Generate</button>
      </center>
    </div>
  )
}

export default CardMyTop