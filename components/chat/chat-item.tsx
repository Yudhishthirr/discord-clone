"use client";


import { useModal } from "@/hooks/use-model-store";
import { useState } from "react";
import {
    Edit,
    FileIcon,
    ShieldAlert,
    ShieldCheck,
    Trash
} from "lucide-react";
import Image from "next/image";
import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";

import { UserAvatar } from "@/components/user-avatar";
import { ActionTooltip } from "@/components/action-tooltip";
import { cn } from "@/lib/utils";

import {
    Form,
    FormControl,
    FormField,
    FormItem
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


interface ChatItemProps {
    id: string;
    content: string;
    memberDetails: any;
    memberDetailsProfile: any;
    timestamp: string;
    fileUrl: string | null;
    deleted: boolean;
    currentMember: any;
    isUpdated: boolean;
    socketUrl: string;
    socketQuery: Record<string, string>;
}

const roleIconMap = {
    guest: null,
    moderator: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
    admin: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />
};

const formSchema = z.object({
    content: z.string().min(1)
});



export const ChatItem = ({ id, content, memberDetails, memberDetailsProfile, timestamp, fileUrl, deleted, currentMember, isUpdated, socketUrl, socketQuery }: ChatItemProps) => {



    const fileType = fileUrl?.split(".").pop();

    const isAdmin = currentMember.role === 'admin';
    const isModerator = currentMember.role === 'moderator';
    const isOwner = currentMember._id == memberDetails._id;
    const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);

    const isPDF = fileType === "pdf" && fileUrl;
    const isImage = !isPDF && fileUrl;
    const [isEditing, setIsEditing] = useState(false);
    const { onOpen } = useModal();

    const params = useParams();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: `${socketUrl}/${id}`,
                query: socketQuery
            });

            await axios.patch(url, values);

            form.reset();
            setIsEditing(false);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
            <div className="group flex gap-x-2 items-center w-full">
                <div className="cursor-pointer hover:drop-shadow-md transition">
                    <UserAvatar src={memberDetailsProfile.imageUrl} />
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex items-center gap-x-2">
                        <div className="flex items-center">
                            <p className="font-semibold text-sm hover:underline cursor-pointer">
                                {memberDetailsProfile.name}
                            </p>
                            <ActionTooltip label={memberDetails.role}>
                                {roleIconMap[memberDetails.role]}
                            </ActionTooltip>
                        </div>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                            {timestamp}
                        </span>
                    </div>
                    {isImage && (
                        <>
                        {deleted ?
                            <a href=""target="_blank" rel="noopener noreferrer" className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48">
                                <p className="italic to-zinc-500 dark:text-zinc-400 text-xs mt-1">This Image has been deleted</p>
                            </a>
                        :
                        <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48">
                            <Image src={fileUrl} alt="content" fill className="object-cover" />
                        </a>}
                        </>
                    )}
                    {!fileUrl && (
                        <p className={
                            cn("text-sm text-zinc-600 dark:text-zinc-300",
                            deleted && "italic to-zinc-500 dark:text-zinc-400 text-xs mt-1")}>
                            {deleted ? "This message has been deleted" : content}
                        </p>
                    )}
                </div>
            </div>
            {canDeleteMessage && (
                <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-white dark:bg-zinc-800 border rounded-sm">
                    
                    <ActionTooltip label="Delete">
                        <Trash
                            onClick={() =>
                                onOpen("deleteMessage", {
                                    apiUrl: `${socketUrl}/${id}`,
                                    query: socketQuery
                                })
                            }
                            className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
                        />
                    </ActionTooltip>
                </div>
            )}
        </div>
    )
}