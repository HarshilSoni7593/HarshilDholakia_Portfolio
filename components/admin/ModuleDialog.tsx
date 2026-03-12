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
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ModuleDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	courseId: number;
	module?: {
		id: number;
		title: string;
		description: string;
		orderIndex: number;
	};
	onSuccess: () => void;
	token: string;
}

export function ModuleDialog({
	open,
	onOpenChange,
	courseId,
	module,
	onSuccess,
	token,
}: ModuleDialogProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		title: module?.title || "",
		description: module?.description || "",
		orderIndex: module?.orderIndex || 1,
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			setIsSubmitting(true);

			const url = module
				? `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}/modules/${module.id}`
				: `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}/modules`;

			const method = module ? "PUT" : "POST";

			console.log("Submitting to:", url); // Debug log
			console.log("Method:", method); // Debug log
			console.log("Data:", formData); // Debug log

			const response = await fetch(url, {
				method,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(formData),
			});
			console.log("Response status:", response.status);

			if (!response.ok) {
				const errorData = await response.text();
				console.error("Error response:", errorData); // Debug log
				throw new Error(`Failed to save module: ${errorData}`);
			}

			const result = await response.json();
			console.log("Success:", result); // Debug log

			toast.success(module ? "Module updated!" : "Module created!");
			onSuccess();
			onOpenChange(false);

			// Reset form if creating new
			if (!module) {
				setFormData({ title: "", description: "", orderIndex: 1 });
			}
		} catch (err) {
			console.error("Full error:", err);
			toast.error((err as Error).message || "Failed to save module");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-2xl">
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>
							{module ? "Edit Module" : "Create New Module"}
						</DialogTitle>
						<DialogDescription>
							{module
								? "Update module information"
								: "Add a new module to organize your course content"}
						</DialogDescription>
					</DialogHeader>

					<div className="space-y-4 py-4">
						{/* Title */}
						<div className="space-y-2">
							<Label htmlFor="module-title">
								Module Title <span className="text-red-500">*</span>
							</Label>
							<Input
								id="module-title"
								placeholder="e.g., Introduction to C#"
								value={formData.title}
								onChange={(e) =>
									setFormData({ ...formData, title: e.target.value })
								}
								required
							/>
						</div>

						{/* Description */}
						<div className="space-y-2">
							<Label htmlFor="module-description">
								Description <span className="text-red-500">*</span>
							</Label>
							<Textarea
								id="module-description"
								placeholder="Brief description of what this module covers..."
								value={formData.description}
								onChange={(e) =>
									setFormData({ ...formData, description: e.target.value })
								}
								rows={4}
								required
							/>
						</div>

						{/* Order Index */}
						<div className="space-y-2">
							<Label htmlFor="module-order">
								Order <span className="text-red-500">*</span>
							</Label>
							<Input
								id="module-order"
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
							<p className="text-xs text-muted-foreground">
								The order in which this module appears in the course
							</p>
						</div>
					</div>

					<DialogFooter>
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
							) : module ? (
								"Update Module"
							) : (
								"Create Module"
							)}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
