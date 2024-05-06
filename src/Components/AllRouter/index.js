import { route } from "../../Router";
import {useRoutes} from "react-router-dom";
function AllRouter(){
    const Routers=useRoutes(route);
    return(
        <>
          {Routers}
        </>
    )
}

export default AllRouter;