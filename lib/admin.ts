import { auth } from "@clerk/nextjs";

const adminIds = ["user_2tgKP0LKCbYriJePEn5TIQ2JxJ0"];
export const isAdmin = () => {
	const { userId } = auth();
	if (!userId) return false;
	return userId && adminIds.includes(userId);
};
