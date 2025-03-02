import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { LanguageCodeType, SIDEBAR } from "@/utils/constants";

const user = [
    "User 1",
    "User 2",
    "User 3",
    "User 4",
    "User 5",
    "User 6",
    "User 7",
    "User 8",
]
type ParamsFuncType = {
    language?: LanguageCodeType
}

const translations = {
    EN: { showMore: "Show more", showLess: "Show less" },
    ID: { showMore: "Tampilkan lebih banyak", showLess: "Tampilkan lebih sedikit" },
    JP: { showMore: "もっと見る", showLess: "少なく表示" }
};

const Subscription = ({ language = "EN" }: ParamsFuncType) => {
    const [contentShow, setContentShow] = useState<number>(SIDEBAR.SUBSCRIPTION_LENGHT);
    const [showMore, setShowMore] = useState<boolean>(false);

    const changeContentShow = () => {
        setShowMore((prev) => {
            const isExpanded = !prev;
            setContentShow(isExpanded ? user.length : SIDEBAR.SUBSCRIPTION_LENGHT);
            return isExpanded;
        });
    };

    return ( 
        <ul>
            {user.slice(0, contentShow).map((subs,index)=>(
                <li key={"Subscription"+index} className="hover:bg-highlightColor py-2 rounded-lg cursor-pointer dark:hover:bg-darkHover">
                    <Link href="/" className="flex justify-between items-center px-2 gap-2">
                        <Image className="w-6" src="/default/user.png" alt="User Profil" width={100} height={100}/>
                        <span className="w-full text-sm text line-clamp-1">{subs}</span>
                        <span className="size-1.5  bg-bulletList rounded-full"></span>
                    </Link>
                </li>
            ))}
            <button onClick={changeContentShow}  className="w-full hover:bg-highlightColor py-2 rounded-lg flex justify-start items-center px-2 gap-2">
                <IoIosArrowUp className={`w-6 ${!showMore&& "rotate-180"} `}/>
                <span className=" text-sm text line-clamp-1">
                        {showMore ? translations[language].showLess : translations[language].showMore}
                </span>
            </button>
        </ul>
    );
}

export default Subscription;