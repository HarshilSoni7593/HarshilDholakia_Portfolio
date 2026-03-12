"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { lessonApi, progressApi, LessonDetailDto } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
	ArrowLeft,
	ArrowRight,
	CheckCircle2,
	Circle,
	Clock,
	Loader2,
	ChevronRight,
} from "lucide-react";
import { toast } from "sonner";

export default function LessonPage() {
	const params = useParams();
	const { token, isAuthenticated } = useAuth();
	const [lesson, setLesson] = useState<LessonDetailDto | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isUpdatingProgress, setIsUpdatingProgress] = useState(false);
	const [startTime, setStartTime] = useState<number>(Date.now());

	const courseSlug = params.slug as string;
	const lessonSlug = params.lessonSlug as string;

	useEffect(() => {
		loadLesson();
		setStartTime(Date.now());
	}, [courseSlug, lessonSlug, token]);

	useEffect(() => {
		if (!lesson || !isAuthenticated || !token) return;

		const interval = setInterval(() => {
			const timeSpent = Math.floor((Date.now() - startTime) / 1000);

			if (timeSpent > 0) {
				progressApi
					.updateTimeSpent(lesson.id, timeSpent, token)
					.catch((err) => console.error("Failed to update time:", err));
			}
		}, 30000); // Every 30 seconds

		return () => clearInterval(interval);
	}, [lesson, startTime, token, isAuthenticated]);

	const handleMarkComplete = async () => {
		if (!lesson || !token) return;

		try {
			setIsUpdatingProgress(true);

			const result = await progressApi.markLessonComplete(lesson.id, token);

			if (result.success) {
				// Update local state
				setLesson({
					...lesson,
					isCompleted: true,
				});
				toast.success("Lesson completed! 🎉", {
					description: `${result.courseProgressPercentage.toFixed(0)}% course progress`,
				});
			}
		} catch (err) {
			console.error("Failed to mark complete:", err);
		} finally {
			setIsUpdatingProgress(false);
		}
	};

	const handleMarkIncomplete = async () => {
		if (!lesson || !token) return;

		try {
			setIsUpdatingProgress(true);

			const result = await progressApi.markLessonIncomplete(lesson.id, token);

			if (result.success) {
				setLesson({
					...lesson,
					isCompleted: false,
				});
				toast.info("Marked as incomplete");
			}
		} catch (err) {
			console.error("Failed to mark incomplete:", err);
		} finally {
			setIsUpdatingProgress(false);
		}
	};

	const loadLesson = async () => {
		try {
			setIsLoading(true);
			setError(null);
			const data = await lessonApi.getLessonBySlug(
				courseSlug,
				lessonSlug,
				token || undefined,
			);
			setLesson(data);
		} catch (err) {
			setError(error || "Failed to load lesson");
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center space-y-4">
					<Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
					<p className="text-muted-foreground">Loading lesson...</p>
				</div>
			</div>
		);
	}

	if (error || !lesson) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Card className="max-w-md">
					<CardContent className="pt-6 text-center">
						<p className="text-red-600 dark:text-red-400 mb-4">
							{error || "Lesson not found"}
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
			<div className="mx-auto max-w-4xl px-4">
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
						{lesson.courseTitle}
					</Link>
					<ChevronRight className="h-4 w-4" />
					<span className="text-foreground font-medium">{lesson.title}</span>
				</nav>

				{/* Lesson Header */}
				<div className="mb-8">
					<div className="flex items-center gap-3 mb-4">
						{lesson.isCompleted && (
							<Badge className="bg-green-500 hover:bg-green-600">
								<CheckCircle2 className="h-3 w-3 mr-1" />
								Completed
							</Badge>
						)}
						<Badge variant="outline">{lesson.moduleTitle}</Badge>
						{lesson.duration && (
							<div className="flex items-center gap-1 text-sm text-muted-foreground">
								<Clock className="h-4 w-4" />
								<span>{lesson.duration} min</span>
							</div>
						)}
					</div>

					<h1 className="text-4xl font-bold mb-4">{lesson.title}</h1>
					<p className="text-xl text-muted-foreground">{lesson.description}</p>
				</div>

				{/* Video Player (if exists) */}
				{lesson.videoUrl && (
					<Card className="mb-8">
						<CardContent className="p-6">
							<div className="aspect-video bg-black rounded-lg overflow-hidden">
								<iframe
									src={lesson.videoUrl}
									className="w-full h-full"
									allowFullScreen
									title={lesson.title}
								/>
							</div>
						</CardContent>
					</Card>
				)}

				{/* Lesson Content */}
				<Card className="mb-8">
					<CardContent className="prose prose-slate dark:prose-invert max-w-none pt-8 pb-8">
						<ReactMarkdown
							components={{
								code({ node, inline, className, children, ...props }: any) {
									const match = /language-(\w+)/.exec(className || "");
									return !inline && match ? (
										<SyntaxHighlighter
											style={vscDarkPlus}
											language={match[1]}
											PreTag="div"
											{...props}>
											{String(children).replace(/\n$/, "")}
										</SyntaxHighlighter>
									) : (
										<code className={className} {...props}>
											{children}
										</code>
									);
								},
							}}>
							{lesson.content}
						</ReactMarkdown>
					</CardContent>
				</Card>

				{isAuthenticated && (
					<div className="mb-8">
						{lesson.isCompleted ? (
							<Button
								size="lg"
								variant="outline"
								className="w-full sm:w-auto"
								onClick={handleMarkIncomplete}
								disabled={isUpdatingProgress}>
								{isUpdatingProgress ? (
									<>
										<Loader2 className="mr-2 h-5 w-5 animate-spin" />
										Updating...
									</>
								) : (
									<>
										<CheckCircle2 className="mr-2 h-5 w-5 text-green-600" />
										Completed - Click to undo
									</>
								)}
							</Button>
						) : (
							<Button
								size="lg"
								className="w-full sm:w-auto"
								onClick={handleMarkComplete}
								disabled={isUpdatingProgress}>
								{isUpdatingProgress ? (
									<>
										<Loader2 className="mr-2 h-5 w-5 animate-spin" />
										Updating...
									</>
								) : (
									<>
										<Circle className="mr-2 h-5 w-5" />
										Mark as Complete
									</>
								)}
							</Button>
						)}
					</div>
				)}

				{/* Navigation */}
				<div className="flex flex-col sm:flex-row gap-4 justify-between">
					{/* Previous Lesson */}
					{lesson.previousLesson ? (
						<Button variant="outline" asChild className="flex-1">
							<Link
								href={`/learn/courses/${courseSlug}/lessons/${lesson.previousLesson.slug}`}>
								<ArrowLeft className="mr-2 h-4 w-4" />
								<div className="text-left">
									<div className="text-xs text-muted-foreground">Previous</div>
									<div className="font-medium truncate">
										{lesson.previousLesson.title}
									</div>
								</div>
							</Link>
						</Button>
					) : (
						<div className="flex-1" />
					)}

					{/* Back to Course */}
					<Button variant="outline" asChild>
						<Link href={`/learn/courses/${courseSlug}`}>Back to Course</Link>
					</Button>

					{/* Next Lesson */}
					{lesson.nextLesson ? (
						<Button asChild className="flex-1">
							<Link
								href={`/learn/courses/${courseSlug}/lessons/${lesson.nextLesson.slug}`}>
								<div className="text-right">
									<div className="text-xs">Next</div>
									<div className="font-medium truncate">
										{lesson.nextLesson.title}
									</div>
								</div>
								<ArrowRight className="ml-2 h-4 w-4" />
							</Link>
						</Button>
					) : (
						<Button asChild className="flex-1">
							<Link href={`/learn/${courseSlug}`}>
								<CheckCircle2 className="mr-2 h-4 w-4" />
								Course Complete
							</Link>
						</Button>
					)}
				</div>
			</div>
		</main>
	);
}
