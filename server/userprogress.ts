"use server";

import db from "@/db/drizzle";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs";

import { getCourseById, getUserProgress } from "@/db/queries";
import { userProgress } from "@/db/schema";

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
