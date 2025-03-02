"use client"

import { useIsLogin } from "@/context/is-login";
import Subscription from "./subscription";
import SignInBtn from "../sign-in-button";
import Link from "next/link";

import { FaHistory ,FaVideo } from "react-icons/fa";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { IoIosTimer } from "react-icons/io";
import { AiFillLike } from "react-icons/ai";
import { LanguageCodeType } from "@/utils/constants";

type ParamsFuncType = {
    language?: LanguageCodeType
}

const UserContent = ({ language = "EN" }: ParamsFuncType) => {
    const { status } = useIsLogin();

    if(status !== "authenticated" ){
        return (
            <div className="w-full py-4 border-t-2 border-b-2">
                <p className="text-sm pb-2">
                    {
                        language === "JP" ? "動画に「いいね」、コメント、チャンネル登録するにはサインインしてください。" :
                        language === "EN" ? "Sign in to like videos, comment, and subscribe." :
                        language === "ID" ? "Masuk untuk menyukai video, berkomentar, dan berlangganan." :
                        "Unknown Language"
                    }
                </p>
                <SignInBtn language={language} />
            </div>
        );
    }

    return (
        <>
            <div className="w-full py-4 border-t border-b">
                <span className="roboto-Medium">
                    {
                        language === "JP" ? "あなたのコンテンツ" :
                        language === "EN" ? "Yours" :
                        language === "ID" ? "Milik Anda" :
                        "Unknown Language"
                    }
                </span>
                <ul>
                    <li className="hover:bg-highlightColor py-2 rounded-lg cursor-pointer dark:hover:bg-darkHover">
                        <Link href="/" className="flex justify-between items-center px-2 gap-2">
                            <FaHistory className="w-8 h-4" />
                            <span className="w-full text-sm text line-clamp-1">
                                {
                                    language === "JP" ? "履歴" :
                                    language === "EN" ? "History" :
                                    language === "ID" ? "Riwayat" :
                                    "Unknown Language"
                                }
                            </span>
                        </Link>
                    </li>
                    <li className="hover:bg-highlightColor py-2 rounded-lg cursor-pointer dark:hover:bg-darkHover">
                        <Link href="/" className="flex justify-between items-center px-2 gap-2">
                            <MdOutlinePlaylistAdd className="w-8 h-5" />
                            <span className="w-full text-sm text line-clamp-1">
                                {
                                    language === "JP" ? "プレイリスト" :
                                    language === "EN" ? "Playlist" :
                                    language === "ID" ? "Daftar Putar" :
                                    "Unknown Language"
                                }
                            </span>
                        </Link>
                    </li>
                    <li className="hover:bg-highlightColor py-2 rounded-lg cursor-pointer dark:hover:bg-darkHover">
                        <Link href="/" className="flex justify-between items-center px-2 gap-2">
                            <FaVideo className="w-8" />
                            <span className="w-full text-sm text line-clamp-1">
                                {
                                    language === "JP" ? "あなたの動画" :
                                    language === "EN" ? "Your videos" :
                                    language === "ID" ? "Video Anda" :
                                    "Unknown Language"
                                }
                            </span>
                        </Link>
                    </li>
                    <li className="hover:bg-highlightColor py-2 rounded-lg cursor-pointer dark:hover:bg-darkHover">
                        <Link href="/" className="flex justify-between items-center px-2 gap-2">
                            <IoIosTimer className="w-8 h-5" />
                            <span className="w-full text-sm text line-clamp-1">
                                {
                                    language === "JP" ? "履歴" :
                                    language === "EN" ? "History" :
                                    language === "ID" ? "Riwayat" :
                                    "Unknown Language"
                                }
                            </span>
                        </Link>
                    </li>
                    <li className="hover:bg-highlightColor py-2 rounded-lg cursor-pointer dark:hover:bg-darkHover">
                        <Link href="/" className="flex justify-between items-center px-2 gap-2">
                            <AiFillLike className="w-8 h-5" />
                            <span className="w-full text-sm text line-clamp-1">
                                {
                                    language === "JP" ? "いいね" :
                                    language === "EN" ? "Likes" :
                                    language === "ID" ? "Suka" :
                                    "Unknown Language"
                                }
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="w-full py-4 border-t border-b">
                <span className="roboto-Medium">
                    {
                        language === "JP" ? "チャンネル登録" :
                        language === "EN" ? "Subscription" :
                        language === "ID" ? "Langganan" :
                        "Unknown Language"
                    }
                </span>
                <Subscription language={language} />
            </div>
        </>
    );
}


export default UserContent;