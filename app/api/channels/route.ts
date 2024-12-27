import { NextResponse } from "next/server";

import ChannelModel from '@/models/channel'
import MemberModel from '@/models/member'
import {CurrentProfile} from "@/lib/current-profile"
import dbConnect from '@/db/dbConfig'

export async function POST(req: Request) {

  const { name, type } = await req.json();
  const { searchParams } = new URL(req.url);

  const serverId = searchParams.get("serverId");

    console.log(`name is ${name}`)
    console.log(`type is ${type}`)
    console.log(`serverId is ${serverId}`)
    // return NextResponse.json("channel created ");
    // console.log(`name is ${name}`)
  try {
    await dbConnect()
    const profile = await CurrentProfile();
    

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    if (!serverId)
      return new NextResponse("Server ID is Missing", { status: 400 });

    if (name === "general")
      return new NextResponse("Name cannot be 'general'", { status: 400 });
    
    const channel = await ChannelModel.create({
      name:name,
      type:type,
      userId: profile._id,
      serverId: serverId, //for demo change it later
  })
  const member = await MemberModel.create({
      userId: profile._id,
      serverId: serverId,
      role:'admin' //yha par modrator ki values bhi hogi 
  })

    return NextResponse.json("channel created ");
  } catch (error) {
    console.error("[CHANNELS_POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}