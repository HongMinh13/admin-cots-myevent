"use client"
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import Link from "next/link"
import AvatarDemo from "./nav/Avatar";
import DropdownMenuDemo from "./nav/DropDownMenu";
import { useTheme } from "next-themes";
const Navbar = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const { setTheme } = useTheme();
  useEffect(() => {
      setTheme('light');
      setLoggedIn(Boolean(localStorage?.getItem('it-job-find-access-token')));
  })
  return (
		<div className="border-b">
			<div className="flex h-16 items-center px-4">
				<MainNav className="mx-6" />

				<div className="ml-auto flex items-center space-x-4">
					{isLoggedIn ? (
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
							<Button>Login</Button>
						</Link>
					)}
				</div>
			</div>
		</div>
	);
};
 
export default Navbar;
