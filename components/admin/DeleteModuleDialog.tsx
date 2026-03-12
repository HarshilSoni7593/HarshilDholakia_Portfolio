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

interface DeleteModuleDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	module: {
		id: number;
		title: string;
		lessonCount: number;
	};
	courseId: number;
	onSuccess: () => void;
	token: string;
}

export function DeleteModuleDialog({
	open,
	onOpenChange,
	module,
	courseId,
	onSuccess,
	token,
}: DeleteModuleDialogProps) {
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDelete = async () => {
		try {
			setIsDeleting(true);

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}/modules/${module.id}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			if (!response.ok) {
				throw new Error("Failed to delete module");
			}

			toast.success("Module deleted successfully!");
			onSuccess();
			onOpenChange(false);
		} catch (err) {
			toast.error("Failed to delete module");
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete Module?</AlertDialogTitle>
					<AlertDialogDescription className="space-y-2">
						<p>
							Are you sure you want to delete{" "}
							<span className="font-semibold text-foreground">
								"{module.title}"
							</span>
							?
						</p>
						{module.lessonCount > 0 && (
							<p className="text-red-600 dark:text-red-400 font-medium">
								⚠️ Warning: This module contains {module.lessonCount}{" "}
								{module.lessonCount === 1 ? "lesson" : "lessons"}. All lessons
								will be permanently deleted.
							</p>
						)}
						<p className="text-muted-foreground">
							This action cannot be undone. All content and progress data will
							be permanently removed.
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
							"Delete Module"
						)}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
