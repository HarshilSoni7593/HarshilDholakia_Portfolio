import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ThemedLayout } from "./theme-layout";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Harshil Dholakia - Full-stack Developer",
	description:
		"Portfolio of a Full-Stack Developer (Next.js, TypeScript, .NET).",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className} suppressHydrationWarning>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange>
					<AuthProvider>
						<ThemedLayout>{children}</ThemedLayout>
						<Toaster />
					</AuthProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
