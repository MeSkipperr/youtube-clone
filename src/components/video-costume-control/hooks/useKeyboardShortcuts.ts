import { useEffect } from 'react';
import { UseKeyboardShortcutsProps } from '../types/props';

export const useKeyboardShortcuts = ({
    enable = true,
    videoRef,
    updateVolume,
    setMuted,
    muted,
    toggleFullscreen,
    setIsShowControl,
    setShowForwordFiveSecond,
    setShowBackForwordFiveSecond,
    setShowVolumeIconScreen,
    handlePlayPause,
    toggleMiniPlayer,
    disabledKeys = [],
    enabledKeys = [] 
}: UseKeyboardShortcutsProps & { disabledKeys?: string[], enabledKeys?: string[] }) => {

    useEffect(() => {
        const changeIsShowControl = () => {
            setIsShowControl(true);
            setTimeout(() => {
                setIsShowControl(false);
            }, 1000);
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (!videoRef.current) return;

            const key = e.key;

            // Jika shortcut dinonaktifkan, tapi key ada di enabledKeys, tetap izinkan
            if (!enable && !enabledKeys.includes(key)) return;

            // Jika shortcut aktif dan key ada di disabledKeys, tolak
            if (enable && disabledKeys.includes(key)) return;

            changeIsShowControl();
            e.preventDefault();

            const showTempIndicator = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
                setter(true);
                setTimeout(() => setter(false), 500);
            };

            switch (key) {
                case ' ':
                    handlePlayPause();
                    break;
                case 'm':
                case 'M':
                    setMuted(!muted);
                    break;
                case 'f':
                case 'F':
                    toggleFullscreen();
                    break;
                case 'i':
                case 'I':
                    toggleMiniPlayer();
                    break;
                case 'Escape':
                    if (document.fullscreenElement) {
                        toggleFullscreen();
                    }
                    break;
                case 'ArrowRight':
                    videoRef.current.currentTime += 5;
                    showTempIndicator(setShowForwordFiveSecond);
                    break;
                case 'ArrowLeft':
                    videoRef.current.currentTime -= 5;
                    showTempIndicator(setShowBackForwordFiveSecond);
                    break;
                case 'ArrowUp':
                    updateVolume(5);
                    showTempIndicator(setShowVolumeIconScreen);
                    break;
                case 'ArrowDown':
                    updateVolume(-5);
                    showTempIndicator(setShowVolumeIconScreen);
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [
        videoRef,
        handlePlayPause,
        updateVolume,
        setMuted,
        toggleFullscreen,
        muted,
        setIsShowControl,
        setShowVolumeIconScreen,
        setShowForwordFiveSecond,
        setShowBackForwordFiveSecond,
        enable,
        toggleMiniPlayer,
        disabledKeys,
        enabledKeys // Tambahan
    ]);
};
