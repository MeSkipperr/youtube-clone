"use client"
import React, { useEffect, useRef, useState } from "react";
import { useAutoHideControls } from "./hooks/useAutoHideControls";
import { useVolumeControl } from "./hooks/useVolumeControl";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";
import { formatTime } from "@/utils/formated";

import { memo } from 'react';

import { IoPlaySharp, IoPause } from "react-icons/io5";
import { MdSkipNext } from "react-icons/md";
import { RxSpeakerOff, RxSpeakerModerate, RxSpeakerLoud } from "react-icons/rx";
import { CgMiniPlayer ,CgArrowsExpandLeft} from "react-icons/cg";
import { MdFullscreen } from "react-icons/md";
import { FiMinimize } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

import InputRange from "../input/range";
import { useTranslation } from "@/hooks/useTranslation";
import Timeline from "../timeline";
import { useMiniPlayer } from "@/context/MiniPlayerContext";
import { VideoCostumeControlProps } from "./types/props";
import { useRouter } from "next/navigation";
import { enterFullscreen, exitFullscreen } from "./utils/fullscreenUtils";

const VideoCostumeControl: React.FC<VideoCostumeControlProps> = (
    { 
        videoUrl,
        hexId,
        controlsList = false,
        timeline = false,
        expand =false,
        keyShortcut =false,
        autoPlay = false,
        controls = false,
        centerPlayControl = false,
        disabledKeys = [],
        enabledKeys = [] 
    }) => {
    const { t } = useTranslation();

    const router = useRouter();

    const { miniPlayer,setMiniPlayer ,resetMiniPlayer } = useMiniPlayer();

    const videoRef = useRef<HTMLVideoElement>(null);
    const rangeRef = useRef<HTMLDivElement | null>(null);

    const [showForwordFiveSecond, setShowForwordFiveSecond] = useState<boolean>(false);
    const [showBackForwordFiveSecond, setShowBackForwordFiveSecond] = useState<boolean>(false);
    const [isSeeking, setIsSeeking] = useState<boolean>(false);
    const [isDragging, setIsDragging] = useState(false);
    const [bufferedTime, setBufferedTime] = useState<number>(0);
    const [showVolumeIconScreen, setShowVolumeIconScreen] = useState<boolean>(false);
    const [showIcon, setShowIcon] = useState<boolean>(false);
    const [isShowControl, setIsShowControl] = useState<boolean>(false);

    const containerRef = useRef<HTMLDivElement>(null);

    const [playing, setPlaying] = useState<boolean>(miniPlayer.progress?.isPlaying  === null || miniPlayer.progress?.isPlaying === undefined ?  autoPlay : miniPlayer.progress?.isPlaying);
    const [currentTime, setCurrentTime] = useState <number>( miniPlayer.progress?.timeStamp?? 0);
    const [duration, setDuration] = useState<number>(miniPlayer.videoData?.duration ?? 0);
    const [fullscreen, setFullscreen] = useState<boolean>(false);

    const { volume, muted, setMuted, updateVolume ,setVolume} = useVolumeControl(videoRef);
    const { controlsVisible, resetTimer } = useAutoHideControls(containerRef);


    const handleSeek = (time: number) => {
        setIsSeeking(true);
        setCurrentTime(time);
    };

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    useEffect(() => {
        if (isSeeking && videoRef.current) {
            videoRef.current.currentTime = currentTime;
            setIsSeeking(false);
        }
    }, [currentTime, isSeeking]);

    

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
        const video = videoRef.current;
        if (!video) return;
        
        video.currentTime = miniPlayer.progress?.timeStamp ?? 0
        // setCurrentTime(miniPlayer.progress?.timeStamp ?? video.currentTime)

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
    }, [miniPlayer.progress?.timeStamp]);

    const handlePlayPause = () => {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) {
            video.play();
            setPlaying(true);
        } else {
            video.pause();
            setPlaying(false);
        }
        resetTimer();
    };

    const handleFullscreenToggle = () => {
        const container = containerRef.current;
        if (!container) return;

        const isFullscreen = document.fullscreenElement === container;

        if (!isFullscreen && container) {
            enterFullscreen(container, (success) => {
                if (success) setFullscreen(true);
            });
        } else {
            exitFullscreen((success) => {
                if (success) setFullscreen(false);
            })
        }
    };


    useEffect(() => {
        setShowIcon(true);
        const timeout = setTimeout(() => {
            setShowIcon(false);
        }, 500);

        return () => clearTimeout(timeout);
    }, [playing]);



    const updateMiniPlayer = (redirectUrl: string,setMiniplayer : boolean) => {
        setMiniPlayer({
            videoData: {
                url: videoUrl,
                title: "Bunny",
                userName: "Cartoon Network",
                duration: duration,
                hexId,
            },
            progress: {
                timeStamp: currentTime,
                isPlaying: playing,
            },
            isMiniPlayer:setMiniplayer
        });
    
        router.push(redirectUrl);
    };

    const toggleMiniPlayer = () =>{
        if(miniPlayer.isMiniPlayer){
            updateMiniPlayer("/watch?v=" + (miniPlayer.videoData?.hexId ?? ""), false)
        }else{
            updateMiniPlayer("/", true)
        }
    }

    useEffect(() => {
        if(miniPlayer.isMiniPlayer){
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    resetMiniPlayer()
                }
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [miniPlayer.isMiniPlayer, resetMiniPlayer]);
    

    useKeyboardShortcuts({
        enable : keyShortcut,
        videoRef,
        updateVolume,
        setMuted ,
        muted,
        toggleFullscreen: () => handleFullscreenToggle(),
        setIsShowControl,
        setShowVolumeIconScreen,
        setShowForwordFiveSecond,
        setShowBackForwordFiveSecond,
        handlePlayPause,
        toggleMiniPlayer,
        disabledKeys ,
        enabledKeys 
    });

    return (
        <div
            ref={containerRef}
            onMouseMove={resetTimer}
            className="w-full aspect-video  overflow-hidden relative">
            <video
                className="w-full h-full object-cover absolute inset-0"
                src={videoUrl}
                ref={videoRef}
                autoPlay={playing}
                muted
                onClick={handlePlayPause} 
                preload="metadata"
                crossOrigin="anonymous"
                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
            />
            <div
                onDoubleClick={handleFullscreenToggle}
                className={`z-10 inset-0 absolute p-4 flex flex-col justify-end gap-4 cursor-pointer ${!playing || isShowControl || controlsVisible ? "opacity-100" : "opacity-0"}    transition-opacity duration-300`} onClick={handlePlayPause} >
                    
                {keyShortcut?
                <div className="w-full h-full flex justify-around items-center absolute inset-0  bg-[linear-gradient(to_bottom,_rgba(0,0,0,0)_70%,_rgba(0,0,0,1))]">
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
                        {playing ? (
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
                :null
                }
                {expand?
                <div className="w-full absolute top-0 left-0  z-10 "  onClick={(e) => e.stopPropagation()}>
                    <ul className="w-full  h-full flex justify-between items-center p-4">
                        <li onClick={()=>updateMiniPlayer("/watch?v="+hexId,false)} className="size-6 cursor-pointer">
                            <CgArrowsExpandLeft className="size-full"/>
                        </li>
                        <li onClick={()=>resetMiniPlayer()}  className="size-6 cursor-pointer">
                            <IoMdClose  className="size-full"/>
                        </li>
                    </ul>
                </div>
                :null
                }
                {centerPlayControl?
                    <div className={`w-full absolute inset-0  ${!playing || isShowControl || controlsVisible ? "opacity-100" : "opacity-0"} `}  >
                        <ul className="w-full  h-full flex justify-around items-center  p-4">
                            <li className="w-1/3 flex " onClick={(e) => e.stopPropagation()}>
                            </li>
                                <li  className="w-1/3 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                                    {playing ? 
                                    <IoPause onClick={handlePlayPause}   className="size-4/12 cursor-pointer "/>
                                    :
                                    <IoPlaySharp onClick={handlePlayPause}  className="size-4/12 cursor-pointer"/>
                                    }   
                                </li>
                            <li   className="w-1/3 flex items-center " onClick={(e) => e.stopPropagation()}>
                                <MdSkipNext className="size-4/12"/>
                            </li>
                        </ul>
                    </div>
                :null
                }
                {controls|| timeline?
                    <div className="w-full z-10 " onClick={(e) => e.stopPropagation()}>
                        {miniPlayer.isMiniPlayer?
                        <span>
                            {formatTime(currentTime)}
                            <span>/</span>
                            {formatTime(duration)}
                        </span>
                        :null
                        }
                        <Timeline totalDuration={duration} currentTime={currentTime} onTimeUpdate={handleSeek} bufferedTime={bufferedTime} />
                    </div>
                    :null
                }
                {controls ||controlsList?
                <div className="w-full flex justify-between z-10 text-white" onClick={(e) => e.stopPropagation()}>
                    <ul className="flex h-full gap-4 items-center">
                        {
                            !playing
                                ? <li onClick={handlePlayPause} className="size-6 cursor-pointer">
                                    <IoPlaySharp className="size-full" />
                                </li>
                                : <li onClick={handlePlayPause} className="size-6 cursor-pointer">
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
                                <InputRange max={100} min={0} value={volume} onChange={(e) => setVolume(Number(e.target.value))} />
                            </div>
                        </li>
                        <li>
                            {formatTime(currentTime)}
                            <span>/</span>
                            {formatTime(duration)}
                        </li>
                    </ul>
                    <ul className="flex items-center gap-4">
                        <li className="size-6 cursor-pointer" onClick={()=>updateMiniPlayer("/",true)}>
                            <CgMiniPlayer className="size-full" />
                        </li>
                        {fullscreen ?
                            <li className="size-6 cursor-pointer" onClick={handleFullscreenToggle}>
                                <FiMinimize className="size-full" />
                            </li>
                            :
                            <li className="size-6 cursor-pointer" onClick={handleFullscreenToggle}>
                                <MdFullscreen className="size-full" />
                            </li>
                        }
                    </ul>
                </div>
                : null
                }
            </div>
        </div>
    );
};

export default memo(VideoCostumeControl); 