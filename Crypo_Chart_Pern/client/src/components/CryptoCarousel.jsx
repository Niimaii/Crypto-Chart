import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import { NavLink } from 'react-router-dom';
import SmallChart from './SmallChart';
import { layouts } from 'chart.js';
import { useQueryClient } from '@tanstack/react-query';

function CryptoCarousel() {
  const queryClient = useQueryClient();
  const cachedMarket = queryClient.getQueryData(['market']);
  const coinResponse = cachedMarket.data.market;

  const loop = [0, 1, 2, 3, 4];

  return (
    <Swiper
      // TODO: Fix loop
      centeredSlides={true}
      // centerInsufficientSlides={true}
      loop={true}
      // slidesOffsetAfter={30}
      // slidesOffsetBefore={30}
      //   Changes how many slides can be seen based on screen size
      breakpoints={{
        '@0.00': {
          slidesPerView: 1,
          spaceBetween: 1,
        },
        '@0.75': {
          slidesPerView: 1,
          spaceBetween: 1,
        },
        '@1.00': {
          slidesPerView: 1,
          spaceBetween: 1,
        },
        '@1.50': {
          slidesPerView: 1,
          spaceBetween: 1,
        },
      }}
    >
      {coinResponse &&
        loop.map((i) => {
          let coin = coinResponse[i];
          return (
            // You need to add SwiperSlide for Swiper to work properly
            <SwiperSlide key={coin.crypto_id}>
              <NavLink to={`/${coin.crypto_id}`}>
                <SmallChart coin={coin} key={coin.crypto_id} />
              </NavLink>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
}

export default CryptoCarousel;
