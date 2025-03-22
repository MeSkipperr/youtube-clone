import { useState } from "react";
import { signIn } from "next-auth/react";
import { useTranslation } from "@/hooks/useTranslation";

type SignInBtnProps = {
    className?: string;
};

const SignInBtn = ({ className}: SignInBtnProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const {t} = useTranslation();

    const handleSignIn = async () => {
        setIsLoading(true); 
        await signIn("google");
        setIsLoading(false); 
    };

    return (
        <button
            onClick={handleSignIn}
            disabled={isLoading}
            className={`rounded-full flex justify-center items-center border px-4 py-2 gap-2 dark:border-highlightColorDark dark:text-white
                ${className} ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
            {isLoading
                ? t.navigation.auth.signInProcess
                : t.navigation.auth.signIn}
        </button>
    );
};

export default SignInBtn;
