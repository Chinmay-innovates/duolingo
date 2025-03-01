"use client";

import Link from "next/link";
import { CheckIcon, CrownIcon, StarIcon } from "lucide-react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

import "react-circular-progressbar/dist/styles.css";
interface LessonButtonProps {
	id: number;
	index: number;
	totalCount: number;
	locked?: boolean;
	current?: boolean;
	percentage: number;
}

export const LessonButton = ({
	id,
	index,
	percentage,
	totalCount,
	current,
	locked,
}: LessonButtonProps) => {
	const cycleLegth = 8;
	const cycleIndex = index % cycleLegth;

	// Calculate indentation level
	const indentationLevel =
		cycleIndex <= 2
			? cycleIndex
			: cycleIndex <= 6
			? 4 - cycleIndex
			: cycleIndex - 8;

	const rightPosition = indentationLevel * 55;

	//Button states
	const isFirst = index === 0;
	const isLast = index === totalCount;
	const isCompleted = !current && !locked;

	const Icon = isCompleted ? CheckIcon : isLast ? CrownIcon : StarIcon;
	const href = isCompleted ? `/lesson/${id}` : `/lesson`;

	const buttonProps = {
		variant: (locked ? "locked" : "secondary") as ButtonProps["variant"],
		className: "size-[70px] border-b-8",
		size: "rounded" as ButtonProps["size"],
	};

	const iconClassName = cn(
		"size-10",
		locked
			? "fill-neutral-400 text-neutral-400 stroke-neutral-400"
			: "fill-primary-foreground text-primary-foreground",
		isCompleted && "fill-none stroke-[4]"
	);

	return (
		<Link
			href={href}
			aria-disabled={locked}
			style={{ pointerEvents: locked ? "none" : "auto" }}
		>
			<div
				className="relative"
				style={{
					right: `${rightPosition}px`,
					marginTop: isFirst && !isCompleted ? 60 : 24,
				}}
			>
				{current ? (
					<div className="size-[102px] relative">
						<div className="absolute -top-6 left-2.5 px-3 py-2.5 border-2 font-bold uppercase text-green-500 rounded-xl animate-bounce tracking-wide z-10">
							Start
							<div
								className="absolute left-1/2 -bottom-2 size-0
								border-x-8 border-x-transparent border-t-8 -translate-x-1/2"
							/>
						</div>
						<CircularProgressbarWithChildren
							value={Number.isNaN(percentage) ? 0 : percentage}
							styles={{
								path: {
									stroke: "#4ADE80",
								},
								trail: {
									stroke: "#E5E7EB",
								},
							}}
						>
							<Button {...buttonProps}>
								<Icon className={iconClassName} />
							</Button>
						</CircularProgressbarWithChildren>
					</div>
				) : (
					<Button {...buttonProps}>
						<Icon className={iconClassName} />
					</Button>
				)}
			</div>
		</Link>
	);
};
