"use server";

import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs";

import db from "@/db/drizzle";
import { HEARTS_TO_DECREMENT } from "@/constants";
import { challengeProgress, challenges, userProgress } from "@/db/schema";
import { getCourseById, getUserProgress } from "@/db/queries";

export const upsertUserProgress = async (courseId: number) => {
	const { userId } = await auth();
	const user = await currentUser();

	if (!userId || !user) return null;

	const course = await getCourseById(courseId);
	if (!course) throw new Error("Course not found");

	// if (!course.units.length || !course.units[0].lessons.length)
	// 	throw new Error("Course has no lessons");

	const existingUserProgresss = await getUserProgress();

	if (existingUserProgresss) {
		await db.update(userProgress).set({
			courseId,
			userName: user.firstName || "User",
			userImageSrc: user.imageUrl || "/mascot.svg",
		});

		revalidatePath("/courses");
		revalidatePath("/learn");
		redirect("/learn");
	}

	await db.insert(userProgress).values({
		userId,
		courseId,
		userName: user.firstName || "User",
		userImageSrc: user.imageUrl || "/mascot.svg",
	});

	revalidatePath("/courses");
	revalidatePath("/learn");
	redirect("/learn");
};

export const reduceHearts = async (challengeId: number) => {
	const { userId } = await auth();
	if (!userId) throw new Error("Unauthorized");

	const currentUserProgress = await getUserProgress();

	const challenge = await db.query.challenges.findFirst({
		where: eq(challenges.id, challengeId),
	});
	if (!challenge) throw new Error("Challenge not found");

	const lessonId = challenge.lessonId;

	if (!currentUserProgress) throw new Error("User progress not found");

	const existingChallengeProgress = await db.query.challengeProgress.findFirst({
		where: and(
			eq(challengeProgress.userId, userId),
			eq(challengeProgress.challengeId, challengeId)
		),
	});

	const isPractice = !!existingChallengeProgress;

	if (isPractice) return { error: "pratice" };

	if (currentUserProgress.hearts === 0) return { error: "hearts" };

	await db
		.update(userProgress)
		.set({
			hearts: Math.max(currentUserProgress.hearts - HEARTS_TO_DECREMENT, 0),
		})
		.where(eq(userProgress.userId, userId));

	revalidatePath("/shop");
	revalidatePath("/learn");
	revalidatePath("/quests");
	revalidatePath("/leaderboard");
	revalidatePath(`/learn/${lessonId}`);
};
