import { get } from "../utils/requestAPI"

export const Paginate=async(skip,cate)=>{
    let cateDraw="";
    if(cate){
        cateDraw=`Category=${cate}`;
    }
    const res= await get(`products?_page=${skip}&_limit=100&${cateDraw}`);
    return res;
}