
import mongoose from 'mongoose';
import ServerModel from "@/models/server"
import MemberModel from "@/models/member"
import { CurrentProfile } from "@/lib/current-profile"
import dbConnect from '@/db/dbConfig'
import { redirect } from 'next/navigation'


interface ServerIdPageProps {
  params: {
    serverId: any;
  };
}
// hey when ever user come to user devcord afer creating account we immedly redirect to genral chnnel that we default created 
const ServerIdPage = async ({ params }: ServerIdPageProps) => {

  
  const profile = await CurrentProfile();
  if (!profile) return redirect('/')

  return (
    <div>server id : </div>
  )
};


export default ServerIdPage;