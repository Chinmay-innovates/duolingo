"use client";

import { challengeOptions, challenges } from "@/db/schema";
import { useState } from "react";
import { Header } from "./header";
import { QuestionBubble } from "./question-bubble";
import { Challenge } from "./challenge";

interface QuizProps {
	initalHearts: number;
	initalPercentage: number;
	initalLessonId: number;
	initalLessonChallenges: (typeof challenges.$inferSelect & {
		completed: boolean;
		challengeOptions: (typeof challengeOptions.$inferSelect)[];
	})[];
	userSubscription: any;
}

export const Quiz = ({
	initalHearts,
	initalLessonId,
	initalPercentage,
	userSubscription,
	initalLessonChallenges,
}: QuizProps) => {
	const [hearts, setHearts] = useState(initalHearts);
	const [percentage, setPercentage] = useState(initalPercentage);
	const [challenges] = useState(initalLessonChallenges);
	const [activeIndex, setActiveIndex] = useState(() => {
		const index = initalLessonChallenges.findIndex(
			(challenge) => !challenge.completed
		);

		return index === -1 ? 0 : index;
	});
	const challenge = challenges[activeIndex];
	const options = challenge.challengeOptions ?? [];

	const title =
		challenge.type === "ASSIST"
			? "Select the correct meaning"
			: challenge.question;
	return (
		<>
			<Header
				hearts={hearts}
				percentage={percentage}
				hasActiveSubscription={!!userSubscription?.isActive}
			/>
			<div className="flex-1">
				<div className="h-full flex items-center justify-center">
					<div className="lg:min-h-[300px] lg:min-w-[300px] px-6 lg:px-0 flex flex-col gap-y-12">
						<h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
							{title}
						</h1>
						<div>
							{challenge.type === "ASSIST" && (
								<QuestionBubble question={challenge.question} />
							)}
							<Challenge
								options={options}
								onSelect={() => {}}
								status="NONE"
								selectedOption={undefined}
								disabled={false}
								type={challenge.type}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
