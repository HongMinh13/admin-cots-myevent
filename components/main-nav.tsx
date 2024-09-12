"use client";

import Link from "next/link"
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils"
import Image from "next/image";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
		{
			href: `/users`,
			label: 'Người dùng',
			active: pathname === `/users`,
		},
		{
			href: `/event`,
			label: 'Sự kiện',
			active: pathname === `/event`,
		},
		{
			href: `/devices`,
			label: 'Thiết bị',
			active: pathname === `/devices`,
		},
		{
			href: `/humanResources`,
			label: 'Nhân sự',
			active: pathname === `/humanResources`,
		},
		{
			href: `/locations`,
			label: 'Địa điểm',
			active: pathname === `/locations`,
		},
		{
			href: `/contracts`,
			label: 'Hợp đồng',
			active: pathname === `/contracts`,
		},
		{
			href: `/statistic`,
			label: 'Thống kê',
			active: pathname === `/statistic`,
		},
	];

  return (
		<nav
			className={cn('flex items-center space-x-4 lg:space-x-6', className)}
			{...props}
		>
			<Link href="/">
				<div className="mr-5">
					<Image
						src="https://i.ibb.co/rZ36Yn3/logo-header.png"
						width={144}
						height={60}
						alt="Logo"
						className="h-10"
					/>
				</div>
			</Link>
			{routes.map((route) => (
				<Link
					key={route.href}
					href={route.href}
					className={cn(
						'text-sm font-medium transition-colors hover:text-primary',
						route.active
							? 'text-black dark:text-white'
							: 'text-muted-foreground'
					)}
				>
					{route.label}
				</Link>
			))}
		</nav>
	);
};
