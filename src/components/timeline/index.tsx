"use client";

import { useState, useEffect, useRef } from "react";

const Timeline = ({
    totalDuration,
    currentTime,
    onTimeUpdate,
    bufferedTime = 0
}: {
    totalDuration: number;
    currentTime: number;
    onTimeUpdate: (newTime: number) => void;
    bufferedTime?:number 
}) => {
    const [width, setWidth] = useState((currentTime / totalDuration) * 100);
    const [isResizing, setIsResizing] = useState(false);
    const timelineRef = useRef<HTMLDivElement | null>(null);

    const bufferdWidth = (bufferedTime/totalDuration)* 100;

    useEffect(() => {
        setWidth((currentTime / totalDuration) * 100);
    }, [currentTime, totalDuration]);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsResizing(true);
    };

    const handleJumpWidth = (e: React.MouseEvent<HTMLDivElement>) => {
        if (timelineRef.current) {
            const timelineWidth = timelineRef.current.offsetWidth;
            const newWidth = ((e.clientX - timelineRef.current.getBoundingClientRect().left) / timelineWidth) * 100;
            setWidth(Math.min(Math.max(newWidth, 0), 100));
            onTimeUpdate((newWidth / 100) * totalDuration);
        }
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isResizing && timelineRef.current) {
                const timelineWidth = timelineRef.current.offsetWidth;
                const newWidth = ((e.clientX - timelineRef.current.getBoundingClientRect().left) / timelineWidth) * 100;

                setWidth(Math.min(Math.max(newWidth, 0), 100));

                onTimeUpdate((Math.min(Math.max(newWidth, 0), 100) / 100) * totalDuration);
            }
        };

        const handleMouseUp = () => {
            setIsResizing(false);
        };

        if (isResizing) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isResizing, totalDuration, onTimeUpdate]);

    return (
        <div
            ref={timelineRef}
            className="w-full h-0.5 hover:h-1.5 transition-all bg-gray-300 relative cursor-pointer"
            onClick={handleJumpWidth}
        >
            <div
                style={{ width: `${bufferdWidth}%` }} 
                className="w-0 h-full bg-white rounded-full"></div>
            <div
                style={{ width: `${width}%` }}
                className="w-0 absolute top-0 z-10 h-full bg-red-600 rounded-r-full flex justify-end items-center"
            >
                {/* Span ini akan selalu mengikuti ujung kanan div bar merah */}
                <span
                    onMouseDown={handleMouseDown}
                    className="size-4 rounded-full bg-red-600 absolute right-0 z-20"
                    style={{
                        transform: "translateX(50%)", // Agar span tetap di ujung kanan
                    }}
                ></span>
            </div>
        </div>
    );
};

export default Timeline;
