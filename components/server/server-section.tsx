"use client";

import { ActionTooltip } from "@/components/action-tooltip";
import { useModal } from "@/hooks/use-model-store";
import { Plus, Settings } from "lucide-react";


enum ChannelType {
    TEXT = "TEXT",
    VIDEO = "VIDEO",
    AUDIO = "AUDIO",
}

enum MemberRole {
    admin = "admin",
    moderator = "moderator",
    guest = "guest",
}
  
interface ServerSectionProps {
    label: string;
    role?: MemberRole;
    sectionType: "channels" | "members";
    channelType?: string;
    server?: any
}


export const ServerSection = ({label,role,sectionType,channelType,server}:ServerSectionProps)=>{
    const { onOpen } = useModal();
    return (
        <div className="flex items-center justify-between py-2">
          <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
            {label} xx
          </p>
          {role !== MemberRole.guest && sectionType === "channels" && (
            <ActionTooltip label="Create Channel" side="top">
              <button
                onClick={() => onOpen("createChannel")} // i can add type also
                className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
              >
                <Plus className="h-4 w-4" />
              </button>
            </ActionTooltip>
          )}
          {role === MemberRole.admin && sectionType === "members" && (
            <ActionTooltip label="Manage Members" side="top">
              <button
                onClick={() => onOpen("members", { server })}
                className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
              >
                <Settings className="h-4 w-4" />
              </button>
            </ActionTooltip>
          )}
        </div>
      );
}