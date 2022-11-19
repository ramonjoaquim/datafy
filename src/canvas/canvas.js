import { getFont } from "../context/app-context"
import { getUserContext } from "../context/user-context"

const centerVertically = 250

const FONT = getFont()

function roundedImage(context, x,y,width,height,radius) {
  context.beginPath()
  context.moveTo(x + radius, y)
  context.lineTo(x + width - radius, y)
  context.quadraticCurveTo(x + width, y, x + width, y + radius)
  context.lineTo(x + width, y + height - radius)
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  context.lineTo(x + radius, y + height)
  context.quadraticCurveTo(x, y + height, x, y + height - radius)
  context.lineTo(x, y + radius)
  context.quadraticCurveTo(x, y, x + radius, y)
  context.closePath()
}

async function shareImage(data) {
  const response = await fetch(data)
  const blob = await response.blob()
  const filesArray = [
    new File(
      [blob],
      'datafy.png',
      {
        type: "image/png",
        lastModified: new Date().getTime()
      }
   )
  ]
  const shareData = {
    files: filesArray,
  }
  navigator.share(shareData)
}

function download(dataurl, filename) {
  const link = document.createElement("a")
  link.href = dataurl
  link.download = filename
  link.click()
}

function drawImageOnCanvas(src, width, height, radius = 10) {
  const canvas = document.getElementById('idCanvas')
  const ctx = canvas.getContext('2d')
  const imageObj = new Image()

  imageObj.onload = () => {
    ctx.save()
    roundedImage(ctx, width, height, imageObj.width/2, imageObj.height/2, radius)
    ctx.clip()
    ctx.drawImage(imageObj, width, height, imageObj.width/2, imageObj.height/2)
    ctx.restore()
  }

  imageObj.setAttribute('crossOrigin', 'anonymous')
  imageObj.src = src

  return imageObj
}

function drawImageOnCanvasProfile(src, width, height, radius = 50) {
  const canvas = document.getElementById('idCanvas')
  const ctx = canvas.getContext('2d')
  const imageObj = new Image()

  imageObj.onload = () => {
    let _width = 70
    let _height = 70
    ctx.save()
    roundedImage(ctx, width, height, _width, _height, radius)
    ctx.clip()
    ctx.drawImage(imageObj, width, height, _width, _height)
    ctx.restore()
  }

  imageObj.setAttribute('crossOrigin', 'anonymous')
  imageObj.src = src

  return imageObj
}

function formatFilterSelected(props) {
  if (props.filter === 'short_term') {
    return `This month`
  } else if (props.filter === 'medium_term') {
    return `Last 6 month's`
  } else {
    return 'All time'
  }
}

function getArtistsNames(artists) {
  return artists.map(a => a.name).join(', ')
}

function getTop10Song(props) {
  return props.top10Song.map(song => ({name: song.name, artist: getArtistsNames(song.artists)}))
}

function getTop10Artist(props) {
  return props.top10Artist.map(artist => ({name: artist.name, popularity: artist.popularity}))
}

function buildBodyMyTop(context, props) {
  //title Card type
  context.font = `45px ${FONT}`
  context.fillText(props.type === 'artist' ? 'My Top Artist' : 'My Top Song', centerVertically, 310)

  // title range filter 
  context.font = `20px ${FONT}`
  context.fillText(`(${formatFilterSelected(props)})`, centerVertically, props.type === 'artist' ? 770 : 800)

  //title artist/song name
  context.font = `40px ${FONT}`
  context.fillText(props.type === 'artist' ? props.artistName : props.songName, centerVertically, 700)

  //text by band
  if (props.type === 'song') {
    context.font = `20px ${FONT}`
    context.fillText('By', centerVertically, 740)

    context.font = `20px ${FONT}`
    context.fillText(props.songArtist, centerVertically, 770)
  }

  //insert image from artist/song
  let img = props.type === 'artist' ? drawImageOnCanvas(props.artistImage, 100, 350) : drawImageOnCanvas(props.songImage, 100, 350)
  context.drawImage(img, 500, 500)
}

function buildBodyMyTop10(context, props) {
  const limitSongName = (song) => {
    if (song.length > 30) {
      return `${song.substr(0, 30)}...`
    } else {
      return song
    }
  }
  const limitBandName = (song, artists) => {
    if (artists.length > 10 && song.length > 30) {
      return `${artists.substr(0, 20)}...`
    } else {
      return artists
    }
  }
  //title Card type
  context.font = `45px ${FONT}`
  context.fillText(props.type === 'top10Song' ? "My Top 10 Songs" : props.type === 'top10Artist' ? "My Top 10 Artists" : "My Top 10 Genres", centerVertically, 310)

  context.font = `20px ${FONT}`
  let initialPosition = 360

  if (props.top10Song) {
    let songs = getTop10Song(props)
    songs.forEach(song => {
      context.fillText(`${limitSongName(song.name)} - ${limitBandName(song.name, song.artist)}`, centerVertically, initialPosition)
      initialPosition += 30
    });
  }

  if (props.top10Artist) {
    let artists = getTop10Artist(props)
    artists.forEach(artist => {
      context.fillText(`${artist.name}`, centerVertically, initialPosition)
      initialPosition += 30
    });
  }

  if (props.top10Genre) {
    let genres = props.top10Genre
    genres.forEach(genre => {
      context.fillText(`${genre}`, centerVertically, initialPosition)
      initialPosition += 30
    });
  }

  context.font = `20px ${FONT}`
  context.fillText(`(${formatFilterSelected(props)})`, centerVertically, 750)
}

function drawCanvas(props, background, setLoadingShare, callbackPromise = false) {
  const canvas = document.getElementById('idCanvas')
  const context = canvas.getContext('2d')
  const imageObj = new Image()

  imageObj.onload = () => {
    context.drawImage(imageObj, 0, 0)
    context.textAlign = "center"
    context.textBaseline = "middle" 

    //title Datafy
    context.font = `70px ${FONT}`
    context.fillStyle = "whitesmoke"
    context.fillText("Datafy", centerVertically, 80)

    //userData
    context.font = `20px ${FONT}`
    context.fillStyle = "whitesmoke"
    context.fillText('of', centerVertically, 120)

    context.font = `20px ${FONT}`
    context.fillStyle = "whitesmoke"
    context.fillText(getUserContext().userDisplayName, centerVertically, 230)

    let userPhotoProfile = drawImageOnCanvasProfile(getUserContext().userProfileImage, 215, 140, 30)
    context.drawImage(userPhotoProfile, 500, 200)

    if (props.top10Song || props.top10Artist) {
      buildBodyMyTop10(context, props)
    } else if (props.top10Genre) {
      buildBodyMyTop10(context, props)
    } else {
      buildBodyMyTop(context, props)
    }
    // text made by
    context.font = `20px ${FONT}`
    context.fillText(`visit ${import.meta.env.VITE_AD_LINK}`, centerVertically, 850)
  }

  imageObj.setAttribute('crossOrigin', 'anonymous')
  imageObj.src = background

  if (callbackPromise) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(canvas.toDataURL("image/png"))
      }, 1500);
    })
  } else {
    setTimeout(() => {
      const dataURL = canvas.toDataURL("image/png")
      if (navigator.share) {
        shareImage(dataURL)
      } else {
        download(dataURL, "datafy.png")
      }
      setLoadingShare(false)
    }, 1500)
  }
}

export { drawCanvas }