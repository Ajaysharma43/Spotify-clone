import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSong,
  addSong,
  removeSong,
} from "../../features/songs/songslice";

function NewData() {
  const [data, setData] = useState([]);
  const [liked, setLiked] = useState({});
  const [editedTitle, setEditedTitle] = useState({});
  const dispatch = useDispatch();
  const likedSongs = useSelector((state) => state.songs.likedSongs);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("http://localhost:3000/data");
      setData(response.data);
    };
    getData();
  }, []);

  const isLiked = (song) => {
    return likedSongs.some((likedSong) => likedSong.id === song.id);
  };

  const handleLike = (song) => {
    if (isLiked(song)) {
      setLiked({ ...liked, [song.id]: "Unliked" });
      dispatch(removeSong(song));
    } else {
      dispatch(addSong(song));
      setLiked({ ...liked, [song.id]: "Liked" });
    }
  };

  const handleSave = (song, newTitle) => {
    dispatch(updateSong({ ...song, title: newTitle }));
    setEditedTitle({ ...editedTitle, [song.id]: newTitle });
  };

  return (
    <div class="font-semibold m-10 space-y-4">
      {data.map((item) => (
        <motion.div
          className="bg-gray-100 border-2 border-black-200 width-100 w-60 h-40 transition duration-300 hover:bg-blue-300 hover:text-red-500 hover:shadow-lg"
          key={item.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          drag="x"
        >
          <Link to={`/Single/${item.id}`}>
            <h1 className="">{item.name}</h1>
          </Link>
          <audio controls src={item.song}></audio>
          <button
            onClick={() => handleLike(item)}
            className="bg-blue-500 w-16 text-red-200 border-2 border-red-300 hover:border-blue-300 transition duration-300 ease-in-out transform hover:scale-110 p-2 "
          >
            {isLiked(item) ? "Unliked" : "Liked"}
          </button>
        </motion.div>
      ))}
    </div>
  );
}

export default NewData;
