"use client"

import Image from "next/image";
import UserContent from "./user-content";
import { useState } from "react";


const UserSideBar = () => {
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
            <UserContent/>
        )}
    </>
    );
}

export default UserSideBar;