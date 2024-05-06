import "./loading.scss";

function LoadingShopee(){
    return(
        <>
           <div className="ShoppeLoading">
            <div style={{"--delay":"1s"}}></div>
            <div style={{"--delay":"2s"}}></div>
            <div style={{"--delay":"3s"}}></div>
           </div>
        </>
    )
}

export default LoadingShopee;