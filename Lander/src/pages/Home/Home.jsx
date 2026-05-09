import { useEffect } from 'react';
import Footer from '../Footer/Footer';
import Login from '../Auth/Login/Login';
import './Home.scss';

const Home = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);
  return (
    <div className='home'>
      <div className='flex'>
        <Login />
      </div>
      <Footer />
    </div>
  )
}

export default Home