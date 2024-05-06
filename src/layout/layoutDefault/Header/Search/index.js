import { CiSearch } from "react-icons/ci";

import {useNavigate} from "react-router-dom";

function SearchForm() {
  const navigate=useNavigate();
 
  const handleSubmit = (e) => {    //form nhập từ khóa tìm kiếm sản phẩm
    e.preventDefault();
    const data=e.target.elements[0].value;   //lấy ra giá trị của input đó
    navigate(`/search?title=${data}`);       //chuyển nó đến router search và kèm theo giá trị gán là title
   
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input placeholder="  Nhập sản phẩm bạn muốn tìm kiếm..." name="search"/>
        <button type="submit"><CiSearch/></button>
      </form>
    </>
  );
}

export default SearchForm;
