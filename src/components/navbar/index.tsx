import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import Sidebar from "../sidebar";

import SidebarButton from "./btn-sidebar";
import UserSideBar from "./user-sidebar";
import { LanguageCodeType } from "@/utils/constants";



const Navbar = ({
    children,
    language = "EN",
}: Readonly<{   
    children: React.ReactNode;
    language?: LanguageCodeType;
}>) => {
    return ( 
        <>
            <nav className="w-full h-16 fixed top-0 bg-primary z-10 ">
                <ul className="flex w-full justify-between px-8 py-2">
                    <li className="flex justify-center items-center gap-2 font-bold tracking-wider text-xl ">
                        <SidebarButton/>
                        <Image src="/icons/youtube.png" className="w-10" width={1920} height={1080} alt="Youtube Icons"/>
                        Youtube
                    </li>
                    <li className="flex justify-center items-center w-1/3 border border-highlightColor rounded-full overflow-hidden">
                    <input 
                        type="text" 
                        className="flex-1 h-full outline-none px-4" 
                        placeholder={
                            language === "JP" ? "検索" :
                            language === "EN" ? "Search" :
                            language === "ID" ? "Cari" :
                            "Unknown Language"
                        }
                    />
                        <button className="h-full aspect-video flex justify-center items-center text-2xl bg-highlightColor">
                            <CiSearch />
                        </button>
                    </li>
                    <li className="flex justify-center items-center gap-2">
                        <UserSideBar language={language}/>
                    </li>
                </ul>
            </nav>
            <Sidebar language={language}>
                {children}
            </Sidebar>
        </>
    );
}

export default Navbar;