"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";
import { courseApi, CourseListDto } from "@/lib/api";
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
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { BookOpen, Users, Search, Loader2, GraduationCap } from "lucide-react";

export default function LearnPage() {
	const { token, user } = useAuth();
	const [courses, setCourses] = useState<CourseListDto[]>([]);
	const [filteredCourses, setFilteredCourses] = useState<CourseListDto[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedLevel, setSelectedLevel] = useState<string>("All");

	useEffect(() => {
		loadCourses();
	}, [token]);

	useEffect(() => {
		filterCourses();
	}, [searchQuery, selectedLevel, courses]);

	const loadCourses = async () => {
		try {
			setIsLoading(true);
			setError(null);
			const data = await courseApi.getAllCourses(token || undefined);
			setCourses(data);
		} catch (err) {
			setError("Failed to load courses. Please try again later.");
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	const filterCourses = () => {
		let filtered = courses;

		// Filter by search query
		if (searchQuery) {
			filtered = filtered.filter(
				(course) =>
					course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
					course.description.toLowerCase().includes(searchQuery.toLowerCase()),
			);
		}

		// Filter by level
		if (selectedLevel !== "All") {
			filtered = filtered.filter((course) => course.level === selectedLevel);
		}

		setFilteredCourses(filtered);
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
				return "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20";
		}
	};

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center space-y-4">
					<Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
					<p className="text-muted-foreground">Loading courses...</p>
				</div>
			</div>
		);
	}

	return (
		<main className="py-10">
			<div className="mx-auto max-w-7xl px-4">
				{/* Header */}
				<div className="mb-12 text-center">
					<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
						<GraduationCap className="w-8 h-8 text-primary" />
					</div>
					<h1 className="text-4xl font-bold mb-3">
						{user ? `Welcome back, ${user.firstName}!` : "Learn With Me"}
					</h1>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
						Master .NET, Web Development, and Modern Technologies
					</p>
				</div>

				{/* Search and Filters */}
				<div className="mb-8 space-y-4">
					<div className="flex flex-col sm:flex-row gap-4">
						{/* Search */}
						<div className="relative flex-1">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
							<Input
								type="text"
								placeholder="Search courses..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-10"
							/>
						</div>

						{/* Level Filter */}
						<div className="flex gap-2">
							{["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
								<Button
									key={level}
									variant={selectedLevel === level ? "default" : "outline"}
									onClick={() => setSelectedLevel(level)}
									size="sm">
									{level}
								</Button>
							))}
						</div>
					</div>

					{/* Results count */}
					<p className="text-sm text-muted-foreground">
						Showing {filteredCourses.length} of {courses.length} courses
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
				{!isLoading && filteredCourses.length === 0 && (
					<Card className="border-dashed">
						<CardContent className="pt-12 pb-12 text-center">
							<BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
							<h3 className="text-lg font-semibold mb-2">No courses found</h3>
							<p className="text-muted-foreground mb-4">
								{searchQuery || selectedLevel !== "All"
									? "Try adjusting your search or filters"
									: "No courses available yet"}
							</p>
							{(searchQuery || selectedLevel !== "All") && (
								<Button
									variant="outline"
									onClick={() => {
										setSearchQuery("");
										setSelectedLevel("All");
									}}>
									Clear filters
								</Button>
							)}
						</CardContent>
					</Card>
				)}

				{/* Course Grid */}
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{filteredCourses.map((course) => (
						<Card
							key={course.id}
							className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex flex-col">
							{/* Thumbnail */}
							{course.thumbnailUrl && (
								<div className="relative h-48 overflow-hidden rounded-t-lg bg-muted">
									<Image
										src={course.thumbnailUrl}
										alt={course.title}
										fill
										className="object-cover group-hover:scale-105 transition-transform duration-300"
									/>
									<Badge
										className={`absolute top-3 right-3 ${getLevelColor(course.level)}`}>
										{course.level}
									</Badge>
									{course.isEnrolled && (
										<Badge className="absolute top-3 left-3 bg-primary">
											Enrolled
										</Badge>
									)}
								</div>
							)}

							<CardHeader>
								<CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
									{course.title}
								</CardTitle>
								<CardDescription className="line-clamp-2">
									{course.description}
								</CardDescription>
							</CardHeader>

							<CardContent className="flex-1">
								<div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
									<div className="flex items-center gap-1">
										<BookOpen className="h-4 w-4" />
										<span>{course.lessonCount} lessons</span>
									</div>
									<div className="flex items-center gap-1">
										<Users className="h-4 w-4" />
										<span>{course.enrolledCount} enrolled</span>
									</div>
								</div>

								{/* Progress bar if enrolled */}
								{course.isEnrolled && course.progressPercentage !== null && (
									<div className="mt-4">
										<div className="flex justify-between text-xs mb-1">
											<span className="text-muted-foreground">Progress</span>
											<span className="font-medium">
												{course.progressPercentage?.toFixed(0)}%
											</span>
										</div>
										<div className="h-2 bg-secondary rounded-full overflow-hidden">
											<div
												className="h-full bg-primary transition-all duration-300"
												style={{ width: `${course.progressPercentage}%` }}
											/>
										</div>
									</div>
								)}
							</CardContent>

							<CardFooter>
								<Button
									asChild
									className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
									<Link href={`/learn/courses/${course.slug}`}>
										{course.isEnrolled ? "Continue Learning" : "View Course"}
									</Link>
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</main>
	);
}
