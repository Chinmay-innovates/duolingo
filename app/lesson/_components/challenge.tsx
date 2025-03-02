import { challengeOptions, challenges } from "@/db/schema";
import { cn } from "@/lib/utils";
import { Card } from "./card";

export type ChallengeStatus = "CORRECT" | "WRONG" | "NONE";

interface ChallengeProps {
	options: (typeof challengeOptions.$inferSelect)[];
	type: (typeof challenges.$inferSelect)["type"];
	status: ChallengeStatus;
	disabled?: boolean;
	selectedOption?: number;
	onSelect: (id: number) => void;
}

export const Challenge = ({
	onSelect,
	options,
	status,
	type,
	disabled,
	selectedOption,
}: ChallengeProps) => {
	return (
		<div
			className={cn(
				"grid gap-2",
				type === "ASSIST" && "grid-cols-1",
				type === "SELECT" &&
					"grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))]"
			)}
		>
			{options.map((option, i) => (
				<Card
					type={type}
					id={option.id}
					key={option.id}
					status={status}
					text={option.text}
					disabled={disabled}
					shortcut={`${i + 1}`}
					imageSrc={option.imageSrc}
					audioSrc={option.audioSrc}
					onClick={() => onSelect(option.id)}
					selected={selectedOption === option.id}
				/>
			))}
		</div>
	);
};
