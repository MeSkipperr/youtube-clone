"use client"
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { HiOutlinePlusSm } from "react-icons/hi";
import { IoIosNotifications } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import Sidebar from "./sidebar";
import { useState } from "react";

const Navbar = (
{
    children
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const [sidebarIsOpen, setSidebarIsOpen] = useState<boolean>(true);
    return ( 
        <>
            <div className="w-full h-16 fixed top-0 bg-primary z-10 ">
                <ul className="flex w-full justify-between px-8 py-2">
                    <li className="flex justify-center items-center gap-2 font-bold tracking-wider text-xl ">
                        <button className="h-full aspect-square " onClick={()=>setSidebarIsOpen(!sidebarIsOpen)}>
                            <RxHamburgerMenu />
                        </button>
                        <Image src="/icons/youtube.png" className="w-10" width={1920} height={1080} alt="Youtube Icons"/>
                        Youtube
                    </li>
                    <li className="flex justify-center items-center w-1/3 border border-highlightColor rounded-full overflow-hidden">
                        <input type="text" className="flex-1 h-full outline-none px-4" placeholder="Search"/>
                        <button className="h-full aspect-video flex justify-center items-center text-2xl bg-highlightColor">
                            <CiSearch />
                        </button>
                    </li>
                    <li className="flex justify-center items-center gap-2">
                        <button className=" text-base px-2 gap-2 py-2 border rounded-full flex justify-center items-center bg-highlightColor">
                            <HiOutlinePlusSm className="size-5"/>
                            Create
                        </button>
                        <button className="w-10  flex justify-center items-center text-2xl aspect-square  relative">
                            <IoIosNotifications />
                            <span className="w-2 bottom-5 left-5 aspect-square rounded-full bg-red-500 absolute"></span>
                        </button>
                        <button className="w-10 aspect-square border rounded-full border-highlightColor">
                            <Image
                            src="/default/user.png"
                            alt="User Profil"
                            layout="full"
                            width={1000}
                            height={1000}
                            />
                        </button>
                    </li>
                </ul>
            </div>
            <Sidebar isOpen={sidebarIsOpen}>
                {children}
            </Sidebar>
        </>
    );
}

export default Navbar;