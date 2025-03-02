import { useKey, useMedia } from "react-use";

import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { ChallengeStatus } from "./challenge";

interface FooterProps {
	onCheck: () => void;
	status: ChallengeStatus;
	disabled?: boolean;
	lessonId?: boolean;
}

export const Footer = ({
	onCheck,
	status,
	disabled,
	lessonId,
}: FooterProps) => {
	useKey("Enter", onCheck, { event: "keydown" }, [onCheck]);
	const isMobile = useMedia("(max-width: 1024px)");

	const buttonTextMap = {
		NONE: "Check",
		CORRECT: "Next",
		WRONG: "Retry",
		COMPLETED: "Continue",
	};

	const statusContentMap = {
		NONE: null,
		CORRECT: (
			<div className="text-green-500 font-bold text-base lg:text-2xl flex items-center">
				<CheckCircleIcon className="size-6 lg:size-10 mr-4" />
				Nicely done!
			</div>
		),
		WRONG: (
			<div className="text-rose-500 font-bold text-base lg:text-2xl flex items-center">
				<XCircleIcon className="size-6 lg:size-10 mr-4" />
				Try again.
			</div>
		),
		COMPLETED: (
			<Button
				variant="default"
				size={isMobile ? "sm" : "lg"}
				onClick={() => (window.location.href = `/lesson/${lessonId}`)}
			>
				Practice again
			</Button>
		),
	};

	return (
		<footer
			className={cn(
				"lg:h[140px] h-[200px] border-t-2 mt-4",
				status === "CORRECT" && "border-transparent bg-green-100",
				status === "WRONG" && "border-transparent bg-rose-100"
			)}
		>
			<div className="max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10">
				{statusContentMap[status]}
				<Button
					disabled={disabled}
					className="ml-auto"
					onClick={onCheck}
					size={isMobile ? "sm" : "lg"}
					variant={status === "WRONG" ? "danger" : "secondary"}
				>
					{buttonTextMap[status]}
				</Button>
			</div>
		</footer>
	);
};
