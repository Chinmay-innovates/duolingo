import db from "@/db/drizzle";
import { lessons } from "@/db/schema";
import { isAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

interface IParams {
	params: {
		lessonId: number;
	};
}
export const GET = async (_request: Request, { params }: IParams) => {
	if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

	const data = await db.query.lessons.findFirst({
		where: eq(lessons.id, params.lessonId),
	});

	return NextResponse.json(data);
};
export const PUT = async (request: Request, { params }: IParams) => {
	if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

	const body = await request.json();

	const data = await db
		.update(lessons)
		.set(body)
		.where(eq(lessons.id, params.lessonId))
		.returning();

	return NextResponse.json(data[0]);
};
export const DELETE = async (_request: Request, { params }: IParams) => {
	if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

	const data = await db
		.delete(lessons)
		.where(eq(lessons.id, params.lessonId))
		.returning();

	return NextResponse.json(data[0]);
};
