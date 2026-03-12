"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { enrollmentApi, EnrollmentDto } from "@/lib/api";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import {
	BookOpen,
	Clock,
	Loader2,
	GraduationCap,
	ArrowRight,
	CheckCircle2,
	TrendingUp,
} from "lucide-react";

export default function MyCoursesPage() {
	const router = useRouter();
	const { token, isAuthenticated, isLoading: authLoading } = useAuth();
	const [enrollments, setEnrollments] = useState<EnrollmentDto[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!authLoading && !isAuthenticated) {
			router.push("/login");
			return;
		}

		if (token) {
			loadEnrollments();
		}
	}, [token, isAuthenticated, authLoading, router]);

	const loadEnrollments = async () => {
		if (!token) return;

		try {
			setIsLoading(true);
			setError(null);
			const data = await enrollmentApi.getMyCourses(token);
			setEnrollments(data);
		} catch (err) {
			setError(error || "Failed to load your courses");
		} finally {
			setIsLoading(false);
		}
	};

	const getLevelColor = (level: string) => {
		switch (level) {
			case "Beginner":
				return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20";
			case "Intermediate":
				return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20";
			case "Advanced":
				return "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20";
			default:
				return "";
		}
	};

	const formatDuration = (minutes: number) => {
		if (minutes < 60) return `${minutes}m`;
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
	};

	if (authLoading || isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center space-y-4">
					<Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
					<p className="text-muted-foreground">Loading your courses...</p>
				</div>
			</div>
		);
	}

	return (
		<main className="py-10">
			<div className="mx-auto max-w-7xl px-4">
				{/* Header */}
				<div className="mb-12">
					<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
						<GraduationCap className="w-8 h-8 text-primary" />
					</div>
					<h1 className="text-4xl font-bold mb-3">My Courses</h1>
					<p className="text-xl text-muted-foreground">
						Continue your learning journey
					</p>
				</div>

				{/* Error State */}
				{error && (
					<Card className="border-red-500/50 bg-red-500/10 mb-8">
						<CardContent className="pt-6">
							<p className="text-red-600 dark:text-red-400">{error}</p>
						</CardContent>
					</Card>
				)}

				{/* Empty State */}
				{enrollments.length === 0 && (
					<Card className="border-dashed">
						<CardContent className="pt-12 pb-12 text-center">
							<BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
							<h3 className="text-xl font-semibold mb-2">
								No enrolled courses yet
							</h3>
							<p className="text-muted-foreground mb-6">
								Start learning by enrolling in a course
							</p>
							<Button asChild size="lg">
								<Link href="/learn/courses">
									Browse Courses
									<ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</Button>
						</CardContent>
					</Card>
				)}

				{/* Courses Grid */}
				{enrollments.length > 0 && (
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{enrollments.map((enrollment) => (
							<Card
								key={enrollment.id}
								className="group hover:shadow-lg transition-all duration-300 flex flex-col">
								{/* Thumbnail */}
								{enrollment.courseThumbnailUrl && (
									<div className="relative h-48 overflow-hidden rounded-t-lg bg-muted">
										<img
											src={enrollment.courseThumbnailUrl}
											alt={enrollment.courseTitle}
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
										/>
										<Badge
											className={`absolute top-3 right-3 ${getLevelColor(
												enrollment.courseLevel,
											)}`}>
											{enrollment.courseLevel}
										</Badge>
										{enrollment.completedAt && (
											<Badge className="absolute top-3 left-3 bg-green-600">
												<CheckCircle2 className="h-3 w-3 mr-1" />
												Completed
											</Badge>
										)}
									</div>
								)}

								<CardHeader>
									<CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
										{enrollment.courseTitle}
									</CardTitle>
									<CardDescription className="line-clamp-2">
										{enrollment.courseDescription}
									</CardDescription>
								</CardHeader>

								<CardContent className="flex-1">
									{/* Stats */}
									<div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
										<div className="flex items-center gap-1">
											<BookOpen className="h-4 w-4" />
											<span>{enrollment.totalLessons} lessons</span>
										</div>
										<div className="flex items-center gap-1">
											<Clock className="h-4 w-4" />
											<span>{formatDuration(enrollment.totalDuration)}</span>
										</div>
									</div>

									{/* Progress */}
									<div>
										<div className="flex justify-between text-sm mb-2">
											<span className="text-muted-foreground">Progress</span>
											<span className="font-medium">
												{enrollment.completedLessons}/{enrollment.totalLessons}{" "}
												completed
											</span>
										</div>
										<Progress
											value={enrollment.progressPercentage}
											className="h-2"
										/>
										<p className="text-xs text-muted-foreground mt-1">
											{enrollment.progressPercentage.toFixed(0)}% complete
										</p>
									</div>
								</CardContent>

								<CardFooter>
									<Button asChild className="w-full">
										<Link href={`/learn/courses/${enrollment.courseSlug}`}>
											{enrollment.progressPercentage > 0 ? (
												<>
													<TrendingUp className="mr-2 h-4 w-4" />
													Continue Learning
												</>
											) : (
												<>
													<BookOpen className="mr-2 h-4 w-4" />
													Start Course
												</>
											)}
										</Link>
									</Button>
								</CardFooter>
							</Card>
						))}
					</div>
				)}
			</div>
		</main>
	);
}
