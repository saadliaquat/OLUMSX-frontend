import Navbar from '../components/Header/Navbar';
import AdBanner from '../components/Ad/AdBanners';
import ProductGrid from '../components/Product/ProductGrid';
import Footer from '../components/Footer/Footer';

export default function Home() {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    // Fetch latest user session
    fetch('http://localhost:3001/api/session/fetchsession')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        localStorage.setItem('userId', data.userID);
        localStorage.setItem('userID', data.userID);
        localStorage.setItem('user_id', data.userID);
        localStorage.setItem('user_type', data.role);
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <AdBanner />
        <ProductGrid />
      </div>

      <div className='pt-16'></div>

      <Footer />
    </>
  );
}