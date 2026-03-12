"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/src/components/animate-ui/components/backgrounds/theme-toggle";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Download,
	Maximize2,
	Minimize2,
	Menu,
	User,
	LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { label } from "motion/react-client";

const nav = [
	{ href: "/", label: "Home" },
	{ href: "/projects", label: "Projects" },
	{ href: "/about", label: "About" },
	{ href: "/learn", label: "Learn With Me" },
	{ href: "/contact", label: "Get in touch" },
];

export function Navbar() {
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isClient, setIsClient] = useState(false);
	const pathname = usePathname();
	const router = useRouter();
	const { user, isAuthenticated, logout } = useAuth();

	useEffect(() => {
		setIsClient(true);
	}, []);

	const handleLogout = () => {
		logout();
		router.push("/");
	};

	return (
		<header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
				{/* Logo */}
				<Link
					href="/"
					className="font-semibold tracking-tight text-lg hover:text-primary transition-colors">
					Harshil Dholakia
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden sm:flex items-center gap-1">
					{nav.map((x) => (
						<Button
							key={x.href}
							asChild
							variant={pathname === x.href ? "default" : "ghost"}>
							<Link href={x.href}>{x.label}</Link>
						</Button>
					))}
				</nav>

				{/* Desktop Actions */}
				<div className="hidden sm:flex items-center gap-2">
					{/* Resume Dialog */}
					<Dialog>
						<DialogTrigger asChild>
							<Button variant="outline" className="gap-2">
								<span>Resume</span>
							</Button>
						</DialogTrigger>
						<DialogContent
							className={`${
								isFullscreen ? "max-w-[100vw] h-[95vh]" : "max-w-6xl h-[80vh]"
							} transition-all duration-300 p-0 gap-0 flex flex-col`}>
							<DialogHeader className="px-6 py-4 border-b shrink-0">
								<div className="flex items-center justify-between">
									<DialogTitle>Resume - Harshil Dholakia</DialogTitle>
									<div className="flex items-center gap-2">
										<Button
											asChild
											variant="outline"
											size="sm"
											className="gap-2">
											<a
												href="/HarshilDholakia_Resume.pdf"
												download="HarshilDholakia_Resume.pdf">
												<Download className="w-4 h-4" />
												<span className="hidden sm:inline">Download</span>
											</a>
										</Button>
										<Button
											variant="ghost"
											size="sm"
											onClick={() => setIsFullscreen(!isFullscreen)}>
											{isFullscreen ? (
												<Minimize2 className="w-4 h-4" />
											) : (
												<Maximize2 className="w-4 h-4" />
											)}
										</Button>
									</div>
								</div>
							</DialogHeader>
							<div className="flex-1 overflow-hidden">
								<iframe
									src="/HarshilDholakia_Resume.pdf#toolbar=1"
									className="w-full h-full"
									title="Resume"
								/>
							</div>
						</DialogContent>
					</Dialog>

					{isAuthenticated ? (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon">
									<User className="h-5 w-5" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>
									{user?.firstName} {user?.lastName}
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem asChild>
									<Link href="/learn/courses/my-courses">My Courses</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link href="/learn/progress">Progress</Link>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={handleLogout}
									className="text-red-600">
									<LogOut className="w-4 h-4 mr-2" />
									Logout
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<Button asChild>
							<Link href="/auth/login">Login</Link>
						</Button>
					)}
					<ThemeToggle />
				</div>

				{/* Mobile Actions */}
				<div className="flex sm:hidden items-center gap-2">
					<ThemeToggle />

					{/* Mobile Menu */}
					<Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon">
								<Menu className="h-5 w-5" />
								<span className="sr-only">Toggle menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-[300px] sm:w-[400px] p-6">
							<SheetHeader>
								<SheetTitle>Menu</SheetTitle>
							</SheetHeader>
							<nav className="flex flex-col gap-4 mt-8">
								{nav.map((x) => (
									<Button
										key={x.href}
										asChild
										variant={pathname === x.href ? "default" : "ghost"}
										className="w-full justify-start text-lg"
										onClick={() => setIsMobileMenuOpen(false)}>
										<Link href={x.href}>{x.label}</Link>
									</Button>
								))}

								{isAuthenticated ? (
									<>
										<div className="px-4 py-2 text-sm text-muted-foreground">
											{user?.firstName} {user?.lastName}
										</div>
										<Button
											variant="outline"
											className="w-full justify-start text-lg"
											onClick={handleLogout}>
											<LogOut className="w-4 h-4 mr-2" />
											Logout
										</Button>
									</>
								) : (
									<Button asChild className="w-full">
										<Link href="/login">Login</Link>
									</Button>
								)}

								{/* Resume Button in Mobile Menu */}
								<Dialog>
									<DialogTrigger asChild>
										<Button
											variant="outline"
											className="w-full justify-start text-lg gap-2">
											<span>Resume</span>
										</Button>
									</DialogTrigger>
									<DialogContent className="max-w-[95vw] h-[85vh] p-0 gap-0 flex flex-col">
										<DialogHeader className="px-4 py-3 border-b shrink-0">
											<div className="flex items-center justify-between">
												<DialogTitle className="text-sm">Resume</DialogTitle>
												<div className="flex items-center gap-2">
													<Button
														asChild
														variant="outline"
														size="sm"
														className="gap-2">
														<a
															href="/HarshilDholakia_Resume.pdf"
															download="HarshilDholakia_Resume.pdf">
															<Download className="w-4 h-4" />
														</a>
													</Button>
												</div>
											</div>
										</DialogHeader>
										<div className="flex-1 overflow-hidden">
											<iframe
												src="/HarshilDholakia_Resume.pdf#toolbar=1"
												className="w-full h-full"
												title="Resume"
											/>
										</div>
									</DialogContent>
								</Dialog>
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
