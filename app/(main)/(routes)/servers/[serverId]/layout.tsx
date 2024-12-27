
import {CurrentProfile} from "@/lib/current-profile"
import dbConnect from '@/db/dbConfig'
import {redirect} from "next/navigation"
import ServerModel from "@/models/server"
import {ServerSidebar} from "@/components/server/server-sidebar"
import Link from "next/link";

export default async function ServerIdLayout({children,params}: {children: React.ReactNode;params: { serverId: any };}) {

  
  try{
    await dbConnect()

    const profile = await CurrentProfile();
    // const serverId = params.serverId;
    const serverId =await params.serverId;
    const creatorId  = await profile._id

    if(!profile){
      try{
        redirect("/")
      }catch(error){
        return (
          <>
              <h1>somthing went worng while redirecting to server</h1>
              <Link href={`/`}>Click here to redirect to root</Link>
          </>
      )
      }
    }
    const server = await ServerModel.findOne({_id:serverId,creatorId:creatorId})
    
    
    
    if(!server) return ( <div>not a server  </div> )
    return (
        <div className="h-full">
          <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
              <ServerSidebar serverId={serverId} />
          </div>
          <main className="h-full md:pl-60">{children}</main>
        </div>
    ); 
  } catch(error){
    console.log(error)
  }
    
}
