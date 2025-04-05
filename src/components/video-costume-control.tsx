"use client"
import { IoPlaySharp ,IoPause } from "react-icons/io5";
import { MdSkipNext } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { RxSpeakerOff, RxSpeakerModerate, RxSpeakerLoud } from "react-icons/rx";
import { CgMiniPlayer } from "react-icons/cg";
import { MdFullscreen } from "react-icons/md";

import { useRef, useState, useEffect } from "react";
import Timeline from "@/components/timeline";
import InputRange from "@/components/input/range";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import { formatTime } from "@/utils/formated";

const VideoCostumeControl = ({videoUrl}:{videoUrl:string}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isShowControl, setIsShowControl] = useState<boolean>(false);

    const [volume, setVolume] = useState<number>(getLocalStorage<{muted:boolean;volume:number}>("player-volume")?.volume?? 100);
    const [muted, setMuted] = useState<boolean>(getLocalStorage<{muted:boolean;volume:number}>("player-volume")?.muted??false);

    const setVideoVolume = (value: number) => {
        if (videoRef.current) {
        videoRef.current.volume = value / 100; 
        }
    };
    
    const setVideoMuted = (isMuted: boolean) => {
        if (videoRef.current) {
        videoRef.current.muted = isMuted;
        }
    };

    const changeIsShowControl = ()=>{
        setIsShowControl(true);
        setTimeout(() => {
            setIsShowControl(false);
        }, 1000); 
    }

    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(Number(event.target.value));
        setMuted(false)
        setLocalStorage("player-volume",{
            muted:false,
            volume
        })
        setVideoVolume(volume)
    };
    
    useEffect(() => {
        if (muted) {
            const previous = getLocalStorage<{ muted: boolean; volume: number }>("player-volume");
        
            setLocalStorage("player-volume", {
                muted: true,
                volume: previous?.volume ?? 100, 
            });
        setVolume(0);
        } else {
            const previous = getLocalStorage<{ muted: boolean; volume: number }>("player-volume");
        
            const storedVolume = previous?.volume ?? 100;
            
            setVolume(storedVolume);
        
            setLocalStorage("player-volume", {
                muted: false,
                volume: storedVolume,
            });
        }
        setVideoMuted(muted)
    }, [muted]);
    

    //Timeline
    const [duration, setDuration] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [bufferedTime, setBufferedTime] = useState<number>(0);
    const [isSeeking, setIsSeeking] = useState<boolean>(false);
    const [isPause, setIsPause] = useState<boolean>(true);
    const [showIcon, setShowIcon] = useState<boolean>(false);

    const handleSeek = (time: number) => {
        setIsSeeking(true);
        setCurrentTime(time);
    };

    const playVideo = () => {
        if (videoRef.current) {
            videoRef.current.play().catch((error) => {
                console.error("Video play failed:", error);
            });
            setIsPause(false)
        }
    };

    const pauseVideo = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            setIsPause(true)
        }
    };

    const togglePlayPause = () => {
        if (isPause) {
            playVideo();
        } else {
            pauseVideo();
        }
    };
    
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === "Space") {
                e.preventDefault(); // Hindari scroll otomatis
                togglePlayPause();
            }
        };
    
        document.addEventListener("keydown", handleKeyDown);
    
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isPause]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "m" || e.key === "M") {
                setMuted(prev => !prev);
                changeIsShowControl()
            }
        };
    
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);
    
    

    useEffect(() => {
    if (isSeeking && videoRef.current) {
        videoRef.current.currentTime = currentTime;
        setIsSeeking(false);
    }
    }, [currentTime, isSeeking]);

    const handleLoadedMetadata = () => {
        console.log("Event onLoadedMetadata triggered");
        console.log("videoRef.current:", videoRef.current);
    
        if (videoRef.current?.duration && videoRef.current.duration > 0) {
            setDuration(videoRef.current.duration);
            console.log("Duration:", videoRef.current.duration);
        } else {
            console.warn("Duration not readable, try using the onCanPlay event");
        }
    };

    useEffect(() => {
        setShowIcon(true);
        const timeout = setTimeout(() => {
            setShowIcon(false);
        }, 500); 

        return () => clearTimeout(timeout); 
    }, [isPause]);
    
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
    
        // Set total duration when the video is loaded
        //   const handleLoadedMetadata = () => setDuration(video.duration);
        handleLoadedMetadata()
        // Update current time
        const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    
        // Update buffered time
        const handleProgress = () => {
            if (video.buffered.length > 0) {
                setBufferedTime(video.buffered.end(video.buffered.length - 1));
            }
        };
    
        //   video.addEventListener("loadedmetadata", handleLoadedMetadata);
        video.addEventListener("timeupdate", handleTimeUpdate);
        video.addEventListener("progress", handleProgress);
    
        return () => {
            // video.removeEventListener("loadedmetadata", handleLoadedMetadata);
            video.removeEventListener("timeupdate", handleTimeUpdate);
            video.removeEventListener("progress", handleProgress);
        };
    }, []);

    
    const handleTimeUpdateTime = () => {
        if (videoRef.current) {
            // videoRef.current.currentTime = currentTime; // Adjust video time

            setCurrentTime(videoRef.current.currentTime); // Update state when video time changes
        }
    };

    return (
        <div className="w-full aspect-video bg-teal-400 rounded-lg  overflow-hidden relative">
            <video
                autoPlay={!isPause}
                className="w-full h-full object-cover absolute inset-0"
                src={videoUrl}
                ref={videoRef}
                onClick={handleLoadedMetadata} preload="metadata"
                crossOrigin="anonymous"
                onTimeUpdate={handleTimeUpdateTime}
            />
            <div className={`z-10 inset-0 absolute p-4 flex flex-col justify-end gap-4 cursor-pointer ${isPause || isShowControl ?"opacity-100" : "opacity-0"}  hover:opacity-100  transition-opacity duration-300`}  onClick={togglePlayPause} >
                <div className="w-full h-full flex justify-center items-center absolute inset-0">
                    <div
                        className={`
                        w-16 aspect-square bg-black rounded-full bg-opacity-55 
                        flex justify-center items-center 
                        transition-all duration-500 
                        ${showIcon ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"}
                        `}
                    >
                        {isPause ? (
                        <IoPlaySharp className="size-1/2 text-white" />
                        ) : (
                        <IoPause className="size-1/2 text-white" />
                        )}
                    </div>
                </div>

                <div className="w-full z-10 "  onClick={(e) => e.stopPropagation()}>
                    <Timeline totalDuration={duration} currentTime={currentTime} onTimeUpdate={handleSeek} bufferedTime={bufferedTime} />
                </div>
                <div className="w-full flex justify-between z-10 "  onClick={(e) => e.stopPropagation()}>
                    <ul className="flex h-full gap-4 items-center">
                        {
                            isPause
                            ?<li onClick={()=>playVideo()} className="size-6 cursor-pointer">
                                <IoPlaySharp       className="size-full"/>
                            </li>
                            :<li onClick={()=>pauseVideo()} className="size-6 cursor-pointer">
                                <IoPause       className="size-full"/>
                            </li>
                        }
                        <li className="size-6 cursor-pointer" >
                            <MdSkipNext        className="size-full"/>
                        </li>
                        <li onClick={()=>setMuted(!muted)} className="h-6 cursor-pointer flex items-center gap-4 group">
                            {
                                volume === 0 || muted
                                ?<RxSpeakerOff      className="size-full"/>
                                :volume <= 80 
                                ?<RxSpeakerModerate className="size-full"/>
                                :<RxSpeakerLoud     className="size-full"/>
                            }
                            <div className="hidden group-hover:block transition-opacity duration-300">
                                <InputRange max={100} min={0} value={volume} onChange={handleVolumeChange}/>
                            </div>
                        </li>
                        <li>
                            {formatTime(currentTime)}
                            <span>/</span>
                            {formatTime(duration)}
                        </li>
                    </ul>
                    <ul className="flex items-center gap-4">
                        <li  className="size-6 cursor-pointer">
                            <IoMdSettings className="size-full"/>
                        </li>
                        <li  className="size-6 cursor-pointer">
                            <CgMiniPlayer className="size-full"/>
                        </li>
                        <li  className="size-6 cursor-pointer">
                            <MdFullscreen className="size-full" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default VideoCostumeControl;