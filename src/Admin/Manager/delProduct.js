import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { delProduct } from "../../Services/Products";
function DeleteProduct(props) {
    const { record ,onReload,reload} = props;
    const handleComfirm=async(id)=>{
        const res= await delProduct(id);
        if(res){
            onReload(!reload);
        }else{
            alert("xoa khong thanh cong");
        }
    }
  return (
    <>
      <Popconfirm
        title="Bạn có chắc chắn muốn xóa nó"
        description="Nếu xóa thì sản phẩm sẽ không thể phục hồi?"
        okText="Yes"
        cancelText="No"
        onConfirm={()=>handleComfirm(record.id)}
      >
        <Button className="ms-1" danger icon={<DeleteOutlined />} />
      </Popconfirm>
    </>
  );
}

export default DeleteProduct;
