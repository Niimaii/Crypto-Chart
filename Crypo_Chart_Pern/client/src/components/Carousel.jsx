import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import { NavLink } from 'react-router-dom';
import SmallChart from './SmallChart';

function Carousel({ coinResponse, days }) {
  const loop = [0, 1, 2, 3, 4];

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        '@0.00': {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        '@0.75': {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        '@1.00': {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        '@1.50': {
          slidesPerView: 4,
          spaceBetween: 50,
        },
      }}
      modules={[Pagination]}
      className='mySwiper'
    >
      {coinResponse &&
        loop.map((i) => {
          let coin = coinResponse[i];
          return (
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

export default Carousel;
