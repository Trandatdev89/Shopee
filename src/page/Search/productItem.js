import tet from "../../img/tet.png";
import { Rate } from "antd";
import { CiLocationOn } from "react-icons/ci";


//Component này giúp vẽ ra từng sản phẩm
function ProductItem(props) {
  const { item } = props;  
  return (
    <>
      <div className="Search__item">
        <div className="Search__img1">
          <img src={item.thumbnail} alt="loading..." />
          <img src={tet} alt="sale" />
        </div>
        <div className="Search__sale">
          <div>Giảm</div>
          <div>{item.discountPercentage}%</div>
        </div>
        <div className="Search__content">
          <div className="Search__title">{item.title}</div>
          <div className="Search__price">
            <div>{item.price} VND</div>
            <div>Còn lại: {item.stock}sp</div>
          </div>
          <div className="Search__rate">
            <div>
              <Rate value={parseInt(Math.floor(item.rating))} />
            </div>
            <div className="Search__locate">
              <div>
                <CiLocationOn />
              </div>
              <div>{item.city}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductItem;
