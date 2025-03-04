import db from "@/db/drizzle";
import { units } from "@/db/schema";
import { isAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

interface IParams {
	params: {
		unitId: number;
	};
}
export const GET = async (_request: Request, { params }: IParams) => {
	if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

	const data = await db.query.units.findFirst({
		where: eq(units.id, params.unitId),
	});

	return NextResponse.json(data);
};
export const PUT = async (request: Request, { params }: IParams) => {
	if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

	const body = await request.json();

	const data = await db
		.update(units)
		.set(body)
		.where(eq(units.id, params.unitId))
		.returning();

	return NextResponse.json(data[0]);
};
export const DELETE = async (_request: Request, { params }: IParams) => {
	if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });

	const data = await db
		.delete(units)
		.where(eq(units.id, params.unitId))
		.returning();

	return NextResponse.json(data[0]);
};
