"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RichTextEditor } from "./RichTextEditor";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface LessonDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	moduleId: number;
	lesson?: {
		id: number;
		title: string;
		description: string;
		content: string;
		orderIndex: number;
		duration?: number;
		videoUrl?: string;
		isPublished: boolean;
	};
	onSuccess: () => void;
	token: string;
}

export function LessonDialog({
	open,
	onOpenChange,
	moduleId,
	lesson,
	onSuccess,
	token,
}: LessonDialogProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		title: lesson?.title || "",
		description: lesson?.description || "",
		content: lesson?.content || "",
		orderIndex: lesson?.orderIndex || 1,
		duration: lesson?.duration || 10,
		videoUrl: lesson?.videoUrl || "",
		isPublished: lesson?.isPublished || false,
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			setIsSubmitting(true);

			const url = lesson
				? `${process.env.NEXT_PUBLIC_API_URL}/api/lessons/${lesson.id}`
				: `${process.env.NEXT_PUBLIC_API_URL}/api/modules/${moduleId}/lessons`;

			const method = lesson ? "PUT" : "POST";

			const response = await fetch(url, {
				method,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) throw new Error("Failed to save lesson");

			toast.success(lesson ? "Lesson updated!" : "Lesson created!");
			onSuccess();
			onOpenChange(false);

			// Reset form if creating new
			if (!lesson) {
				setFormData({
					title: "",
					description: "",
					content: "",
					orderIndex: 1,
					duration: 10,
					videoUrl: "",
					isPublished: false,
				});
			}
		} catch (err: any) {
			toast.error(err.message || "Failed to save lesson");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>
							{lesson ? "Edit Lesson" : "Create New Lesson"}
						</DialogTitle>
						<DialogDescription>
							{lesson
								? "Update lesson information and content"
								: "Add a new lesson to this module"}
						</DialogDescription>
					</DialogHeader>

					<Tabs defaultValue="basic" className="mt-4">
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="basic">Basic Info</TabsTrigger>
							<TabsTrigger value="content">Content</TabsTrigger>
						</TabsList>

						<TabsContent value="basic" className="space-y-4 mt-4">
							{/* Title */}
							<div className="space-y-2">
								<Label htmlFor="lesson-title">
									Lesson Title <span className="text-red-500">*</span>
								</Label>
								<Input
									id="lesson-title"
									placeholder="e.g., What is C#?"
									value={formData.title}
									onChange={(e) =>
										setFormData({ ...formData, title: e.target.value })
									}
									required
								/>
							</div>

							{/* Description */}
							<div className="space-y-2">
								<Label htmlFor="lesson-description">
									Description <span className="text-red-500">*</span>
								</Label>
								<Textarea
									id="lesson-description"
									placeholder="Brief description of this lesson..."
									value={formData.description}
									onChange={(e) =>
										setFormData({ ...formData, description: e.target.value })
									}
									rows={3}
									required
								/>
							</div>

							{/* Order & Duration */}
							<div className="grid md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="lesson-order">
										Order <span className="text-red-500">*</span>
									</Label>
									<Input
										id="lesson-order"
										type="number"
										min="1"
										value={formData.orderIndex}
										onChange={(e) =>
											setFormData({
												...formData,
												orderIndex: parseInt(e.target.value),
											})
										}
										required
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="lesson-duration">Duration (minutes)</Label>
									<Input
										id="lesson-duration"
										type="number"
										min="1"
										max="600"
										value={formData.duration}
										onChange={(e) =>
											setFormData({
												...formData,
												duration: parseInt(e.target.value),
											})
										}
									/>
								</div>
							</div>

							{/* Video URL */}
							<div className="space-y-2">
								<Label htmlFor="lesson-video">Video URL (Optional)</Label>
								<Input
									id="lesson-video"
									type="url"
									placeholder="https://youtube.com/embed/..."
									value={formData.videoUrl}
									onChange={(e) =>
										setFormData({ ...formData, videoUrl: e.target.value })
									}
								/>
								<p className="text-xs text-muted-foreground">
									YouTube embed URL or any video embed link
								</p>
							</div>

							{/* Published */}
							<div className="flex items-center space-x-2">
								<Switch
									id="lesson-published"
									checked={formData.isPublished}
									onCheckedChange={(checked) =>
										setFormData({ ...formData, isPublished: checked })
									}
								/>
								<Label htmlFor="lesson-published" className="cursor-pointer">
									Publish this lesson
								</Label>
							</div>
						</TabsContent>

						<TabsContent value="content" className="mt-4">
							<div className="space-y-2">
								<Label>
									Lesson Content <span className="text-red-500">*</span>
								</Label>
								<RichTextEditor
									content={formData.content}
									onChange={(content) => setFormData({ ...formData, content })}
								/>
								<p className="text-xs text-muted-foreground">
									Use the toolbar to format your lesson content. Supports
									headings, lists, code blocks, and more.
								</p>
							</div>
						</TabsContent>
					</Tabs>

					<DialogFooter className="mt-6">
						<Button
							type="button"
							variant="outline"
							onClick={() => onOpenChange(false)}
							disabled={isSubmitting}>
							Cancel
						</Button>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Saving...
								</>
							) : lesson ? (
								"Update Lesson"
							) : (
								"Create Lesson"
							)}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
