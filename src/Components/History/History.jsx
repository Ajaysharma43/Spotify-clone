import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const History = () => {
  const linkUrl = import.meta.env.VITE_API_URL;

  const [History, SetHistory] = useState([]);

  useEffect(() => {
    const GetHistory = async () => {
      const username = sessionStorage.getItem("Username");
      const password = sessionStorage.getItem("Password");

      const result = await axios.post(`${linkUrl}/HistoryData`, {
        username,
        password,
      });
      console.log(result.data.user.History);
      SetHistory(result.data.user.History);
    };
    GetHistory();
  }, []);

  const removeSong = async (Songid, Songname, Song, SongImage) => {
    try {
      const username = sessionStorage.getItem("Username");
      const password = sessionStorage.getItem("Password");
  
      // Make an API call to delete the song
      const result = await axios.post(`${linkUrl}/deleteHistory`, {
        Songid,
        Songname,
        Song,
        SongImage,
        username,
        password,
      });
  
      // If the song was successfully removed
      if (result.data === "removed") {
        // Update the state by filtering out the removed song
        const updatedSongs = History.filter((item) => item.id !== Songid);
  
        // Update the state with the new filtered history
        SetHistory(updatedSongs);
      }
    } catch (error) {
      console.error("Error removing song:", error);
    }
  };
  
  return (
    <>
    <motion.div className="flex flex-col items-center bg-gradient-to-b from-blue-900 via-indigo-900 to-gray-900 min-h-screen w-full py-10">
  {/* Page Container */}
  <motion.div
    className="w-full max-w-5xl px-4"
    transition={{ delay: 0.2, duration: 1 }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <h1 className="text-4xl font-bold text-white mb-8 text-center tracking-wide">
      Your Listening History
    </h1>

    {/* History Card List */}
    <div className="flex flex-col gap-6">
      {History.map((historyItem) => (
        <motion.div
          key={historyItem.id}
          className="flex items-center bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transform transition duration-500 hover:scale-[1.02]"
        >
          {/* Image Section */}
          <Link to={`/Single/${historyItem.id}`} className="w-28 h-28">
            <img
              src={historyItem.Image}
              alt={historyItem.name}
              className="w-full h-full object-cover brightness-90 hover:brightness-100 transition duration-300"
            />
          </Link>

          {/* Content Section */}
          <div className="flex-1 p-4 flex flex-col justify-between">
            <h2 className="text-lg font-semibold text-white truncate">
              {historyItem.name}
            </h2>

          </div>

          {/* Action Button */}
          <div className="p-4">
            <button
              onClick={() =>
                removeSong(
                  historyItem.id,
                  historyItem.name,
                  historyItem.Song,
                  historyItem.Image
                )
              }
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-transform duration-300 hover:scale-105 shadow-md"
            >
              Delete
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
</motion.div>

    </>
  );
};

export default History;
