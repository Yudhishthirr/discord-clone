"use client"
import { Loader2, ServerCrash } from "lucide-react";
import { ChatWelcome } from "./chat-welcome";
import { useChatQuery } from "@/hooks/use-chat-query";
import { ChatItem } from "./chat-item";
import { Fragment } from "react";
import { format } from "date-fns";
interface ChatMessagesProps {
  name: string;
  member: any;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
}
const DATE_FORMAT = "d MMM yyyy, HH:mm";
export const ChatMessages = ({ name, member, chatId, apiUrl, socketUrl, socketQuery, paramKey, paramValue, type }: ChatMessagesProps) => {

  const queryKey = `chat:${chatId}`;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useChatQuery({ queryKey, apiUrl, paramKey, paramValue });
  
  // useChatSok

  if (status === "loading")
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading messages...
        </p>
      </div>
    );

  if (status === "error")
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Something went wrong!
        </p>
      </div>
    );
  return (
    <div className="flex-1 flex flex-col py-4 overflow-y-auto">
      {/* <div className="flex justify-center"> */}
      <div className="flex-1">
        {/* <ChatWelcome name={name} type={type} /> */}

        <div className="flex flex-col-reverse mt-auto">
          {data?.pages?.map((group,i) => (
            <Fragment key={i}>
              {group.items.map((message:any)=>(
                <ChatItem
                  key={message._id}
                  currentMember={member}
                  memberDetails={message.memberDetails}
                  memberDetailsProfile={message.memberDetailsprofile}
                  id={message._id}
                  content={message.content}
                  fileUrl={message.fileUrl}
                  deleted={message.deleted}
                  timestamp={format(
                    new Date(message.createdAt),
                    DATE_FORMAT
                  )}
                  isUpdated={message.updatedAt !== message.createdAt}
                  socketQuery={socketQuery}
                  socketUrl={socketUrl}
                />
              ))}
              
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}