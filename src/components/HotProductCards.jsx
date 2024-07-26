import React from 'react';
import ProductsCatalogCards from './ProductsCatalogCards';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

const HotProductCards = ({ products }) => {
  return (
    <Swiper
      spaceBetween={30}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      className="mySwiper my-4"
      breakpoints={{
        1200: {
          slidesPerView: 4,
        },
        768: {
          slidesPerView: 2,
        },
        0: {
          slidesPerView: 1,
        },
      }}
    >
      {products.map((product) => (
        <SwiperSlide key={product._id}>
          <ProductsCatalogCards productProp={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HotProductCards;
