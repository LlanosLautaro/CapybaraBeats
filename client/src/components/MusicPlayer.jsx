import  { useState, useRef, useEffect } from 'react';
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

  const songs = [
    {
      url: "https://audioplayer.madza.dev/Madza-Chords_of_Life.mp3",
      title: "Chords of Life",
      artist: "Madza",
      tags: ["house"],
      cover: "https://i.scdn.co/image/ab67616d00001e02357e0dff422fef353495e466"
    },
    // Agrega más canciones según sea necesario
  ];

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const currentSong = songs[currentSongIndex];

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
    audioRef.current.addEventListener('timeupdate', () => {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((currentTime / duration) * 100);
    });
  }, []);

  return (
    <MusicPlayerContainer>
      <img src={currentSong.cover} alt="Song Cover" />
      <div className="song-info">
        <div className="song-title">{currentSong.title}</div>
        <div className="artist">{currentSong.artist}</div>
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
        value={progress}
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
      <audio ref={audioRef} src={currentSong.url} autoPlay />
    </MusicPlayerContainer>
  );
}

export default MusicPlayer;
