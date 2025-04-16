"use client"
import { IoPlaySharp, IoPause } from "react-icons/io5";
import { MdSkipNext } from "react-icons/md";
import { RxSpeakerOff, RxSpeakerModerate, RxSpeakerLoud } from "react-icons/rx";
import { CgMiniPlayer } from "react-icons/cg";
import { MdFullscreen } from "react-icons/md";
import { FiMinimize } from "react-icons/fi";

import { useRef, useState, useEffect } from "react";
import Timeline from "@/components/timeline";
import InputRange from "@/components/input/range";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import { formatTime } from "@/utils/formated";
import { useTranslation } from "@/hooks/useTranslation";
import { timeStamp } from "console";

type FullscreenDocument = Document & {
    webkitExitFullscreen?: () => Promise<void>;
    mozCancelFullScreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
};
type FullscreenElement = HTMLElement & {
    webkitRequestFullscreen?: () => Promise<void>;
    mozRequestFullScreen?: () => Promise<void>;
    msRequestFullscreen?: () => Promise<void>;
};

const VideoCostumeControl = ({ videoUrl }: { videoUrl: string }) => {
    const {t} = useTranslation();
    //*Screen Component
    const fullscreenRef = useRef<HTMLDivElement>(null);
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

    const handleEnterFullscreen = () => {
        const element = fullscreenRef.current as FullscreenElement;
        if (element?.requestFullscreen) {
            element.requestFullscreen();
        } else if (element?.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element?.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element?.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
        setIsFullScreen(true)
    };

    const handleExitFullscreen = () => {
        const doc = document as FullscreenDocument;

        if (doc.exitFullscreen) {
            doc.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
            doc.webkitExitFullscreen();
        } else if (doc.mozCancelFullScreen) {
            doc.mozCancelFullScreen();
        } else if (doc.msExitFullscreen) {
            doc.msExitFullscreen();
        }
        setIsFullScreen(false)
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            handleEnterFullscreen();
        } else {
            handleExitFullscreen();
        }
    };

    //* Hovered
    const [isHovered, setIsHovered] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseMove = () => {
        setIsHovered(true);

        // Reset timeout jika masih bergerak
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Jika tidak bergerak selama 3 detik, ubah ke false
        timeoutRef.current = setTimeout(() => {
            setIsHovered(false);
        }, 3000);
    };

    // Clear timeout saat komponen unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    //*Video componnet
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isShowControl, setIsShowControl] = useState<boolean>(false);

    //*Volume component
    const [volume, setVolume] = useState<number>(getLocalStorage<{ muted: boolean; volume: number }>("player-volume")?.volume ?? 100);
    const [muted, setMuted] = useState<boolean>(getLocalStorage<{ muted: boolean; volume: number }>("player-volume")?.muted ?? false);
    const [showVolumeIconScreen, setShowVolumeIconScreen] = useState<boolean>(false);
    const [isDragging, setIsDragging] = useState(false);
    const rangeRef = useRef<HTMLDivElement | null>(null);
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


    const handleMouseDown = () => {
        setIsDragging(true);
    };

    useEffect(() => {
        const handleMouseUp = (e: MouseEvent) => {
            if (!rangeRef.current) return;

            // Cek apakah mouse berada di dalam komponen
            if (!rangeRef.current.contains(e.target as Node)) {
                setIsDragging(false);
            }
        };

        if (isDragging) {
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);


    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(Number(event.target.value));
        setMuted(false)
        setLocalStorage("player-volume", {
            muted: false,
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


    //*Timeline
    const [duration, setDuration] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [bufferedTime, setBufferedTime] = useState<number>(0);
    const [isSeeking, setIsSeeking] = useState<boolean>(false);
    const [isPause, setIsPause] = useState<boolean>(false);
    const [showIcon, setShowIcon] = useState<boolean>(false);
    const [showForwordFiveSecond, setShowForwordFiveSecond] = useState<boolean>(false);
    const [showBackForwordFiveSecond, setShowBackForwordFiveSecond] = useState<boolean>(false);

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



    //* KEY FUNCTION
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
        const changeIsShowControl = () => {
            setIsShowControl(true);
            setTimeout(() => {
                setIsShowControl(false);
            }, 1000);
        }
        const changeVolumeByStep = (step: number) => {
            const newVolume = Math.max(0, Math.min(volume + step, 100));
            setVolume(newVolume);
            setMuted(false);
            setLocalStorage("player-volume", {
                muted: false,
                volume: newVolume,
            });
            setVideoVolume(newVolume);
        };
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!videoRef.current) return;
    
            const showTempIndicator = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
                setter(true);
                setTimeout(() => setter(false), 500);
            };
    
            switch (e.key) {
                case "ArrowRight":
                    videoRef.current.currentTime = currentTime + 5;
                    changeIsShowControl();
                    showTempIndicator(setShowForwordFiveSecond);
                    break;
    
                case "ArrowLeft":
                    videoRef.current.currentTime = currentTime - 5;
                    changeIsShowControl();
                    showTempIndicator(setShowBackForwordFiveSecond);
                    break;
    
                case "ArrowUp":
                    e.preventDefault();
                    changeVolumeByStep(5);
                    changeIsShowControl();
                    showTempIndicator(setShowVolumeIconScreen);
                    break;
    
                case "ArrowDown":
                    e.preventDefault();
                    changeVolumeByStep(-5);
                    changeIsShowControl();
                    showTempIndicator(setShowVolumeIconScreen);
                    break;
    
                case "m":
                case "M":
                    setMuted(prev => !prev);
                    changeIsShowControl();
                    break;
            }
        };
    
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [currentTime, setVolume, setMuted,volume]);
    

    //* Function MiniPlayer
    const miniPlayteData = {
        videoData:{
            url:"",
            title:"",
            userName:"",
            timeStamp:0,
            
        },
    }

    return (
        <div
            ref={fullscreenRef}
            onMouseMove={handleMouseMove}
            className="w-full aspect-video bg-teal-400 rounded-lg  overflow-hidden relative">
            <video
                autoPlay={!isPause}
                className="w-full h-full object-cover absolute inset-0"
                src={videoUrl}
                ref={videoRef}
                muted
                onClick={handleLoadedMetadata} preload="metadata"
                crossOrigin="anonymous"
                onTimeUpdate={handleTimeUpdateTime}
            />
            <div
            onDoubleClick={toggleFullscreen}
            className={`z-10 inset-0 absolute p-4 flex flex-col justify-end gap-4 cursor-pointer ${isPause || isShowControl || isHovered ? "opacity-100" : "opacity-0"}    transition-opacity duration-300`} onClick={togglePlayPause} >
                <div className="w-full h-full flex justify-around   items-center absolute inset-0  bg-[linear-gradient(to_bottom,_rgba(0,0,0,0)_70%,_rgba(0,0,0,1))]">
                    <div
                        className={`
                        w-24 aspect-square bg-black rounded-full bg-opacity-55 
                        flex flex-col justify-center items-center 
                        transition-all duration-500 p-4
                        ${showBackForwordFiveSecond ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"}
                        `}
                        >
                        <div className="w-full h-1/2 flex justify-center items-center ">
                            <IoPlaySharp className="rotate-180 text-white opacity-30 animate-fade [animation-delay:400ms]" />
                            <IoPlaySharp className="rotate-180 text-white opacity-30 animate-fade [animation-delay:200ms]" />
                            <IoPlaySharp className="rotate-180 text-white opacity-30 animate-fade [animation-delay:0ms]" />
                        </div>
                        <span className="text-sm">5 {t.control.second}</span>
                    </div>
                    <div
                        className={`
                        w-16 aspect-square bg-black rounded-full bg-opacity-55 
                        flex justify-center items-center 
                        transition-all duration-500 
                        ${showIcon ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"}
                        `}
                    >
                        {isPause ? (
                            <IoPlaySharp className="pl-1 size-1/2 text-white" />
                        ) : (
                            <IoPause className="size-1/2 text-white" />
                        )}
                    </div>
                    <div
                        className={`
                        absolute right-0 left-0 top-0 bottom-1/3
                        flex flex-col justify-around items-center 
                        `}
                    >   
                        <span className={`
                        p-3 bg-black
                        transition-all duration-500 bg-opacity-55 
                        ${showVolumeIconScreen ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"}
                            `}>{volume}%</span>
                        <div className={`  w-16 aspect-square bg-black rounded-full 
                        flex flex-col justify-center items-center bg-opacity-55 
                        transition-all duration-500 
                        ${showVolumeIconScreen ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"}
                        `}>
                            {
                                volume === 0 || muted
                                    ? <RxSpeakerOff className="size-1/3" />
                                    : volume <= 80
                                        ? <RxSpeakerModerate className="size-1/3" />
                                        : <RxSpeakerLoud className="size-1/3" />
                            }
                        </div>
                    </div>
                    <div
                        className={`
                        w-24 aspect-square bg-black rounded-full bg-opacity-55 
                        flex flex-col justify-center items-center 
                        transition-all duration-500 p-4
                        ${showForwordFiveSecond ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"}
                        `}
                    >       
                        <div className="w-full h-1/2 flex justify-center items-center ">
                            <IoPlaySharp className="text-white animate-fade opacity-30 [animation-delay:0ms]" />
                            <IoPlaySharp className="text-white animate-fade opacity-30 [animation-delay:200ms]" />
                            <IoPlaySharp className="text-white animate-fade opacity-30 [animation-delay:400ms]" />
                        </div>
                        <span className="text-sm">5 {t.control.second}</span>
                    </div>
                </div>

                <div className="w-full z-10 " onClick={(e) => e.stopPropagation()}>
                    <Timeline totalDuration={duration} currentTime={currentTime} onTimeUpdate={handleSeek} bufferedTime={bufferedTime} />
                </div>
                <div className="w-full flex justify-between z-10 " onClick={(e) => e.stopPropagation()}>
                    <ul className="flex h-full gap-4 items-center">
                        {
                            isPause
                                ? <li onClick={() => playVideo()} className="size-6 cursor-pointer">
                                    <IoPlaySharp className="size-full" />
                                </li>
                                : <li onClick={() => pauseVideo()} className="size-6 cursor-pointer">
                                    <IoPause className="size-full" />
                                </li>
                        }
                        <li className="size-6 cursor-pointer" >
                            <MdSkipNext className="size-full" />
                        </li>
                        <li className="h-6 flex items-center gap-4 group relative">
                            <div onClick={() => setMuted(!muted)} className="size-full cursor-pointer">
                                {
                                    volume === 0 || muted
                                        ? <RxSpeakerOff className="size-full" />
                                        : volume <= 80
                                            ? <RxSpeakerModerate className="size-full" />
                                            : <RxSpeakerLoud className="size-full" />
                                }
                            </div>

                            <div
                                ref={rangeRef}
                                className={`
                                left-full ml-2
                                transition-opacity duration-300
                                ${isDragging ? 'block' : 'hidden group-hover:block'}
                                `}
                                onMouseDown={handleMouseDown}
                            >
                                <InputRange max={100} min={0} value={volume} onChange={handleVolumeChange} />
                            </div>
                        </li>
                        <li>
                            {formatTime(currentTime)}
                            <span>/</span>
                            {formatTime(duration)}
                        </li>
                    </ul>
                    <ul className="flex items-center gap-4">
                        <li className="size-6 cursor-pointer">
                            <CgMiniPlayer className="size-full" />
                        </li>
                        {isFullScreen ?
                            <li className="size-6 cursor-pointer" onClick={handleExitFullscreen}>
                                <FiMinimize className="size-full" />
                            </li>
                            :
                            <li className="size-6 cursor-pointer" onClick={handleEnterFullscreen}>
                                <MdFullscreen className="size-full" />
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default VideoCostumeControl;