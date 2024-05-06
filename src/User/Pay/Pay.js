import { Link } from "react-router-dom";

function Pay(props) {
  const { checkItem, order } = props;
  

  const merge = [];
  for (let i = 0; i < checkItem.length; i++) {
    merge.push(order.find((item) => item.id === checkItem[i].idCheckbox));  //nó push vào merger những item theo id
  }
  
  const totalFinal = merge.reduce((total, item) => {   //tính tổng tiền và sản phẩm
    return total + item.info.price * item.quantity;
  }, 0);
  return (
    <>
      <div className="Order__total">
        <div className="Order__buy">
          Tổng thanh toán(Tổng sản phẩm:
          {<span style={{ color: "var(--color-one)" }}>{merge.length}</span>}) :
          <span style={{ color: "var(--color-one)" }}>{totalFinal}VND</span>
        </div>
        <Link to={checkItem.length>0?(`/pay-details/${JSON.stringify(checkItem)}`):("")}>
          <button className="buttonShop">Mua hàng</button>
        </Link>
      </div>
    </>
  );
}

export default Pay;
