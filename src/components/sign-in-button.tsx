import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";

type SignInBtnProps = {
    className?:string;
}

const SignInBtn = ({className}:SignInBtnProps) => {
    return ( 
        <Link href="/login">
            <button className={` rounded-full flex justify-center items-center border px-4 py-2 gap-2  ${className}`}>
                <FaRegUserCircle className="h-full  aspect-square "/>
                <span>Sign In</span>
            </button>
        </Link>
    );
}

export default SignInBtn;