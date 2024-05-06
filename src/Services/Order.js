import { Delete, get, patch, post } from "../utils/requestAPI"

export const postOrder=async(data)=>{
    const res=await post("order",data);
    return res;
}


export const patchOrder=async(id,data)=>{
    const res=await patch("order",id,data);
    return res;
}
export const getOrderById=async(id)=>{
    const res=await get(`order/${id}`);
    return res;
}

export const getOrderByIdUser=async(id)=>{
    const res=await get(`order?idUser=${id}`);
    return res;
}
export const getOrderByIdCompany=async(id)=>{
    const res=await get(`order?idCompany=${id}`);
    return res;
}
export const getOrderByIdProduct=async(idProduct,idUser)=>{
    const res=await get(`order?idProduct=${idProduct}&idUser=${idUser}`);
    return res;
}

export const delOrder=async(id)=>{
   const res=await Delete("order",id);
   return res;
}

