import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { delOrder } from "../../Services/Order";
function DeleteOrder(props) {
    const {record,onReload,reload}=props;
    const handleComfirm=async(id)=>{
        const res=await delOrder(id);
        if(res){
          onReload(!reload);  
        }
        else{
            alert("xoa khong thanh cong!")
        }
    }
  return (
    <>
      <Popconfirm
        title="Bạn có chắc chắn muốn xóa nó không"
        description="Nếu xóa sẽ không thể khôi phục?"
        okText="Yes"
        cancelText="No"
        onConfirm={() => handleComfirm(record.id)}
      >
        <Button className="ms-1" danger icon={<DeleteOutlined />} />
      </Popconfirm>
    </>
  );
}

export default DeleteOrder;
