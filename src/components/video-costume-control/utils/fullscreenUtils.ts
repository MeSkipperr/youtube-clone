export const enterFullscreen = (
    element: HTMLElement,
    callback?: (success: boolean) => void
) => {
    if (element.requestFullscreen) {
        element.requestFullscreen()
            .then(() => callback?.(true))
            .catch((err) => {
                console.error("Error entering fullscreen:", err);
                callback?.(false);
            });
    } else {
        console.warn("Fullscreen API not supported");
        callback?.(false);
    }
};

export const exitFullscreen = (callback?: (success: boolean) => void) => {
    if (document.fullscreenElement) {
        document.exitFullscreen()
            .then(() => callback?.(true))
            .catch((err) => {
                console.error("Error exiting fullscreen:", err);
                callback?.(false);
            });
    } else {
        callback?.(false);
    }
};
