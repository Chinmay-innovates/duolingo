import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const font = Quicksand({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "300"],
});

export const metadata: Metadata = {
	title: "Duo Lingo",
	description: "Duolingo - The world's best way to learn a language.",
	icons: {
		icon: "/mascot.svg",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={font.className}>
					<Toaster
						richColors
						expand={true}
						duration={5000}
						closeButton
						theme="light"
					/>

					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
