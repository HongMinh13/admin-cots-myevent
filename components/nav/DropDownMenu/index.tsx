"use client"

import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import './styles.css';
import { useRouter } from 'next/navigation';
import { clearToken } from '@/lib';

const DropdownMenuDemoParams = ["Profile", "Logout"];


const DropdownMenuDemo = () => {
    const router = useRouter();

    const DropdownMenuDemoParams = [
        {
            label: "Profile",
            onClick: () => router.push("/profile"),
        },
        {
            label: "Logout",
            onClick: () => {
                clearToken();
              window.location.reload();
              }
        },
    ];
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button className="IconButton" aria-label="Customise options">
                    <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className=''
                        color='grey'
                        //stroke-width="40"
                    >
                        <path
                            d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                            fill="currentColor"
                        />
                    </svg>
                </button>
            </DropdownMenu.Trigger>


            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="DropdownMenuContent"
                    sideOffset={5}
                >
                    {DropdownMenuDemoParams.map(({ label, onClick }) => (
                        <DropdownMenu.Item
                            key={label}
                            className="DropdownMenuItem cursor-pointer"
                        >
                            <DropdownMenu.Item
                                className="DropdownMenuItem"
                                onClick={onClick}
                            >
                                {label}
                            </DropdownMenu.Item>
                        </DropdownMenu.Item>
                    ))}
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default DropdownMenuDemo;
