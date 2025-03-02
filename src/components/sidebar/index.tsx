"use client"
import Link from "next/link";
import UserContent from "./user-content";

import { IoMdHome } from "react-icons/io";
import { FaGear } from "react-icons/fa6";
import { MdSubscriptions } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { useSidebar } from "./SidebarContext";
import { LanguageCodeType } from "@/utils/constants";

const Sidebar = ({
    children,
    language = "EN",
}: Readonly<{   
    children: React.ReactNode;
    language?: LanguageCodeType;
}>) => {
    const { isOpen } = useSidebar(); 
    return (
        <div className="w-full flex  relative h-full top-16 bg-primary dark:bg-dark dark:text-white">
            <div
                className={` sticky h-[calc(100dvh-4rem)] overflow-y-auto bottom-0 top-16 transition-all duration-300 ${isOpen ? "w-[12%] pl-8 px-4 " : "w-16"}`}>
                {isOpen
                    ? <>
                            <div className="w-full py-4 border-b">
                                <ul>
                                    <li className="hover:bg-highlightColor py-2 rounded-lg cursor-pointer dark:hover:bg-darkHover">
                                        <Link href="/" className="flex justify-between items-center px-2 gap-2">
                                            <IoMdHome className="w-8 h-4" />
                                            <span className="w-full text-sm text line-clamp-1">
                                                {language === "JP" ? "ホーム" :
                                                language === "EN" ? "Home" :
                                                language === "ID" ? "Beranda" :
                                                "Unknown Language"}
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="hover:bg-highlightColor py-2 rounded-lg cursor-pointer dark:hover:bg-darkHover">
                                        <Link href="/" className="flex justify-between items-center px-2 gap-2">
                                            <MdSubscriptions className="w-8 h-4" />
                                            <span className="w-full text-sm text line-clamp-1">
                                                {language === "JP" ? "登録チャンネル" :
                                                language === "EN" ? "Subscriptions" :
                                                language === "ID" ? "Langganan" :
                                                "Unknown Language"}
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <UserContent language={language} />

                            <div className="w-full py-4 border-t">
                                <ul>
                                    <li className="hover:bg-highlightColor py-2 rounded-lg cursor-pointer dark:hover:bg-darkHover">
                                        <Link href="/" className="flex justify-between items-center px-2 gap-2">
                                            <FaGear className="w-8 h-4" />
                                            <span className="w-full text-sm text line-clamp-1">
                                                {language === "JP" ? "設定" :
                                                language === "EN" ? "Setting" :
                                                language === "ID" ? "Pengaturan" :
                                                "Unknown Language"}
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                    </>
                    : <>
                        <div className=" w-full flex justify-center items-center aspect-square ">
                            <ul className="w-full">
                                <li className="w-full aspect-square dark:hover:bg-darkHover hover:bg-highlightColor rounded-sm">
                                    <Link href="/">
                                        <button className="w-full h-full flex   justify-center items-center ">
                                            <IoMdHome className="size-6" />
                                        </button>
                                    </Link> 
                                </li>
                                <li className="w-full aspect-square dark:hover:bg-darkHover hover:bg-highlightColor rounded-sm">
                                    <Link href="/">
                                        <button className="w-full h-full flex   justify-center items-center ">
                                            <MdSubscriptions className="size-6" />
                                        </button>
                                    </Link> 
                                </li>
                                <li className="w-full aspect-square dark:hover:bg-darkHover hover:bg-highlightColor rounded-sm">
                                    <Link href="/">
                                        <button className="w-full h-full flex   justify-center items-center ">
                                            <FaRegUserCircle className="size-6" />
                                        </button>
                                    </Link> 
                                </li>
                            </ul>
                        </div>
                    </>}

            </div>
            <div className="flex flex-grow   ">
                {children}
            </div>
        </div>
    );
}

export default Sidebar;
