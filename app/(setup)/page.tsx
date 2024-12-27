import {initialProfile} from "@/lib/initial-profile"
import dbConnect from '@/db/dbConfig'
import ServerModel from "@/models/server"
import {redirect} from "next/navigation"
import Link from "next/link";
import {InitialModel} from "@/components/model/initial-model"
const SetUpPage = async()=>{

    const userdata = await initialProfile()
    
    try{

        await dbConnect()
        const server = await ServerModel.findOne({creatorId: userdata?._id})
        

        const serverid = server?._id
        
       
        if (server) {
            try{
                redirect(`/servers/${serverid}`);
            }catch(error){
                return (
                    <>
                        <h1>somthing went worng while redirecting to server</h1>
                        <Link href={`/servers/${serverid}`}>Click here to redirect to server</Link>
                    </>
                )
            }
        }else{
            return <InitialModel/>
        }    
    } catch(error){
        console.log(error)
    }
}
export default SetUpPage;