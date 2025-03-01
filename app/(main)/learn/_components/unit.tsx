import { lessons, units } from "@/db/schema";
import { UnitBanner } from "./unit-banner";
import { LessonButton } from "./lesson-button";

interface UnitProps {
	id: number;
	order: number;
	title: string;
	description: string;
	lessons: (typeof lessons.$inferSelect & {
		completed: boolean;
	})[];
	activeLesson:
		| (typeof lessons.$inferSelect & {
				unit: typeof units.$inferSelect;
		  })
		| undefined;
	progressPrecentage: number;
}

export const Unit = ({
	id,
	title,
	order,
	lessons,
	description,
	activeLesson,
	progressPrecentage,
}: UnitProps) => {
	return (
		<>
			<UnitBanner title={title} description={description} />
			<div className="flex items-center flex-col relative">
				{lessons.map((lesson, index) => {
					const isCurrent = lesson.id === activeLesson?.id;
					const isLocked = !lesson.completed && !isCurrent;

					return (
						<LessonButton
							key={lesson.id}
							id={lesson.id}
							index={index}
							locked={isLocked}
							current={isCurrent}
							totalCount={lessons.length - 1}
							percentage={progressPrecentage}
						/>
					);
				})}
			</div>
		</>
	);
};
