import React from "react";

export interface VideoCostumeControlProps {
    videoUrl: string;
    controlsList?:boolean;
    timeline?:boolean;
    expand?:boolean;
    keyShortcut?:boolean;
    autoPlay?:boolean;
    controls?:boolean;
    centerPlayControl?:boolean;
    hexId:string;
    disabledKeys?: string[]; // Daftar tombol yang tidak diizinkan saat shortcut aktif
    enabledKeys?: string[];  
}

export interface UseKeyboardShortcutsProps {
    enable?: boolean; // Menentukan apakah shortcut aktif
    videoRef: React.RefObject<HTMLVideoElement | null>; // Referensi ke elemen video
    handlePlayPause: () => void; // Fungsi untuk toggle play/pause
    updateVolume: (value: number) => void; // Fungsi untuk mengubah volume
    setMuted: (muted: boolean) => void; // Fungsi untuk mute/unmute
    muted: boolean; // Status mute saat ini
    toggleFullscreen: () => void; // Fungsi untuk toggle fullscreen
    toggleMiniPlayer: () => void; // Fungsi untuk toggle mini player
    setIsShowControl: React.Dispatch<React.SetStateAction<boolean>>; // Tampilkan kontrol sebentar
    setShowVolumeIconScreen: React.Dispatch<React.SetStateAction<boolean>>; // Tampilkan ikon volume sementara
    setShowBackForwordFiveSecond: React.Dispatch<React.SetStateAction<boolean>>; // Indikator mundur 5 detik
    setShowForwordFiveSecond: React.Dispatch<React.SetStateAction<boolean>>; // Indikator maju 5 detik

    disabledKeys?: string[]; // Daftar tombol yang tidak diizinkan saat shortcut aktif
    enabledKeys?: string[];  // Daftar tombol yang tetap diizinkan saat shortcut nonaktif
}
