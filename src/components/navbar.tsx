"use client";

import React, { HTMLAttributes, useState } from "react";

import { Squash as Hamburger } from "hamburger-react";
import Image from "next/image";
import Link from "next/link";
import { SessionData } from "./session-data";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useScroll } from "@/hooks/use-scroll";
import useSession from "@/hooks/use-session";

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
                        ? "text-center text-xl font-bold rounded-md py-2 px-2 text-secondary-500 bg-primary-500"
                        : "text-center text-xl font-bold rounded-md py-2 px-2 text-primary-500 bg-secondary-500 hover:bg-primary-500 hover:text-secondary-500",
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
        const session = useSession();

        const pathname = usePathname();
        const scroll = useScroll();
        const [isOpen, setOpen] = useState(false); // State to manage Hamburger menu toggle
        const [hideNavbar, setHideNavbar] = useState(false);

        React.useEffect(() => {
            if (scroll.y > 150 && scroll.lastY - scroll.y < 0) {
                setHideNavbar(true);
            } else {
                setHideNavbar(false);
            }
        }, [scroll.y, scroll.lastY]);

        return (
            <div className="sticky top-0 z-40 w-full">
                <nav
                    className="z-50 w-full flex items-center justify-between bg-secondary-500 shadow-md px-4 md:px-6 py-2 transform duration-300 ease-in-out"
                    {...props}
                    ref={ref}
                >
                    {/* Left-aligned section for logo */}
                    <div className="flex-1 flex justify-start">
                        <Link href="/design-board">
                            <div className="flex items-center">
                                <Image
                                    src="/logos/logo_main_no_bg.svg"
                                    alt="Campus Flavor Logo"
                                    height={60}
                                    width={150}
                                    priority
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Center-aligned navigation items */}
                    <div className="hidden md:flex flex-1 justify-center items-center space-x-2 md:space-x-3">
                        {" "}
                        {/* reduced space */}
                        <NavigationLink
                            className="text-sm md:text-base flex-shrink-0"
                            href="/design-board"
                            pathname={pathname}
                            activeOnSubpath
                        >
                            Design Board
                        </NavigationLink>
                        <NavigationLink
                            className="text-sm md:text-base flex-shrink-0"
                            href="/about"
                            pathname={pathname}
                        >
                            About
                        </NavigationLink>
                    </div>

                    {/* Right-aligned section for session data and hamburger menu */}
                    <div className="flex-1 flex justify-end items-center">
                        {/* Session Data - Only visible on desktop */}
                        <div className="hidden md:flex items-center">
                            <SessionData
                                session={session.session}
                                isLoading={session.isLoading}
                                className="md:pr-2" // reduced padding on the right for medium screens
                            />
                        </div>

                        {/* Hamburger Menu - Visible on mobile */}
                        <div className="md:hidden">
                            <Hamburger toggled={isOpen} toggle={setOpen} />
                        </div>
                    </div>
                </nav>

                {/* Slide-down Menu */}
                <div
                    className="md:hidden z-45 shadow-xl overflow-hidden transition-all duration-500 ease-in-out"
                    style={{
                        height: isOpen
                            ? `${document.getElementById("menu-content")
                                ?.scrollHeight
                            }px`
                            : "0",
                    }}
                >
                    <div
                        className="p-4 bg-white items-center"
                        id="menu-content"
                    >
                        {/* Menu Content */}
                        <div className="flex flex-col space-y-4">
                            <NavigationLink
                                href="/design-board"
                                pathname={pathname}
                                activeOnSubpath
                            >
                                Design Board
                            </NavigationLink>
                            <NavigationLink href="/about" pathname={pathname}>
                                About
                            </NavigationLink>

                            <div className="border-t-2 border-gray w-full"></div>

                            {/* Session Data Component */}
                            <div className="p-2">
                                <SessionData
                                    session={session.session}
                                    isLoading={session.isLoading}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

Navbar.displayName = "Navbar";

export default Navbar;
