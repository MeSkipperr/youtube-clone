interface SidebarProps {
    children: React.ReactNode;
    isOpen: boolean;
}

const Sidebar = ({ children, isOpen }: SidebarProps) => {
    return (
        <div className="w-full flex relative h-full top-16">
            <div 
                className={` pl-8 sticky h-[calc(100dvh-4rem)] overflow-y-auto bottom-0 top-16 transition-all duration-300 ${isOpen ? "w-[15%]" : "w-10"}`}
            >
                
            </div>
            <div className="flex flex-grow   ">
                {children}
            </div>
        </div>
    );
}

export default Sidebar;
