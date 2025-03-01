"use client";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { courses, userProgress } from "@/db/schema";
import { upsertUserProgress } from "@/server/userprogress";

import { Card } from "./card";

interface ListProps {
	courses: (typeof courses.$inferSelect)[];
	activeCourseId?: (typeof userProgress.$inferSelect)["courseId"];
}

export const List = ({ activeCourseId, courses }: ListProps) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const handleCourseClick = (courseId: number) => {
		if (isPending) return;
		if (activeCourseId === courseId) return router.push("/learn");

		startTransition(() => {
			upsertUserProgress(courseId).catch(() =>
				toast.error("Something went wrong")
			);
		});
	};
	return (
		<div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
			{courses.map((course) => (
				<Card
					key={course.id}
					id={course.id}
					title={course.title}
					imageSrc={course.imageSrc}
					onClick={handleCourseClick}
					disabled={isPending}
					active={course.id === activeCourseId}
				/>
			))}
		</div>
	);
};
