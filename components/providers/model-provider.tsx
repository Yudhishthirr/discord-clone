"use client"
// here we cannect all model to zustan inseat of initial model
import {CreateServerModal} from "@/components/model/create-server-model"
import {InviteModal} from "@/components/model/invite-modal"
import { EditServerModal } from "@/components/model/edit-server-model"
import { MembereModal } from "@/components/model/member-model"
import { CreateChannelModal } from "../model/create-channel-model"
import { MessageFileModal } from "@/components/model/message-file-modal"
import { useState,useEffect } from "react"

import { DeleteMessageModal } from "../model/delete-message-modal"
export const ModelProvider = ()=>{

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);
  
    if (!isMounted) return null;
    

    return(
      <>
        <CreateServerModal/> 
        <InviteModal/>
        <EditServerModal/>
        <MembereModal/>
        <CreateChannelModal/>
        <MessageFileModal/>
        <DeleteMessageModal/>
      </>
    )
}