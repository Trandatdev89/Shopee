import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import "./base.scss";

function LayoutDefault(){
    return(
        <>
            <Header/>
            <Main/>
            <Footer/>
        </>
    )
}

export default LayoutDefault;