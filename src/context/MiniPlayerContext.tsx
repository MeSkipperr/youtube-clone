"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type VideoData = {
    url: string;
    title: string;
    userName: string;
    duration: number;
    hexId:string;
};

type Progress = {
    timeStamp: number;
    isPlaying: boolean;
}

type MiniPlayerState = {
    videoData: VideoData | null;
    progress: Progress | null;
    isMiniPlayer:boolean
};

type MiniPlayerContextType = {
    miniPlayer: MiniPlayerState;
    setMiniPlayer: (data: MiniPlayerState) => void;
    resetMiniPlayer: () => void;
};

const MiniPlayerContext = createContext<MiniPlayerContextType | undefined>(undefined);

export const MiniPlayerProvider = ({ children }: { children: ReactNode }) => {
    const [miniPlayer, setMiniPlayerState] = useState<MiniPlayerState>({
        videoData: null,
        progress: null,
        isMiniPlayer:false
    });

    const setMiniPlayer = (data: MiniPlayerState) => {
        setMiniPlayerState(data);
    };

    const resetMiniPlayer = () => {
        setMiniPlayerState({
            videoData: null, 
            progress: null ,
            isMiniPlayer: false
        });
    };
    console.log(miniPlayer)
    return (
        <MiniPlayerContext.Provider value={{ miniPlayer, setMiniPlayer, resetMiniPlayer }}>
            {children}
        </MiniPlayerContext.Provider>
    );
};

export const useMiniPlayer = () => {
    const context = useContext(MiniPlayerContext);
    if (!context) {
        throw new Error("useMiniPlayer must be used within a MiniPlayerProvider");
    }
    return context;
};
