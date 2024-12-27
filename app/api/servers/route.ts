import {CurrentProfile} from "@/lib/current-profile"
import dbConnect from '@/db/dbConfig'
import { NextResponse } from "next/server";
import ServerModel from '@/models/server'
import ChannelModel from '@/models/channel'
import MemberModel from '@/models/member'
import { v4 as uuidv4 } from 'uuid';

export async function POST(req:Request){
    try{

        await dbConnect()
        let { name, imageUrl } = await req.json();
        const profile = await CurrentProfile();
        console.log(`profile is : ${profile}`)
        console.log(`name is : ${name}`)
        console.log(`imageUrl is : ${imageUrl}`)

        // imageUrl += ".png";
        // console.log(`this is my image url after png extention ${imageUrl}`)
        // return NextResponse.json({ message: profile });

        if (!profile) return new NextResponse("Unauthorized", { status: 401 });

        const server = new ServerModel({
            name:name,
            imageUrl:imageUrl,
            creatorId:profile._id,
            inviteCode:uuidv4()
        }); 
        await server.save()

        console.log(`server is is ${server?._id}`)
        const channel = await ChannelModel.create({
            name:"genral",
            userId: profile._id,
            
            serverId: server?._id, //for demo change it later
        })
        const member = await MemberModel.create({
            userId: profile._id,
            serverId: server?._id,
            role:'admin'
        })
        return NextResponse.json(server);
    } catch(error){
        console.log(`server api error ${error}`)
    }
}