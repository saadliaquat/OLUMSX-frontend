// 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/vendorHome.css';
import Navbar from './vendorNav';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from './Footer/Footer';

import imageSrc1 from '../../assets/laptop (1).jpg';
import imageSrc2 from '../../assets/food (1).jpg';
import imageSrc3 from '../../assets/phones.jpg';
import imageSrc4 from '../../assets/Clothes.jpg';

const defaultImages = [
  'https://olumsx.s3.eu-north-1.amazonaws.com/Apple%2BiPhone%2B15%2BPro%2BMax_-_24629.webp',
  'https://olumsx.s3.eu-north-1.amazonaws.com/Apple%2BiPhone%2B15%2BPro%2BMax_-_24629.webp',
  'https://olumsx.s3.eu-north-1.amazonaws.com/Apple%2BiPhone%2B15%2BPro%2BMax_-_24629.webp',
  'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
];

const VendorHome = () => {
  const navigate = useNavigate();
  const [recentProducts, setRecentProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLocalStorageReady, setIsLocalStorageReady] = useState(false);

  useEffect(() => {
    const fetchLocalStorage = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        try {
          const response = await fetch('http://localhost:3001/api/session/fetchsession');
          if (response.ok) {
            const data = await response.json();
            localStorage.setItem('userId', data.userID);
            localStorage.setItem('userID', data.userID);
            localStorage.setItem('user_id', data.userID);
            localStorage.setItem('user_type', data.role);
            setIsLocalStorageReady(true);
          }
        } catch (error) {
          console.error('Error fetching user session:', error);
        }
      } else {
        setIsLocalStorageReady(true);
      }
    };

    fetchLocalStorage();
  }, []);

  useEffect(() => {
    if (!isLocalStorageReady) return;

    const fetchRecentProducts = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(
          `http://localhost:3001/api/product/recentproducts?userId=${userId}&limit=3`
        );

        if (response.status === 200) {
          const uniqueProducts = response.data;
          setRecentProducts(uniqueProducts);
        } else {
          setErrorMessage('No products found.');
        }
      } catch (error) {
        console.error('Error fetching recent products:', error);
      }
    };

    fetchRecentProducts();
  }, [isLocalStorageReady]);

  const bannerSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const SampleNextArrow = ({ className, style, onClick }) => (
    <div
      className={className}
      style={{ ...style, display: 'block', color: 'black' }}
      onClick={onClick}
    />
  );

  const SamplePrevArrow = ({ className, style, onClick }) => (
    <div
      className={className}
      style={{ ...style, display: 'block', color: 'black' }}
      onClick={onClick}
    />
  );

  const productSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="vendor-home">
        <div className="flex flex-col items-center bg-slate-300" id="home-box">
          <Slider {...bannerSettings} className="w-9/12 mx-auto flex justify-center items-center pt-4 black">
            <div className="img-div">
              <img
                src={imageSrc1}
                alt="Banner"
                className="small-banner-img h-full w-full object-cover"
              />
            </div>
            <div className="img-div">
              <img
                src={imageSrc2}
                alt="Banner"
                className="small-banner-img h/full w/full object-cover"
              />
            </div>
            <div className="img-div">
              <img
                src={imageSrc3}
                alt="Banner"
                className="small-banner-img h/full w/full object-cover"
              />
            </div>
            <div className="img-div">
              <img
                src={imageSrc4}
                alt="Banner"
                className="small-banner-img h/full w/full object-cover"
              />
            </div>
          </Slider>
        </div>
        <div className="montserrat" style={{ textAlign: 'center', fontSize: '30px', marginTop: '70px' }} >
          <h1> YOUR LISTED PRODUCTS </h1>
        {recentProducts.length > 0 ? (
          <div className="product-grid lg:ml-12 w/full grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 pt-8">
            {recentProducts.map((product) => (
              <div className="group relative" key={product._id}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 h-60 lg/h-80 grid place-items-center">
                  <img
                    src={product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : defaultImages[Math.floor(Math.random() * defaultImages.length)]}
                    alt="Product"
                    className="h/full w/full object-cover object-center"
                  />
                </div>
                <div className="mt-3 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </h3>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{`RS ${product.price}`}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          errorMessage && (
            <div className="error-message montserrat" style={{ textAlign: 'center', fontSize: '30px', marginTop: '70px' }}>
              {errorMessage}
            </div>
          )
        )}
      </div>
      <div className="pb-8">
      </div>
      </div>
      <Footer/>
    </>
  );
};

export default VendorHome;
