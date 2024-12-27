


import ChannelModel from "@/models/channel"
import MemberModel from "@/models/member"
import { CurrentProfile } from "@/lib/current-profile"
import dbConnect from '@/db/dbConfig'
import { redirect } from 'next/navigation'

import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
// import { MediaRoom } from "@/components/media-room";
import { serializeData } from "@/components/server/server-sidebar"

interface ChannelIdPageProps {
    params: {
        channelId: string;
        serverId: string;
    };
}

const ChannelPageId = async ({ params: { channelId, serverId } }: ChannelIdPageProps) => {

    try {
        await dbConnect()
        const profile = await CurrentProfile();
        if (!profile) return redirect('/')

        const channel = await ChannelModel.findById(channelId)
        const member = await MemberModel.findOne({ userId: profile._id, serverId: serverId })
        // find one record only but why search it
        if (!channel || !member) return redirect("/");

        return (
            <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
                <ChatHeader
                    name={channel.name}
                    serverId={channel.serverId.toString()}
                    type="channel"
                />
                {/* load messages here  */}
                <ChatMessages
                    member={serializeData(member)}
                    name={channel.name}
                    chatId={channel._id.toString()}
                    type="channel"
                    apiUrl="/api/messages"
                    socketUrl="/api/socket/messages"
                    socketQuery={{
                        channelId: channel._id.toString(),
                        serverId: channel.serverId.toString()
                    }}
                    paramKey="channelId"
                    paramValue={channel._id.toString()}
                />
                {channel.type === "TEXT" && (
                    <>
                        {/* inserting messages here */}
                        <ChatInput
                            name={channel.name}
                            type="channel"
                            apiUrl="/api/socket/messages"
                            query={{
                                channelId: channel._id.toString(),
                                serverId: channel.serverId.toString()
                            }}
                        />
                    </>
                )}
            </div>
        )
    } catch (error) {
        console.log(`channel page error ${error}`)
    }
}

export default ChannelPageId