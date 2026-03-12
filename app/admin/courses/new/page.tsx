"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { courseApi } from "@/lib/api";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function NewCoursePage() {
	const router = useRouter();
	const { token } = useAuth();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		level: "Beginner",
		thumbnailUrl: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!token) return;

		try {
			setIsSubmitting(true);

			// Use the createCourse API from backend
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/courses`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(formData),
				},
			);

			if (!response.ok) {
				throw new Error("Failed to create course");
			}

			const result = await response.json();

			toast.success("Course created successfully!");
			router.push(`/admin/courses/${result.id}/edit`);
		} catch (err: any) {
			toast.error(err.message || "Failed to create course");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="max-w-3xl">
			{/* Header */}
			<div className="mb-6">
				<Button variant="ghost" size="sm" asChild className="mb-4">
					<Link href="/admin/courses">
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to Courses
					</Link>
				</Button>
				<h2 className="text-3xl font-bold mb-2">Create New Course</h2>
				<p className="text-muted-foreground">
					Add a new course to the platform
				</p>
			</div>

			{/* Form */}
			<form onSubmit={handleSubmit}>
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
								name="title"
								placeholder="e.g., C# Fundamentals"
								value={formData.title}
								onChange={handleChange}
								required
							/>
						</div>

						{/* Description */}
						<div className="space-y-2">
							<Label htmlFor="description">
								Description <span className="text-red-500">*</span>
							</Label>
							<Textarea
								id="description"
								name="description"
								placeholder="Brief description of what students will learn..."
								value={formData.description}
								onChange={handleChange}
								rows={4}
								required
							/>
						</div>

						{/* Level */}
						<div className="space-y-2">
							<Label htmlFor="level">
								Difficulty Level <span className="text-red-500">*</span>
							</Label>
							<Select
								value={formData.level}
								onValueChange={(value) =>
									setFormData({ ...formData, level: value })
								}>
								<SelectTrigger>
									<SelectValue placeholder="Select level" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Beginner">Beginner</SelectItem>
									<SelectItem value="Intermediate">Intermediate</SelectItem>
									<SelectItem value="Advanced">Advanced</SelectItem>
								</SelectContent>
							</Select>
						</div>

						{/* Thumbnail URL */}
						<div className="space-y-2">
							<Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
							<Input
								id="thumbnailUrl"
								name="thumbnailUrl"
								type="url"
								placeholder="https://example.com/image.jpg"
								value={formData.thumbnailUrl}
								onChange={handleChange}
							/>
							<p className="text-xs text-muted-foreground">
								Optional: Add a URL to a course thumbnail image
							</p>
						</div>

						{/* Preview */}
						{formData.thumbnailUrl && (
							<div className="space-y-2">
								<Label>Preview</Label>
								<div className="border rounded-lg overflow-hidden max-w-sm">
									<img
										src={formData.thumbnailUrl}
										alt="Thumbnail preview"
										className="w-full h-48 object-cover"
										onError={(e) => {
											e.currentTarget.src =
												"https://via.placeholder.com/400x300?text=Invalid+URL";
										}}
									/>
								</div>
							</div>
						)}
					</CardContent>
				</Card>

				{/* Submit */}
				<div className="mt-6 flex gap-4">
					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Creating...
							</>
						) : (
							<>
								<Save className="mr-2 h-4 w-4" />
								Create Course
							</>
						)}
					</Button>
					<Button type="button" variant="outline" asChild>
						<Link href="/admin/courses">Cancel</Link>
					</Button>
				</div>
			</form>
		</div>
	);
}
