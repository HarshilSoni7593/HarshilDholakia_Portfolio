"use client";

import { useState } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface DeleteLessonDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	lesson: {
		id: number;
		title: string;
	};
	onSuccess: () => void;
	token: string;
}

export function DeleteLessonDialog({
	open,
	onOpenChange,
	lesson,
	onSuccess,
	token,
}: DeleteLessonDialogProps) {
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDelete = async () => {
		try {
			setIsDeleting(true);

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/lessons/${lesson.id}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			if (!response.ok) {
				throw new Error("Failed to delete lesson");
			}

			toast.success("Lesson deleted successfully!");
			onSuccess();
			onOpenChange(false);
		} catch (err: any) {
			toast.error(err.message || "Failed to delete lesson");
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete Lesson?</AlertDialogTitle>
					<AlertDialogDescription className="space-y-2">
						<p>
							Are you sure you want to delete{" "}
							<span className="font-semibold text-foreground">
								"{lesson.title}"
							</span>
							?
						</p>
						<p className="text-red-600 dark:text-red-400 font-medium">
							⚠️ Warning: All lesson content and student progress will be
							permanently deleted.
						</p>
						<p className="text-muted-foreground">
							This action cannot be undone.
						</p>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDelete}
						disabled={isDeleting}
						className="bg-red-600 hover:bg-red-700 focus:ring-red-600">
						{isDeleting ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Deleting...
							</>
						) : (
							"Delete Lesson"
						)}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
