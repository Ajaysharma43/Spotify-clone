import { useRoutes } from "react-router-dom";
import Single from "../Components/Single-Track/Single";
import NewData from "../Components/Data/Data";
import Likedsongs from "../Components/songlist/songlist";
import Homeapage from "../pages/Homepage";

const MyRoutes = () =>{
    let element = useRoutes([
        {path:"/" ,element:<NewData/>},
        {path:"/Single/:id" ,element:<Single/>},
        {path:"/songs" , element:<Likedsongs/>},
        {path:"/homepage",element:<Homeapage/>}
    ])

    return element;
}

export default MyRoutes;