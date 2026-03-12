"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { courseApi, CourseDetailDto, ModuleDto } from "@/lib/api";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import {
	ArrowLeft,
	BookOpen,
	Clock,
	CheckCircle2,
	PlayCircle,
	Lock,
	Loader2,
	ChevronRight,
} from "lucide-react";

export default function ModulePage() {
	const params = useParams();
	const router = useRouter();
	const { token, isAuthenticated } = useAuth();
	const [course, setCourse] = useState<CourseDetailDto | null>(null);
	const [module, setModule] = useState<ModuleDto | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const courseSlug = params.slug as string;
	const moduleSlug = params.moduleSlug as string;

	useEffect(() => {
		loadData();
	}, [courseSlug, moduleSlug, token]);

	const loadData = async () => {
		try {
			setIsLoading(true);
			setError(null);

			// Load course to get all modules
			const courseData = await courseApi.getCourseBySlug(
				courseSlug,
				token || undefined,
			);
			setCourse(courseData);

			// Find the specific module
			const foundModule = courseData.modules.find((m) => m.slug === moduleSlug);

			if (!foundModule) {
				throw new Error("Module not found");
			}

			setModule(foundModule);
		} catch (err) {
			setError("Failed to load module");
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	const formatDuration = (minutes: number) => {
		if (minutes < 60) return `${minutes}m`;
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
	};

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center space-y-4">
					<Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
					<p className="text-muted-foreground">Loading module...</p>
				</div>
			</div>
		);
	}

	if (error || !module || !course) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Card className="max-w-md">
					<CardContent className="pt-6 text-center">
						<p className="text-red-600 dark:text-red-400 mb-4">
							{error || "Module not found"}
						</p>
						<Button asChild>
							<Link href={`/learn/${courseSlug}`}>Back to Course</Link>
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<main className="py-6">
			<div className="mx-auto max-w-5xl px-4">
				{/* Breadcrumb Navigation */}
				<nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
					<Link
						href="/learn"
						className="hover:text-foreground transition-colors">
						Courses
					</Link>
					<ChevronRight className="h-4 w-4" />
					<Link
						href={`/learn/courses/${courseSlug}`}
						className="hover:text-foreground transition-colors">
						{course.title}
					</Link>
					<ChevronRight className="h-4 w-4" />
					<span className="text-foreground font-medium">{module.title}</span>
				</nav>

				{/* Back Button */}
				<Button variant="ghost" className="mb-6" asChild>
					<Link href={`/learn/courses/${courseSlug}`}>
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to Course
					</Link>
				</Button>

				{/* Module Header */}
				<div className="mb-8">
					<div className="flex items-center gap-3 mb-4">
						<Badge variant="outline">Module {module.orderIndex}</Badge>
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<BookOpen className="h-4 w-4" />
							<span>
								{module.lessonCount} lesson{module.lessonCount !== 1 ? "s" : ""}
							</span>
						</div>
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<Clock className="h-4 w-4" />
							<span>{formatDuration(module.totalDuration)}</span>
						</div>
					</div>

					<h1 className="text-4xl font-bold mb-4">{module.title}</h1>
					<p className="text-xl text-muted-foreground">{module.description}</p>
				</div>

				{/* Progress (if enrolled) */}
				{course.isEnrolled && module.progressPercentage > 0 && (
					<Card className="mb-8">
						<CardContent className="pt-6">
							<div className="flex justify-between text-sm mb-2">
								<span className="font-medium">Your Progress</span>
								<span className="text-muted-foreground">
									{module.completedLessons} of {module.lessonCount} completed
								</span>
							</div>
							<Progress value={module.progressPercentage} className="h-2" />
							<p className="text-xs text-muted-foreground mt-2">
								{module.progressPercentage.toFixed(0)}% complete
							</p>
						</CardContent>
					</Card>
				)}

				{/* Lessons List */}
				<Card>
					<CardHeader>
						<CardTitle>Lessons</CardTitle>
						<CardDescription>
							{module.lessonCount} lesson{module.lessonCount !== 1 ? "s" : ""}{" "}
							in this module
						</CardDescription>
					</CardHeader>
					<CardContent>
						{module.lessons.length === 0 ? (
							<div className="text-center py-12 text-muted-foreground">
								<BookOpen className="h-12 w-12 mx-auto mb-4" />
								<p>No lessons available yet.</p>
							</div>
						) : (
							<div className="space-y-2">
								{module.lessons.map((lesson, index) => (
									<Link
										key={lesson.id}
										href={`/learn/courses/${courseSlug}/lessons/${lesson.slug}`}
										className="block">
										<div className="group flex items-center justify-between p-4 rounded-lg border hover:bg-accent hover:border-primary transition-all cursor-pointer">
											<div className="flex items-center gap-4 flex-1">
												{/* Lesson Number */}
												<div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-semibold flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
													{index + 1}
												</div>

												{/* Lesson Info */}
												<div className="flex-1 min-w-0">
													<div className="flex items-center gap-2 mb-1">
														<h3 className="font-semibold text-base group-hover:text-primary transition-colors truncate">
															{lesson.title}
														</h3>
														{lesson.isCompleted && (
															<CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
														)}
													</div>
													<p className="text-sm text-muted-foreground line-clamp-1">
														{lesson.description}
													</p>
													<div className="flex items-center gap-4 mt-2">
														{lesson.duration && (
															<span className="text-xs text-muted-foreground flex items-center gap-1">
																<Clock className="h-3 w-3" />
																{lesson.duration} min
															</span>
														)}
														{lesson.videoUrl && (
															<span className="text-xs text-muted-foreground flex items-center gap-1">
																<PlayCircle className="h-3 w-3" />
																Video
															</span>
														)}
														{!lesson.isPublished && (
															<span className="text-xs text-muted-foreground flex items-center gap-1">
																<Lock className="h-3 w-3" />
																Locked
															</span>
														)}
													</div>
												</div>

												{/* Status Icon */}
												<div className="flex-shrink-0">
													{lesson.isCompleted ? (
														<CheckCircle2 className="h-5 w-5 text-green-600" />
													) : (
														<PlayCircle className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
													)}
												</div>
											</div>
										</div>
									</Link>
								))}
							</div>
						)}
					</CardContent>
				</Card>

				{/* Module Navigation */}
				<div className="mt-8 flex justify-between">
					{/* Previous Module */}
					{module.orderIndex > 1 && (
						<Button variant="outline" asChild>
							<Link href={`/learn/${courseSlug}`}>
								<ArrowLeft className="mr-2 h-4 w-4" />
								Previous Module
							</Link>
						</Button>
					)}

					<div className="flex-1" />

					{/* Next Module */}
					{module.orderIndex < course.modules.length && (
						<Button asChild>
							<Link href={`/learn/${courseSlug}`}>
								Next Module
								<ChevronRight className="ml-2 h-4 w-4" />
							</Link>
						</Button>
					)}
				</div>
			</div>
		</main>
	);
}
