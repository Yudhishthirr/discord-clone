
import ServerModel from '@/models/server'
import { redirect } from "next/navigation";

import { CurrentProfile } from "@/lib/current-profile"


interface InviteCodPageProps {
    params: {
        inviteCode: string;
    };
}

export default async function InviteCodPage({ params: { inviteCode } }: InviteCodPageProps) {

    const profile = await CurrentProfile();
    const inviteCodes = inviteCode

    if (!profile) redirect('/');

    if (!inviteCode) redirect('/');

    const existingServer = await ServerModel.findOne(
        { inviteCode: inviteCodes, creatorId: profile._id }
    );


    if (existingServer)  return ( <div>Server already exists</div> )//redirect(`/servers/${existingServer._id}`);

    // const server = await db.server.findOneAndUpdate({
    //     where: {
    //         inviteCode
    //     },
    //     data: {
    //         members: {
    //             create: [{ profileId: profile.id }]
    //         }
    //     }
    // });

    // if (server) return redirect(`/servers/${server.id}`);

    return null;
}