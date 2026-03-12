"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	LayoutDashboard,
	BookOpen,
	Users,
	BarChart3,
	Menu,
	ChevronDown,
	GraduationCap,
	FileText,
	Loader2,
	Home,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
	{
		name: "Dashboard",
		href: "/admin",
		icon: LayoutDashboard,
	},
	{
		name: "Courses",
		icon: BookOpen,
		children: [
			{ name: "All Courses", href: "/admin/courses" },
			{ name: "Create Course", href: "/admin/courses/new" },
		],
	},
	{
		name: "Content",
		icon: FileText,
		children: [
			{ name: "Modules", href: "/admin/modules" },
			{ name: "Lessons", href: "/admin/lessons" },
		],
	},
	{
		name: "Users",
		href: "/admin/users",
		icon: Users,
	},
	{
		name: "Analytics",
		href: "/admin/analytics",
		icon: BarChart3,
	},
];

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const pathname = usePathname();
	const { user, isAuthenticated, isLoading } = useAuth();
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [expandedMenus, setExpandedMenus] = useState<string[]>(["Courses"]);

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			router.push("/login");
			return;
		}

		if (!isLoading && isAuthenticated && user?.role !== "Admin") {
			router.push("/learn/courses");
		}
	}, [isAuthenticated, isLoading, user, router]);

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Loader2 className="h-12 w-12 animate-spin text-primary" />
			</div>
		);
	}

	if (!isAuthenticated || user?.role !== "Admin") {
		return null;
	}

	const isActive = (href: string) => {
		if (href === "/admin") {
			return pathname === href;
		}
		return pathname.startsWith(href);
	};

	const toggleMenu = (name: string) => {
		setExpandedMenus((prev) =>
			prev.includes(name)
				? prev.filter((item) => item !== name)
				: [...prev, name],
		);
	};

	const isMenuExpanded = (name: string) => {
		return (
			expandedMenus.includes(name) ||
			navigation.find(
				(nav) =>
					nav.name === name &&
					nav.children?.some((child) => isActive(child.href)),
			)
		);
	};

	return (
		<div className="min-h-screen flex flex-col">
			{/* Mobile Sidebar Overlay */}
			{sidebarOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-40 lg:hidden"
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<aside
				className={cn(
					"fixed top-16 left-0 bottom-0 w-64 bg-card border-r z-50 transition-transform duration-300 overflow-y-auto",
					sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
				)}>
				{/* Admin Badge */}
				<div className="p-4 border-b">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
							<GraduationCap className="w-6 h-6 text-white" />
						</div>
						<div>
							<div className="font-semibold text-sm">Admin Panel</div>
							<div className="text-xs text-muted-foreground">
								Manage Platform
							</div>
						</div>
					</div>
				</div>

				{/* Navigation */}
				<nav className="p-4 pb-20 space-y-1">
					{navigation.map((item) => (
						<div key={item.name}>
							{item.children ? (
								<>
									{/* Parent Menu Item with Children */}
									<button
										onClick={() => toggleMenu(item.name)}
										className={cn(
											"w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
											isMenuExpanded(item.name)
												? "bg-primary/10 text-primary"
												: "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
										)}>
										<div className="flex items-center gap-3">
											<item.icon className="h-5 w-5" />
											<span>{item.name}</span>
										</div>
										<ChevronDown
											className={cn(
												"h-4 w-4 transition-transform duration-200",
												isMenuExpanded(item.name) && "rotate-180",
											)}
										/>
									</button>

									{/* Submenu */}
									{isMenuExpanded(item.name) && (
										<div className="ml-9 mt-1 space-y-1">
											{item.children.map((child) => (
												<Link key={child.href} href={child.href}>
													<div
														className={cn(
															"px-3 py-2 rounded-lg text-sm font-medium transition-all",
															isActive(child.href)
																? "bg-primary text-primary-foreground shadow-sm"
																: "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
														)}>
														{child.name}
													</div>
												</Link>
											))}
										</div>
									)}
								</>
							) : (
								/* Single Menu Item */
								<Link href={item.href!}>
									<div
										className={cn(
											"flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
											isActive(item.href!)
												? "bg-primary text-primary-foreground shadow-sm"
												: "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
										)}>
										<item.icon className="h-5 w-5" />
										<span>{item.name}</span>
									</div>
								</Link>
							)}
						</div>
					))}
				</nav>

				{/* Bottom Section */}
				<div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-card">
					<Link href="/learn/courses">
						<Button
							variant="outline"
							className="w-full justify-start gap-2"
							size="sm">
							<Home className="h-4 w-4" />
							<span>Student View</span>
						</Button>
					</Link>
				</div>
			</aside>

			{/* Mobile Menu Button */}
			<div className="lg:hidden fixed top-20 left-4 z-30">
				<Button
					variant="outline"
					size="icon"
					onClick={() => setSidebarOpen(true)}
					className="shadow-lg">
					<Menu className="h-5 w-5" />
				</Button>
			</div>

			{/* Main Content Wrapper */}
			<div className="flex-1 lg:pl-64">
				<main className="min-h-[calc(100vh-4rem)] max-w-full overflow-x-hidden">
					<div className="p-6 lg:p-8">{children}</div>
				</main>
			</div>
		</div>
	);
}
