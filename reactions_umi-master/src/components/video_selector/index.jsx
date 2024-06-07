import React, { useState } from "react";
import { Card, Image, Empty } from "antd";
import "./index.less";
import { useIntl } from "umi";

// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import "swiper/swiper.less";

// 返回组件, onSelect是从上层传递过来的方法，供组件调用
export default ({ onSelect, imgs, title }) => {
  const intl = useIntl();
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = (id, index) => {
    setActiveIndex(index);
    onSelect && onSelect(id);
  };
  const breakpoints = {
    // when window width is >= 320px
    320: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
    1080: {
      slidesPerView: 10,
      spaceBetween: 30,
    },
  };
  return (
    <Card
      title={title}
      bordered={true}
      style={{ width: "100%", marginTop: "32px" }}
    >
      {imgs.length ? (
        <Swiper
          slidesPerView={10}
          spaceBetween={20}
          breakpoints={breakpoints}
          className="mySwiper"
        >
          {imgs.map((img, index) => (
            <SwiperSlide key={img} style={{ padding: "2px" }}>
              <div className="img-picker video-picker">
                <Image
                  className={`img-item ${
                    index === activeIndex ? "img-item-active" : ""
                  }`}
                  width={90}
                  onClick={handleClick.bind(this, img, index)}
                  preview={false}
                  src={`http://8.130.53.206:8088/ethane_jpg//${img}.jpg`}
                />
                <div className="img-title">{img}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </Card>
  );
};
