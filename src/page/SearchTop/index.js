import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "./index.scss";
import triangle from "../../img/triangle.png";
import "./styles.css";
import { useEffect, useState } from "react";
import { getProductByCate } from "../../Services/Products";
function SearchTop() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      const res = await getProductByCate();  
      setData(res);
    };
    fetchAPI();
  }, []);
  return (
    <>
      <div className="Timkiem">
        <h3 className="Timkiem__max">TÌM KIẾM HÀNG ĐẦU</h3>
        <hr/>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="Timkiem__item">
                 <div className="Timkiem__img">
                    <img src={item.thumbnail} alt="loading..."/>
                    <div className="Timkiem__fixed">Đã bán {item.stock}k/tháng</div>
                 </div>
                 <img className="Timkiem__bitton" src={triangle} alt="loading..."/>
                 <div className="Timkiem__title">
                    {item.title}
                 </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default SearchTop;
