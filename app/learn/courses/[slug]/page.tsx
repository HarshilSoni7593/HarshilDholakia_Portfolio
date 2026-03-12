"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";
import { courseApi, CourseDetailDto, enrollmentApi } from "@/lib/api";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import {
	ArrowLeft,
	BookOpen,
	Clock,
	Users,
	Loader2,
	PlayCircle,
	CheckCircle2,
	Lock,
} from "lucide-react";

export default function CourseDetailPage() {
	const params = useParams();
	const router = useRouter();
	const { token, isAuthenticated } = useAuth();
	const [course, setCourse] = useState<CourseDetailDto | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isEnrolling, setIsEnrolling] = useState(false); // NEW
	const [enrollmentError, setEnrollmentError] = useState<string | null>(null);

	const slug = params.slug as string;

	useEffect(() => {
		loadCourse();
	}, [slug, token]);

	const loadCourse = async () => {
		try {
			setIsLoading(true);
			setError(null);
			const data = await courseApi.getCourseBySlug(slug, token || undefined);
			setCourse(data);
		} catch (err) {
			setError("Failed to load course. Please try again later.");
			console.error(err);
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

	const handleEnroll = async () => {
		if (!isAuthenticated || !token) {
			router.push("/login");
			return;
		}

		if (!course) return;

		try {
			setIsEnrolling(true);
			setEnrollmentError(null);

			const result = await enrollmentApi.enrollInCourse(course.id, token);

			if (result.success) {
				// Reload course to get updated enrollment status
				await loadCourse();
			} else {
				setEnrollmentError(result.message);
			}
		} catch (err) {
			setEnrollmentError(error || "Failed to enroll in course");
		} finally {
			setIsEnrolling(false);
		}
	};

	// NEW: Handle unenrollment
	const handleUnenroll = async () => {
		if (!isAuthenticated || !token || !course) return;

		if (
			!confirm(
				"Are you sure you want to unenroll from this course? Your progress will be lost.",
			)
		) {
			return;
		}

		try {
			setIsEnrolling(true);
			setEnrollmentError(null);

			const result = await enrollmentApi.unenrollFromCourse(course.id, token);

			if (result.success) {
				await loadCourse();
			} else {
				setEnrollmentError(result.message);
			}
		} catch (err) {
			setEnrollmentError(error || "Failed to unenroll");
		} finally {
			setIsEnrolling(false);
		}
	};

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center space-y-4">
					<Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
					<p className="text-muted-foreground">Loading course...</p>
				</div>
			</div>
		);
	}

	if (error || !course) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Card className="max-w-md">
					<CardContent className="pt-6 text-center">
						<p className="text-red-600 dark:text-red-400 mb-4">
							{error || "Course not found"}
						</p>
						<Button asChild>
							<Link href="/learn/courses">Back to Courses</Link>
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<main className="py-10">
			<div className="mx-auto max-w-6xl px-4">
				{/* Back Button */}
				<Button variant="ghost" className="mb-6" asChild>
					<Link href="/learn/courses">
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to Courses
					</Link>
				</Button>

				{/* Course Header */}
				<div className="mb-8">
					<div className="flex flex-col lg:flex-row gap-8">
						{/* Left: Course Info */}
						<div className="flex-1 space-y-4">
							<div className="flex flex-wrap gap-2">
								<Badge className={getLevelColor(course.level)}>
									{course.level}
								</Badge>
								{course.isEnrolled && (
									<Badge className="bg-primary">Enrolled</Badge>
								)}
							</div>

							<h1 className="text-4xl font-bold">{course.title}</h1>
							<p className="text-xl text-muted-foreground">
								{course.description}
							</p>

							<div className="flex flex-wrap gap-6 text-sm">
								<div className="flex items-center gap-2">
									<BookOpen className="h-5 w-5 text-muted-foreground" />
									<span>
										{course.totalLessons} lesson
										{course.totalLessons !== 1 ? "s" : ""}
									</span>
								</div>
								<div className="flex items-center gap-2">
									<Clock className="h-5 w-5 text-muted-foreground" />
									<span>{formatDuration(course.totalDuration)}</span>
								</div>
								<div className="flex items-center gap-2">
									<Users className="h-5 w-5 text-muted-foreground" />
									<span>{course.enrolledCount} enrolled</span>
								</div>
							</div>

							<div className="text-sm text-muted-foreground">
								Created by{" "}
								<span className="font-medium text-foreground">
									{course.createdByName}
								</span>
							</div>
						</div>

						{/* Right: Thumbnail */}
						{course.thumbnailUrl && (
							<div className="lg:w-96">
								<Image
									src={course.thumbnailUrl}
									alt={course.title}
									width={384}
									height={216}
									className="w-full rounded-lg shadow-lg"
								/>
							</div>
						)}
					</div>

					{/* Progress Bar (if enrolled) */}
					{course.isEnrolled && course.progressPercentage !== null && (
						<Card className="mt-6">
							<CardContent className="pt-6">
								<div className="flex justify-between text-sm mb-2">
									<span className="font-medium">Your Progress</span>
									<span className="text-muted-foreground">
										{course.progressPercentage?.toFixed(0)}% complete
									</span>
								</div>
								<div className="h-3 bg-secondary rounded-full overflow-hidden">
									<div
										className="h-full bg-primary transition-all duration-300"
										style={{ width: `${course.progressPercentage}%` }}
									/>
								</div>
							</CardContent>
						</Card>
					)}

					<div className="mt-6">
						{enrollmentError && (
							<div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600 dark:text-red-400 text-sm">
								{enrollmentError}
							</div>
						)}

						{!course.isEnrolled ? (
							<div className="flex flex-col sm:flex-row gap-4 items-start">
								<Button
									size="lg"
									className="w-full sm:w-auto"
									onClick={handleEnroll}
									disabled={isEnrolling}>
									{isEnrolling ? (
										<>
											<Loader2 className="mr-2 h-5 w-5 animate-spin" />
											Enrolling...
										</>
									) : (
										<>
											<BookOpen className="mr-2 h-5 w-5" />
											Enroll in Course
										</>
									)}
								</Button>
								{!isAuthenticated && (
									<p className="text-sm text-muted-foreground">
										You'll be asked to log in to enroll in this course
									</p>
								)}
							</div>
						) : (
							<div className="flex flex-col sm:flex-row gap-4 items-start">
								<Button size="lg" className="w-full sm:w-auto" asChild>
									<Link
										href={`/learn/courses/${course.slug}/lessons/${
											course.modules[0]?.lessons[0]?.slug || ""
										}`}>
										<PlayCircle className="mr-2 h-5 w-5" />
										Continue Learning
									</Link>
								</Button>
								<Button
									variant="outline"
									size="lg"
									onClick={handleUnenroll}
									disabled={isEnrolling}>
									{isEnrolling ? (
										<>
											<Loader2 className="mr-2 h-5 w-5 animate-spin" />
											Processing...
										</>
									) : (
										"Unenroll"
									)}
								</Button>
							</div>
						)}
					</div>
				</div>

				{/* Course Content */}
				<Card>
					<CardHeader>
						<CardTitle>Course Content</CardTitle>
						<CardDescription>
							{course.modules.length} module
							{course.modules.length !== 1 ? "s" : ""} • {course.totalLessons}{" "}
							lesson{course.totalLessons !== 1 ? "s" : ""}
						</CardDescription>
					</CardHeader>
					<CardContent>
						{course.modules.length === 0 ? (
							<div className="text-center py-12 text-muted-foreground">
								<BookOpen className="h-12 w-12 mx-auto mb-4" />
								<p>No modules available yet.</p>
								<p className="text-sm">Check back soon for course content!</p>
							</div>
						) : (
							<Accordion type="multiple" className="w-full">
								{course.modules.map((module, moduleIndex) => (
									<AccordionItem key={module.id} value={`module-${module.id}`}>
										<AccordionTrigger className="hover:no-underline">
											<div className="flex items-start gap-4 text-left flex-1">
												<div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold flex-shrink-0">
													{moduleIndex + 1}
												</div>
												<div className="flex-1">
													<div className="flex items-center gap-2">
														<h3 className="font-semibold text-base">
															{module.title}
														</h3>
														<Button
															variant="ghost"
															size="sm"
															className="h-6 text-xs"
															asChild
															onClick={(e) => e.stopPropagation()}>
															<Link
																href={`/learn/courses/${course.slug}/modules/${module.slug}`}>
																View Module
															</Link>
														</Button>
													</div>
													<p className="text-sm text-muted-foreground mt-1">
														{module.lessonCount} lesson
														{module.lessonCount !== 1 ? "s" : ""} •{" "}
														{formatDuration(module.totalDuration)}
														{module.progressPercentage > 0 && (
															<span className="ml-2">
																• {module.progressPercentage.toFixed(0)}%
																complete
															</span>
														)}
													</p>
												</div>
											</div>
										</AccordionTrigger>
										<AccordionContent>
											<div className="pl-12 space-y-2">
												{module.lessons.map((lesson) => (
													<div
														key={lesson.id}
														className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors group">
														<div className="flex items-center gap-3 flex-1">
															{lesson.isCompleted ? (
																<CheckCircle2 className="h-5 w-5 text-green-600" />
															) : course.isEnrolled ? (
																<PlayCircle className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
															) : (
																<Lock className="h-5 w-5 text-muted-foreground" />
															)}
															<div className="flex-1">
																<p className="font-medium text-sm">
																	{lesson.title}
																</p>
																{lesson.duration && (
																	<p className="text-xs text-muted-foreground">
																		{lesson.duration} min
																	</p>
																)}
															</div>
														</div>
														{course.isEnrolled && (
															<Button variant="ghost" size="sm" asChild>
																<Link
																	href={`/learn/${course.slug}/${lesson.slug}`}>
																	{lesson.isCompleted ? "Review" : "Start"}
																</Link>
															</Button>
														)}
													</div>
												))}
											</div>
										</AccordionContent>
									</AccordionItem>
								))}
							</Accordion>
						)}
					</CardContent>
				</Card>
			</div>
		</main>
	);
}
