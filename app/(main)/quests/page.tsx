import { FeedWrapper } from "@/components/feed-wrapper";
import { Promo } from "@/components/promo";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Progress } from "@/components/ui/progress";
import { UserProgress } from "@/components/user-progress";
import { quests } from "@/constants";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";

const QuestsPage = async () => {
	const userProgressData = getUserProgress();
	const userSubscriptionData = getUserSubscription();
	const [userProgress, userSubscription] = await Promise.all([
		userProgressData,
		userSubscriptionData,
	]);

	if (!userProgress || !userProgress.activeCourse) redirect("/learn");

	const isPro = !!userSubscription?.isActive;
	return (
		<div className="flex flex-row-reverse gap-[48px] px-6">
			<StickyWrapper>
				<UserProgress
					activeCourse={userProgress.activeCourse}
					hearts={userProgress.hearts}
					points={userProgress.points}
					hasActiveSubscription={isPro}
				/>
				{!isPro && <Promo />}
			</StickyWrapper>
			<FeedWrapper>
				<div className="w-full flex flex-col items-center">
					<Image
						src={"/quests.svg"}
						alt={"Quests"}
						width={90}
						height={90}
						className="select-none"
					/>
					<h1 className="text-center font-bold text-2xl text-neutral-800 my-6 ">
						Quests
					</h1>
					<p className="text-muted-foreground text-center text-lg mb-6">
						Complete quests by earning points.
					</p>
					<ul className="w-full">
						{quests.map((quest) => {
							const progress = (userProgress.points / quest.value) * 100;
							return (
								<div
									key={quest.value}
									className="flex items-center w-full p-4 gap-x-4 border-t-2"
								>
									<Image
										src={"/points.svg"}
										alt="Points"
										width={40}
										height={40}
									/>
									<div className="flex flex-col w-full gap-y-2">
										<p className="text-neutral-800 text-xl font-bold">
											{quest.title}
										</p>
										<Progress value={progress} className="h-3" />
									</div>
								</div>
							);
						})}
					</ul>
				</div>
			</FeedWrapper>
		</div>
	);
};

export default QuestsPage;
