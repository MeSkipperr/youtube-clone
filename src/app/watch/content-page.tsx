"use client"

import VideoCostumeControl from "@/components/video-costume-control";

type Props = {
    videoUrl:string;
}

const ContentPage = ({videoUrl}:Props) => {

    return ( 
        <>
        <div className="w-2/3 h-full bg-amber-400 p-4">
            <VideoCostumeControl videoUrl={videoUrl}/>
        </div>
            <div className="w-1/3 h-full bg-green-300">
        </div>
        
        </>
    );
}

export default ContentPage;