import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { quests } from "@/constants";

export const Quests = ({ points }: { points: number }) => {
	return (
		<div className="border-2 rounded-xl p-4 space-y-4">
			<div className="flex items-center justify-between w-full space-y-2">
				<h3 className="font-bold text-lg">Quests</h3>
				<Link href={"/quests"}>
					<Button size={"sm"} variant={"primaryOutline"}>
						View all
					</Button>
				</Link>
			</div>
			<ul className="w-full space-y-4">
				{quests.map((quest) => {
					const progress = (points / quest.value) * 100;
					return (
						<div
							key={quest.value}
							className="flex items-center w-full pb-4 gap-x-3"
						>
							<Image src={"/points.svg"} alt="Points" width={40} height={40} />
							<div className="flex flex-col w-full gap-y-2">
								<p className="text-neutral-800 text-sm font-bold">
									{quest.title}
								</p>
								<Progress value={progress} className="h-2" />
							</div>
						</div>
					);
				})}
			</ul>
		</div>
	);
};
