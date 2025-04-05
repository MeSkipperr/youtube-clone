"use client"

import { useState, useEffect, useRef } from "react";

interface InputRangeProps extends React.InputHTMLAttributes<HTMLInputElement> {
    max: number;
    min: number;
    value: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    bulletColor?: string;
    sliderAfterColor?: string;
    sliderBeforeColor?: string;
}

const InputRange: React.FC<InputRangeProps> = ({
    max,
    min,
    value,
    onChange,
    className,
    bulletColor = "#fff",
    sliderAfterColor = "#fff",
    sliderBeforeColor = "#3E3F3E",
    ...props
  }) => {
    const [width, setWidth] = useState((value / max) * 100);
    const [isResizing, setIsResizing] = useState(false);
    const timelineRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setWidth((value / max) * 100);
    }, [value, max]);

    const handleMouseDown = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        setIsResizing(true);
    };

    const handleJumpWidth = (e: React.MouseEvent<HTMLDivElement>) => {
        if (timelineRef.current) {
            const timelineWidth = timelineRef.current.offsetWidth;
            const newWidth = ((e.clientX - timelineRef.current.getBoundingClientRect().left) / timelineWidth) * 100;
            const newValue = Math.round(Math.min(Math.max((newWidth / 100) * max, min), max));
            setWidth((newValue / max) * 100);
            onChange({ target: { value: newValue } } as unknown as React.ChangeEvent<HTMLInputElement>);
        }
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isResizing && timelineRef.current) {
                const timelineWidth = timelineRef.current.offsetWidth;
                const newWidth = ((e.clientX - timelineRef.current.getBoundingClientRect().left) / timelineWidth) * 100;
                const newValue = Math.round(Math.min(Math.max((newWidth / 100) * max, min), max));
                setWidth((newValue / max) * 100);
                onChange({ target: { value: newValue } } as unknown as React.ChangeEvent<HTMLInputElement>);
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
    }, [isResizing, max, min, onChange]);
    return ( 
        
        <div 
            onClick={handleJumpWidth}
            ref={timelineRef}
            style={{background:sliderBeforeColor}}
            className={`w-24 h-1 rounded-full   relative ${className} cursor-pointer`}  {...props} >
            <div
                style={{ width: `${width}%`,background:sliderAfterColor }}
                className={`w-1/2 absolute rounded-full  top-0 z-10 h-full rounded-r-full flex justify-end items-center`}
            >
                <span
                    onMouseDown={handleMouseDown}
                    className={`size-4 rounded-full absolute right-0 z-20`}
                    style={{
                        transform: "translateX(50%)", 
                        background:bulletColor
                    }}
                ></span>
            </div>
        </div>
    );
}

export default InputRange;