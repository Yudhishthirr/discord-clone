import { NextResponse } from "next/server";
import ConversationModel from "@/models/conversation";
import MemberModel from "@/models/member";
import { CurrentProfile } from "@/lib/current-profile";

import dbConnect from '@/db/dbConfig'

const findConversation = async(memberOneId:string,memberTwoId:string)=>{
    
    try{
        await dbConnect() 
        const conversations  = await ConversationModel.findOne({memberOne:memberOneId,memberTwo:memberTwoId})
        // console.log(conversations)
    
    } catch(error){

    }
   

}
export default findConversation