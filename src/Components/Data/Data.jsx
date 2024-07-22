import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addSong, removeSong } from "../../features/songs/songslice";
import { FaHeart, FaRegHeart, FaSun, FaMoon } from "react-icons/fa"; 

function NewData() {
  const [data, setData] = useState([]);
  const [liked, setLiked] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const dispatch = useDispatch();
  const likedSongs = useSelector((state) => state.songs.likedSongs);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("http://localhost:3000/SongsData");
      setData(response.data);
    };
    getData();
  }, []);

  const isLiked = (song) => {
    return likedSongs.some((likedSong) => likedSong.id === song.id);
  };

  const handleLike = async(song,id,name,data,index) => {

    if (isLiked(song)) {
      setLiked({ ...liked, [song.id]: "Unliked" });
      dispatch(removeSong(song));
      console.log(index);
      const Username = sessionStorage.getItem('Username');
      const Password = sessionStorage.getItem('Password');
      const remove = await axios.post('http://localhost:3000/RemoveLikedSongs',{id,name,data,Username,Password})
      
    } else {
      dispatch(addSong(song));
      setLiked({ ...liked, [song.id]: "Liked" });

      const Username = sessionStorage.getItem('Username');
      const Password = sessionStorage.getItem('Password');
      const addsong = await axios.post('http://localhost:3000/LikedSongs',{id,name,data,Username,Password})
    }
  };

  

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      exit={{ opacity: 0 }}
      className={`min-h-screen flex flex-col items-center justify-center transition-all duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="container mx-auto py-8">
        <div className="flex justify-end mb-4">
          <motion.button
            onClick={toggleDarkMode}
            className={`px-4 py-2 rounded-lg ${
              darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800"
            } hover:bg-opacity-75 focus:outline-none`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </motion.button>
        </div>
        <h1 className="text-3xl font-bold text-center mb-8">Your Music Collection</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item,index) => (
            <motion.div
              key={item._id}
              className={`rounded-lg overflow-hidden shadow-lg ${
                darkMode ? "bg-gray-800 hover:shadow-xl" : "bg-white hover:shadow-md"
              } relative transition-all duration-500`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              drag="x"
            >
              <div className="relative">
                <img
                  className="h-48 w-full object-cover"
                  src={item.Song_Image}
                  alt="Music Icon"
                />
                <div className={`absolute inset-0 ${
                    darkMode ? "bg-gradient-to-r from-gray-700 to-gray-900" : "bg-gradient-to-r from-purple-600 to-blue-500"
                } opacity-75`}></div>
              </div>
              <div className="p-4">
                <Link to={`/Single/${item._id}`}>
                  <h1 className={`text-xl font-bold mb-2 truncate ${darkMode ? "text-white" : "text-gray-800"}`}>{item.Song_Name}</h1>
                </Link>
                <div className="flex justify-between items-center mb-4">
                  <button
                    onClick={() => handleLike(item,item.id,item.name,item.song,index)}
                    className={`text-sm font-medium py-2 px-4 rounded-full focus:outline-none ${
                      isLiked(item.Isliked)
                        ? "bg-red-500 text-white border-red-300 hover:bg-red-600"
                        : "bg-blue-500 text-white border-blue-300 hover:bg-blue-600"
                    } transition duration-300 ease-in-out`}
                  >
                    {isLiked(item.Isliked == 'liked') ? <FaHeart /> : <FaRegHeart />}
                  </button>
                  <span className={`px-2 py-1 rounded-lg ${darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-800"}`}>
                    {item.Genre}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default NewData;
