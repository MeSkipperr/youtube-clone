import { useState } from "react";
import { LanguageCodeType } from "@/utils/constants";
import { signIn } from "next-auth/react";

type SignInBtnProps = {
    className?: string;
    language?: LanguageCodeType;
};

const SignInBtn = ({ className, language = "EN" }: SignInBtnProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = async () => {
        setIsLoading(true); 
        await signIn("google");
        setIsLoading(false); 
    };

    return (
        <button
            onClick={handleSignIn}
            disabled={isLoading}
            className={`rounded-full flex justify-center items-center border px-4 py-2 gap-2 
                ${className} ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
            {isLoading
                ? language === "JP" ? "ログイン中..." :
                language === "EN" ? "Signing in..." :
                language === "ID" ? "Masuk..." :
                "Unknown Language"
                : language === "JP" ? "ログイン" :
                language === "EN" ? "Sign In" :
                language === "ID" ? "Masuk" :
                "Unknown Language"}
        </button>
    );
};

export default SignInBtn;
