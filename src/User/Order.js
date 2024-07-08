import { useEffect, useState } from "react";
import { getCookie } from "../Components/helper/cookie";
import { delOrder, getOrderByIdUser, patchOrder } from "../Services/Order";
import { Col, Row, notification } from "antd";
import { getProduct } from "../Services/Products";
import Pay from "./Pay/Pay";
import { useDispatch, useSelector } from "react-redux";
import { delAll, reloadHeader } from "../Actions";
import LoadingShopee from "../loading/loading";
import GoBack from "../GoBack";

function Order() {
  const id = getCookie("id");
  let [order, setOrder] = useState([]);
  const kk =useSelector(state=>state.sortRender);
  const [checkItem, setCheckItem] = useState([]);
  const [reload, setReload] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const dispatch=useDispatch();
  
  
  useEffect(() => {
    const fetchAPI = async () => {
      const res = await getOrderByIdUser(id); //Lấy ra các đơn đặt hàng của user đó

      const result = await getProduct(); //Lấy tất cả các sản phẩm trong API
      let merge = [];
      for (let i = 0; i < res.length; i++) {
        merge.push({
          ...res[i],
          info: result.find((item) => item.id === res[i].idProduct), //Hợp nhất đơn hàng của user đó và thông tin của sản phẩm đó
        });
      }
      const filter = merge.filter((item) => item.statusSend === false); //Lọc ra các sản phẩm có trạng thái gửi là false:

      setOrder(filter);
    };
    fetchAPI();
  }, [reload]);

  
  const handleChange = (id, e) => {
    const { checked } = e.target;

    if (checked) {
      //nếu checked là True lấy ra được trạng thái của checkbox và set cho nó là 1 mảng chứa những object của sản phẩm tương ứng
      setCheckItem([
        ...checkItem,
        {
          idCheckbox: id,
          check: e.target.checked,
        },
      ]);
    } 
    else {
      //nếu checked là false thì cần phải set nó về thành mảng chứa những phần tử chỉ là true bằng cách
      if (checkItem.some((item) => item.idCheckbox === id)) {
        //những sản phẩm đã tích nhưng lại ấn không tích thì cần phải reset lại
        const index = checkItem.findIndex((item) => item.idCheckbox === id); //lấy ra chỉ số của item tích rồi mà lại ấn chưa tích đó
        const newArr = checkItem.filter((item, indexSub) => indexSub !== index); //lọc ra những phần tử ấn rồi lại ấn chưa tích
        setCheckItem(newArr); //cuối cùng sẽ là 1 mảng mà ở đó chỉ có các phần tử được tích
      }
    }
  };

  const handlePlus = async (id, quantity) => {
    const a = await patchOrder(id, { quantity: quantity + 1 }); //đoạn này là bắt sự kiện tăng số lượng sản phẩm nhưng bị reload lại trang
    setOrder(a);
    setReload(!reload);
  };

  const handleDiff = async (id, quantity) => {
    if (quantity > 1) {
      const a = await patchOrder(id, { quantity: quantity - 1 }); //đoạn này là bắt sự kiện giảm số lượng sản phẩm nhưng bị reload lại trang
      setOrder(a);
      setReload(!reload);
    }
  };

  const handleDel = async (id) => {
    const res = await delOrder(id); //xóa sản phẩm theo id của từng item
    if (res) {
      setReload(!reload);
      api.success({
        message: "Xóa thành công",
        description: "Sản phẩm đã được xóa",
        placement: "top",
      });
      dispatch(reloadHeader(!kk));
    } else {
      setReload(!reload);
      api.error({
        message: "Xóa không thành công",
        description: "Sản phẩm chưa được xóa",
        placement: "top",
      });
    }
  };

  const handleDelAll = async() => {    //xóa tất cả các sản phẩm
     let user=await getOrderByIdUser(id);
     user=user.filter(item=>item.fullName===null ||item.fullName===undefined);
     let kk=[];
     for(let i=0;i<user.length;i++){
         kk=await delOrder(user[i].id);
     }
     if(kk){
       setReload(!reload);
       dispatch(reloadHeader(false));
     }
     
  };

  return (
    <>
      {contextHolder}
      <GoBack/>
      {order.length > 0 ? (
        <div className="Order">
          <div className="Order__cart">
            <h4>Giỏ hàng</h4>
            <button className="buttonShop" onClick={handleDelAll}>
              Xóa tất cả
            </button>
          </div>
          <div className="Order__list">
            <Row gutter={[15, 15]}>
              {(order || []).map((item) => (
                <Col span={24} key={item.id}>
                  <div className={item.fullName?("Order__item Order__item--disable"):("Order__item")}>
                    <div className="Order__img">
                      <input
                        type="checkbox"
                        onChange={(e) => handleChange(item.id, e)}
                      />
                      <img src={item?.info?.thumbnail} alt="loading..." />
                      <div>
                        <h5>{item?.info?.title}</h5>
                        <div className="Order__input">
                          <button
                            onClick={() => handleDiff(item.id, item.quantity)}
                          >
                            -
                          </button>
                          <input type="number" min={1} value={item.quantity} />
                          <button
                            onClick={() => handlePlus(item.id, item.quantity)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="Order__content">
                      <div className="Order__price">
                        Giá: {item?.info?.price}VND
                      </div>
                      <button
                        className="buttonShop"
                        onClick={() => handleDel(item.id)}
                      >
                        Xóa sản phẩm
                      </button>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
          <div className="Order__pay">
            <Row>
              <Col span={24}>
                <Pay checkItem={checkItem} order={order} />
              </Col>
            </Row>
          </div>
        </div>
      ):(
        <LoadingShopee/>
      )}
    </>
  );
}

export default Order;
