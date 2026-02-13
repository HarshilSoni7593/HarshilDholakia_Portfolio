"use client";
import Link from "next/link";
import { projects } from "../../src/data/projects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
	ExternalLink,
	Github,
	ArrowRight,
	Code2,
	Calendar,
	Filter,
} from "lucide-react";

export default function ProjectsPage() {
	const [mounted, setMounted] = useState(false);
	const [selectedFilter, setSelectedFilter] = useState<string>("All");
	const [hoveredProject, setHoveredProject] = useState<string | null>(null);

	useEffect(() => {
		setMounted(true);
	}, []);

	// Extract unique technologies from all projects
	const allTechs = Array.from(new Set(projects.flatMap((p) => p.stack))).sort();

	const filters = ["All", ...allTechs.slice(0, 8)]; // Limit to top 8 + "All"

	// Filter projects based on selected technology
	const filteredProjects =
		selectedFilter === "All"
			? projects
			: projects.filter((p) => p.stack.includes(selectedFilter));

	return (
		<main className="py-10">
			{/* Hero Section */}
			<div
				className={`mb-12 transition-all duration-1000 ${
					mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
				}`}>
				<div className="flex flex-col gap-4">
					<div className="flex items-center gap-3">
						<div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
							<Code2 className="w-6 h-6 text-white" />
						</div>
						<div>
							<h1 className="text-4xl sm:text-5xl font-bold">Projects</h1>
							<p className="text-muted-foreground">
								Showcasing {projects.length} full-stack builds and case studies
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Filter Section */}
			<div
				className={`mb-8 transition-all duration-1000 delay-200 ${
					mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
				}`}>
				<div className="flex flex-col gap-4">
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<Filter className="w-4 h-4" />
						<span>Filter by technology:</span>
					</div>
					<div className="flex flex-wrap gap-2">
						{filters.map((tech, idx) => (
							<button
								key={tech}
								onClick={() => setSelectedFilter(tech)}
								className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
									selectedFilter === tech
										? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
										: "bg-secondary text-secondary-foreground hover:bg-secondary/80"
								}`}
								style={{ animationDelay: `${idx * 50}ms` }}>
								{tech}
							</button>
						))}
					</div>
					<div className="text-xs text-muted-foreground">
						Showing {filteredProjects.length}{" "}
						{filteredProjects.length === 1 ? "project" : "projects"}
					</div>
				</div>
			</div>

			{/* Projects Grid */}
			<Section
				title="All Projects"
				description={`Showing ${filteredProjects.length} ${filteredProjects.length === 1 ? "project" : "projects"}`}>
				<div className="grid gap-6">
					{filteredProjects.map((p, idx) => (
						<Card
							key={p.slug}
							className={`group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] ${
								mounted
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-8"
							}`}
							style={{ animationDelay: `${idx * 100 + 400}ms` }}
							onMouseEnter={() => setHoveredProject(p.slug)}
							onMouseLeave={() => setHoveredProject(null)}>
							{/* Animated gradient background */}
							<div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

							{/* Sparkle effect on hover */}
							{hoveredProject === p.slug && (
								<div className="absolute top-4 right-4 animate-pulse"></div>
							)}

							<CardHeader className="relative z-10">
								<div className="flex items-start justify-between gap-4">
									<div className="flex-1">
										<CardTitle className="text-xl sm:text-2xl mb-2 group-hover:text-primary transition-colors duration-300">
											{p.title}
										</CardTitle>
										<p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
											{p.short}
										</p>
									</div>

									{/* Project number badge */}
									<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
										<span className="text-sm font-bold text-primary">
											{String(idx + 1).padStart(2, "0")}
										</span>
									</div>
								</div>
							</CardHeader>

							<CardContent className="relative z-10 flex flex-col gap-6">
								{/* Tech Stack */}
								<div className="flex flex-col gap-3">
									<div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
										<Code2 className="w-3 h-3" />
										<span>Tech Stack</span>
									</div>
									<div className="flex flex-wrap gap-2">
										{p.stack.map((s, techIdx) => (
											<Badge
												key={s}
												variant={selectedFilter === s ? "default" : "secondary"}
												className={`hover:scale-110 transition-transform duration-300 cursor-pointer ${
													selectedFilter === s
														? "shadow-lg shadow-primary/25"
														: ""
												}`}
												style={{ animationDelay: `${techIdx * 50}ms` }}
												onClick={() => setSelectedFilter(s)}>
												{s}
											</Badge>
										))}
									</div>
								</div>

								{/* Action Buttons */}
								<div className="flex flex-wrap gap-3 pt-2">
									<Button
										asChild
										size="sm"
										className="group/btn gap-2 hover:gap-3 transition-all duration-300">
										<Link href={`/projects/${p.slug}`}>
											<span>View Case Study</span>
											<ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
										</Link>
									</Button>

									{p.links
										.filter((x) => x.label !== "Case Study")
										.map((x) => (
											<Button
												key={x.href}
												asChild
												size="sm"
												variant="outline"
												className="gap-2 hover:bg-secondary/80 transition-all duration-300">
												<a
													href={x.href}
													target="_blank"
													rel="noreferrer"
													className="flex items-center">
													{x.label.toLowerCase().includes("github") ? (
														<Github className="w-3.5 h-3.5" />
													) : (
														<ExternalLink className="w-3.5 h-3.5" />
													)}
													<span>{x.label}</span>
												</a>
											</Button>
										))}
								</div>

								{/* Optional: Project metadata */}
								{p.year && (
									<div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
										<Calendar className="w-3 h-3" />
										<span>Completed in {p.year}</span>
									</div>
								)}
							</CardContent>

							{/* Hover indicator line */}
							<div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
						</Card>
					))}
				</div>

				{/* Empty State */}
				{filteredProjects.length === 0 && (
					<Card className="p-12 text-center">
						<div className="flex flex-col items-center gap-4">
							<div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
								<Code2 className="w-8 h-8 text-muted-foreground" />
							</div>
							<div>
								<h3 className="text-lg font-semibold mb-2">
									No projects found
								</h3>
								<p className="text-sm text-muted-foreground mb-4">
									No projects match the filter "{selectedFilter}"
								</p>
								<Button
									variant="outline"
									size="sm"
									onClick={() => setSelectedFilter("All")}>
									Clear Filter
								</Button>
							</div>
						</div>
					</Card>
				)}
			</Section>

			{/* Call to Action */}
			<div
				className={`mt-12 transition-all duration-1000 delay-1000 ${
					mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
				}`}>
				<Card className="bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 border-primary/20">
					<CardContent className="py-8 text-center">
						<h3 className="text-2xl font-bold mb-3">
							Interested in working together?
						</h3>
						<p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
							I'm always open to discussing new projects, creative ideas, or
							opportunities to be part of your visions.
						</p>
						<div className="flex flex-col sm:flex-row gap-3 justify-center">
							<Button asChild size="lg" className="gap-2">
								<Link href="/contact">
									<span>Get in Touch</span>
									<ArrowRight className="w-4 h-4" />
								</Link>
							</Button>
							<Button asChild size="lg" variant="outline">
								<Link href="/about">
									<span>Learn More About Me</span>
								</Link>
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</main>
	);
}
