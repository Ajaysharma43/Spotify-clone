import Navbar from "../Components/Navbar/Navbar";
import NewData from "../Components/Data/Data";
import Cookies from "js-cookie";
import Login from "../Components/Login/Login";
import Footer from "../Components/Footer/Footer";
function Homeapage()
{
    const Authenticated = Cookies.get('isAuthenticated')
    return(
        <>
        {
            Authenticated?
            (
                <div>
                    <Navbar/>
                    <NewData/>
                    <Footer/>
                </div>
            )
            :
            (
                <div>
                    <Login/>
                </div>
                
            )
        }
        
        </>
    )
}

export default Homeapage;