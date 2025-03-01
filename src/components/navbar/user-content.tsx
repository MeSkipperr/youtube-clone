import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { FiLogOut } from "react-icons/fi";
import { IoIosMoon, IoIosArrowForward } from "react-icons/io";
import { FaGear } from "react-icons/fa6";
import { IoCheckmark, IoLanguage } from "react-icons/io5";
import { LANGUAGES, LanguageCodeType } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useIsLogin } from "@/context/is-login";

type PageShowType = "THEME" | "LANGUAGE" | null;
type ParamsFuncType = {
    language?: LanguageCodeType
}

const getText = (status: boolean, language: string) => {
    switch (language) {
        case "JP":
            return status ? "読み込み中.." : "ログアウト";
        case "EN":
            return status ? "Loading.." : "Log Out";
        case "ID":
            return status ? "Memuat.." : "Keluar";
        default:
            return "Unknown Language";
    }
};

const UserContent = ({ language = "EN" }: ParamsFuncType) => {
    const router = useRouter();
    const {session} = useIsLogin();

    const [pageShow, setPageShow] = useState<PageShowType>(null);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState<string>("Use device themes");
    const [selectedLanguage, setSelectedLanguage] = useState<LanguageCodeType>(language ?? "EN");

    const handleSignOut = async () => {
        setIsLoggingOut(true); 
        await signOut(); 
        setIsLoggingOut(false); 
    };

    const updateLanguage = async (lang: string) => {
        try {
            const res = await fetch("/api/set-language", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ language: lang }),
            });

            if (!res.ok) {
                const errorData = await res.json(); // Coba ambil pesan error dari API
                console.error("Cannot update cookie language value. Error:", errorData.error || "Unknown error");
                return;
            }
            console.log("Language updated successfully!");
            router.refresh();
        } catch (error) {
            console.error("Network error while updating language:", error);
        }
    };


    return (
        <div className="fixed top-16  right-0 w-1/6 max-h-[calc(100dvh-4rem)] overflow-y-auto  bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20 rounded-lg p-4" onClick={(e) => e.stopPropagation()}>
            {pageShow === "THEME" &&
                <>
                    <div className="w-full flex justify-start items-center border-b-2 py-2 gap-2">
                        <button onClick={() => setPageShow(null)} className="aspect-square rounded-full hover:bg-highlightColor">
                            <IoIosArrowForward className="w-8 rotate-180" />
                        </button>
                        {
                            language === "JP" ? "テーマ" :
                                language === "EN" ? "Theme" :
                                    language === "ID" ? "Tema" :
                                        "Unknown Language"
                        }
                    </div>
                    <p className="text-sm">
                        {
                            language === "JP" ? "設定はこのブラウザのみに適用されます" :
                                language === "EN" ? "Settings apply only to this browser" :
                                    language === "ID" ? "Setelan hanya berlaku untuk browser ini" :
                                        "Unknown Language"
                        }
                    </p>
                    <ul>
                        {["Use device themes", "Light Mode", "Dark Mode"].map((theme) => (
                            <li
                                key={theme}
                                className="flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-highlightColor transition text-sm"
                                onClick={() => setSelectedTheme(theme)}
                            >
                                <div className="w-6 h-4 flex justify-center items-center rounded-full">
                                    {selectedTheme === theme && <IoCheckmark className="text-xl text-blue-500" />}
                                </div>
                                <span>
                                    {
                                        theme === "Use device themes" ?
                                            (language === "JP" ? "デバイスのテーマを使用する" :
                                                language === "EN" ? "Use device themes" :
                                                    language === "ID" ? "Gunakan tema perangkat" :
                                                        "Unknown Language") :
                                            theme === "Light Mode" ?
                                                (language === "JP" ? "ライトモード" :
                                                    language === "EN" ? "Light Mode" :
                                                        language === "ID" ? "Mode Terang" :
                                                            "Unknown Language") :
                                                theme === "Dark Mode" ?
                                                    (language === "JP" ? "ダークモード" :
                                                        language === "EN" ? "Dark Mode" :
                                                            language === "ID" ? "Mode Gelap" :
                                                                "Unknown Language") :
                                                    theme
                                    }
                                </span>
                            </li>
                        ))}
                    </ul>
                </>
            }
            {pageShow === "LANGUAGE" &&
                <>
                    <div className="w-full flex justify-start items-center border-b-2 py-2 gap-2">
                        <button onClick={() => setPageShow(null)} className="aspect-square rounded-full hover:bg-highlightColor">
                            <IoIosArrowForward className="w-8 rotate-180" />
                        </button>
                        {
                            language === "JP" ? "言語を選択してください" :
                                language === "EN" ? "Choose your language" :
                                    language === "ID" ? "Silakan pilih bahasa" :
                                        "Unknown Language"
                        }
                    </div>
                    <ul>
                        {LANGUAGES.map((lang) => (
                            <li
                                key={lang.fullName}
                                className="flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-highlightColor transition text-sm"
                                onClick={() => {
                                    setSelectedLanguage(lang.shortCode);
                                    updateLanguage(lang.shortCode)
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
                    <button className="w-full flex gap-2 border-b-2 border-highlightColor">
                        <div className="w-12 h-auto rounded-full aspect-square">
                            <Image
                                src={session?.user?.picture ?? "/default/user.png"}
                                alt="User Profile"
                                width={1000}
                                height={1000}
                                className="w-full rounded-full"
                            />
                        </div>
                        <div className="flex flex-col flex-grow items-start">
                            <span>Kadek Yola</span>
                            <span className="text-sm">@kadekyola</span>
                            <span className="text-sm text-bulletList">
                                {
                                    language === "JP" ? "詳細" :
                                        language === "EN" ? "Detail" :
                                            language === "ID" ? "Detail" :
                                                "Unknown Language"
                                }
                            </span>
                        </div>
                    </button>
                    <ul className="w-full">
                        <li onClick={handleSignOut} className="hover:bg-highlightColor py-2 rounded-lg cursor-pointer ">
                            <button
                            disabled={isLoggingOut}
                            className="  flex justify-between items-center px-2 gap-2">
                                <FiLogOut className="w-8 h-4" />
                                <span className="w-full text-sm text line-clamp-1">
                                    {getText(isLoggingOut, language)}
                                </span>
                            </button>
                        </li>
                        <li className="hover:bg-highlightColor py-2 rounded-lg cursor-pointer">
                            <button onClick={() => setPageShow("THEME")} className="flex w-full justify-between items-center px-2 gap-2">
                                <IoIosMoon className="w-8 h-4" />
                                <span className="w-full flex text-sm text line-clamp-1">
                                    {
                                        language === "JP" ? "テーマ" :
                                            language === "EN" ? "Theme" :
                                                language === "ID" ? "Tema" :
                                                    "Unknown Language"
                                    }
                                </span>
                                <IoIosArrowForward className="w-8 h-4" />
                            </button>
                        </li>
                        <li className="hover:bg-highlightColor py-2 rounded-lg cursor-pointer">
                            <button onClick={() => setPageShow("LANGUAGE")} className="flex w-full justify-between items-center px-2 gap-2">
                                <IoLanguage className="w-8 h-4" />
                                <span className="w-full flex text-sm text line-clamp-1">
                                    {
                                        language === "JP" ? "言語" :
                                            language === "EN" ? "Language" :
                                                language === "ID" ? "Bahasa" :
                                                    "Unknown Language"
                                    }
                                </span>
                                <IoIosArrowForward className="w-8 h-4" />
                            </button>
                        </li>
                        <li className="hover:bg-highlightColor py-2 rounded-lg cursor-pointer">
                            <Link href="/" className="flex justify-between items-center px-2 gap-2">
                                <FaGear className="w-8 h-4" />
                                <span className="w-full text-sm text line-clamp-1">
                                    {
                                        language === "JP" ? "設定" :
                                            language === "EN" ? "Settings" :
                                                language === "ID" ? "Pengaturan" :
                                                    "Unknown Language"
                                    }
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