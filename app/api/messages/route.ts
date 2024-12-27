import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import ProfileModel from '@/models/profile'
import MemberModel from '@/models/member'
import MessageModel from "@/models/message"
import {CurrentProfile} from "@/lib/current-profile"
import dbConnect from '@/db/dbConfig'
import { serializeData } from "@/components/server/server-sidebar";
const MESSAGES_BATCH = 20;

export async function GET(req: Request) {
    
    try{
        await dbConnect()
        const profile = await CurrentProfile()
        const { searchParams } = new URL(req.url)
    
        const cursor = searchParams.get("cursor");
        const channelId = searchParams.get("channelId")
        console.log(`my course value is ${cursor}`)
        if (!profile) return new NextResponse("Unauthorized", { status: 401 });

        if (!channelId) return new NextResponse("Channel ID Missing", { status: 400 });

        if(!cursor){
            const messages = await MessageModel.aggregate(
            [
                {
                $match: {
                    channelId : new mongoose.Types.ObjectId(channelId)
                }
                },
                {
                "$sort": { "createdAt": -1 }
                },
                {
                "$limit": MESSAGES_BATCH
                },
                {
                "$lookup": {
                    "from": "members",
                    "localField": "memberId",
                    "foreignField": "_id",
                    "as": "memberDetails"
                }
                },
                { $unwind: '$memberDetails' },
                {
                $lookup: {
                    from: 'profiles',
                    localField: 'memberDetails.userId',
                    foreignField: '_id',
                    as: 'memberDetailsprofile'
                }
                },
                { $unwind: '$memberDetailsprofile' },
            ])
            return NextResponse.json({items: messages})
            // return NextResponse.json({items: serializeData(messages)})
        }else{
            console.log(`my course value if we have ${cursor}`)
        }
        
    } catch(error){
        console.log(error)
    }
}