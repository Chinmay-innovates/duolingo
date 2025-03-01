import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import {
	getUnits,
	getUserProgress,
	getCourseProgress,
	getLessonPercentage,
} from "@/db/queries";

import { Header } from "./_components/header";
import { Unit } from "./_components/unit";

const LearnPage = async () => {
	const userProgressData = getUserProgress();
	const unitsData = getUnits();
	const courseProgressData = getCourseProgress();
	const lessonPercentageData = getLessonPercentage();

	const [userProgress, units, courseProgress, lessonPercentage] =
		await Promise.all([
			userProgressData,
			unitsData,
			courseProgressData,
			lessonPercentageData,
		]);

	if (!userProgress || !userProgress.activeCourse || !courseProgress)
		redirect("/courses");

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
					hasActiveSubscription={false}
				/>
			</StickyWrapper>
		</div>
	);
};

export default LearnPage;
