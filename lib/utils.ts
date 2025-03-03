import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
	return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export const getRandomColor = () => {
	const colors = [
		"bg-rose-500",
		"bg-blue-500",
		"bg-yellow-500",
		"bg-purple-500",
		"bg-pink-500",
		"bg-indigo-500",
		"bg-teal-500",
		"bg-orange-500",
		"bg-lime-500",
		"bg-amber-500",
		"bg-emerald-500",
		"bg-cyan-500",
		"bg-fuchsia-500",
		"bg-rose-500",
		"bg-sky-500",
		"bg-violet-500",
	];
	return colors[Math.floor(Math.random() * colors.length)];
};