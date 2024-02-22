import * as Avatar from "@radix-ui/react-avatar";

import React, { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface UserAvatarProps extends HTMLAttributes<HTMLDivElement> {
    src: string;
    altText: string;
}

const UserAvatar = React.forwardRef<HTMLDivElement, UserAvatarProps>(
    ({ className, src, altText, ...props }, ref) => {
        return (
            <div
                className={cn("flex flex-row gap-5", className)}
                {...props}
                ref={ref}
            >
                <Avatar.Root className="inline-flex items-center justify-center align-middle overflow-hidden select-none w-12 h-12 rounded-full bg-primary-500">
                    <Avatar.Image
                        className="w-full h-full object-cover rounded-full"
                        src={src}
                        alt="Colm Tuite"
                    />
                    <Avatar.Fallback
                        className="w-full h-full flex items-center justify-center text-secondary-500 font-bold leading-none"
                        delayMs={600}
                    >
                        {altText}
                    </Avatar.Fallback>
                </Avatar.Root>
            </div>
        );
    }
);
UserAvatar.displayName = "UserAvatar";

export default UserAvatar;
