import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import React, { HTMLAttributes } from "react";

import { ExitIcon } from "@radix-ui/react-icons";
import { Icons } from "./icons";
import UserAvatar from "@/components/ui/user-avatar";
import { cn } from "@/lib/utils";

interface Session {
    user: {
        name: string;
        email: string;
        image: string;
    };
}

interface SessionDataProps extends HTMLAttributes<HTMLDivElement> {
    session: Session | null;
}

const SessionData = React.forwardRef<HTMLDivElement, SessionDataProps>(
    ({ className, session, ...props }, ref) => {
        const hasSession = !!session;

        if (!hasSession) {
            return (
                <div className={cn(className)} ref={ref} {...props}>
                    <button
                        className="flex flex-row items-center justify-center gap-2"
                        onClick={() => console.log("Sign In")}
                    >
                        <Icons.account width={40} height={40} />
                        <div className="flex flex-col">
                            <p className="text-xl font-bold">Sign in</p>
                        </div>
                    </button>
                </div>
            );
        }

        return (
            <div className={cn(className)} ref={ref} {...props}>
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <button className="flex flex-row gap-2">
                            <UserAvatar
                                src={session.user.image || "unknown"}
                                altText={
                                    session.user.name?.substring(2) || "unknown"
                                }
                            />
                            <div className="flex flex-col w-fit h-fit items-start justify-start">
                                <p className="text-lg font-bold -mb-1">
                                    {session.user.name}
                                </p>
                                <p className="text-sm font-normal">
                                    {session.user.email}
                                </p>
                            </div>
                        </button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                        <DropdownMenu.Content
                            className="min-w-[220px] bg-secondary-500 p-2 rounded-lg shadow-2xl will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                            sideOffset={5}
                        >
                            <DropdownMenu.Item
                                onClick={() => console.log("Sign Out")}
                                className="group text-sm p-2 leading-none text-primary-500 rounded-md flex flex-row gap-2 items-center h-[25px] relative select-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-primary-500 data-[highlighted]:text-secondary-500"
                            >
                                <ExitIcon className="w-5 h-5" />
                                Sign out
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
            </div>
        );
    }
);
SessionData.displayName = "SessionData";

export { SessionData, type SessionDataProps };
