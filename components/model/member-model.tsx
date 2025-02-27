"use client";
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion
} from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area";

import { useModal } from "@/hooks/use-model-store";
import { UserAvatar } from "@/components/user-avatar"

import qs from "query-string";

enum MemberRole {
  ADMIN,
  MODERATOR,
  GUEST
}

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
  ADMIN: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />
};

export const MembereModal = () => {

  const { isOpen, onOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "members";
  const { server } = data;

  const [loadingId, setLoadingId] = useState("");

  

  // const totalmember = server?.members.length

  // console.log(`the total member of server is ${totalmember}`)


  const onRoleChange = async (memberId: string, role: MemberRole) => {

    try{

    } catch(error){

    }

  }
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Manage Member
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {server?.members?.length} Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {server?.members?.map((member) => (
            <div key={member?._id} className="flex items-center gap-x-2 mb-6">
              <UserAvatar src="https://utfs.io/f/fvlzM35bn4QUGWonDH1WNyb0pYAkt419aDHTqc65OmelGdjL" />
              {/* this is only for demo popor add here memebers profiles you can add more filds from project aggregation pip line*/}
              <div className="flex flex-col gap-y-1">
                <div className="text-xs font-semibold flex items-center">
                  member name
                  {roleIconMap['ADMIN']}
                </div>
                <p className="text-xs text-zinc-500">deepak@gmail.com</p>
              </div>
              {server?.creatorId !== member?.userId && loadingId !== member?._id && (
                <div className="ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical className="h-4 w-4 text-zinc-500" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="left">
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="flex items-center">
                          <ShieldQuestion className="w-4 h-4 mr-2" />
                          <span>Role</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem
                            // onClick={() => onRoleChange(member.id, "GUEST")}
                            >
                              <Shield className="h-4 w-4 mr-2" />
                              Guest
                              {member.role === "GUEST" && (
                                <Check className="h4 w-4 ml-auto" />
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                            // onClick={() =>
                            //   onRoleChange(member.id, "MODERATOR")
                            // }
                            >
                              <ShieldCheck className="h-4 w-4 mr-2" />
                              Moderator
                              {member.role === "MODERATOR" && (
                                <Check className="h4 w-4 ml-auto" />
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                      // onClick={() => onKick(member.id)}
                      >
                        <Gavel className="h-4 w-4 mr-2" />
                        Kick
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}

              {loadingId === member.id && (
                <Loader2 className="animate-spin text-zinc-500 ml-auto w-4 h-4" />
              )}
            </div>
          ))}
          {/* {loadingId === member.id && (
            <Loader2 className="animate-spin text-zinc-500 ml-auto w-4 h-4" />
          )} */}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}