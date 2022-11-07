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
import Loading from '../../loading/loading'

const CardMyTop = (props) => {
  const icon = {
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
          setbackgroundNext(true)
          setbackgroundPrev(true)
        } else {
          setbackgroundNext(false)
        }
      } else if (index > 0) {
        index--;
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
  }, 4000);

  function draw() {
    const canvas = document.getElementById('idCanvas');
    const context = canvas.getContext('2d');
    const imageObj = new Image();

    imageObj.onload = () => {
      context.drawImage(imageObj, 0, 0);
      // context.textAlign = "center";
      // context.textBaseline = "middle"; 


      //title Datafy
      context.font = "70px Dazzle";
      context.fillStyle = "whitesmoke";
      context.fillText("DataFy", 150, 100);


      //title Card type
      context.font = "40px Dazzle";
      context.fillText("My Top Artist", 130, 200);

      //title artist name
      context.font = "40px Dazzle";
      context.fillText(props.artistName, 150, 300);

      //insert cover


      //download
      const canvas = document.getElementById('idCanvas');
      const dataURL = canvas.toDataURL();

      function download(dataurl, filename) {
        const link = document.createElement("a");
        link.href = dataurl;
        link.download = filename;
        link.click();
      }
      
      download(dataURL, "datafy.png");
    }

    imageObj.setAttribute('crossOrigin', 'anonymous');
    imageObj.src = background;
}

  function generate() {
    draw()
  }

  return (
    <div className='card-box-my-top' style={{
      backgroundImage: `url(${background})`,
      animation: 'slideUp 1s',
      animationTimingFunction: 'ease-out',
    }}>
      <center>
        <div className={`card-title font-${getRandomFont()}`}>{props.title}</div>
      </center>
      {
      
        props.loading 
        ? <center><Loading/></center> 
        : <center>
            <div className={(props.songImage || props.artistImage) ? props.type === 'artist' ? 'text-container-top-artist' : 'text-container-top-song' : ''}>
              <span>
                <h1 className='font-bunge'>{props.artistName || props.songName}</h1>
              </span>
              <span>
                <h3 className='font-bunge artist-text'>{props.songArtist}</h3>
              </span>
            </div>
            <div className='arrows-change-background'>
              <button 
                disabled={!backgroundPrev} 
                type='button' 
                className='btn-card-my-top btn-left' 
                onClick={() => changeBackground('left')}>
                <TfiArrowCircleLeft size={40} className='icon-arrow-left'/>
              </button>
              { (props.songImage || props.artistImage) 
                ? <img className='imageArtistSong' src={props.songImage ?? props.artistImage} /> 
                : icon[props.type]}          
              <button 
                disabled={!backgroundNext} 
                type='button' 
                className='btn-card-my-top btn-right' 
                onClick={() => changeBackground('right')}>
                <TfiArrowCircleRight size={40} className='icon-arrow-right'/>
              </button>
            </div>
          </center>
      }
      <center>
        <button type='button' className='btn btn-generate' onClick={() => generate()}>Generate</button>
      </center>
      <canvas id="idCanvas" width="500" height="899" style={{
        display: 'none',
        width: '500px',
        height: '500px'}}>
      </canvas>  
    </div>
  )
}

export default CardMyTop