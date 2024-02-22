"use client";

import React, { HTMLAttributes } from "react";
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

        const [hideNavbar, setHideNavbar] = React.useState<boolean>(false);

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
                className={cn(
                    "sticky top-0 w-full min-h-20 md:min-h-20 flex flex-col md:flex-row items-center justify-center gap-2 md:px-20 lg:px-24 xl:px-28 shadow-md bg-secondary-500 transform duration-300 ease-in-out",
                    hideNavbar ? "-translate-y-full" : "",
                    className
                )}
                {...props}
                ref={ref}
            >
                <div className="w-fit h-full flex flex-row items-center justify-center">
                    <Link href="/competitions">
                        <div className="text-secondary-500 bg-primary-500 h-full w-fit font-extrabold text-xl px-3 py-2 leading-none">
                            <div className="flex flex-row justify-start mr-4">
                                CAMPUS
                            </div>
                            <div className="flex flex-row justify-end">
                                FLAVOR
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="w-full h-full flex flex-row justify-between items-center md:pl-24">
                    <ul className="flex flex-row justify-start items-center gap-3">
                        <li>
                            <NavigationLink
                                href="/shop"
                                pathname={pathname}
                                activeOnSubpath
                            >
                                Shop
                            </NavigationLink>
                        </li>
                        <li>
                            <NavigationLink
                                href="/competitions"
                                pathname={pathname}
                            >
                                Competitions
                            </NavigationLink>
                        </li>
                        <li>
                            <NavigationLink href="/about" pathname={pathname}>
                                About
                            </NavigationLink>
                        </li>
                    </ul>

                    <ul className="flex flex-row justify-end items-center gap-3">
                        <li>
                            <SessionData {...sessionDataProps}></SessionData>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
);
Navbar.displayName = "Navbar";

export default Navbar;
