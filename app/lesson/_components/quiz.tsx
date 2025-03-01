"use client";

import { challengeOptions, challenges } from "@/db/schema";
import { useState } from "react";
import { Header } from "./header";

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
	return (
		<>
			<Header
				hearts={hearts}
				percentage={percentage}
				hasActiveSubscription={!!userSubscription?.isActive}
			/>
		</>
	);
};
