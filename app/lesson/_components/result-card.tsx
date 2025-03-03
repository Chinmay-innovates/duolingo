import Image from "next/image";

import { cn } from "@/lib/utils";
import { InfinityIcon } from "lucide-react";

interface ResultCardProps {
	value: number;
	variant: "hearts" | "points";
	isPro?: boolean;
}

export const ResultCard = ({ value, variant, isPro }: ResultCardProps) => {
	const image = variant === "hearts" ? "/heart.svg" : "/points.svg";

	return (
		<div
			className={cn(
				"rounded-2xl border-2 w-full",
				variant === "points" && "bg-orange-400 border-orange-400",
				variant === "hearts" && "bg-rose-500 border-rose-500"
			)}
		>
			<div
				className={cn(
					"p-1/2 rounded-t-xl text-white text-center font-bold uppercase text-xs",
					variant === "hearts" && "bg-rose-500",
					variant === "points" && "bg-orange-500"
				)}
			>
				{variant === "hearts" ? "Hearts Left" : "Total XP"}
			</div>
			<div
				className={cn(
					"rounded-2xl bg-white items-center flex justify-center p-6 font-bold text-lg",
					variant === "points" && "text-orange-400",
					variant === "hearts" && "text-rose-500"
				)}
			>
				<Image
					src={isPro ? "/unlimited.svg" : image}
					alt={"Icon"}
					width={30}
					height={30}
					className="mr-1.5"
				/>
				{isPro ? (
					<InfinityIcon className="size-5 stroke-[3]" />
				) : (
					<p>{value}</p>
				)}
			</div>
		</div>
	);
};
