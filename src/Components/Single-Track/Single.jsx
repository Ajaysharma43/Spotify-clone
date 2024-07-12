import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import image from "../../assets/download.png";

const linkUrl = `http://localhost:3000/data`;

function Single() {
  const [single, setSingle] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioState, setAudioState] = useState("Play");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const { id } = useParams();
  const [newId, setId] = useState(id);

  const audioControl = useRef(null);
  const audioRange = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getSingle = async () => {
      try {
        const response = await axios.get(`${linkUrl}/${newId}`);
        setSingle(response.data);
        audioControl.current.load();
      } catch (error) {
        console.error("Error fetching single:", error);
      }
    };
    getSingle();
  }, [newId]);

  async function fetchSingleAndUpdate(id) {
    try {
      const response = await axios.get(`${linkUrl}/${id}`);
      setSingle(response.data);
      setId(id);
      audioControl.current.load();
      audioControl.current.play();
    } catch (error) {
      console.error("Error fetching single:", error);
    }
  }

  useEffect(() => {
    const audio = audioControl.current;

    const updateCurrentTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateCurrentTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateCurrentTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  const handleProgressClick = (e) => {
    const progressBar = audioRange.current;
    const clickPosition =
      (e.pageX - progressBar.getBoundingClientRect().left) /
      progressBar.offsetWidth;
    const newTime = clickPosition * duration;
    audioControl.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleRangeChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audioControl.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const togglePlayPause = () => {
    const audio = audioControl.current;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
      setAudioState("Pause");
    } else {
      audio.pause();
      setIsPlaying(false);
      setAudioState("Play");
    }
  };

  const playNext = () => {
    const nextId = isNaN(id) ? 0 : +id + 1;
    fetchSingleAndUpdate(nextId);
    navigate(`/Single/${nextId}`, { replace: true });
  };

  const playPrevious = () => {
    const prevId = isNaN(id) ? 0 : +id - 1;
    if (prevId >= 0) {
      fetchSingleAndUpdate(prevId);
      navigate(`/Single/${prevId}`, { replace: true });
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className={`min-h-screen flex flex-col items-center justify-center transition-all duration-500 ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        <div className="flex justify-end w-full p-4">
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
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h1 className="text-4xl font-bold mb-2">{single.name}</h1>
          <p className="text-xl text-gray-400">{single.artist}</p>
        </motion.div>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="w-64 h-64 mb-4"
        >
          <img 
            src={image}
            alt="Album Cover"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </motion.div>
        <audio
          controls
          src={single.song}
          ref={audioControl}
          className="hidden"
        />
        <motion.input 
          type="range"
          value={(currentTime / duration) * 100 || 0}
          onChange={handleRangeChange}
          onClick={handleProgressClick}
          ref={audioRange}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className={`w-3/4 h-2 rounded-full appearance-none ${
            darkMode ? "bg-gray-700" : "bg-gray-300"
          }`}
        />
        <div className="flex space-x-4 mt-4">
          <motion.button 
            onClick={togglePlayPause}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`px-6 py-2 rounded-md shadow-md focus:outline-none ${
              darkMode ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {audioState}
          </motion.button>
          <motion.button 
            onClick={playPrevious}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`px-6 py-2 rounded-md shadow-md focus:outline-none ${
              darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-gray-500 text-white hover:bg-gray-400"
            }`}
          >
            Previous
          </motion.button>
          <motion.button 
            onClick={playNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`px-6 py-2 rounded-md shadow-md focus:outline-none ${
              darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-gray-500 text-white hover:bg-gray-400"
            }`}
          >
            Next
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Single;
