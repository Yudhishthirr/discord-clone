"use client"
import { UploadDropzone } from "@/lib/uploadthing";
import { FileIcon, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";




interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: "messageFile" | "serverImage";
}

function getExtention(fileName: string) {
    const extension = fileName.split('.').pop();
    return extension
}
export function FileUpload({ onChange, value, endpoint }: FileUploadProps) {

    const [uploadedFiles, setUploadedFiles] = useState<any>();
    
   

    if (uploadedFiles) {
        if (getExtention(uploadedFiles?.name) == 'png' || getExtention(uploadedFiles?.name) == 'jpg' || getExtention(uploadedFiles?.name) == 'jpeg')
            return (
                <div className="relative h-20 w-20">
                    <Image fill src={uploadedFiles?.url} alt="Upload" className="rounded-full" />
                    <button
                        onClick={() => onChange("")}
                        className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                        type="button"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            )
        else {
            return (
                <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                    <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
                    <a
                        href={value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
                    >
                        {value}
                    </a>
                    <button
                        onClick={() => onChange("")}
                        className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
                        type="button"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            )
        }
    }
    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res: any) => {
                setUploadedFiles(res?.[0]);
                onChange(res?.[0].url);
            }}
            onUploadError={(error: Error) => console.error(error.message)}
        />
    )
}