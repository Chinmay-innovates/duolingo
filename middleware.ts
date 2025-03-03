import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
	publicRoutes: ["/", "/api/webhook/stripe"],
	ignoredRoutes: [
		"/es_man.mp3",
		"/es_woman.mp3",
		"/es_robot.mp3",
		"/es_girl.mp3",
		"/es_boy.mp3",
		"/es_zombie.mp3",
		"/correct.wav",
		"/incorrect.wav",
		"/finish.wav",
	],
});

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
	],
};
