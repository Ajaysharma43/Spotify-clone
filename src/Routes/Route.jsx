import { useRoutes } from "react-router-dom";
import Single from "../Components/Single-Track/Single";
import NewData from "../Components/Data/Data";
import Likedsongs from "../Components/songlist/songlist";
import Homeapage from "../pages/Homepage";
import Login from "../Components/Login/Login";
import Signup from "../Components/Signup/Signup";
import Footer from "../Components/Footer/Footer";

const MyRoutes = () =>{
    let element = useRoutes([
        {path:"/" ,element:<Homeapage/>},
        {path:"/Single/:id" ,element:<Single/>},
        {path:"/songs" , element:<Likedsongs/>},
        {path:"/Login",element:<Login/>},
        {path:"/Signup",element:<Signup/>},
        {path:"/Footer",element:<Footer/>}
    ])

    return element;
}

export default MyRoutes;