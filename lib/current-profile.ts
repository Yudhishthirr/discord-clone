import { auth } from '@clerk/nextjs/server'
import ProfileModel from '@/models/profile'
import dbConnect from '@/db/dbConfig'


export const CurrentProfile = async()=>{

    const { userId } = await auth()

    if(!userId){
        return null
    }
    await dbConnect()
    try{
        const currentuser = await ProfileModel.findOne({ userId:userId});
        return currentuser;
    } catch(error){
        console.log(error)
    }
    
}
