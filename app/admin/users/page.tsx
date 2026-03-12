"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function AdminUsersPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Users</h1>
				<p className="text-muted-foreground mt-1">Manage platform users</p>
			</div>

			<Card>
				<CardContent className="py-16 text-center">
					<Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
					<h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
					<p className="text-sm text-muted-foreground">
						User management will be available soon
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
