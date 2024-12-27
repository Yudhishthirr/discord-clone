
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { NavigationItem } from "@/components/navigation/navigation-item";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import {ModeToggle} from "@/components/mode-toggle"

import { NavigationAction } from "@/components/navigation/navigation-action";

import dbConnect from '@/db/dbConfig'
import ServerModel from "@/models/server"
import {CurrentProfile} from "@/lib/current-profile"

export const NavigationSidebar = async()=>{

    try{
        await dbConnect()
        const profile = await CurrentProfile();
        if (!profile) return redirect("/");

        const servers = await ServerModel.find({creatorId: profile?._id})

        if(servers.length!=0){
            return (
                <div className="space-y-4 flex flex-col h-full items-center text-primary w-full dark:bg-[#1e1f22] bg-[#e3e5e8] py-3">
                    <NavigationAction/>
                    <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
                    <ScrollArea className="flex-1 w-full"> 
                    {servers.map((server) => (
                    <div key={server.id} className="mb-4">
                        <NavigationItem
                        id={server.id}
                        imageUrl={server.imageUrl}
                        name={server.name}
                        />
                    </div>
                    ))}
                    </ScrollArea>
                    <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
                        <ModeToggle />
                        <UserButton
                        appearance={{
                            elements: {
                            avatarBox: "h-[48px] w-[48px]"
                            }
                        }}
                        />
                    </div>
                </div>              
            )
        }
    } catch(error){

    }
}
