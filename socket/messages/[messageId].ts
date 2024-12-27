import { NextApiRequest } from "next";
import { NextApiResponseServerIo } from "@/types";
import { currentProfilePages } from "@/lib/current-profile-pages";
import mongoose from "mongoose"
import MemberModel from '@/models/member'
import MessageModel from "@/models/message"
import ChannelModel from "@/models/channel"
import dbConnect from '@/db/dbConfig'
import { serializeData } from "@/components/server/server-sidebar";
import ServerModel from "@/models/server"

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {

    await dbConnect()
    const profile = await currentProfilePages(req);
    const { content } = req.body;
    const { serverId, channelId, messageId }: any = req.query;
    console.log(`This is my messageId ${messageId}`)
    console.log(`This is my channelId ${channelId}`)
    console.log(`This is my serverId ${serverId}`)
    if (req.method === "DELETE") {

        try{
            const deleteMessage = await MessageModel.findByIdAndUpdate(messageId, { $set: { deleted: true } })
            if (deleteMessage) {
                return res.status(200).json({ message: "message has been deleted" });
            } else {
                return res.status(404).json({ error: "Message not found" });
            }
        } catch(error){
            console.log(error)
            return res.status(500).json({ error: "Internal Server Error" });
        }

    } else {
        console.log("Bhai Jan Not Welcom")
        return res.status(200).json({ message: "Bhai Jan Not Welcom" });
    }
    // if (req.method !== "DELETE" && req.method !== "PATCH") 
    //     return res.status(405).json({ error: "Method not allowed" });
    // else
    // {
    //     try 
    //     {

    //         await dbConnect()
    //         const profile = await currentProfilePages(req);
    //         const { content } = req.body;
    //         const { serverId, channelId, messageId }:any = req.query;

    //         if (!profile) return res.status(401).json({ error: "Unauthorized" });

    //         if (!serverId) return res.status(400).json({ error: "Server ID Missing" });

    //         if (!channelId) return res.status(400).json({ error: "Channel ID Missing" });

    //         const server = await ServerModel.findOne({ _id: serverId, userId: profile._id })
    //         if (server) {

    //             const channel = await ChannelModel.findOne({ _id: channelId, serverId: serverId })
    //             if (channel) {

    //                 const member = await MemberModel.find({ serverId: serverId, userId: profile._id })
    //                 if (member) {
    //                     const memberdata = member.find(
    //                         (memberdata) => memberdata?.userId === profile.id
    //                     );

    //                     if (memberdata) {
    //                         const messages:any = await MessageModel.aggregate(
    //                             [
    //                                 {
    //                                     $match: {
    //                                         channelId: new mongoose.Types.ObjectId(channelId)
    //                                     }
    //                                 },
    //                                 {
    //                                     "$sort": { "createdAt": -1 }
    //                                 },
    //                                 {
    //                                     "$lookup": {
    //                                         "from": "members",
    //                                         "localField": "memberId",
    //                                         "foreignField": "_id",
    //                                         "as": "memberDetails"
    //                                     }
    //                                 },
    //                                 { $unwind: '$memberDetails' },
    //                                 {
    //                                     $lookup: {
    //                                         from: 'profiles',
    //                                         localField: 'memberDetails.userId',
    //                                         foreignField: '_id',
    //                                         as: 'memberDetailsprofile'
    //                                     }
    //                                 },
    //                                 { $unwind: '$memberDetailsprofile' },
    //                             ]
    //                         )
    //                         if (!messages || messages?.deleted) {
    //                             return res.status(404).json({ error: "Message not found" });
    //                         }

    //                         if (req.method === "DELETE") {
    //                             console.log("Bhai Jan Welcom")
    //                             return res.status(200).json({ message: "Bhai Jan Welcom" });
    //                         }else{
    //                             console.log("Bhai Not Jan Welcom")
    //                         }
    //                         const updateKey = `chat:${channelId}:messages:update`;

    //                         res?.socket?.server?.io?.emit(updateKey, messages);
    //                         // const isMessageOwner = messages.memberId === member.id;
    //                         // const isAdmin = member.role === MemberRole.ADMIN;
    //                         // const isModerator = member.role === MemberRole.MODERATOR;
    //                         // const canModify = isMessageOwner || isAdmin || isModerator;
    //                     }

    //                 }
    //             }
    //         }

    //     }
    //     catch (error) {
    //         console.log(error)
    //         return res.status(500).json({ error: "Internal Server Error" });
    //     }
    // }
}
