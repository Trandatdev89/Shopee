import { Pie } from '@ant-design/plots';
import { useEffect, useState } from 'react';
import { getOrderByIdCompany } from '../../Services/Order';
import { getCookie } from '../../Components/helper/cookie';


function ChartPie(){
  const [dataChart,setDataChart]=useState([]);
  const idCompany=getCookie("idAdmin");
  useEffect(()=>{
    const fetchAPI=async()=>{
      let option={
        orderOn:0,
        orderOff:0
      }
      const res=await getOrderByIdCompany(idCompany);
      res.forEach(item => {
        item.statusSend ? option.orderOn++ : option.orderOff++;
      });
      setDataChart(option);
    }
    fetchAPI();
  },[]);

    const data = [
        {
          type: 'Order đã gửi',
          value:dataChart.orderOn,
        },
        {
          type: 'Order chưa gửi',
          value: dataChart.orderOff,
        }
      ];
      const config={
        data:data,
        appendPadding: 10,
        angleField:"value",
        colorField:"type",
      }
    return(
        <>
          <Pie {...config} />
        </>
    )
}

export default ChartPie;