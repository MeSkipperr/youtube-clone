import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { FiLogOut } from "react-icons/fi";
import { IoIosMoon,IoIosArrowForward  } from "react-icons/io";
import { FaGear } from "react-icons/fa6";
import { IoCheckmark,IoLanguage } from "react-icons/io5";
import { LANGUAGES } from "@/utils/constants";

type PageShowType = "THEME" | "LANGUAGE" | null;

const UserContent = () => {
    const [pageShow, setPageShow] = useState<PageShowType>(null);
    const [selectedTheme, setSelectedTheme] = useState<string >("Use device themes");
    const [selectedLanguage, setSelectedLanguage] = useState<string>("EN");
    
    return ( 
        <div className="fixed top-16  right-0 w-1/6 max-h-[calc(100dvh-4rem)] overflow-y-auto  bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20 rounded-lg p-4">
            {pageShow === "THEME" &&
            <>
                <div className="w-full flex justify-start items-center border-b-2 py-2 gap-2">
                    <button  onClick={()=>setPageShow(null)} className="aspect-square  rounded-full hover:bg-highlightColor">
                        <IoIosArrowForward  className="w-8 rotate-180 " />
                    </button>
                    Theme
                </div>
                <p className="text-sm">Setelan hanya berlaku untuk browser ini</p>
                <ul>
                    {["Use device themes", "Light Mode", "Dark Mode"].map((theme) => (
                        <li 
                            key={theme} 
                            className="flex items-center gap-2 cursor-pointer p-2  rounded-md hover:bg-highlightColor transition text-sm"
                            onClick={() => setSelectedTheme(theme)}
                        >
                            <div className="w-6 h-4 flex justify-center items-center  rounded-full">
                                {selectedTheme === theme && <IoCheckmark className="text-xl text-blue-500" />}
                            </div>
                            <span>{theme}</span>
                        </li>
                    ))}
                </ul>
            </>
            }
            {pageShow === "LANGUAGE" &&
            <>
                <div className="w-full flex justify-start items-center border-b-2 py-2 gap-2">
                    <button  onClick={()=>setPageShow(null)} className="aspect-square  rounded-full hover:bg-highlightColor">
                        <IoIosArrowForward  className="w-8 rotate-180 " />
                    </button>
                    Choose your language
                </div>
                <ul>
                    {LANGUAGES.map((lang) => (
                        <li 
                            key={lang.fullName} 
                            className="flex items-center gap-2 cursor-pointer p-2  rounded-md hover:bg-highlightColor transition text-sm"
                            onClick={() => setSelectedLanguage(lang.shortCode)}
                        >
                            <div className="w-6 h-4 flex justify-center items-center  rounded-full">
                                {selectedLanguage === lang.shortCode && <IoCheckmark className="text-xl text-blue-500" />}
                            </div>
                            <span>{lang.fullName}</span>
                        </li>
                    ))}
                </ul>
            </>
            }
            {pageShow===null&&
            <>
                <button className="w-full  flex gap-2 border-b-2 border-highlightColor">
                    <div className="w-12 h-auto rounded-full aspect-square">
                        <Image
                            src="/default/user.png"
                            alt="User Profil"
                            width={1000}
                            height={1000}
                            className="w-full rounded-full"
                        />
                    </div>
                    <div className="flex flex-col flex-grow items-start">
                        <span>Kadek Yola</span>
                        <span className="text-sm">@kadekyola</span>
                        <span className="text-sm text-bulletList">Detail.</span>
                    </div>
                </button>
                <ul className="w-full">
                    <li className="hover:bg-highlightColor py-2 rounded-lg cursor-pointer">
                        <Link href="/" className="flex justify-between items-center px-2 gap-2">
                            <FiLogOut className="w-8  h-4" />
                            <span className="w-full text-sm text line-clamp-1">Log Out</span>
                        </Link>
                    </li>
                    <li className="hover:bg-highlightColor py-2 rounded-lg cursor-pointer">
                        <button  onClick={()=>setPageShow("THEME")} className="flex w-full justify-between items-center px-2 gap-2">
                            <IoIosMoon className="w-8  h-4" />
                            <span className="w-full flex  text-sm text line-clamp-1">Theme</span>
                            <IoIosArrowForward  className="w-8  h-4" />
                        </button>
                    </li>
                    <li className="hover:bg-highlightColor py-2 rounded-lg cursor-pointer">
                        <button  onClick={()=>setPageShow("LANGUAGE")} className="flex w-full justify-between items-center px-2 gap-2">
                            <IoLanguage className="w-8  h-4" />
                            <span className="w-full flex  text-sm text line-clamp-1">Language</span>
                            <IoIosArrowForward  className="w-8  h-4" />
                        </button>
                    </li>
                    <li className="hover:bg-highlightColor py-2 rounded-lg cursor-pointer">
                        <Link href="/" className="flex justify-between items-center px-2 gap-2">
                            <FaGear className="w-8  h-4" />
                            <span className="w-full text-sm text line-clamp-1">Setting</span>
                        </Link>
                    </li>
                </ul>
            </>
            }
        </div>
    );
}

export default UserContent;