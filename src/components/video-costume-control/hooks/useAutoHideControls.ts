import { useEffect, useRef, useState } from "react";

export const useAutoHideControls = (
    containerRef: React.RefObject<HTMLDivElement | null>
) => {
    const [controlsVisible, setControlsVisible] = useState(true);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const resetTimer = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setControlsVisible(true);
        timeoutRef.current = setTimeout(() => {
            setControlsVisible(false);
        }, 3000);
    };

    const handleMouseMove = () => {
        resetTimer();
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.addEventListener("mousemove", handleMouseMove);
        resetTimer();

        return () => {
            container.removeEventListener("mousemove", handleMouseMove);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [containerRef]);

    return { controlsVisible, resetTimer };
};
