import error404 from "../../img/404.jpg";

function Error(){
    return(
        <>
           <img src={error404} style={{height:"100%",width:"100%",objectFit:"cover"}}/>
        </>
    )
}

export default Error;