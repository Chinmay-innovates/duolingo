"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { Button } from "./ui/button";

interface SidebarItemProps {
	label: string;
	icon: string;
	href: string;
}

export const SidebarItem = ({ href, icon, label }: SidebarItemProps) => {
	const pathname = usePathname();
	const isActive = pathname === href;
	return (
		<Button
			variant={isActive ? "sidebarOutline" : "sidebar"}
			className="justify-start h-[52px]"
			asChild
		>
			<Link href={href}>
				<Image src={icon} alt={label} className="mr-5" height={32} width={32} />
				{label}
			</Link>
		</Button>
	);
};
