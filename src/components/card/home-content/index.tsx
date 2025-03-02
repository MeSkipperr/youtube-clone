import Image from "next/image";
import { SlOptionsVertical } from "react-icons/sl";

const CardHomeContent = () => {
    return ( 
        <div className="w-full rounded-sm cursor-pointer">
            <div className="w-full aspect-video  dark:bg-highlightColorDark bg-highlightColor">

            </div>
            <ul className="w-full h-20 gap-2 py-2 flex">
                <li className="w-[10%] aspect-square  rounded-full">
                    <Image
                    src={"/default/user.png"}
                    alt="User Profil"
                    layout="full"
                    width={1000}
                    height={1000}
                    className="rounded-full w-full"
                    />
                </li>
                <li className="w-[80%] h-full flex flex-col">
                    <h3 className="roboto-Medium">Lorem ipsum</h3>
                    <p className="text-sm text-highlightColorDark dark:text-[#AAABAB]">User 1</p>
                    <p className="text-sm text-highlightColorDark dark:text-[#AAABAB]">1 jt x ditonton <span className="mx-1">•</span> 1 Tahun lalu</p>
                </li>

                <li className="w-[10%] flex justify-center items-center">
                    <SlOptionsVertical/>
                </li>
            </ul>
        </div>
    );
}

export default CardHomeContent;