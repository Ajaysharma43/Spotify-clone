import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const History = () => {
    const linkUrl = import.meta.env.VITE_API_URL;

    const [History,SetHistory] = useState([]);

    useEffect(()=>{
        const GetHistory = async () => {
            const username = sessionStorage.getItem("Username")
            const password = sessionStorage.getItem("Password")

            const result = await axios.post(`${linkUrl}/HistoryData`,{username,password});
            console.log(result.data.user.History);
            SetHistory(result.data.user.History);
        }
        GetHistory();
    },[])

    const removeSong = () =>{

    }
    return(
        <>
        <div className="flex flex-wrap gap-4 w-full h-full">
            {
                History.map((History)=>(
                    <>
                    <div className="w-1/6 h-1/3 border border-black flex flex-wrap shadow-md shadow-white rounded-xl overflow-hidden bg-slate-50">
                        <Link to={`/Single/${History.id}`}>
                        <img src={History.Image}className="w-1/5" />
                        <h1>{History.name}</h1>
                        </Link>
                        <button>delete</button>
                    </div>
                    </>
                ))
            }
        </div>
        </>
    )
}

export default History;