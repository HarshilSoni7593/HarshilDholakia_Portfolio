"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LearnPage() {
	const router = useRouter();
	const { user, isAuthenticated, isLoading } = useAuth();

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			router.push("/auth/login");
		}
	}, [isAuthenticated, isLoading, router]);

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Loader2 className="h-8 w-8 animate-spin text-primary" />
			</div>
		);
	}

	if (!isAuthenticated) {
		return null; // Will redirect
	}

	return (
		<main className="py-10">
			<div className="mx-auto max-w-6xl px-4">
				<div className="mb-8">
					<h1 className="text-4xl font-bold mb-2">
						Welcome back, {user?.firstName}! 👋
					</h1>
					<p className="text-muted-foreground">
						Continue your learning journey
					</p>
				</div>

				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					<Card>
						<CardHeader>
							<CardTitle>My Courses</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-muted-foreground">
								You haven't enrolled in any courses yet.
							</p>
							<Button
								variant="outline"
								className="mt-4"
								onClick={() => router.push("/learn/courses")}>
								Browse Courses
							</Button>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Progress</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-muted-foreground">
								Start learning to track your progress!
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Profile</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-sm">
								<strong>Email:</strong> {user?.email}
							</p>
							<p className="text-sm">
								<strong>Role:</strong> {user?.role}
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
	);
}
