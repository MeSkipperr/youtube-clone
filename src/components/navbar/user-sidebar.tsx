"use client"

import Image from "next/image";
import UserContent from "./user-content";
import { useState } from "react";
import { LanguageCodeType } from "@/utils/constants";

type ParamsFuncType = {
    language?:LanguageCodeType
}

const UserSideBar = ({language = "EN"}:ParamsFuncType)  => {
    const [userProfilIsOpen, setUserProfilIsOpen] = useState<boolean>(false);

    return ( 
    <>
        <button onClick={()=>setUserProfilIsOpen(!userProfilIsOpen)} className="w-10 aspect-square border rounded-full border-highlightColor">
            <Image
            src="/default/user.png"
            alt="User Profil"
            layout="full"
            width={1000}
            height={1000}
            />
        </button>
        {userProfilIsOpen&&(
            <div className="fixed top-16 bottom-0 left-0 right-0" onClick={()=>setUserProfilIsOpen(false)}>
                <UserContent language={language}/>
            </div>
        )}
    </>
    );
}

export default UserSideBar;