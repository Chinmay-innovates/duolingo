import db from "@/db/drizzle";
import { challenges } from "@/db/schema";
import { isAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

interface IParams {
	params: {
		challengeId: number;
	};
}
export const GET = async (_request: Request, { params }: IParams) => {
	if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

	const data = await db.query.challenges.findFirst({
		where: eq(challenges.id, params.challengeId),
	});

	return NextResponse.json(data);
};
export const PUT = async (request: Request, { params }: IParams) => {
	if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

	const body = await request.json();

	const data = await db
		.update(challenges)
		.set(body)
		.where(eq(challenges.id, params.challengeId))
		.returning();

	return NextResponse.json(data[0]);
};
export const DELETE = async (_request: Request, { params }: IParams) => {
	if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

	const data = await db
		.delete(challenges)
		.where(eq(challenges.id, params.challengeId))
		.returning();

	return NextResponse.json(data[0]);
};
