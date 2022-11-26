import  {useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { search as FindItem } from '../../../client/spotify-client.js'
import Loading from "../../loading/loading.jsx";

//icons
import { CiSearch } from 'react-icons/ci'
import { BsCloudDownload } from 'react-icons/bs'
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi'
import './download.css'

const DownloadPage = () => {
    const navigate = useNavigate()

    const [searchText, setSearchText] = useState()
    const [resultData, setResultData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [hasNext, setHasNext] = useState(false)
    const [hasPrevious, setHasPrevious] = useState(false)

    const toHome = () => {
        navigate('/home')
    }

    const onchangeHandler = event => {
        setSearchText(event.target.value)
    }

    const search = (value) => {
        if (!searchText) return
        setLoading(true)
        FindItem(searchText, value, hasNext, hasPrevious).then(res => {
            let data = formatData(res?.data)
            setHasNext(data?.next)
            setHasPrevious(data?.previous)
            setResultData(createJsxList(data))
            setLoading(false)
        })
    }

    const createJsxList = (data) => {
        return(<>
            <div className={'list-result'}>
                {Array.apply(0, data.result).map((d) =>
                <>
                <div className={'container-item'}>
                    <div className={'main-item'}>
                        <img src={d.image} alt="" className={'img-search'}/>
                        <span className={'item-name font-dazzle'}>{d.name}</span>
                        <span className={'item-artist font-dazzle'}>{d.artist}</span>
                        <BsCloudDownload size={20}/>
                    </div>
                </div>
                </>)}
            </div>
        </>)
    }

    const formatData = (data) => {
        const result = []
        data?.artists?.items?.forEach(artist => {
            result.push({
                name: artist?.name,
                url: artist?.uri,
                image: artist?.images[0]?.url
            })
        })
        data?.tracks?.items?.forEach(track => {
            result.push({
                name: track?.name,
                artist: track?.artists?.map(a => a.name).join(', '),
                url: track?.uri,
                image: track?.album?.images[0]?.url
            })
        })

        return {
            result: result,
            next: data?.tracks?.next,
            previous: data?.tracks?.previous
        }
    }

    return (<>
        <div className='nav-dp'>
            <span className='font-barcode logo-nav-bar' id='logo-nav-bar' onClick={() => toHome()}>Datafy</span>
            <span className='font-rennie premium-label'><h3>Unlocked</h3></span>
        </div>

        <div className={'container-dp'}>
              <div class="webflow-style-input">
                <input class="" id={'inputSearch'}
                    type="text"
                    placeholder="Search"
                    onChange={onchangeHandler}
                    onKeyDown={(e) => {
                        if (e.code === "Enter") {
                            search()
                        }
                    }}></input>
                <button type="button"
                    id={'btnSearch'}
                    className={'btn-search'}
                    onClick={() => search()}>
                    <CiSearch size={30} className={'icon-search'}/>
                </button>
              </div>
            <div>
                 {loading ? <Loading/> : resultData}
                {resultData == null ? <></> : <div className={'pagination'}>
                    <span onClick={() => search('previous')}>
                        <span className='icon-arrow-left'>previous</span>
                    </span>
                    <span onClick={() => search('next')}>
                    <span className='icon-arrow-right'>next</span>
                    </span>
                    </div>
                }
            </div>
        </div>

    </>)
}

export default DownloadPage