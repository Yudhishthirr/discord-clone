import { getAuth } from "@clerk/nextjs/server";
import { NextApiRequest } from "next";

import ProfileModel from '@/models/profile'
import dbConnect from '@/db/dbConfig'

export const currentProfilePages = async (req: NextApiRequest) => {
  const { userId } = getAuth(req);

  if (!userId) return null;

  try{
    await dbConnect()
    const currentuser = await ProfileModel.findOne({ userId:userId});
    return currentuser;
    
  } catch(error){
    console.log(error)
  }
};