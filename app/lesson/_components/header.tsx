import { Progress } from "@/components/ui/progress";
import { useExitModal } from "@/store/use-exit-modal";
import { InfinityIcon, XIcon } from "lucide-react";
import Image from "next/image";

interface HeaderProps {
	hearts: number;
	percentage: number;
	hasActiveSubscription: boolean;
}

export const Header = ({
	hasActiveSubscription,
	hearts,
	percentage,
}: HeaderProps) => {
	const { open } = useExitModal();

	return (
		<header className="lg:pt-[50px] pt-[30px] px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full">
			<XIcon
				onClick={open}
				className="text-slate-500 hover:opacity-75 cursor-pointer transition"
			/>
			<Progress value={percentage} />
			<div className="text-rose-500 flex items-center font-bold">
				<Image
					src={hasActiveSubscription ? "/unlimited.svg" : "/heart.svg"}
					alt="Heart"
					height={28}
					width={28}
					className="mr-2"
				/>
				{hasActiveSubscription ? (
					<InfinityIcon className="size-6 stroke-[3] shrink-0" />
				) : (
					hearts
				)}
			</div>
		</header>
	);
};
