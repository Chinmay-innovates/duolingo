import { getCourses, getUserProgress } from "@/db/queries";
import { List } from "./_components/list";
import { redirect } from "next/navigation";

const CoursesPage = async () => {
	const coursesData = getCourses();
	const userProgressData = getUserProgress();

	const [courses, userProgress] = await Promise.all([
		coursesData,
		userProgressData,
	]);

	return (
		<div className="h-full mx-w-[912px] px-3 mx-auto">
			<h1 className="text-2xl font-bold text-neutral-700">Language Courses</h1>
			<List courses={courses} activeCourseId={userProgress?.courseId} />
		</div>
	);
};

export default CoursesPage;
