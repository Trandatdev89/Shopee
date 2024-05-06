import { get } from "../utils/requestAPI"

export const sortBottom=async()=>{
    const res=await get("products?_sort=price&_order=asc");
    return res;
}
export const sortTop=async()=>{
    const res=await get("products?_sort=price&_order=desc");
    return res;
}
export const sortSale=async()=>{
    const res=await get("products?_sort=discountPercentage&_order=desc");
    return res;
}