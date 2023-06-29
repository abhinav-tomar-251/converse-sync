'use client';

import OtherUser from "@/app/hooks/OherUser";
import { Conversation, User } from "@prisma/client";
import { useMemo, useState } from "react";
import Link from "next/link";
import Avatar from "@/app/components/Avatar";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "./ProfileDrawer";
import AvatarGroup from "@/app/components/AvatarGroup";
import useActiveList from "@/app/hooks/useActiveList";

interface HeaderProps {
    conversation: Conversation & {
        users: User[];
    }
};

const Header: React.FC<HeaderProps> = (
    { conversation }
) => {
     const otherUser = OtherUser(conversation);
        const [drawerOpen, setDrawerOpen] = useState(false);
        const { members } = useActiveList();
        const isActive = members.indexOf(otherUser?.email!) !== -1;

    const statusText = useMemo(() => {
        if (conversation.isGroup){
            return `${conversation.users.length} members`;
        }

        return isActive? 'Online' : 'Offline';
    },[conversation, isActive]);

    return ( 
      <>
        <ProfileDrawer data={conversation} isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
        <div 
        className="
          bg-indigo-200 
          w-full 
          flex 
          border-b-[1px] 
          sm:px-4 
          py-3 
          px-4 
          lg:px-6 
          justify-between 
          items-center 
          shadow-sm
        "
      >
        <div className="flex gap-3 items-center">
          <Link
                href="/conversations" 
                className="
                lg:hidden 
                block 
                text-indigo-800 
                hover:text-indigo-900 
                transition 
                cursor-pointer
                "
            >
                <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? (
              <AvatarGroup users = {conversation.users}/>
          ): (   
         <Avatar user={otherUser} />
          )}
          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
                <div className="text-sm font-light text-neutral-600">
                    {statusText}
                </div>
            </div>
        </div>
                <HiEllipsisHorizontal size={32} onClick={() => setDrawerOpen(true)}
                   className="text-indigo-800 cursor-pointer hover:text-indigo-900 transition"
                />
        </div>
     
      </>      
     );
}
 
export default Header;

