import dbConnect from '@/db/dbConfig'
import ProfileModel from '@/models/profile'
// import { useUser } from "@clerk/nextjs";
import { currentUser } from '@clerk/nextjs/server'


export const initialProfile = async ()=>{

    const  userdata = await currentUser()
    
    
    if(!userdata){
        return null
    }
    else{
        await dbConnect()
        try 
        {
            const dbuser = await ProfileModel.findOne({ userId: userdata?.id});
            if(!dbuser)
            {
                
                // console.log(`user not found with this id ${userdata?.id}`)
                // console.log("this type of id is :",typeof userdata?.id)
                // console.log("the email is :",userdata?.emailAddresses[0].emailAddress)
                const newUser = new ProfileModel({
                    name:userdata?.firstName,
                    userId:userdata?.id,
                    email:userdata?.emailAddresses[0].emailAddress,
                    imageUrl:userdata?.imageUrl
                }); 
                const savedata = await newUser.save();   
                if(savedata){
                     console.log("The user data save successfully")
                     return newUser
                }else{
                    console.log("somthing went worng while saving user data")
                }
            } 
            return dbuser;
        } catch (error) {
            console.log("try catch faiilled in intial-profile file",error)
        }
    }
}