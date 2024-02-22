"use client";

import React, { HTMLAttributes, useState } from "react";
import { SessionData, SessionDataProps } from "./session-data";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useScroll } from "@/hooks/use-scroll";

interface NavigationLinkProps extends HTMLAttributes<HTMLAnchorElement> {
    href: string;
    pathname: string;
    activeOnSubpath?: boolean;
}

const NavigationLink = React.forwardRef<HTMLAnchorElement, NavigationLinkProps>(
    (
        {
            className,
            pathname,
            href,
            activeOnSubpath = false,
            children,
            ...props
        },
        ref
    ) => {
        const isActive = (): boolean => {
            if (activeOnSubpath) {
                return pathname.startsWith(href);
            }
            return pathname === href;
        };

        return (
            <Link
                className={cn(
                    isActive()
                        ? "text-xl md:text-xl font-bold rounded-md py-2 px-2 md:px-3 text-secondary-500 bg-primary-500"
                        : "text-xl md:text-xl font-bold rounded-md py-2 px-2 md:px-3 text-primary-500 bg-secondary-500 hover:bg-primary-500 hover:text-secondary-500",
                    className
                )}
                href={href}
                ref={ref}
                {...props}
            >
                {children}
            </Link>
        );
    }
);

NavigationLink.displayName = "NavigationLink";

const Navbar = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        const pathname = usePathname();
        const scroll = useScroll();
        const [hideNavbar, setHideNavbar] = useState<boolean>(false);
        const [isOpen, setOpen] = useState(false); // State to manage Hamburger menu toggle

        const sessionDataProps: SessionDataProps = {
            session: {
                user: {
                    name: "sampleUser",
                    email: "user@example.com",
                    image: "https://imgs.search.brave.com/6QbDWLNh3Wfj0NcrvOnoPVd5r6WhBN_ghhhPul7Pyk0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9oaXBz/LmhlYXJzdGFwcHMu/Y29tL2htZy1wcm9k/L2ltYWdlcy9nZXR0/eWltYWdlcy0xMjI5/ODkyOTgzLXNxdWFy/ZS5qcGc_Y3JvcD0x/eHc6MS4weGg7Y2Vu/dGVyLHRvcCZyZXNp/emU9NjQwOio",
                },
            },
        };

        React.useEffect(() => {
            if (scroll.y > 150 && scroll.lastY - scroll.y < 0) {
                setHideNavbar(true);
            } else {
                setHideNavbar(false);
            }
        }, [scroll.y, scroll.lastY]);

        return (
            <nav
                className="sticky top-0 w-full flex items-center justify-between bg-secondary-500 shadow-md px-5 md:px-10 py-2 transform duration-300 ease-in-out"
                {...props}
                ref={ref}
            >
                {/* Logo Left-aligned */}
                <Link href="/competitions">
                    <div className="flex items-center">
                        <img src="/logos/250x100.svg" alt="Campus Flavor Logo" width={150} />
                    </div>
                </Link>

                {/* Navigation Items - Center-aligned for larger screens */}
                <ul className="hidden md:flex flex-1 justify-center items-center space-x-4">
                    <li>
                        <NavigationLink href="/shop" pathname={pathname} activeOnSubpath>
                            Shop
                        </NavigationLink>
                    </li>
                    <li>
                        <NavigationLink href="/competitions" pathname={pathname}>
                            Competitions
                        </NavigationLink>
                    </li>
                    <li>
                        <NavigationLink href="/about" pathname={pathname}>
                            About
                        </NavigationLink>
                    </li>
                </ul>

                {/* Session Data - Right-aligned */}
                <div className="flex items-center">
                    <SessionData {...sessionDataProps} />
                </div>
            </nav>
        );

    }
);

Navbar.displayName = "Navbar";

export default Navbar;
