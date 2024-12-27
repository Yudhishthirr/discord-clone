import dbConnect from '@/db/dbConfig'
import { NextResponse } from "next/server";
import {CurrentProfile} from "@/lib/current-profile"
import ServerModel from '@/models/server'


export async function PATCH(req:Request,{params}:{params:{serverId:any}}){
    const { name, imageUrl } = await req.json();
    try{
        console.log("serverId from api invite route",params.serverId)

        await dbConnect()
        const profile = await CurrentProfile();
        console.log(`profile id from api invite route : ${profile._id}`)

        if(!profile){
            return new NextResponse("Unauthorized",{status:401})
        }
        if(!params.serverId){
            return new NextResponse("Server Id is missing",{status:401})
        }

        const server = await ServerModel.findOneAndUpdate(
            { _id: params.serverId, creatorId: profile._id },
            { $set: { name: name, imageUrl: imageUrl } },
            { new: true }
        );
        console.log(`server updated successfully ${server}`)
        return NextResponse.json(server)

    } catch(error){
        console.log(`server api error ${error}`)
        return new NextResponse("Internal Server Error",{status:500})
    }
}