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
	Download,
	Maximize2,
	Minimize2,
	ExternalLink,
	FileText,
} from "lucide-react";

import { useState } from "react";

const nav = [
	{ href: "/", label: "Home" },
	{ href: "/projects", label: "Projects" },
	{ href: "/about", label: "About" },
	{ href: "/contact", label: "Get in touch" },
];

export function Navbar() {
	const [isFullscreen, setIsFullscreen] = useState(false);
	return (
		<header className="border-b">
			<div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
				<Link href="/" className="font-semibold tracking-tight">
					Harshil Dholakia
				</Link>

				<nav className="hidden sm:flex items-center gap-1">
					{nav.map((x) => (
						<Button key={x.href} asChild variant="ghost">
							<Link href={x.href}>{x.label}</Link>
						</Button>
					))}
				</nav>

				<div className="flex items-center gap-2">
					{/* Resume Dialog */}
					<Dialog>
						<DialogTrigger asChild>
							<Button variant="outline" className="hidden sm:inline-flex gap-2">
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
										{/* Download Button */}
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

										{/* Fullscreen Toggle */}
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

							{/* PDF Viewer */}
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
			</div>
		</header>
	);
}
