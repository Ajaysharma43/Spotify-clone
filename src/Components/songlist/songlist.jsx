import { useDispatch, useSelector } from 'react-redux';
import { removeSong } from '../../features/songs/songslice';

function Likedsongs() {
  const songs = useSelector((state) => state.songs.likedSongs);
  const remove = useDispatch((state) => state.songs.likedSongs);

  const removesong = (song) =>{
    remove(removeSong(song))
  }

  return (
    <div>
      <h1>Liked Songs</h1>
      {songs.length > 0 ? (
        songs.map((song) => (
          <div key={song.id}>
            <h2>{song.title}</h2>
            <audio controls src={song.song}></audio>
            <button onClick={() => removesong(song)}>remove</button>
          </div>
        ))
      ) : (
        <p>No liked songs yet.</p>
      )}
    </div>
  );
}

export default Likedsongs;
