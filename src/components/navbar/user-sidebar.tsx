"use client"

import Image from "next/image";
import UserContent from "./user-content";
import { useState } from "react";
import { LanguageCodeType } from "@/utils/constants";
import { HiOutlinePlusSm } from "react-icons/hi";
import { IoIosNotifications } from "react-icons/io";
import SignInBtn from "@/components/sign-in-button";
import { Session } from "next-auth";

type ParamsFuncType = {
    language?:LanguageCodeType;
    user:Session["user"] | null;
}

const UserSideBar = ({language = "EN",user}:ParamsFuncType)  => {
    const [userProfilIsOpen, setUserProfilIsOpen] = useState<boolean>(false);

    if(!user){
        return(
            <SignInBtn language={language}/>
        )
    }

    return ( 
        <>
            <button className=" text-base px-2 gap-2 py-2 rounded-full flex justify-center items-center bg-highlightColor dark:bg-highlightColorDark dark:text-white">
                <HiOutlinePlusSm className="size-5"/>
                {
                    language === "JP" ? "のために":
                    language === "EN" ? "Create" :
                    language === "ID" ? "Buat" :
                    "Unknown Language"
                }
            </button>
            <button className="w-10  flex justify-center items-center text-2xl aspect-square  relative dark:text-white ">
                <IoIosNotifications />
                <span className="w-2 bottom-5 left-5 aspect-square rounded-full bg-red-500 absolute"></span>
            </button>
            <button onClick={()=>setUserProfilIsOpen(!userProfilIsOpen)} className="w-10 aspect-square border rounded-full border-highlightColor dark:border-highlightColorDark">
                <Image
                src={user?.picture ?? "/default/user.png"}
                alt="User Profil"
                layout="full"
                width={1000}
                height={1000}
                className="rounded-full"
                />
            </button>
            {userProfilIsOpen&&(
                <div className="fixed top-16 bottom-0 left-0 right-0" onClick={()=>setUserProfilIsOpen(false)}>
                    <UserContent language={language} user={user}/>
                </div>
            )}
        </>
    );
}

export default UserSideBar;