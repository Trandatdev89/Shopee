import { get, patch, post } from "../utils/requestAPI"

export const getUser=async()=>{
    const res=await get("users");
    return res;
}

export const postUser=async(data)=>{
    const res= await post("users",data);
    return res;
}

export const getUserById=async(id)=>{
    const res=await get(`users/${id}`);
    return res;
}
export const updateUser=async(id,data)=>{
    const res=await patch("users",id,data);
    return res;
}