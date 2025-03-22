"use client"

import { useIsLogin } from "@/context/is-login";
import Subscription from "./subscription";
import SignInBtn from "../sign-in-button";
import Link from "next/link";

import { FaHistory ,FaVideo } from "react-icons/fa";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { IoIosTimer } from "react-icons/io";
import { AiFillLike } from "react-icons/ai";
import { useTranslation } from "@/hooks/useTranslation";

const UserContent = () => {
    const { status } = useIsLogin();
    const {t} = useTranslation();
    
    if(status !== "authenticated" ){
        return (
            <div className="w-full py-4 border-t-2 border-b-2">
                <p className="text-sm pb-2">
                    {t.navigation.needSignIn}
                </p>
                <SignInBtn />
            </div>
        );
    }

    return (
        <>
            <div className="w-full py-4 border-t border-b">
                <span className="roboto-Medium">
                    {t.navigation.user.yours}
                </span>
                <ul>
                    <li className="hover:bg-highlightColor py-2 rounded-lg cursor-pointer dark:hover:bg-darkHover">
                        <Link href="/" className="flex justify-between items-center px-2 gap-2">
                            <FaHistory className="w-8 h-4" />
                            <span className="w-full text-sm text line-clamp-1">
                                {t.navigation.user.history}
                            </span>
                        </Link>
                    </li>
                    <li className="hover:bg-highlightColor py-2 rounded-lg cursor-pointer dark:hover:bg-darkHover">
                        <Link href="/" className="flex justify-between items-center px-2 gap-2">
                            <MdOutlinePlaylistAdd className="w-8 h-5" />
                            <span className="w-full text-sm text line-clamp-1">
                                {t.navigation.user.playlist}
                            </span>
                        </Link>
                    </li>
                    <li className="hover:bg-highlightColor py-2 rounded-lg cursor-pointer dark:hover:bg-darkHover">
                        <Link href="/" className="flex justify-between items-center px-2 gap-2">
                            <FaVideo className="w-8" />
                            <span className="w-full text-sm text line-clamp-1">
                                {t.navigation.user.yourVideo}
                            </span>
                        </Link>
                    </li>
                    <li className="hover:bg-highlightColor py-2 rounded-lg cursor-pointer dark:hover:bg-darkHover">
                        <Link href="/" className="flex justify-between items-center px-2 gap-2">
                            <IoIosTimer className="w-8 h-5" />
                            <span className="w-full text-sm text line-clamp-1">
                                {t.navigation.user.watchLater}
                            </span>
                        </Link>
                    </li>
                    <li className="hover:bg-highlightColor py-2 rounded-lg cursor-pointer dark:hover:bg-darkHover">
                        <Link href="/" className="flex justify-between items-center px-2 gap-2">
                            <AiFillLike className="w-8 h-5" />
                            <span className="w-full text-sm text line-clamp-1">
                                {t.navigation.user.likedVideo}
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="w-full py-4 border-t border-b">
                <span className="roboto-Medium">
                    {t.navigation.user.subscription}
                </span>
                <Subscription/>
            </div>
        </>
    );
}


export default UserContent;