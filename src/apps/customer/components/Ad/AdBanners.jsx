import { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function AdBanner() {
    const [ads, setAds] = useState([]);

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/ad/fetchadsall');
                const data = await response.json();
                console.log(data)
                setAds(data);
            } catch (error) {
                console.error('Failed to fetch ads', error);
            }
        };

        fetchAds();
    }, []);

    const settings = {
        arrows: false,
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 10000,
    };

    return (
        <div className="my-4">
          <div className="bg-zinc-500 rounded-md w-3/4 mx-auto">
            <Slider {...settings}>
              {ads.map((ad, index) => (
                <div key={index} className="w-full h-full">
                  <img
                    src={ad.imageUrl}
                    alt={`Ad ${index + 1}`}
                    className="w-full h-40 object-cover rounded"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      );
}