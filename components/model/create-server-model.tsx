"use client";

import { useState } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import {FileUpload} from "@/components/file-upload"
import {Lema} from "@/demo/lema"
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
import {DemoFileUpload} from "@/demo/demo-fille-upload"
import { useModal } from "@/hooks/use-model-store";




const formSchema = z.object({
  name: z.string().min(1, { message: "Server name is required." }),
  imageUrl: z.string().min(1, { message: "Server image is required." })
});

export function CreateServerModal() {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();

  // console.log(`is open value is ${isOpen}`)
  // console.log(`is onClose value is ${onClose}`)
  // console.log(`type value is ${type}`)
  const isModalOpen = isOpen && type === "createServer";
  // console.log(`isModalOpen value is ${isModalOpen}`)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: ""
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(`create server pages values ${values.name}`)
    console.log(`create server pages values ${values}`)
    try {
      await axios.post("/api/servers", values);

      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      console.error(error);
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
                Create
              </Button>
            </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
  );
}