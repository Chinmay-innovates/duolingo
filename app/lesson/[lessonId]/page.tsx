import { getLesson, getUserProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";
import { Quiz } from "../_components/quiz";

interface Params {
	params: {
		lessonId: number;
	};
}
const LessonIdPage = async ({ params }: Params) => {
	const lessonData = getLesson(params.lessonId);
	const userProgressData = getUserProgress();
	const userSubscriptionData = getUserSubscription();

	const [lesson, userProgress, userSubscription] = await Promise.all([
		lessonData,
		userProgressData,
		userSubscriptionData,
	]);

	if (!lesson || !userProgress) redirect("/learn");

	const initPercentage =
		(lesson.challenges.filter((challenge) => challenge.completed).length /
			lesson.challenges.length) *
		100;
	return (
		<Quiz
			initalLessonId={lesson.id}
			initalLessonChallenges={lesson.challenges}
			initalHearts={userProgress.hearts}
			initalPercentage={initPercentage}
			userSubscription={userSubscription}
		/>
	);
};

export default LessonIdPage;
