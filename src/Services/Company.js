import { get, patch, post } from "../utils/requestAPI"

export const getCompany=async()=>{
    const res=await get("company");
    return res;
}
export const postCompany=async(data)=>{
    const res= await post("company",data);
    return res;
}

export const getCompanyById=async(id)=>{
    const res=await get(`company/${id}`);
    return res;
}

export const updateInfoCompany=async(id,data)=>{
   const res=await patch("company",id,data);
   return res;
}