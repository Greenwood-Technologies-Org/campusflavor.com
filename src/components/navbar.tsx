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
                    {/* Logo Left-aligned */}
                    <Link href="/competitions">
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

                    {/* Navigation Items - Center-aligned for larger screens */}
                    <div className="hidden md:flex flex-1 justify-center items-center space-x-4">
                        <NavigationLink
                            href="/shop"
                            pathname={pathname}
                            activeOnSubpath
                        >
                            Shop
                        </NavigationLink>
                        <NavigationLink
                            href="/competitions"
                            pathname={pathname}
                            activeOnSubpath
                        >
                            Competitions
                        </NavigationLink>
                        <NavigationLink href="/about" pathname={pathname}>
                            About
                        </NavigationLink>
                    </div>

                    {/* Session Data - Right-aligned */}
                    <div className="hidden md:flex items-center">
                        <SessionData
                            session={session.session}
                            isLoading={session.isLoading}
                        />
                    </div>

                    {/* Hamburger Menu - Right-aligned for medium screens and smaller */}
                    <div className="md:hidden">
                        <Hamburger toggled={isOpen} toggle={setOpen} />
                    </div>
                </nav>

                {/* Slide-down Menu */}
                <div
                    className="md:hidden z-45 shadow-xl overflow-hidden transition-all duration-500 ease-in-out"
                    style={{
                        height: isOpen
                            ? `${
                                  document.getElementById("menu-content")
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
                                href="/shop"
                                pathname={pathname}
                                activeOnSubpath
                            >
                                Shop
                            </NavigationLink>
                            <NavigationLink
                                href="/competitions"
                                pathname={pathname}
                                activeOnSubpath
                            >
                                Competitions
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
