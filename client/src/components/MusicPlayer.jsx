import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { HiOutlinePause, HiOutlinePlay, HiChevronLeft, HiChevronRight, HiOutlineVolumeOff, HiOutlineVolumeUp } from 'react-icons/hi';


const MusicPlayerContainer = styled.div`
  color: ${(props) => props.theme.text};
  background: ${(props) => props.theme.bg};
  border: 1px solid ${(props) => props.theme.bg3};
  border-radius: 16px;
  padding: 20px;
  width: 95%;
  text-align: center;
  position: fixed;
  bottom: 20px;
  right: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;

  img {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    margin-right: 10px;
  }

  .song-info {
    text-align: left;
    margin-right: 100px;

    .song-title {
      font-size: 18px;
      font-weight: 600;
    }

    .artist {
      font-size: 14px;
      font-weight: 400;
      color: ${(props) => props.theme.text2};
    }
  }

  button {
    background-color:  ${(props) => props.theme.bg};
    color: ${(props) => props.theme.bg4};
    border: none;
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 10px;
    cursor: pointer;
    border-radius: 50%;
    transition: background-color 0.3s;

    svg {
      font-size: 30px;
    }

    &:hover {
      background-color: ${(props) => props.theme.bg4};
      color: #fff;
    }
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  margin: auto;
  flex: 1;
`;
const ProgressContainer = styled.input`
  flex: 2;
  width: 100%;
  margin: 0 12px;

  &::-webkit-slider-runnable-track {
    background: transparent;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 5px;
    height: 10px;
    background: ${(props) => props.theme.bg4};
    transition: background-color 0.3s;
  }

  &::-moz-range-track {
    background: transparent;
  }

  &::-moz-range-thumb {
    width: 5px;
    height: 10px;
    background: ${(props) => props.theme.bg4};
    transition: background-color 0.3s;
  }
`;

const VolumeContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState(null);

  const playPauseHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextSongHandler = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      setCurrentSongIndex(0);
    }
  };

  const previousSongHandler = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
    } else {
      setCurrentSongIndex(songs.length - 1);
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
    audioRef.current.volume = newVolume;
  };

  useEffect(() => {
    // Realiza la solicitud a la API para obtener los detalles de la canción actual
    fetch('http://localhost:8000/music/song/1/')  
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setCurrentSong(data);
      })
      .catch((error) => {
        console.error('Error al cargar los datos de la canción:', error);
      });
  }, []); // <-- No había un cierre de llave aquí
  useEffect(() => {
    audioRef.current.addEventListener('timeupdate', () => {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((currentTime / duration) * 100);
    });
  }, []);
  useEffect(() => {
    // Esta función maneja la carga de la lista de canciones
    const fetchSongs = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_SONGS_LIST}`);
        if (response.ok) {
          const data = await response.json();
          setSongs(data);
        } else {
          console.error('Error al cargar la lista de canciones desde el backend');
        }
      } catch (error) {
        console.error('Error al cargar la lista de canciones:', error);
      }
    };

    fetchSongs(); // Cargar la lista de canciones cuando se monta el componente
  }, []); // <-- Aquí no había un cierre de llave


  return (
    <MusicPlayerContainer>
      {currentSong && (
        <img src={currentSong.image_file} alt="Song Cover" />
      )}
      <div className="song-info">
        {currentSong && (
          <div className="song-title">{currentSong.title}</div>
        )}
        {currentSong && (
          <div className="artist">{currentSong.artist}</div>
        )}
      </div>
      <ControlsContainer>
        <button onClick={previousSongHandler}><HiChevronLeft /></button>
        <button onClick={playPauseHandler}>
          {isPlaying ? <HiOutlinePause /> : <HiOutlinePlay />}
        </button>
        <button onClick={nextSongHandler}><HiChevronRight /></button>
      </ControlsContainer>
      <ProgressContainer
  type="range"
  min="0"
  max="100"
  value={isNaN(progress) ? 0 : progress} // Verificar si progress es NaN
  step="0.01"
  onChange={(e) => {
    const newTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
  }}
/>

      <VolumeContainer>
        <button onClick={() => handleVolumeChange(isMuted ? 1 : 0)}>
          {isMuted ? <HiOutlineVolumeOff /> : <HiOutlineVolumeUp />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
        />
      </VolumeContainer>
      <audio ref={audioRef} src={currentSong ? currentSong.song_file : ''} autoPlay />
    </MusicPlayerContainer>
  );
}

export default MusicPlayer;