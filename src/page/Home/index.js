import SearchTop from "../SearchTop";
import Sugest from "../Sugest";
import Banner from "./Banner";
import Category from "./Category";
import "./index.scss";
function Home(){
    return(
        <>
           <Banner/>
           <Category/>
           <SearchTop/>
           <Sugest/>
        </>
    )
}
export default Home;