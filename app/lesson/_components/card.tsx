import Image from "next/image";
import { useCallback } from "react";
import { useAudio, useKey } from "react-use";

import { cn } from "@/lib/utils";
import { challenges } from "@/db/schema";

import { ChallengeStatus } from "./challenge";
interface CardProps {
	type: (typeof challenges.$inferSelect)["type"];
	id: number;
	status?: ChallengeStatus;
	text: string;
	disabled?: boolean;
	shortcut: string;
	imageSrc: string | null;
	audioSrc: string | null;
	onClick: () => void;
	selected?: boolean;
}

export const Card = ({
	type,
	id,
	status,
	text,
	disabled,
	shortcut,
	imageSrc,
	audioSrc,
	onClick,
	selected,
}: CardProps) => {
	const [audio, _, controls] = useAudio({
		src: audioSrc ? audioSrc : "",
		loop: false,
	});
	const handleClick = useCallback(() => {
		if (disabled) return;

		controls.play();
		onClick();
	}, [disabled, controls, onClick]);

	useKey(shortcut, handleClick, { event: "keydown" }, [handleClick]);
	return (
		<div
			onClick={handleClick}
			className={cn(
				"h-full border-2 rounded-xl border-b-4 hover:bg-black/5 p-4 lg:p-6 cursor-pointer active:border-b-2",
				selected && "border-sky-300 bg-sky-100 hover:bg-sky-100",
				selected &&
					status === "CORRECT" &&
					"border-green-300 bg-green-100 hover:bg-green-100",
				selected &&
					status === "WRONG" &&
					"border-rose-300 bg-rose-100 hover:bg-rose-100",
				disabled && "pointer-events-none opacity-50 hover:bg-white",
				type === "ASSIST" && "lg:p-3 w-full"
			)}
		>
			{audio}
			{imageSrc && (
				<div className="relative aspect-square h-[100px] mb-4 w-full flex items-center justify-center">
					<Image src={imageSrc} alt={text} height={120} width={120} />
				</div>
			)}
			<div
				className={cn(
					"flex items-center justify-between mt-4",
					type === "ASSIST" && "flex-row-reverse"
				)}
			>
				{type === "ASSIST" && <div />}
				<p
					className={cn(
						"text-neutral-600 text-sm lg:text-base lg:mt-0 font-semibold",
						selected && "text-sky-500",
						selected && status === "CORRECT" && "text-green-500",
						selected && status === "WRONG" && "text-rose-500"
					)}
				>
					{text}
				</p>
				<div
					className={cn(
						"lg:size-[30px] size-[20px] border-2 flex items-center justify-center rounded-lg text-neutral-400 lg:text-[15px] text-xs font-semibold",
						selected && "border-sky-300 text-sky-500",
						selected &&
							status === "CORRECT" &&
							"border-green-500 text-green-500",
						selected && status === "WRONG" && "border-rose-500 text-rose-500"
					)}
				>
					{shortcut}
				</div>
			</div>
		</div>
	);
};
