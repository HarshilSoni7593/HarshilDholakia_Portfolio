"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function AdminLessonsPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Lessons</h1>
				<p className="text-muted-foreground mt-1">Manage course lessons</p>
			</div>

			<Card>
				<CardContent className="py-16 text-center">
					<FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
					<h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
					<p className="text-sm text-muted-foreground">
						Lesson management will be available soon
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
