import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
	try {
		console.log("Seeding database...😸");

		await db.delete(schema.courses);
		await db.delete(schema.userProgress);
		await db.delete(schema.units);
		await db.delete(schema.lessons);
		await db.delete(schema.challenges);
		await db.delete(schema.challengeOptions);
		await db.delete(schema.challengeProgress);

		await db.insert(schema.courses).values([
			{
				id: 1,
				title: "Spanish",
				imageSrc: "/es.svg",
			},
			{
				id: 2,
				title: "Japanese",
				imageSrc: "/jp.svg",
			},
			{
				id: 3,
				title: "French",
				imageSrc: "/fr.svg",
			},
			{
				id: 4,
				title: "Croatian",
				imageSrc: "/hr.svg",
			},
		]);
		console.log("Inserted 4 courses ✌️");

		await db.insert(schema.units).values([
			{
				id: 1,
				courseId: 1,
				title: "Unit 1",
				description: "Learn the basics of Spanish",
				order: 1,
			},
		]);
		console.log("Inserted 1 unit ✌️");

		await db.insert(schema.lessons).values([
			{
				id: 1,
				order: 1,
				unitId: 1,
				title: "Nouns",
			},
		]);
		console.log("Inserted 1 lesson ✌️");

		await db.insert(schema.challenges).values([
			{
				lessonId: 1, // Nouns
				type: "SELECT",
				order: 1,
				question: 'Which one of these is the "the man"?',
			},
			{
				lessonId: 1, // Nouns
				type: "ASSIST",
				order: 2,
				question: '"the man"',
			},
			{
				lessonId: 1, // Nouns
				type: "SELECT",
				order: 3,
				question: 'Which one of these is the "the robot"?',
			},
		]);

		await db.insert(schema.challengeOptions).values([
			// Challenge 1: "Which one of these is 'the man'?"
			{
				challengeId: 1,
				imageSrc: "/man.svg",
				audioSrc: "/es_man.mp3",
				text: "el hombre",
				correct: true,
			},
			{
				challengeId: 1,
				imageSrc: "/woman.svg",
				audioSrc: "/es_woman.mp3",
				text: "la mujer",
				correct: true,
			},
			{
				challengeId: 1,
				imageSrc: "/robot.svg",
				audioSrc: "/es_robot.mp3",
				text: "el robot",
				correct: true,
			},
			// Challenge 2: "Assist - 'the man'"
			{
				challengeId: 2,
				imageSrc: "/man.svg",
				audioSrc: "/es_man.mp3",
				text: "el hombre",
				correct: true,
			},
			{
				challengeId: 2,
				imageSrc: "/woman.svg",
				audioSrc: "/es_woman.mp3",
				text: "la mujer",
				correct: false,
			},
			{
				challengeId: 2,
				imageSrc: "/robot.svg",
				audioSrc: "/es_man.mp3",
				text: "el robot",
				correct: false,
			},

			// Challenge 3: "Which one of these is 'the robot'?"
			{
				challengeId: 3,
				imageSrc: "/robot.svg",
				audioSrc: "/es_robot.mp3",
				text: "el robot",
				correct: true,
			},
			{
				challengeId: 3,
				imageSrc: "/man.svg",
				audioSrc: "/es_man.mp3",
				text: "el hombre",
				correct: false,
			},
			{
				challengeId: 3,
				imageSrc: "/woman.svg",
				audioSrc: "/es_woman.mp3",
				text: "la mujer",
				correct: false,
			},
		]);
		console.log("Inserted 3 challenges with options ✌️");

		console.log("Seeding finished! 🚀");
	} catch (error) {
		console.error(error);
		throw new Error("Failed to seed the database");
	}
};

main();
