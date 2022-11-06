import Loading from '../loading/loading'
import Navbar from '../navbar/navbar'
import RadioSwitch from '../datafy-search/radio-switch/radio-switch'
import CardMyTop from './card-my-top/card-my-top'

import './home.css'


const Home = () => {

  

  return (
    <>
      <Navbar />
      <RadioSwitch />
      {/* <Loading></Loading> */}

      <div className='card-container'>
        <CardMyTop title={'My Top Arstist'} type={'artist'}/>
        <CardMyTop title={'My Top Song'} type={'song'}/>
        
        {/* <Toast 
          show={notify}
          setNotify={setNotify}
          type={'hi'}
          title={'Hi!'}
          message={'Select a period (last month / 6 months / all time)'} /> */}
      </div>
    </>
  )
}

export default Home