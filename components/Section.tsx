import { Swiper, SwiperSlide } from "swiper/react";
import React, { Fragment, useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

const Section = () => {
  return (
    <>
      <section className="home" id="home">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={36}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          // onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log("slide change")}
        >
          <SwiperSlide>
            <div className="slide">
              <div className="content ">
                <span>Soon to be available</span>
                <h3>G7 footy</h3>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Expedita blanditiis facilis voluptate aut corporis, dolor
                  consequuntur ullam eveniet ab dolorem optio amet ducimus non
                  veritatis numquam sed officiis autem repudiandae?
                </p>
                <a href="#" className="btn">
                  Not Orderable Yet
                </a>
              </div>
              <div className="image">
                <img src="/img/pink.jpg" alt="" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide">
              <div className="content ">
                <span>Soon to be available</span>
                <h3>G7-a1 series</h3>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Expedita blanditiis facilis voluptate aut corporis, dolor
                  consequuntur ullam eveniet ab dolorem optio amet ducimus non
                  veritatis numquam sed officiis autem repudiandae?
                </p>
                <a href="#" className="btn">
                  Not Orderable Yet
                </a>
              </div>
              <div className="image">
                <img src="/img/red.jpg" alt="" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide">
              <div className="content ">
                <span>Soon to be available</span>
                <h3>Fila proxy</h3>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Expedita blanditiis facilis voluptate aut corporis, dolor
                  consequuntur ullam eveniet ab dolorem optio amet ducimus non
                  veritatis numquam sed officiis autem repudiandae?
                </p>
                <a href="#" className="btn">
                  Not Orderable Yet
                </a>
              </div>
              <div className="image">
                <img src="/img/trainer1.jpg" alt="" />
              </div>
            </div>
          </SwiperSlide>
          ...
        </Swiper>
      </section>
    </>
  );
};

export default Section;
