import {get} from "../utils/requestAPI";

export const getCategory=async()=>{
    const res=await get("category");
    return res;
}