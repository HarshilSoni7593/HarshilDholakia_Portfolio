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
import { Download, Maximize2, Minimize2, Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

const nav = [
	{ href: "/", label: "Home" },
	{ href: "/projects", label: "Projects" },
	{ href: "/about", label: "About" },
	{ href: "/contact", label: "Get in touch" },
];

export function Navbar() {
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const pathname = usePathname();

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
