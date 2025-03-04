import db from "@/db/drizzle";
import { challengeOptions } from "@/db/schema";
import { isAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

interface IParams {
	params: {
		optionId: number;
	};
}
export const GET = async (_request: Request, { params }: IParams) => {
	if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

	const data = await db.query.challengeOptions.findFirst({
		where: eq(challengeOptions.id, params.optionId),
	});

	return NextResponse.json(data);
};
export const PUT = async (request: Request, { params }: IParams) => {
	if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

	const body = await request.json();

	const data = await db
		.update(challengeOptions)
		.set(body)
		.where(eq(challengeOptions.id, params.optionId))
		.returning();

	return NextResponse.json(data[0]);
};
export const DELETE = async (_request: Request, { params }: IParams) => {
	if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

	const data = await db
		.delete(challengeOptions)
		.where(eq(challengeOptions.id, params.optionId))
		.returning();

	return NextResponse.json(data[0]);
};
