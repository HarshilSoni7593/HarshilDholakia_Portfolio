"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { courseApi, CourseListDto } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {
	Loader2,
	Plus,
	Search,
	MoreVertical,
	Edit,
	Trash2,
	Eye,
	EyeOff,
	BookOpen,
	Users,
	FileText,
} from "lucide-react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function AdminCoursesPage() {
	const { token } = useAuth();
	const [courses, setCourses] = useState<CourseListDto[]>([]);
	const [filteredCourses, setFilteredCourses] = useState<CourseListDto[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [filterStatus, setFilterStatus] = useState<
		"all" | "published" | "draft"
	>("all");
	const [courseToDelete, setCourseToDelete] = useState<CourseListDto | null>(
		null,
	);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		loadCourses();
	}, [token]);

	useEffect(() => {
		filterCourses();
	}, [searchQuery, filterStatus, courses]);

	const loadCourses = async () => {
		if (!token) return;

		try {
			setIsLoading(true);
			const data = await courseApi.getAllCourses(token);
			setCourses(data);
		} catch (err) {
			console.error("Failed to load courses:", err);
		} finally {
			setIsLoading(false);
		}
	};

	const filterCourses = () => {
		let filtered = courses;

		if (filterStatus === "published") {
			filtered = filtered.filter((c) => c.isPublished);
		} else if (filterStatus === "draft") {
			filtered = filtered.filter((c) => !c.isPublished);
		}

		if (searchQuery) {
			filtered = filtered.filter(
				(course) =>
					course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
					course.description.toLowerCase().includes(searchQuery.toLowerCase()),
			);
		}

		setFilteredCourses(filtered);
	};

	const getLevelColor = (level: string) => {
		switch (level) {
			case "Beginner":
				return "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400";
			case "Intermediate":
				return "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400";
			case "Advanced":
				return "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400";
			default:
				return "";
		}
	};

	const handleDeleteCourse = async (courseId: number) => {
		if (!token) return;

		try {
			setIsDeleting(true);

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/Course/${courseId}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			if (!response.ok) throw new Error("Failed to delete course");

			toast.success("Course deleted successfully!");
			setDeleteDialogOpen(false);
			loadCourses();
		} catch (err) {
			toast.error("Failed to delete course");
		} finally {
			setIsDeleting(false);
		}
	};
	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-12">
				<Loader2 className="h-8 w-8 animate-spin text-primary" />
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Page Header */}
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Courses</h1>
					<p className="text-muted-foreground mt-1">
						Manage and organize your course content
					</p>
				</div>
				<Button asChild size="lg" className="shadow-lg shadow-primary/20">
					<Link href="/admin/courses/new">
						<Plus className="mr-2 h-4 w-4" />
						Create Course
					</Link>
				</Button>
			</div>

			{/* Toolbar */}
			<Card>
				<CardContent className="pt-6">
					<div className="flex flex-col md:flex-row gap-4">
						{/* Search */}
						<div className="relative flex-1">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search courses by title or description..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-10"
							/>
						</div>

						{/* Filters */}
						<div className="flex gap-2">
							<Button
								variant={filterStatus === "all" ? "default" : "outline"}
								onClick={() => setFilterStatus("all")}
								size="sm">
								All ({courses.length})
							</Button>
							<Button
								variant={filterStatus === "published" ? "default" : "outline"}
								onClick={() => setFilterStatus("published")}
								size="sm">
								<Eye className="mr-2 h-4 w-4" />
								Published ({courses.filter((c) => c.isPublished).length})
							</Button>
							<Button
								variant={filterStatus === "draft" ? "default" : "outline"}
								onClick={() => setFilterStatus("draft")}
								size="sm">
								<EyeOff className="mr-2 h-4 w-4" />
								Drafts ({courses.filter((c) => !c.isPublished).length})
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Courses List */}
			{filteredCourses.length === 0 ? (
				<Card>
					<CardContent className="py-16 text-center">
						<BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
						<h3 className="text-lg font-semibold mb-2">No courses found</h3>
						<p className="text-sm text-muted-foreground mb-4">
							{searchQuery || filterStatus !== "all"
								? "Try adjusting your filters"
								: "Get started by creating your first course"}
						</p>
						{!searchQuery && filterStatus === "all" && (
							<Button asChild>
								<Link href="/admin/courses/new">
									<Plus className="mr-2 h-4 w-4" />
									Create Course
								</Link>
							</Button>
						)}
					</CardContent>
				</Card>
			) : (
				<div className="space-y-3">
					{filteredCourses.map((course) => (
						<Card key={course.id} className="hover:shadow-md transition-shadow">
							<CardContent className="p-6">
								<div className="flex items-start gap-4">
									{/* Course Icon */}
									<div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
										{course.thumbnailUrl ? (
											<img
												src={course.thumbnailUrl}
												alt={course.title}
												className="w-full h-full object-cover rounded-lg"
											/>
										) : (
											<BookOpen className="h-8 w-8" />
										)}
									</div>

									{/* Course Info */}
									<div className="flex-1 min-w-0">
										<div className="flex items-start justify-between gap-4 mb-2">
											<div className="flex-1 min-w-0">
												<h3 className="text-lg font-semibold mb-1">
													{course.title}
												</h3>
												<p className="text-sm text-muted-foreground line-clamp-2">
													{course.description}
												</p>
											</div>

											{/* Actions */}
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														variant="ghost"
														size="icon"
														className="flex-shrink-0">
														<MoreVertical className="h-4 w-4" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuItem asChild>
														<Link href={`/admin/courses/${course.id}/edit`}>
															<Edit className="mr-2 h-4 w-4" />
															Edit Course
														</Link>
													</DropdownMenuItem>
													<DropdownMenuItem asChild>
														<Link href={`/learn/courses/${course.slug}`}>
															<Eye className="mr-2 h-4 w-4" />
															Preview
														</Link>
													</DropdownMenuItem>
													<DropdownMenuSeparator />
													<DropdownMenuItem
														className="text-red-600"
														onSelect={(e) => {
															e.preventDefault();
															setCourseToDelete(course);
															setDeleteDialogOpen(true);
														}}>
														<Trash2 className="mr-2 h-4 w-4" />
														Delete
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</div>

										{/* Meta Information */}
										<div className="flex flex-wrap items-center gap-4 mt-3">
											{/* Level Badge */}
											<Badge
												variant="outline"
												className={getLevelColor(course.level)}>
												{course.level}
											</Badge>

											{/* Status Badge */}
											{course.isPublished ? (
												<Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400">
													<Eye className="mr-1 h-3 w-3" />
													Published
												</Badge>
											) : (
												<Badge variant="secondary">
													<EyeOff className="mr-1 h-3 w-3" />
													Draft
												</Badge>
											)}

											{/* Stats */}
											<div className="flex items-center gap-4 text-sm text-muted-foreground">
												<span className="flex items-center gap-1">
													<FileText className="h-4 w-4" />
													{course.lessonCount} lessons
												</span>
												<span className="flex items-center gap-1">
													<BookOpen className="h-4 w-4" />
													{course.moduleCount} modules
												</span>
												<span className="flex items-center gap-1">
													<Users className="h-4 w-4" />
													{course.enrolledCount} students
												</span>
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			)}
			{/* Delete Course Dialog */}
			{courseToDelete && (
				<AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Delete Course?</AlertDialogTitle>
							<AlertDialogDescription className="space-y-2">
								<p>
									Are you sure you want to delete{" "}
									<span className="font-semibold text-foreground">
										"{courseToDelete.title}"
									</span>
									?
								</p>
								{(courseToDelete.moduleCount > 0 ||
									courseToDelete.lessonCount > 0) && (
									<p className="text-red-600 dark:text-red-400 font-medium">
										⚠️ Warning: This course contains{" "}
										{courseToDelete.moduleCount}{" "}
										{courseToDelete.moduleCount === 1 ? "module" : "modules"}{" "}
										and {courseToDelete.lessonCount}{" "}
										{courseToDelete.lessonCount === 1 ? "lesson" : "lessons"}.
										All content will be permanently deleted.
									</p>
								)}
								{courseToDelete.enrolledCount > 0 && (
									<p className="text-red-600 dark:text-red-400 font-medium">
										⚠️ {courseToDelete.enrolledCount}{" "}
										{courseToDelete.enrolledCount === 1
											? "student is"
											: "students are"}{" "}
										enrolled in this course.
									</p>
								)}
								<p className="text-muted-foreground">
									This action cannot be undone.
								</p>
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel disabled={isDeleting}>
								Cancel
							</AlertDialogCancel>
							<AlertDialogAction
								onClick={() => handleDeleteCourse(courseToDelete.id)}
								disabled={isDeleting}
								className="bg-red-600 hover:bg-red-700 focus:ring-red-600">
								{isDeleting ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Deleting...
									</>
								) : (
									"Delete Course"
								)}
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			)}
		</div>
	);
}
