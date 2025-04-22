"use client"

import VideoCostumeControl from "@/components/video-costume-control";
import { useTranslation } from "@/hooks/useTranslation";
import Image from "next/image";
import { useState } from "react";
import { IoIosNotifications } from "react-icons/io";

type Props = {
    videoUrl:string;
}

const ContentPage = ({videoUrl}:Props) => {
    const {t} = useTranslation();
    const [isSubscribe, setIsSubscribe] = useState(false);

    const handelIsSubscribe = () =>{
        setIsSubscribe(!isSubscribe)
    }

    return ( 
        <>
        <div className="w-2/3 h-full  p-4">
            <VideoCostumeControl videoUrl={videoUrl} hexId={"asdas"} controlsList timeline keyShortcut />
            <h1 className="roboto-Medium text-xl py-2">Loroemp Ibsum dolor sit amet</h1>
            <div className="w-full flex justify-between items-center h-12 border">
                <div className="h-full flex items-center gap-2">
                    <Image 
                    className="size-12 rounded-full" 
                    src="/default/user.png" 
                    alt="User Profil"
                    layout="full"
                    width={1000}
                    height={1000}
                    />
                    <h2 className="roboto-Medium flex flex-col">
                        Loremp Ipsum
                        <span className="text-sm">1{t.numberScale.million.shortCode} {t.word.subscriber.toLocaleLowerCase()}</span>
                    </h2>
                    <button className={`flex justify-center items-center gap-2 py-2 px-4 rounded-full cursor-pointer ${isSubscribe?"bg-s":"bg-highlightColor dark:bg-primary text-dark "} text-sm `}
                    onClick={handelIsSubscribe}>
                        {isSubscribe?
                        <>
                            {t.word.subscribed}
                            <IoIosNotifications className="size-6" />
                        </>
                        
                        :
                        t.word.subscribe
                        }
                        </button>
                </div>
                <div className="h-full flex items-center gap-2">
                    
                </div>
            </div>
        </div>
        <div className="w-1/3 h-full ">

        </div>
        
        </>
    );
}

export default ContentPage;