"use client"

import { RxHamburgerMenu } from "react-icons/rx";
import { useSidebar } from "../sidebar/SidebarContext";

const SidebarButton = () => {
    const { toggleSidebar } = useSidebar();

    return ( 
        <button className="h-full aspect-square " onClick={toggleSidebar}>
            <RxHamburgerMenu />
        </button>
    );
}

export default SidebarButton;