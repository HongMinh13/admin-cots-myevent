"use client";

import { HTMLAttributes, useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "../../lib/utils";
import Link from "next/link";
import AvatarDemo from "./Avatar/index";
import DropdownMenuDemo from "./DropDownMenu/index";
import { HowItWork } from "./HowItWork/index";
import { Button } from "../ui/button";

export function MainNav({ className, ...props }: HTMLAttributes<HTMLElement>) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        setLoggedIn(Boolean(localStorage?.getItem('access_token')));
    })

    return (
        <>
            <div
            className={cn(
                "flex w-full relative items-center justify-between sm:px-24 px-1",
                className
            )}
            style={{
                height: "80px",
                backgroundColor: "rgba(65, 65, 77, 0)",
            }}
            {...props}
        >
            {/* Logo */}
            <Link href="/">
            <div className="mx-5">
                <Image
                    src="/assets/images/logo-header.png"
                    width={144}
                    height={28}
                    alt="Logo"
                    className="h-8"
                />
            </div>
            </Link>
            {/* Nav */}
            <div className="flex items-center space-x-2">
                {/* lookup button */}
                <div className="relative">
                    <button
                        style={{
                            fontFamily: "inherit",
                            borderRadius: "100%",
                            height: "38px",
                            width: "38px",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",

                            /* background-color: white; */
                            /* box-shadow: 0 2px 10px var(--black-a7); */
                        }}
                    >
                        <svg
                            width="18px"
                            height="18px"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
                                fill="currentColor"
                                fillRule="evenodd"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
                {
  isLoggedIn ? (
    <>
      <div className="relative">
        <AvatarDemo />
      </div>
      <div className="relative">
        <DropdownMenuDemo />
      </div>
    </>
  ) : (
    <Link href="/login">
      <Button data-tut="reactour__iso" className="NFTClaimButton w-[5rem] h-[1.5rem] rounded-[24px] text-black text-[24px]">
        Login
      </Button>
    </Link>
  )
}
              
            </div>

           
           
            </div>

            {/* HowItWork */}
             <div className="w-full">
                <HowItWork />
            </div>
        </>
    );
}