import { CurrentProfile } from "@/lib/current-profile"
import dbConnect from '@/db/dbConfig'
import { redirect } from "next/navigation"
import ServerModel from "@/models/server"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator";
import mongoose from 'mongoose';
import { ServerSearch  } from "@/components/server/server-search"
import {ServerHeader} from "@/components/server/server-header"

import {ServerChannel} from "@/components/server/server-channel"
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";

import {ServerSection} from "@/components/server/server-section"

export function serializeData(data: any) {
  return JSON.parse(
    JSON.stringify(data, (_, value) => {
      if (value instanceof mongoose.Types.ObjectId || value instanceof Date) {
        return value.toString(); // Convert ObjectId and Date to string
      }
      return value;
    })
  );
}



export const ServerSidebar = async ({ serverId }: { serverId: any }) => {

  try {
    await dbConnect()

    const profile = await CurrentProfile();
    if (!profile) redirect("/")

    const server = await ServerModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(serverId)  // Match the server by ID
        }
      },
      {
        $lookup: {
          from: 'channels',
          localField: '_id', //yha sever ki id le rhe hai kyoki aggration server par hai
          foreignField: 'serverId', //channel mai is naam se filde hai jo ki in ko connect karti h
          as: 'channels' // Lookup channels related to this server
        }
      },
      {
        $lookup: {
          from: 'members',
          localField: '_id', //yha sever ki id le rhe hai kyoki aggration server par hai
          foreignField: 'serverId', //member mai is naam se filde hai jo ki in ko connect karti h
          as: 'members' // Lookup members related to this server
        }
      },
      {
        $lookup: {
          from: 'profiles',
          localField: 'creatorId', //yha sever ki creatorId le rhe hai kyoki aggration server par hai
          foreignField: '_id', //profile mai is naam se filde hai jo ki in ko connect karti h
          as: 'profiles' // Add profile for each member in 'profiles' array
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          imageUrl: 1,
          inviteCode: 1,
          creatorId: 1,
          createdAt: 1,
          updatedAt: 1,
          __v: 1,
          channels: {
            _id: 1,
            name: 1,
            type: 1,
            // role: 1, // channel se role remove kar dena
            userId: 1,
            serverId: 1,
            createdAt: 1,
            updatedAt: 1,
            __v: 1
          },
          members: {
            _id: 1,
            role: 1, //yh role hai main
            userId: 1,
            serverId: 1,
            createdAt: 1,
            updatedAt: 1,
            __v: 1
          },
          profiles: {
            _id: 1,
            name: 1,
            email: 1,
            userId: 1,
            createdAt: 1,
            updatedAt: 1,
            __v: 1
          }
        }
      },
      {
        $unwind: {
          path: "$profiles",
          preserveNullAndEmptyArrays: true // Unwind profiles if they exist for members
        }
      }
    ])
    
    
    
    const mychannels = serializeData(server[0].channels);
    const membrsData =  server[0].members
    const serializedServer = serializeData(server[0]);

  

    const textChannels = mychannels.filter(
      (channel:any) => channel.type === 'TEXT'
    );

    const videoChannels = mychannels.filter(
      (channel:any) => channel.type === 'VIDEO'
    );

    const audioChannels = mychannels.filter(
      (channel:any) => channel.type === 'AUDIO'
    );
   

    const role = membrsData.find((member:any)=>{
        return member.userId.toString() == server[0].profiles._id.toString();
    })?.role

   
    return (
      <div className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]">
        {/* Welcome */}
        <ServerHeader server={serializedServer} role={role}/>
        <ScrollArea className="flex-1 px-3">
          <div className="mt-2">
            <ServerSearch
            data={[
              {
                label: "Text Channels",
                type: "channel",
                data: mychannels?.map((channel:any) => ({
                  id: channel._id.toString(),
                  name: channel.name,
                  ttt:channel.type
                }))
              },
            ]}
            />
          </div>
          <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
          {!!textChannels?.length && (
            <div className="mb-2">
              <ServerSection
                sectionType="channels"
                channelType="TEXT"
                role={role}
                label="Text Channels"
              />
              <div className="space-y-[2px]">
                {textChannels.map((channel:any) => (
                  <ServerChannel
                    key={channel._id}
                    channel={channel}
                    role={role}
                    server={serializedServer}
                  />
                ))}
              </div>
            </div>
          )}
          {!!videoChannels?.length && (
            <div className="mb-2">
              <ServerSection
                sectionType="channels"
                channelType="VIDEO"
                role={role}
                label="Video Channels"
              />
              <div className="space-y-[2px]">
                {videoChannels.map((channel:any) => (
                  <ServerChannel
                    key={channel._id}
                    channel={channel}
                    role={role}
                    server={serializedServer}
                  />
                ))}
              </div>
            </div>
          )}

          {!!audioChannels?.length && (
            <div className="mb-2">
              <ServerSection
                sectionType="channels"
                channelType="AUDIO"
                role={role}
                label="Audio Channels"
              />
              <div className="space-y-[2px]">
                {audioChannels.map((channel:any) => (
                  <ServerChannel
                    key={channel._id}
                    channel={channel}
                    role={role}
                    server={serializedServer}
                  />
                ))}
              </div>
            </div>
          )}
          
        </ScrollArea>
      </div>
    )

  } catch (error) {

  }

}