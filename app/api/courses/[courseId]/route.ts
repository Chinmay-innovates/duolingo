import db from "@/db/drizzle";
import { courses } from "@/db/schema";
import { isAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

interface IParams {
	params: {
		courseId: number;
	};
}
export const GET = async (_request: Request, { params }: IParams) => {
	if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

	const data = await db.query.courses.findFirst({
		where: eq(courses.id, params.courseId),
	});

	return NextResponse.json(data);
};
export const PUT = async (request: Request, { params }: IParams) => {
	if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

	const body = await request.json();

	const data = await db
		.update(courses)
		.set(body)
		.where(eq(courses.id, params.courseId))
		.returning();

	return NextResponse.json(data[0]);
};
export const DELETE = async (_request: Request, { params }: IParams) => {
	if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

	const data = await db
		.delete(courses)
		.where(eq(courses.id, params.courseId))
		.returning();

	return NextResponse.json(data[0]);
};
