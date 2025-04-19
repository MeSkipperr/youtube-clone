"use client"

import { useMiniPlayer } from "@/context/MiniPlayerContext";
import Link from "next/link";
import VideoCostumeControl from "../video-costume-control";

const MiniPlayer = () => {
    const { miniPlayer } = useMiniPlayer();
    if (!miniPlayer.videoData) return null;
    console.log("Minipayer from /watch : ",miniPlayer)

    return ( 

        <div className=" fixed  right-4 bottom-4 cursor-pointer">
            <div className="bg-white dark:bg-black h-64 aspect-video rounded-t-md">
                <VideoCostumeControl videoUrl={miniPlayer.videoData?.url ?? ''} hexId={miniPlayer.videoData.hexId} timeline  expand centerPlayControl enabledKeys={["i","I"," ","ArrowLeft","ArrowRight"]}/>
            </div>
            <div className="text-base w-full p-2 dark:bg-highlightColorDark bg-highlightColor rounded-b-md ">
                <h4 className="roboto-Medium ">Bunny</h4>
                <Link href={"/"} className="text-sm">Cartoon Network</Link>
            </div>
        </div>
    );
}

export default MiniPlayer;