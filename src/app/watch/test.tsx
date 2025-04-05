"use client"

import { useRef, useState, useEffect } from "react";

const SelectedVideo =  () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [bufferedTime, setBufferedTime] = useState(0);
  
    const handleLoadedMetadata = () => {
        console.log("Event onLoadedMetadata terpanggil"); 
        console.log("videoRef.current:", videoRef.current);
    
        if (videoRef.current?.duration && videoRef.current.duration > 0) {
          setDuration(videoRef.current.duration);
          console.log("Durasi:", videoRef.current.duration);
        } else {
          console.warn("Durasi tidak terbaca, coba gunakan event onCanPlay");
        }
    };
    

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;
  
      // Set total durasi saat video dimuat
    //   const handleLoadedMetadata = () => setDuration(video.duration);
    handleLoadedMetadata()
      // Update waktu saat ini
      const handleTimeUpdate = () => setCurrentTime(video.currentTime);
  
      // Update waktu yang sudah dibuffer
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
  
    // Function untuk play/pause video
    const togglePlay = () => {
      if (!videoRef.current) return;
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    };


  
    return ( 
        <div className="w-full flex  h-dvh bg-slate-300 gap-4">
            <div className="w-2/3 h-full bg-amber-400 p-4">
                <div className="w-full aspect-video bg-teal-400 rounded-lg relative overflow-hidden">
                    <video 
                      className="w-full h-full object-cover absolute inset-0"
                      src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                      controls
                      ref={videoRef}
                      onClick={handleLoadedMetadata} preload="metadata" 
                      crossOrigin="anonymous"
                    />
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 p-2 rounded-lg text-white">
                    <p>Durasi: {duration.toFixed(2)} detik</p>
                    <p>Waktu Saat Ini: {currentTime.toFixed(2)} detik</p>
                    <p>Buffered: {bufferedTime.toFixed(2)} detik</p>
                    <button
                    className="bg-blue-500 px-4 py-2 rounded mt-2"
                    onClick={togglePlay}
                    >
                    {videoRef.current?.paused ? "Play" : "Pause"}
                    </button>
                </div>
            </div>
            <div className="w-1/3 h-full bg-green-300"></div>
        </div>
    );
}

export default SelectedVideo;