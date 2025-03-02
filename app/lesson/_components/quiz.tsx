"use client";

import { useState, useTransition } from "react";
import Confetti from "react-confetti";
import { challengeOptions, challenges } from "@/db/schema";

import { Header } from "./header";
import { Footer } from "./footer";
import { QuestionBubble } from "./question-bubble";
import { Challenge, ChallengeStatus } from "./challenge";
import { upsertChallengeProgress } from "@/server/challengeprogress";
import { useHeartsModal } from "@/store/use-hearts-modal";
import {
	HEARTS_TO_DECREMENT,
	MAX_HEARTS,
	POINTS_TO_INCREMENT,
} from "@/constants";
import { toast } from "sonner";
import { reduceHearts } from "@/server/userprogress";
import { useAudio, useMount, useWindowSize } from "react-use";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ResultCard } from "./result-card";
import { usePracticeModal } from "@/store/use-practice-modal";

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
	const { open: openHeartsModal } = useHeartsModal();
	const { open: openPracticeModal } = usePracticeModal();

	useMount(() => {
		if (initalPercentage === 100) openPracticeModal();
	});

	const [correctAudio, _c, correctControls] = useAudio({ src: "/correct.wav" });
	const [wrongAudio, _w, wrongControls] = useAudio({ src: "/incorrect.wav" });

	const [hearts, setHearts] = useState(initalHearts);
	const [percentage, setPercentage] = useState(() => {
		return initalPercentage === 100 ? 0 : initalPercentage;
	});

	const [lessonId] = useState(initalLessonId);
	const [challenges] = useState(initalLessonChallenges);

	const [activeIndex, setActiveIndex] = useState(() => {
		const index = initalLessonChallenges.findIndex(
			(challenge) => !challenge.completed
		);

		return index === -1 ? 0 : index;
	});

	const [selectedOption, setSelectdOption] = useState<number>();
	const [status, setStatus] = useState<ChallengeStatus>("NONE");
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const challenge = challenges[activeIndex];
	const options = challenge?.challengeOptions ?? [];

	const onNext = () => {
		setActiveIndex((prevIndex) => prevIndex + 1);
	};

	const onSelect = (id: number) => {
		if (status !== "NONE") return;

		setSelectdOption(id);
	};

	const onContinue = () => {
		if (!selectedOption) return;

		if (status === "WRONG") {
			setStatus("NONE");
			setSelectdOption(undefined);
			return;
		}

		if (status === "CORRECT") {
			onNext();
			setStatus("NONE");
			setSelectdOption(undefined);
			return;
		}

		const correctOption = options.find((option) => option.correct);
		if (!correctOption) return;

		if (correctOption.id === selectedOption) {
			startTransition(() => {
				upsertChallengeProgress(challenge.id)
					.then((response) => {
						if (response?.error === "hearts") {
							openHeartsModal();
							return;
						}
						setStatus("CORRECT");
						correctControls.play();
						setPercentage((prev) => prev + 100 / challenges.length);

						// This is a practice
						if (initalPercentage === 100) {
							setHearts((prev) => Math.min(prev + 1, MAX_HEARTS));
						}
					})
					.catch(() => toast.error("Something went wrong. Please try again"));
			});
		} else {
			startTransition(() => {
				reduceHearts(challenge.id)
					.then((response) => {
						if (response?.error === "hearts") {
							openHeartsModal();
							return;
						}
						setStatus("WRONG");
						wrongControls.play();
						if (!response?.error) {
							setHearts((prev) => Math.max(prev - HEARTS_TO_DECREMENT, 0));
						}
					})
					.catch(() => toast.error("Something went wrong. Please try again"));
			});
		}
	};

	const { width, height } = useWindowSize();
	const [finishAudio] = useAudio({ src: "/finish.mp3", autoPlay: true });
	if (!challenge)
		return (
			<>
				{finishAudio}
				<Confetti
					width={width}
					height={height}
					recycle={false}
					numberOfPieces={500}
					tweenDuration={10000}
				/>
				<div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
					<Image
						src="/finish.svg"
						alt="Finish"
						className="hidden lg:block"
						height={100}
						width={100}
					/>
					<Image
						src="/finish.svg"
						alt="Finish"
						className="block lg:hidden"
						height={50}
						width={50}
					/>
					<h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
						Great job! <br /> You&apos;ve completed the lesson.
					</h1>
					<div className="flex items-center gap-x-4 w-full">
						<ResultCard
							variant="points"
							value={challenges.length * POINTS_TO_INCREMENT}
						/>
						<ResultCard variant="hearts" value={hearts} />
					</div>
				</div>
				<Footer
					lessonId={lessonId}
					onCheck={() => router.push("/learn")}
					status="COMPLETED"
				/>
			</>
		);

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
			{correctAudio}
			{wrongAudio}
			<div className="flex-1">
				<div className="h-full flex items-center justify-center">
					<div className="lg:min-h-[300px] lg:min-w-[300px] px-6 lg:px-0 flex flex-col gap-y-12 mt-8">
						<h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
							{title}
						</h1>
						<div className="-mt-5">
							{challenge.type === "ASSIST" && (
								<QuestionBubble question={challenge.question} />
							)}
							<Challenge
								options={options}
								onSelect={onSelect}
								status={status}
								selectedOption={selectedOption}
								disabled={isPending}
								type={challenge.type}
							/>
						</div>
					</div>
				</div>
			</div>
			<Footer
				disabled={isPending || !selectedOption}
				status={status}
				onCheck={onContinue}
			/>
		</>
	);
};
