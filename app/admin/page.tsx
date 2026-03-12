"use client";

import { useEffect, useState } from "react";
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
import Link from "next/link";
import {
	BookOpen,
	Users,
	TrendingUp,
	Plus,
	ArrowUpRight,
	Eye,
	DollarSign,
	Clock,
	Award,
} from "lucide-react";

export default function AdminDashboard() {
	const { token, user } = useAuth();
	const [stats, setStats] = useState({
		totalCourses: 0,
		publishedCourses: 0,
		draftCourses: 0,
		totalEnrollments: 0,
	});

	useEffect(() => {
		loadStats();
	}, [token]);

	const loadStats = async () => {
		if (!token) return;

		try {
			const courses = await courseApi.getAllCourses(token);

			setStats({
				totalCourses: courses.length,
				publishedCourses: courses.filter((c) => c.isPublished).length,
				draftCourses: courses.filter((c) => !c.isPublished).length,
				totalEnrollments: courses.reduce((sum, c) => sum + c.enrolledCount, 0),
			});
		} catch (err) {
			console.error("Failed to load stats:", err);
		}
	};

	const statCards = [
		{
			title: "Total Courses",
			value: stats.totalCourses,
			change: "+12.5%",
			trend: "up",
			icon: BookOpen,
			gradient: "from-blue-500 to-blue-600",
			bgGradient: "from-blue-500/10 to-blue-600/10",
		},
		{
			title: "Total Students",
			value: stats.totalEnrollments,
			change: "+23.1%",
			trend: "up",
			icon: Users,
			gradient: "from-green-500 to-green-600",
			bgGradient: "from-green-500/10 to-green-600/10",
		},
		{
			title: "Published",
			value: stats.publishedCourses,
			change: `${stats.draftCourses} drafts`,
			trend: "neutral",
			icon: Eye,
			gradient: "from-purple-500 to-purple-600",
			bgGradient: "from-purple-500/10 to-purple-600/10",
		},
		{
			title: "Completion Rate",
			value: "68%",
			change: "+5.2%",
			trend: "up",
			icon: Award,
			gradient: "from-orange-500 to-orange-600",
			bgGradient: "from-orange-500/10 to-orange-600/10",
		},
	];

	return (
		<div className="space-y-8">
			{/* Page Header */}
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
					<p className="text-muted-foreground mt-1">
						Welcome back, {user?.firstName}! Here's what's happening today.
					</p>
				</div>
				<div className="flex gap-3">
					<Button variant="outline">
						<Clock className="mr-2 h-4 w-4" />
						Activity Log
					</Button>
					<Button asChild>
						<Link href="/admin/courses/new">
							<Plus className="mr-2 h-4 w-4" />
							Create Course
						</Link>
					</Button>
				</div>
			</div>

			{/* Stats Grid */}
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				{statCards.map((stat) => (
					<Card key={stat.title} className="relative overflow-hidden">
						<div
							className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-50`}></div>
						<CardHeader className="relative flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-medium text-muted-foreground">
								{stat.title}
							</CardTitle>
							<div
								className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient}`}>
								<stat.icon className="h-4 w-4 text-white" />
							</div>
						</CardHeader>
						<CardContent className="relative">
							<div className="text-3xl font-bold">{stat.value}</div>
							<div className="flex items-center gap-1 mt-1">
								{stat.trend === "up" && (
									<ArrowUpRight className="h-4 w-4 text-green-600" />
								)}
								<span
									className={`text-xs font-medium ${
										stat.trend === "up"
											? "text-green-600"
											: "text-muted-foreground"
									}`}>
									{stat.change}
								</span>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Two Column Layout */}
			<div className="grid gap-6 lg:grid-cols-2">
				{/* Recent Courses */}
				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<div>
								<CardTitle>Recent Courses</CardTitle>
								<CardDescription>Latest published courses</CardDescription>
							</div>
							<Button variant="ghost" size="sm" asChild>
								<Link href="/admin/courses">View All</Link>
							</Button>
						</div>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{[1, 2, 3].map((i) => (
								<div
									key={i}
									className="flex items-center gap-4 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer">
									<div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold">
										C#
									</div>
									<div className="flex-1 min-w-0">
										<div className="font-medium truncate">Course Title {i}</div>
										<div className="text-sm text-muted-foreground">
											12 lessons • 45 students
										</div>
									</div>
									<Button variant="ghost" size="sm">
										<Eye className="h-4 w-4" />
									</Button>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Quick Actions */}
				<Card>
					<CardHeader>
						<CardTitle>Quick Actions</CardTitle>
						<CardDescription>Common tasks and shortcuts</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid gap-3">
							<Button
								asChild
								className="justify-start h-auto py-4"
								variant="outline">
								<Link href="/admin/courses/new">
									<div className="flex items-center gap-3">
										<div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950">
											<Plus className="h-5 w-5 text-blue-600" />
										</div>
										<div className="text-left">
											<div className="font-medium">Create New Course</div>
											<div className="text-xs text-muted-foreground">
												Start building content
											</div>
										</div>
									</div>
								</Link>
							</Button>
							<Button
								asChild
								className="justify-start h-auto py-4"
								variant="outline">
								<Link href="/admin/courses">
									<div className="flex items-center gap-3">
										<div className="p-2 rounded-lg bg-green-100 dark:bg-green-950">
											<BookOpen className="h-5 w-5 text-green-600" />
										</div>
										<div className="text-left">
											<div className="font-medium">Manage Courses</div>
											<div className="text-xs text-muted-foreground">
												Edit existing content
											</div>
										</div>
									</div>
								</Link>
							</Button>
							<Button
								asChild
								className="justify-start h-auto py-4"
								variant="outline">
								<Link href="/learn/courses">
									<div className="flex items-center gap-3">
										<div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950">
											<Eye className="h-5 w-5 text-purple-600" />
										</div>
										<div className="text-left">
											<div className="font-medium">Preview Platform</div>
											<div className="text-xs text-muted-foreground">
												View as student
											</div>
										</div>
									</div>
								</Link>
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Activity Chart Placeholder */}
			<Card>
				<CardHeader>
					<CardTitle>Platform Activity</CardTitle>
					<CardDescription>Student engagement over time</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg">
						<div className="text-center">
							<TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
							<p className="text-sm text-muted-foreground">
								Analytics chart coming soon
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
