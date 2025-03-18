const CardHomeSkeleton = () => {
    return ( 
        <div className="w-full rounded-sm cursor-pointer">
            <div className="w-full aspect-video animate-pulse dark:bg-highlightColorDark bg-highlightColor rounded-md">
                
            </div>
            <ul className="w-full h-20 gap-2 py-2 flex">
                <li className="w-[10%] aspect-square  rounded-full ">
                    <span className="w-full flex aspect-square rounded-full animate-pulse dark:bg-highlightColorDark bg-highlightColor"></span>
                </li>
                <li className="w-[80%] h-full flex flex-col gap-1">
                    <h3 className="h-3 roboto-Medium w-full text-sm rounded-lg animate-pulse dark:bg-highlightColorDark bg-highlightColor text-highlightColor dark:text-highlightColorDark">.</h3>
                    <p  className="h-3 text-sm   w-1/2 rounded-lg animate-pulse dark:bg-highlightColorDark bg-highlightColor text-highlightColor dark:text-highlightColorDark">User 1</p>
                    <p  className="h-3 text-sm w-3/4 rounded-lg animate-pulse dark:bg-highlightColorDark bg-highlightColor text-highlightColor dark:text-highlightColorDark">1</p>
                </li>

                <li className="w-[10%] flex justify-center items-center">
                </li>
            </ul>
        </div>
    );
}

export default CardHomeSkeleton;