import Loading from '../loading/loading'
import Navbar from '../navbar/navbar'
import HomeCard from './card/home-card'
import './home.css'

const Home = () => {
  return (
    <>
      <Navbar />
      <div className='box-home'>
        <h2>Top Artist's</h2>
        <section className='box-section'>
          <HomeCard></HomeCard>
          <HomeCard></HomeCard>
        </section>
        <h2>Top Song's</h2>
        <section className='box-section'>
          <HomeCard></HomeCard>
          <HomeCard></HomeCard>
          <HomeCard></HomeCard>
          <HomeCard></HomeCard>
          <HomeCard></HomeCard>
          <HomeCard></HomeCard>
          <HomeCard></HomeCard>
          <HomeCard></HomeCard>
          <HomeCard></HomeCard>
          <HomeCard></HomeCard>
        </section>
        <h2>Top Playlist's</h2>
        <section className='box-section'>
          <HomeCard></HomeCard>
          <HomeCard></HomeCard>
        </section>
      </div>
    </>
  )
}

export default Home