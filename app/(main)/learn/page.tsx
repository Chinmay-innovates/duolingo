import { redirect } from "next/navigation";

import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import {
	getUnits,
	getUserProgress,
	getCourseProgress,
	getLessonPercentage,
	getUserSubscription,
} from "@/db/queries";

import { Header } from "./_components/header";
import { Unit } from "./_components/unit";

const LearnPage = async () => {
	const userProgressData = getUserProgress();
	const unitsData = getUnits();
	const courseProgressData = getCourseProgress();
	const lessonPercentageData = getLessonPercentage();
	const userSubscriptionData = getUserSubscription();

	const [
		userProgress,
		units,
		courseProgress,
		lessonPercentage,
		userSubscription,
	] = await Promise.all([
		userProgressData,
		unitsData,
		courseProgressData,
		lessonPercentageData,
		userSubscriptionData,
	]);

	if (!userProgress || !userProgress.activeCourse || !courseProgress)
		redirect("/courses");

	const isPro = !!userSubscription?.isActive;
	return (
		<div className="flex gap-[48px] px-6">
			<FeedWrapper>
				<Header title={userProgress.activeCourse.title} />
				{units.map((unit) => (
					<div className="mb-10" key={unit.id}>
						<Unit
							id={unit.id}
							order={unit.order}
							title={unit.title}
							lessons={unit.lessons}
							description={unit.description}
							activeLesson={courseProgress.activeLesson}
							progressPrecentage={lessonPercentage}
						/>
					</div>
				))}
			</FeedWrapper>
			<StickyWrapper>
				<UserProgress
					activeCourse={userProgress.activeCourse}
					hearts={userProgress.hearts}
					points={userProgress.points}
					hasActiveSubscription={isPro}
				/>
				{!isPro && <Promo />}
				<Quests points={userProgress.points} />
			</StickyWrapper>
		</div>
	);
};

export default LearnPage;
