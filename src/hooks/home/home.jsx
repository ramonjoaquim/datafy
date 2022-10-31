import Loading from '../loading/loading'
import Navbar from '../navbar/navbar'
import './home.css'

const Home = () => {
  return (
    <>
      <Navbar />
      <div>
        home
        <Loading></Loading>
      </div>
    </>
  )
}

export default Home