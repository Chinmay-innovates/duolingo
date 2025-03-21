import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
interface SidebarProps {
	className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
	return (
		<div
			className={cn(
				"flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
				className
			)}
		>
			<Link href={"/learn"}>
				<div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
					<Image src={"/logo.svg"} height={180} width={180} alt={"mascot"} />
				</div>
			</Link>
			<div className="flex flex-col gap-y-2 flex-1">
				<SidebarItem label={"Learn"} icon={"/learn.svg"} href={"/learn"} />
				<SidebarItem
					label={"Leaderboard"}
					icon={"/leaderboard.svg"}
					href={"/leaderboard"}
				/>
				<SidebarItem label={"Quests"} icon={"/quests.svg"} href={"/quests"} />
				<SidebarItem label={"Shop"} icon={"/shop.svg"} href={"/shop"} />
			</div>
			<div className="p-4">
				<ClerkLoading>
					<Loader className="size-5 animate-spin text-muted-foreground" />
				</ClerkLoading>
				<ClerkLoaded>
					<UserButton afterSignOutUrl="/" />
				</ClerkLoaded>
			</div>
		</div>
	);
};
