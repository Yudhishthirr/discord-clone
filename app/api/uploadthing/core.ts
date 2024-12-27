import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from '@clerk/nextjs/server'
const f = createUploadthing();

const handlAuth = async () => {
  const { userId } = await auth()
  return { userId: userId }
}


export const ourFileRouter = {

  serverImage: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      const user = await handlAuth();
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      return { uploadedBy: metadata.userId };
    }),
  messageFile: f(["image", "pdf"])
    .middleware(() => handlAuth())
    .onUploadComplete(() => {
      console.log("Message File Upload Completed.");
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;