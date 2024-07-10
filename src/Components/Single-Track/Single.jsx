import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import  image  from "../../assets/download.png";

const linkUrl = `http://localhost:3000/data`

function Single() {
  const [single, setSingle] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [audioState, setAudioState] = useState("pause");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const { id } = useParams();
  const [newId, setId] = useState(id);

  const audioControl = useRef(null);
  const audioRange = useRef(null);

const navigate = useNavigate();

  useEffect(() => {
    const getSingle = async () => {
      console.log(id);
      const response = await axios.get(`${linkUrl}/${newId}`);
      console.log(response.data);
      setSingle(response.data);
      audioControl.current.load();
      audioControl.current.play();
    };
    getSingle();
  }, [newId]);

 
    async function next(id) {
      id = id + 1
      console.log(id);
      const number = isNaN(id)? id = 0 : id
      console.log(number);
      
      const response = await axios.get(`${linkUrl}/${id}`)
      console.log(response.data);
      setSingle(response.data)
      navigate(`/Single/${id}`,{replace:true})
      
    }

  

  async function prev(id) {
    id = id - 1
    if(id <= 0)
      {
        id = 0
      }
      const response = await axios.get(`${linkUrl}/${id}`)
      console.log(response.data);
      setSingle(response.data)
      
      navigate(`/Single/${id}`,{replace:true})

  }

  function audioOperation() {
    const audio = audioControl.current;
    if (!isPlaying) {
      audio.play();
      setIsPlaying(true);
      setAudioState("pause");
    } else {
      audio.pause();
      setIsPlaying(false);
      setAudioState("play");
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
    const clickPosition = (e.pageX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth;
    const newTime = clickPosition * duration;
    audioControl.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleRangeChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audioControl.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  useEffect(() => {
    if (audioRange.current) {
      audioRange.current.value = (currentTime / duration) * 100;
    }
  }, [currentTime, duration]);

 

  return (
    <motion.div className="page">
      <h1>{single.name}</h1>
      <audio id="myAudio" controls src={single.song} ref={audioControl} hidden />
      <input
        type="range"
        value={(currentTime / duration) * 100}
        ref={audioRange}
        onClick={handleProgressClick}
        onChange={handleRangeChange}
      />
      <img src={image}></img>
      <button onClick={audioOperation}>{audioState}</button>
      <button onClick={() => prev(single.id)} >PrevSong</button>
      <button onClick={() => next(single.id)}>Nextsong</button>
    </motion.div>
  );
}

export default Single;
