import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { redirect } from "next/navigation";

import { getUnits, getUserProgress } from "@/db/queries";

import { Header } from "./_components/header";

const LearnPage = async () => {
	const userProgressData = getUserProgress();
	const unitsData = getUnits();

	const [userProgress, units] = await Promise.all([
		userProgressData,
		unitsData,
	]);

	if (!userProgress || !userProgress.activeCourse) redirect("/courses");

	return (
		<div className="flex gap-[48px] px-6">
			<FeedWrapper>
				<Header title={userProgress.activeCourse.title} />
				{units.map((unit) => (
					<div className="mb-10" key={unit.id}>
						{JSON.stringify(unit)}
					</div>
				))}
			</FeedWrapper>
			<StickyWrapper>
				<UserProgress
					activeCourse={userProgress.activeCourse}
					hearts={userProgress.hearts}
					points={userProgress.points}
					hasActiveSubscription={false}
				/>
			</StickyWrapper>
		</div>
	);
};

export default LearnPage;
