"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Grid3x3 } from "lucide-react";

export default function AdminCategoriesPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Categories</h1>
				<p className="text-muted-foreground mt-1">
					Organize courses into categories
				</p>
			</div>

			<Card>
				<CardContent className="py-16 text-center">
					<Grid3x3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
					<h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
					<p className="text-sm text-muted-foreground">
						Category management will be available soon
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
