"use client";

import { useState,useEffect } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import {FileUpload} from "@/components/file-upload"
import { useModal } from "@/hooks/use-model-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";





const formSchema = z.object({
  name: z.string().min(1, { message: "Server name is required." }),
  imageUrl: z.string().min(1, { message: "Server image is required." })
});

export function EditServerModal() {

  const { isOpen, onOpen, onClose, type, data } = useModal();
  
  const {server} = data
 

  
  const router = useRouter();

 
  const isModalOpen = isOpen && type === "edit_server";
 

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: ""
    }
  });

  useEffect(() => {
    if (server) {
      form.setValue("name", server.name);
      form.setValue("imageUrl", server.imageUrl);
    }
  }, [server, form]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(`create server pages values ${values.name}`)
    
    try {
      const response = await axios.patch(`/api/servers/${server?._id}`,values)
      onOpen("edit_server",{server:response.data})
      
    } catch (error) {
      console.error(error);
    } finally{
      form.reset();
      router.refresh();
      onClose();
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

 
  return (
      <Dialog  open={isModalOpen} onOpenChange={handleClose}>
        <DialogTrigger></DialogTrigger>
        <DialogContent >
          <DialogHeader>
            <DialogTitle> Customize your server</DialogTitle>
            <DialogDescription>
            Give your server a personality with a name and an image. You can
           always change it later.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div  className="flex items-center justify-center text-center">
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Server Name
                      </FormLabel>
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
            <DialogFooter  className="px-6 py-4"> 
              <Button disabled={isLoading} variant="primary">
                Save
              </Button>
            </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
  );
}