"use client"

import React, { HTMLAttributes } from "react"

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { useScroll } from "@/hooks/use-scroll"

interface NavigationLinkProps extends HTMLAttributes<HTMLAnchorElement> {
    href: string
    pathname: string
    activeOnSubpath?: boolean
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
                return pathname.startsWith(href)
            }
            return pathname === href
        }

        return (
            <Link
                className={cn(
                    isActive()
                        ? "text-xl md:text-xl font-bold rounded-md py-1 px-1 md:px-2 text-secondary-500 bg-primary-500"
                        : "text-xl md:text-xl font-bold rounded-md py-1 px-1 md:px-2 text-primary-500 bg-secondary-500 hover:bg-primary-500 hover:text-secondary-500",
                    className
                )}
                href={href}
                ref={ref}
                {...props}
            >
                {children}
            </Link>
        )
    }
)

NavigationLink.displayName = "NavigationLink"

const Navbar = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        const pathname = usePathname()
        const scroll = useScroll()

        const [hideNavbar, setHideNavbar] = React.useState<boolean>(false)

        React.useEffect(() => {
            if (scroll.y > 150 && scroll.lastY - scroll.y < 0) {
                setHideNavbar(true)
            } else {
                setHideNavbar(false)
            }
        }, [scroll.y, scroll.lastY])

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
                <div className='w-fit h-full flex flex-row items-center justify-center'>
                    <Link href='/competitions'>
                        <Image
                            src='/brand/cf_logo.png'
                            height={40}
                            width={114}
                            alt='Campus Flavor logo'
                            priority
                        />
                    </Link>
                </div>
                <div className='w-full h-full flex flex-row justify-center md:justify-end items-center'>
                    <ul className='w-fit h-full flex flex-row justify-center items-center gap-3'>
                        <li className='w-fit h-fit'>
                            <NavigationLink
                                href='/shop'
                                pathname={pathname}
                                activeOnSubpath
                            >
                                Shop
                            </NavigationLink>
                        </li>
                        <li className='w-fit h-fit'>
                            <NavigationLink
                                href='/competitions'
                                pathname={pathname}
                            >
                                Competitions
                            </NavigationLink>
                        </li>
                        <li className='w-fit h-fit'>
                            <NavigationLink href='/about' pathname={pathname}>
                                About
                            </NavigationLink>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
)
Navbar.displayName = "Navbar"

export default Navbar
