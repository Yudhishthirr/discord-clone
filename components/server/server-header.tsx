"use client";
import {
    ChevronDown,
    LogOutIcon,
    PlusCircle,
    Settings,
    Trash,
    UserPlus,
    Users
} from "lucide-react";
interface ServerHeaderProps {
    server: any;
    role?: any;
}

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useModal } from "@/hooks/use-model-store";

export const ServerHeader = ({server,role}:ServerHeaderProps) => {  

   



    const { onOpen } = useModal();
    let isAdmin = false;
    let isModerator = false;

    if (role === 'admin') {
        isAdmin = true;
        isModerator = true;
    } else if (role === 'moderator') {
        isModerator = true;
    }
    return (




        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none" asChild >
                <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
                    {server.name}
                    <ChevronDown className="h-5 w-5 ml-auto" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
                {isModerator && (
                    <DropdownMenuItem
                     className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
                     onClick={() => onOpen("invite",{server:server})}
                     >
                    Invite People
                    <UserPlus className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                     <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer"
                     onClick={() => onOpen("edit_server",{server:server})}
                     >
                     Server Settings
                     <Settings className="h-4 w-4 ml-auto" />        
                     </DropdownMenuItem>
                )}
                {isAdmin && (
                    <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer"
                    onClick={() => onOpen("members",{server:server})}
                    >
                    Manage Members
                    <Users className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isModerator && (
                    <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer"
                    onClick={() => onOpen("createChannel")} // i can add type also
                    > 
                    Create Channel
                    <PlusCircle className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
               {isModerator && <DropdownMenuSeparator />}              
               {isAdmin && (
                     <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer text-rose-500"> 
                     Delete Server
                     <Trash className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}              
            </DropdownMenuContent>
        </DropdownMenu>
    )
}