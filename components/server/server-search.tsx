"use client";

import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import {
    Command,
    CommandSeparator,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";

interface ServerSearchProps {
    data: {
        label: string;
        type: "channel" | "member";
        data:
        | {
            // icon: React.ReactNode;
            name: string;
            id: string;
            ttt:string;
        }[]
        | undefined;
    }[];
}

// data : any



export const ServerSearch = ({ data }: ServerSearchProps) => {

    // console.log("server searh")
    // console.log(data)
    // console.log("server searh data")
    // console.log(data[0])
    const [open, setOpen] = useState(false);

    const router = useRouter();
    const params = useParams();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);

        return () => document.removeEventListener("keydown", down);
    }, []);


    //   const onClick = ({ id, type }: { id: string; type: "channel" | "member"; }) => {
    //     setOpen(false);

    // if (type === "member")
    //   return router.push(`/servers/${params?.serverId}/conversations/${id}`);

    // if (type === "channel"){ data }: ServerSearchProps
    //   return router.push(`/servers/${params?.serverId}/channels/${id}`);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="group px-2 py-2 rounded-md items-center flex gap-x-2 w-full hover:bg-zinc-700/10 dark:bg-zinc-700/50 transition"
            >
                <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                <p className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition">
                    Search
                </p>
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
                    <span className="text-xs">⌘</span>
                    <span className="text-lg">K</span>
                </kbd>
            </button>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Search all channels and members" />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    {data.map(({ label, type, data }) => {
                        if (!data?.length) return null;
                        return (
                            <CommandGroup key={label} heading={label}>
                                {data.map(({ ttt,id, name })=>{
                                    return (
                                        <CommandItem key={id}>
                                        {ttt === "TEXT" ? <Hash className="mr-2 h-4 w-4" />: <Mic className="mr-2 h-4 w-4" />}
                                        <span>{name}</span>
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        )
                    })}
                </CommandList>
            </CommandDialog>
        </>
    )
}