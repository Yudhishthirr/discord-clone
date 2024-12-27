"use client"
import {useState,useEffect} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios"

import { FileUpload } from "@/components/file-upload";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Label } from "@/components/ui/label"

export const InitialModel = ()=>{

    const router = useRouter();
    const [isMounted,setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    },[]);
    // this is our from schema
    const FromSchema = z.object({
        name:z.string().min(1,{
            message:"Server name is required"
        }),
        imageUrl:z.string().min(1,{
            message:"Server image is required"
        })
    })
    // this is our form filds 
    const form = useForm({
        // now there we connect both 
        resolver:zodResolver(FromSchema),
        defaultValues:{
            name:"",
            imageUrl:"",
        }
    })

    // capturing form state

    const isLoading = form.formState.isSubmitting;
    // here is capturing all from data by type safty using our fromSchema
    const onSubmit = async (values:z.infer<typeof FromSchema>)=>{
        
       
        try{
            await axios.post('/api/servers',values)

            form.reset();
            router.refresh();
            window.location.reload();

        } catch(error){
            console.log(error)
        }
        if(!setIsMounted){
            return null;
        }
    }


    return (
        <Dialog open>
            <DialogContent  className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Customize your server
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Give your server a personality with a name and an image. You can
                        always change it later.
                    </DialogDescription>
                </DialogHeader>
                {/* passing all form data */}
                <Form {...form}>
                    {/* paasing control afteer submmiting from on onSubmit function */}
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({ field }) => (
                                    
                                    <FormItem>
                                    <FormControl>
                                        <FileUpload
                                        endpoint="serverImage"
                                        value={field.value}
                                        onChange={field.onChange}
                                        />
                                    </FormControl>
                                    </FormItem>
                                )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                <FormItem>
                                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">Server Name</FormLabel>
                                    <FormControl>
                                    <Input
                                        disabled={isLoading}
                                        placeholder="Enter server name"
                                        className="bg-zinc-300/50 border-0 focus-visible: ring-0 text-black focus-visible:ring-offset-0"
                                        {...field}
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button disabled={isLoading} variant="primary">Create</Button>
                        </DialogFooter>
                    </form>
                </Form>
               
            </DialogContent>
        </Dialog>
    )
}
