import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import { NavLink } from 'react-router-dom';
import SmallChart from './SmallChart';

function CryptoCarousel({ coinResponse, days }) {
  const loop = [0, 1, 2, 3, 4];

  return (
    <Swiper
      // TODO: Fix loop
      loop={true}
      //   Changes how many slides can be seen based on screen size
      breakpoints={{
        '@0.00': {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        '@0.75': {
          slidesPerView: 2,
          spaceBetween: 50,
        },
        '@1.00': {
          slidesPerView: 3,
          spaceBetween: 75,
        },
        '@1.50': {
          slidesPerView: 4,
          spaceBetween: 100,
        },
      }}
    >
      {coinResponse &&
        loop.map((i) => {
          let coin = coinResponse[i];
          return (
            // You need to add SwiperSlide for Swiper to work properly
            <SwiperSlide>
              <NavLink to={`/${coin.crypto_id}`}>
                <SmallChart coin={coin} key={coin.crypto_id} days={days} />
              </NavLink>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
}

export default CryptoCarousel;
