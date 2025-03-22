import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { FiLogOut } from "react-icons/fi";
import { IoIosMoon, IoIosArrowForward } from "react-icons/io";
import { FaGear } from "react-icons/fa6";
import { IoCheckmark, IoLanguage } from "react-icons/io5";
import { LANGUAGES, LanguageCodeType } from "@/utils/constants";
import { signOut } from "next-auth/react";
import { ThemeType, themeValue, useDarkMode } from "@/context/DarkModeContext";
import { Session } from "next-auth";
import { useLanguage } from "@/context/language/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";

type PageShowType = "THEME" | "LANGUAGE" | null;

const UserContent = ({user}: {user:Session["user"]}) => {
    const { setTheme } = useDarkMode();
    const {setLanguage} = useLanguage();
    const {language,t} = useTranslation();

    const [pageShow, setPageShow] = useState<PageShowType>(null);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState<ThemeType>(
        localStorage.getItem("theme") as ThemeType || "System"
    );

    const handleThemeChange = (theme: ThemeType) => {
        setSelectedTheme(theme);
        setTheme(theme);
    };
    const [selectedLanguage, setSelectedLanguage] = useState<LanguageCodeType>(language ?? "EN");

    const handleSignOut = async () => {
        setIsLoggingOut(true);
        await signOut();
        setIsLoggingOut(false);
    };

    return (
        <div className="fixed top-16  right-0 w-1/6 max-h-[calc(100dvh-4rem)] overflow-y-auto  bg-white dark:bg-highlightColorDark shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20 rounded-lg p-4" onClick={(e) => e.stopPropagation()}>
            {pageShow === "THEME" &&
                <>
                    <div className="w-full flex justify-start items-center border-b-2 py-2 gap-2 dark:text-white">
                        <button onClick={() => setPageShow(null)} className="aspect-square rounded-full hover:bg-highlightColor dark:hover:bg-darkHover">
                            <IoIosArrowForward className="w-8 rotate-180" />
                        </button>
                            {t.navigation.theme}
                    </div>
                    <p className="text-sm dark:text-white" >
                        {t.navigation.themeConf.text}
                    </p>
                    <ul>
                        {themeValue.map((theme:ThemeType) => (
                            <li
                                key={theme}
                                className="flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-highlightColor  transition text-sm dark:text-white dark:hover:bg-darkHover"
                                onClick={() => handleThemeChange(theme)}
                            >
                                <div className="w-6 h-4 flex justify-center items-center rounded-full">
                                    {selectedTheme === theme && <IoCheckmark className="text-xl text-blue-500" />}
                                </div>
                                <span>
                                    {theme === "System"
                                        ?t.navigation.themeConf.system
                                        : theme === "Dark"
                                        ?t.navigation.themeConf.dark
                                        :t.navigation.themeConf.light}
                                </span>
                            </li>
                        ))}
                    </ul>
                </>
            }
            {pageShow === "LANGUAGE" &&
                <>
                    <div className="w-full flex justify-start items-center border-b-2 py-2 gap-2 dark:text-white"> 
                        <button onClick={() => setPageShow(null)} className="aspect-square rounded-full hover:bg-highlightColor dark:hover:bg-darkHover">
                            <IoIosArrowForward className="w-8 rotate-180" />
                        </button>
                        {t.navigation.languageConf}
                    </div>
                    <ul>
                        {LANGUAGES.map((lang) => (
                            <li
                                key={lang.fullName}
                                className="flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-highlightColor transition text-sm dark:hover:bg-darkHover dark:text-white"
                                onClick={() => {
                                    setSelectedLanguage(lang.shortCode);
                                    setLanguage(lang.shortCode)
                                }}
                            >
                                <div className="w-6 h-4 flex justify-center items-center rounded-full">
                                    {selectedLanguage === lang.shortCode && <IoCheckmark className="text-xl text-blue-500" />}
                                </div>
                                <span>{lang.fullName}</span>
                            </li>
                        ))}
                    </ul>
                </>
            }
            {pageShow === null &&
                <>
                    <button className="w-full flex gap-2 border-b-2 border-highlightColor dark:text-white">
                        <div className="w-12 h-auto rounded-full aspect-square">
                            <Image
                                src={user.picture ?? "/default/user.png"}
                                alt="User Profile"
                                width={1000}
                                height={1000}
                                className="w-full rounded-full"
                            />
                        </div>
                        <div className="flex flex-col flex-grow items-start">
                            <span>{user.name}</span>
                            <span className="text-sm">{user.userName}</span>
                            <span className="text-sm text-bulletList">
                                {t.navigation.detail}
                            </span>
                        </div>
                    </button>
                    <ul className="w-full dark:text-white">
                        <li onClick={handleSignOut} className="hover:bg-highlightColor dark:hover:bg-darkHover py-2 rounded-lg cursor-pointer ">
                            <button
                                disabled={isLoggingOut}
                                className="  flex justify-between items-center px-2 gap-2">
                                <FiLogOut className="w-8 h-4" />
                                <span className="w-full text-sm text line-clamp-1">
                                    {isLoggingOut?t.navigation.loading:t.navigation.auth.logOut}
                                </span>
                            </button>
                        </li>
                        <li className="hover:bg-highlightColor dark:hover:bg-darkHover py-2 rounded-lg cursor-pointer">
                            <button onClick={() => setPageShow("THEME")} className="flex w-full justify-between items-center px-2 gap-2">
                                <IoIosMoon className="w-8 h-4" />
                                <span className="w-full flex text-sm text line-clamp-1">
                                    {t.navigation.theme}
                                </span>
                                <IoIosArrowForward className="w-8 h-4" />
                            </button>
                        </li>
                        <li className="hover:bg-highlightColor dark:hover:bg-darkHover py-2 rounded-lg cursor-pointer">
                            <button onClick={() => setPageShow("LANGUAGE")} className="flex w-full justify-between items-center px-2 gap-2">
                                <IoLanguage className="w-8 h-4" />
                                <span className="w-full flex text-sm text line-clamp-1">
                                    {t.navigation.language}
                                </span>
                                <IoIosArrowForward className="w-8 h-4" />
                            </button>
                        </li>
                        <li className="hover:bg-highlightColor dark:hover:bg-darkHover py-2 rounded-lg cursor-pointer">
                            <Link href="/" className="flex justify-between items-center px-2 gap-2">
                                <FaGear className="w-8 h-4" />
                                <span className="w-full text-sm text line-clamp-1">
                                    {t.navigation.setting}
                                </span>
                            </Link>
                        </li>
                    </ul>
                </>
            }
        </div>

    );
}

export default UserContent;