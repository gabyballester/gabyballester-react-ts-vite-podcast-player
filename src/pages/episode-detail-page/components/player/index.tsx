import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import type { Episode } from "../../../../types";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa"; // Importa los iconos de play, pause y mute
import { formatTime } from "../helper/formatTime.helper";

import "./styles.scss";

type Props = {
  episodeDetail: Episode;
};

export const Player = ({ episodeDetail }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false); // Estado para controlar si el audio está silenciado
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
      };
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      return () => {
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((prevIsPlaying) => {
      if (prevIsPlaying) {
        audioRef.current!.pause();
      } else {
        audioRef.current!.play();
      }
      return !prevIsPlaying;
    });
  }, []);

  const handleTimeUpdate = useCallback(() => {
    setCurrentTime(audioRef.current!.currentTime);
  }, []);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    audioRef.current!.currentTime = time;
  }, []);

  const toggleMute = useCallback(() => {
    audioRef.current!.muted = !isMuted;
    setIsMuted((prevIsMuted) => !prevIsMuted);
  }, [isMuted]);

  const formattedCurrentTime = useMemo(
    () => formatTime(currentTime),
    [currentTime]
  );

  return (
    <div className="player">
      <p className="player__title">{episodeDetail.title}</p>
      <p className="player__description">{episodeDetail.description}</p>
      <div className="player__audio-player">
        <audio
          ref={audioRef}
          src={episodeDetail.audio}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />
        <div className="player__audio-player__controls">
          <button onClick={togglePlay} className="player__play-pause-button">
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="player__audio-player__seek"
          />
          <div className="player__audio-player__time">
            {formattedCurrentTime}
          </div>
          <button onClick={toggleMute} className="player__mute-button">
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
        </div>
      </div>
    </div>
  );
};
