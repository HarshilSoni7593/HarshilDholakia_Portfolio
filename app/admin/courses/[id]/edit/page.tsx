"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { courseApi, moduleApi, CourseDetailDto } from "@/lib/api";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import {
	ArrowLeft,
	Loader2,
	Save,
	Plus,
	Edit,
	Trash2,
	Eye,
	EyeOff,
	GripVertical,
	BookOpen,
	FileText,
} from "lucide-react";
import { toast } from "sonner";
import { ModuleDialog } from "@/components/admin/ModuleDialog";
import { LessonDialog } from "@/components/admin/LessonDialog";
import { DeleteModuleDialog } from "@/components/admin/DeleteModuleDialog";
import { DeleteLessonDialog } from "@/components/admin/DeleteLessonDialog";

export default function EditCoursePage() {
	const params = useParams();
	const router = useRouter();
	const { token } = useAuth();
	const [course, setCourse] = useState<CourseDetailDto | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		level: "Beginner",
		thumbnailUrl: "",
		isPublished: false,
	});

	const [moduleDialogOpen, setModuleDialogOpen] = useState(false);
	const [lessonDialogOpen, setLessonDialogOpen] = useState(false);
	const [selectedModule, setSelectedModule] = useState<any>(null);
	const [selectedLesson, setSelectedLesson] = useState<any>(null);
	const [activeModuleId, setActiveModuleId] = useState<number | null>(null);
	const [deleteModuleDialogOpen, setDeleteModuleDialogOpen] = useState(false);
	const [deleteLessonDialogOpen, setDeleteLessonDialogOpen] = useState(false);
	const [moduleToDelete, setModuleToDelete] = useState<any>(null);
	const [lessonToDelete, setLessonToDelete] = useState<any>(null);

	const courseId = parseInt(params.id as string);
	console.log("Course ID from params:", courseId);

	useEffect(() => {
		loadCourse();
	}, [courseId, token]);

	const loadCourse = async () => {
		if (!token) return;

		try {
			setIsLoading(true);
			const data = await courseApi.getCourseById(courseId, token);

			setCourse(data);
			setFormData({
				title: data.title,
				description: data.description,
				level: data.level,
				thumbnailUrl: data.thumbnailUrl || "",
				isPublished: data.isPublished,
			});
		} catch (err) {
			toast.error("Failed to load course");
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSave = async () => {
		if (!token) return;

		try {
			setIsSaving(true);

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(formData),
				},
			);

			if (!response.ok) throw new Error("Failed to update course");

			toast.success("Course updated successfully!");
			await loadCourse();
		} catch (err) {
			toast.error("Failed to update course");
		} finally {
			setIsSaving(false);
		}
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-12">
				<Loader2 className="h-8 w-8 animate-spin text-primary" />
			</div>
		);
	}

	if (!course) {
		return (
			<div className="text-center py-12">
				<p className="text-muted-foreground mb-4">Course not found</p>
				<Button asChild>
					<Link href="/admin/courses">Back to Courses</Link>
				</Button>
			</div>
		);
	}

	return (
		<div className="space-y-6 max-w-5xl">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<Button variant="ghost" size="sm" asChild className="mb-2">
						<Link href="/admin/courses">
							<ArrowLeft className="mr-2 h-4 w-4" />
							Back to Courses
						</Link>
					</Button>
					<h1 className="text-3xl font-bold tracking-tight">Edit Course</h1>
					<p className="text-muted-foreground mt-1">
						Update course details and manage content
					</p>
				</div>
				<div className="flex gap-2">
					<Badge variant={formData.isPublished ? "default" : "secondary"}>
						{formData.isPublished ? (
							<>
								<Eye className="mr-1 h-3 w-3" />
								Published
							</>
						) : (
							<>
								<EyeOff className="mr-1 h-3 w-3" />
								Draft
							</>
						)}
					</Badge>
				</div>
			</div>
			{/* Course Details Form */}
			<Card>
				<CardHeader>
					<CardTitle>Course Information</CardTitle>
					<CardDescription>Basic details about the course</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Title */}
					<div className="space-y-2">
						<Label htmlFor="title">
							Course Title <span className="text-red-500">*</span>
						</Label>
						<Input
							id="title"
							value={formData.title}
							onChange={(e) =>
								setFormData({ ...formData, title: e.target.value })
							}
						/>
					</div>

					{/* Description */}
					<div className="space-y-2">
						<Label htmlFor="description">
							Description <span className="text-red-500">*</span>
						</Label>
						<Textarea
							id="description"
							value={formData.description}
							onChange={(e) =>
								setFormData({ ...formData, description: e.target.value })
							}
							rows={4}
						/>
					</div>

					{/* Level & Published */}
					<div className="grid md:grid-cols-2 gap-6">
						<div className="space-y-2">
							<Label htmlFor="level">Difficulty Level</Label>
							<Select
								value={formData.level}
								onValueChange={(value) =>
									setFormData({ ...formData, level: value })
								}>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Beginner">Beginner</SelectItem>
									<SelectItem value="Intermediate">Intermediate</SelectItem>
									<SelectItem value="Advanced">Advanced</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label htmlFor="isPublished">Publish Status</Label>
							<div className="flex items-center space-x-2 h-10">
								<Switch
									id="isPublished"
									checked={formData.isPublished}
									onCheckedChange={(checked) =>
										setFormData({ ...formData, isPublished: checked })
									}
								/>
								<Label htmlFor="isPublished" className="cursor-pointer">
									{formData.isPublished ? "Published" : "Draft"}
								</Label>
							</div>
						</div>
					</div>

					{/* Thumbnail URL */}
					<div className="space-y-2">
						<Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
						<Input
							id="thumbnailUrl"
							type="url"
							placeholder="https://example.com/image.jpg"
							value={formData.thumbnailUrl}
							onChange={(e) =>
								setFormData({ ...formData, thumbnailUrl: e.target.value })
							}
						/>
					</div>

					{/* Save Button */}
					<div className="flex gap-3">
						<Button onClick={handleSave} disabled={isSaving}>
							{isSaving ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Saving...
								</>
							) : (
								<>
									<Save className="mr-2 h-4 w-4" />
									Save Changes
								</>
							)}
						</Button>
						<Button variant="outline" asChild>
							<Link href={`/learn/courses/${course.slug}`}>
								<Eye className="mr-2 h-4 w-4" />
								Preview
							</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
			{/* Course Content (Modules & Lessons) */}
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>
							<CardTitle>Course Content</CardTitle>
							<CardDescription>Manage modules and lessons</CardDescription>
						</div>
						<Dialog>
							<DialogTrigger asChild>
								<Button
									onClick={() => {
										setSelectedModule(null);
										setModuleDialogOpen(true);
									}}>
									<Plus className="mr-2 h-4 w-4" />
									Add Module
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Create New Module</DialogTitle>
									<DialogDescription>
										Add a new module to organize your course content
									</DialogDescription>
								</DialogHeader>
								{/* Module creation form will go here */}
								<p className="text-sm text-muted-foreground">
									Module creation form coming in next step...
								</p>
							</DialogContent>
						</Dialog>
					</div>
				</CardHeader>
				<CardContent>
					{course.modules.length === 0 ? (
						<div className="text-center py-12 border-2 border-dashed rounded-lg">
							<BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
							<h3 className="text-lg font-semibold mb-2">No modules yet</h3>
							<p className="text-sm text-muted-foreground mb-4">
								Get started by creating your first module
							</p>
							<Button>
								<Plus className="mr-2 h-4 w-4" />
								Create Module
							</Button>
						</div>
					) : (
						<Accordion type="multiple" className="w-full">
							{course.modules.map((module, index) => (
								<AccordionItem key={module.id} value={`module-${module.id}`}>
									<AccordionTrigger className="hover:no-underline">
										<div className="flex items-center gap-3 flex-1 text-left">
											<GripVertical className="h-5 w-5 text-muted-foreground" />
											<div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
												{index + 1}
											</div>
											<div className="flex-1">
												<div className="font-semibold">{module.title}</div>
												<div className="text-sm text-muted-foreground">
													{module.lessonCount} lessons
												</div>
											</div>
											<div className="flex gap-2 mr-2">
												<Button
													variant="ghost"
													size="sm"
													onClick={(e) => {
														e.stopPropagation();
														setSelectedModule(module);
														setModuleDialogOpen(true);
													}}>
													<Edit className="h-4 w-4" />
												</Button>
												<Button
													variant="ghost"
													size="sm"
													className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
													onClick={(e) => {
														e.stopPropagation();
														setModuleToDelete(module);
														setDeleteModuleDialogOpen(true);
													}}>
													<Trash2 className="h-4 w-4" />
												</Button>
											</div>
										</div>
									</AccordionTrigger>
									<AccordionContent>
										<div className="pl-16 space-y-2 pt-2">
											{module.lessons.length === 0 ? (
												<div className="text-center py-8 border-2 border-dashed rounded-lg">
													<FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
													<p className="text-sm text-muted-foreground mb-3">
														No lessons in this module
													</p>
													<Button
														size="sm"
														variant="outline"
														onClick={() => {
															setActiveModuleId(module.id);
															setSelectedLesson(null);
															setLessonDialogOpen(true);
														}}>
														<Plus className="mr-2 h-3 w-3" />
														Add Lesson
													</Button>
												</div>
											) : (
												module.lessons.map((lesson, lessonIndex) => (
													<div
														key={lesson.id}
														className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent group">
														<GripVertical className="h-4 w-4 text-muted-foreground" />
														<div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-medium">
															{lessonIndex + 1}
														</div>
														<div className="flex-1">
															<div className="font-medium text-sm">
																{lesson.title}
															</div>
															<div className="text-xs text-muted-foreground">
																{lesson.duration
																	? `${lesson.duration} min`
																	: "No duration"}
															</div>
														</div>
														<div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
															<Button
																variant="ghost"
																size="sm"
																onClick={(e) => {
																	e.stopPropagation();
																	setSelectedLesson(lesson);
																	setActiveModuleId(module.id);
																	setLessonDialogOpen(true);
																}}>
																<Edit className="h-3 w-3" />
															</Button>
															<Button
																variant="ghost"
																size="sm"
																className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
																onClick={(e) => {
																	e.stopPropagation();
																	setLessonToDelete(lesson);
																	setDeleteLessonDialogOpen(true);
																}}>
																<Trash2 className="h-3 w-3" />
															</Button>
														</div>
													</div>
												))
											)}
											<Button
												size="sm"
												variant="outline"
												onClick={() => {
													setActiveModuleId(module.id);
													setSelectedLesson(null);
													setLessonDialogOpen(true);
												}}>
												<Plus className="mr-2 h-3 w-3" />
												Add Lesson
											</Button>
										</div>
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					)}
				</CardContent>
			</Card>
			{/* Module Dialog */}
			{token && (
				<ModuleDialog
					open={moduleDialogOpen}
					onOpenChange={setModuleDialogOpen}
					courseId={courseId}
					module={selectedModule}
					onSuccess={loadCourse}
					token={token}
				/>
			)}
			{/* Lesson Dialog */}
			{token && activeModuleId && (
				<LessonDialog
					open={lessonDialogOpen}
					onOpenChange={setLessonDialogOpen}
					moduleId={activeModuleId}
					lesson={selectedLesson}
					onSuccess={loadCourse}
					token={token}
				/>
			)}
			{/* Delete Module Dialog */}
			{token && moduleToDelete && (
				<DeleteModuleDialog
					open={deleteModuleDialogOpen}
					onOpenChange={setDeleteModuleDialogOpen}
					module={moduleToDelete}
					courseId={courseId}
					onSuccess={loadCourse}
					token={token}
				/>
			)}

			{/* Delete Lesson Dialog */}
			{token && lessonToDelete && (
				<DeleteLessonDialog
					open={deleteLessonDialogOpen}
					onOpenChange={setDeleteLessonDialogOpen}
					lesson={lessonToDelete}
					onSuccess={loadCourse}
					token={token}
				/>
			)}
		</div>
	);
}
