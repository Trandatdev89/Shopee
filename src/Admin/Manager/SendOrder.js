import { Button, Tooltip } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { patch } from "../../utils/requestAPI";
function SendOrder(props) {
  const { record, onReload, reload } = props;
  const handleClick=async(id)=>{
      const res=await patch("order",id,{statusSend:true});
      if(res){
        alert("Gửi Thành Công!")
        onReload(!reload);
      }
      else{
        alert("Gửi Thất Bại!")
      }
  }
  return (
    <>
      <Tooltip title="Gửi đơn hàng">
        <Button  icon={<SendOutlined />} onClick={()=>handleClick(record.id)}></Button>
      </Tooltip>
    </>
  );
}

export default SendOrder;
