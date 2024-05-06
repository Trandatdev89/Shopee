import { Delete, get, patch, post } from "../utils/requestAPI"

export const getProduct=async()=>{
    const res=get("products");
    return res;
}

export const getProductById=async(id)=>{
    const res=await get(`products/${id}`);
    return res;
}
export const getProductByCate=async()=>{
    const res=await get(`products?Category=nội thất`);
    return res;
}

export const getProductByIdCompany=async(id)=>{
    const res=await get(`products?idCompany=${id}`);
    return res;
}

export const updateProduct=async(id,data)=>{
    const res=await patch("products",id,data);
    return res;
}
export const delProduct=async(id)=>{
   const res=await Delete("products",id);
   return res;
}

export const postProduct=async(data)=>{
    const res=await post("products",data);
    return res;
}