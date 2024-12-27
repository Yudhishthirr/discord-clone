

// this api for inserting message to db
import { NextApiRequest } from "next";
import ServerModel from '@/models/server'
import MemberModel from "@/models/member";
import { NextApiResponseServerIo } from "@/types";
import { currentProfilePages } from "@/lib/current-profile-pages";
import dbConnect from '@/db/dbConfig'
import ChannelModel from "@/models/channel";
import MessageModel from "@/models/message";
export default async function handler(req: NextApiRequest,res: NextApiResponseServerIo) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  try 
  {
        await dbConnect()
        const profile = await currentProfilePages(req);
        const { content, fileUrl } = req.body;
        const { serverId, channelId } = req.query;
        console.log(`this is my content from message api ${content}`)
        console.log(`this is my fileUrl from message api ${fileUrl}`)
        
        // fileUrl += ".png";
        // console.log(`this is my image url after png extention ${imageUrl}`)
        if (!profile) return res.status(401).json({ error: "Unauthorized" });

        if (!serverId)
        return res.status(400).json({ error: "Server ID Missing" });

        if (!channelId)
        return res.status(400).json({ error: "Channel ID Missing" });

        if (content || fileUrl)
        {

            const server = await ServerModel.findById(serverId)

            if(server)
            {
                const member = await MemberModel.findOne({userId:profile._id,serverId:server._id})
                //may be some problem happend here 
                if(member)
                {
                    const channel = await ChannelModel.findOne({_id:channelId,serverId:serverId})
                    if (channel)
                    {
                        const message = await MessageModel.create({
                            content:content,
                            fileUrl:fileUrl,
                            memberId:member?._id,
                            channelId:channel?._id
                        })

                        if(message){
                            const channelKey = `chat:${channelId}:messages`;
                            res?.socket?.server?.io?.emit(channelKey, message);
                            return res.status(200).json(message);
                        }else{
                            console.log("MESSAGES_POST");
                            return res.status(500).json({ error: "Internal Server Error" });
                        }
                    }
                    else
                    {

                        return res.status(404).json({ message: "Channel not found" });
                    }
                }
                else
                {
                    return res.status(404).json({ message: "Member not found" });
                }

            }
            else
            {
                return res.status(404).json({ message: "Server not found" });
            }
        }else{
            return res.status(400).json({ error: "Content Missing" });
        }
    } 
    catch(error)
    {
        console.log(error)
    }

}