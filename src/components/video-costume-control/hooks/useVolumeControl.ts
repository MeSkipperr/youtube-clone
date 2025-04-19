"use client"
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import { useState, useEffect } from "react";

export const useVolumeControl = (videoRef: React.RefObject<HTMLVideoElement | null>) => {
    const [volume, setVolume] = useState<number>(getLocalStorage<{ muted: boolean; volume: number }>("player-volume")?.volume ?? 100);
    const [muted, setMuted] = useState<boolean>(getLocalStorage<{ muted: boolean; volume: number }>("player-volume")?.muted ?? false);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = volume / 100;
            videoRef.current.muted = muted;
            setLocalStorage("player-volume", {
                muted: muted,
                volume: volume,
            });
        }
    }, [volume, muted, videoRef]);

    const updateVolume = (value: number) => {
        const newVolume = Math.min(100, Math.max(0, volume + value));
        setVolume(newVolume);
        if (value > 0) setMuted(false);
    };

    return { volume, muted, setMuted, updateVolume  ,setVolume};
};
