import { useEffect, useState } from "react";
import { get } from "../../utils/requestAPI";
import SearchList from "../Search/SearchList";

function Sugest() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      const res = await get("products");   //lấy ra tất cả sản phẩm và show ra
      setData(res);
    };
    fetchAPI();
  }, []);
 
  return (
    <>
      {data.length > 0 && (
        <div className="Sugest">
          <div className="Sugest__title">gợi ý hôm nay</div>
          <div className="Sugest__main">
            <SearchList data={data} />
          </div>
        </div>
      )}
    </>
  );
}

export default Sugest;
