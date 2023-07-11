import React, { useEffect, useState } from 'react';
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

  // This is duct tape and fucking glue to get ChartJS to actually loop without issues
  const loop = [1, 2, 3, 4, 5, 6, 0];

  return (
    <div className='swiper_container'>
      <div className='swiper_carousel'>
        <Swiper
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
              slidesPerView: 3,
              spaceBetween: 0.5,
            },
            '@1.50': {
              slidesPerView: 3,
              spaceBetween: 0.5,
            },
          }}
        >
          {cachedMarket &&
            loop.map((i, index) => {
              let coin = cachedMarket[i];
              return (
                // You need to add SwiperSlide for Swiper to work properly
                <SwiperSlide key={coin.crypto_id}>
                  <NavLink to={`/${coin.crypto_id}`}>
                    <SmallChart coin={coin} key={coin.crypto_id + index} />
                  </NavLink>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
}

export default CryptoCarousel;
