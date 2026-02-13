"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
	ArrowLeft,
	ExternalLink,
	Github,
	Calendar,
	Users,
	Target,
	Lightbulb,
	Code2,
	Zap,
	CheckCircle2,
	TrendingUp,
	ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";

// Update your Project interface to match this
interface Feature {
	title: string;
	description: string;
}

interface Result {
	metric: string;
	description: string;
}

interface Project {
	slug: string;
	title: string;
	short: string;
	stack: string[];
	links: { label: string; href: string }[];
	highlights: string[];
	year?: number;
	role?: string;
	duration?: string;
	overview?: string;
	hurdles?: { challenge: string; solution: string }[];
	features?: Feature[];
	technical?: string[];
	results?: Result[];
	learnings?: string[];
}

export default function ProjectPageClient({
	project,
	nextProject,
}: {
	project: Project;
	nextProject: Project;
}) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<main className="py-10">
			{/* Back Button */}
			<div
				className={`mb-8 transition-all duration-1000 ${
					mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
				}`}>
				<div className="flex items-center justify-between gap-4">
					{/* Back to Projects - Left */}
					<Button
						asChild
						variant="ghost"
						className="gap-2 hover:gap-3 transition-all duration-300">
						<Link href="/projects">
							<ArrowLeft className="w-4 h-4" />
							<span>Back to Projects</span>
						</Link>
					</Button>

					{/* Next Project - Right */}
					<Button
						asChild
						variant="ghost"
						className="gap-2 hover:gap-3 transition-all duration-300">
						<Link href={`/projects/${nextProject.slug}`}>
							<span>Next Project</span>
							<ChevronRight className="w-4 h-4" />
						</Link>
					</Button>
				</div>
			</div>

			{/* Hero Section */}
			<div
				className={`mb-12 transition-all duration-1000 delay-100 ${
					mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
				}`}>
				<div className="flex flex-col gap-6">
					<div>
						<h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
							{project.title}
						</h1>
						<p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
							{project.short}
						</p>
					</div>

					{/* Project Meta */}
					<div className="flex flex-wrap gap-4">
						{project.year && (
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<Calendar className="w-4 h-4" />
								<span>{project.year}</span>
							</div>
						)}
						{project.role && (
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<Users className="w-4 h-4" />
								<span>{project.role}</span>
							</div>
						)}
						{project.duration && (
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<TrendingUp className="w-4 h-4" />
								<span>{project.duration}</span>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Tech Stack */}
			<div
				className={`mb-12 transition-all duration-1000 delay-200 ${
					mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
				}`}>
				<Card>
					<CardContent className="py-6">
						<div className="flex items-center gap-3 mb-4">
							<div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
								<Code2 className="w-5 h-5 text-primary" />
							</div>
							<h2 className="text-2xl font-bold">Technology Stack</h2>
						</div>
						<div className="flex flex-wrap gap-2">
							{project.stack.map((tech, idx) => (
								<Badge
									key={tech}
									variant="secondary"
									className="text-sm px-3 py-1.5 hover:scale-110 transition-transform duration-300"
									style={{ animationDelay: `${idx * 50}ms` }}>
									{tech}
								</Badge>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Project Overview */}
			<div
				className={`mb-12 transition-all duration-1000 delay-300 ${
					mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
				}`}>
				<h2 className="text-3xl font-bold mb-6">Project Overview</h2>
				<Card>
					<CardContent className="py-6 space-y-6">
						{project.highlights && (
							<div>
								<p className="text-muted-foreground leading-relaxed">
									{project.highlights.map((highlight, idx) => (
										<span key={idx}>
											- {highlight}
											{idx < project.highlights.length - 1 && <br />}
										</span>
									))}
								</p>
							</div>
						)}
					</CardContent>
				</Card>
			</div>

			{/* Challenge */}
			{project.hurdles && project.hurdles.length > 0 && (
				<div className="mb-12 space-y-4">
					<div className="flex items-center gap-2">
						<Target className="w-5 h-5 text-primary" />
						<h3 className="text-xl font-semibold">Challenges & Solutions</h3>
					</div>
					<div className="grid gap-4">
						{project.hurdles.map((hurdle, idx) => (
							<div
								key={idx}
								className="overflow-hidden hover:shadow-lg transition-all duration-300">
								<div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
									{/* Challenge Side */}
									<CardContent className="py-4 bg-red-500/5">
										<div className="flex items-start gap-3">
											<div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
												<Target className="w-4 h-4 text-red-600 dark:text-red-400" />
											</div>
											<div className="flex-1">
												<h4 className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">
													Challenge {idx + 1}
												</h4>
												<p className="text-sm text-muted-foreground leading-relaxed">
													{hurdle.challenge}
												</p>
											</div>
										</div>
									</CardContent>

									{/* Solution Side */}
									<CardContent className="py-4 bg-green-500/5">
										<div className="flex items-start gap-3">
											<div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
												<Lightbulb className="w-4 h-4 text-green-600 dark:text-green-400" />
											</div>
											<div className="flex-1">
												<h4 className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">
													Solution
												</h4>
												<p className="text-sm text-muted-foreground leading-relaxed">
													{hurdle.solution}
												</p>
											</div>
										</div>
									</CardContent>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Key Features */}
			{project.features && project.features.length > 0 && (
				<div
					className={`mb-12 transition-all duration-1000 delay-400 ${
						mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
					}`}>
					<h2 className="text-3xl font-bold mb-6">Key Features</h2>
					<div className="grid sm:grid-cols-2 gap-4">
						{project.features.map((feature, idx) => (
							<Card
								key={idx}
								className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
								<CardContent className="py-6">
									<div className="flex items-start gap-3">
										<div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
											<Zap className="w-4 h-4 text-primary" />
										</div>
										<div>
											<h3 className="font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
												{feature.title}
											</h3>
											<p className="text-sm text-muted-foreground leading-relaxed">
												{feature.description}
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			)}

			{/* Technical Highlights */}
			{project.technical && project.technical.length > 0 && (
				<div
					className={`mb-12 transition-all duration-1000 delay-500 ${
						mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
					}`}>
					<h2 className="text-3xl font-bold mb-6">Technical Highlights</h2>
					<Card>
						<CardContent className="py-6">
							<ul className="space-y-4">
								{project.technical.map((item, idx) => (
									<li key={idx} className="flex items-start gap-3">
										<CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
										<span className="text-muted-foreground leading-relaxed">
											{item}
										</span>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>
				</div>
			)}

			{/* Results/Impact */}
			{project.results && project.results.length > 0 && (
				<div
					className={`mb-12 transition-all duration-1000 delay-600 ${
						mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
					}`}>
					<h2 className="text-3xl font-bold mb-6">Results & Impact</h2>
					<div className="grid sm:grid-cols-3 gap-4">
						{project.results.map((result, idx) => (
							<Card
								key={idx}
								className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
								<CardContent className="py-6">
									<div className="text-3xl font-bold text-primary mb-2">
										{result.metric}
									</div>
									<p className="text-sm text-muted-foreground">
										{result.description}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			)}

			{/* Learnings */}
			{project.learnings && project.learnings.length > 0 && (
				<div
					className={`mb-12 transition-all duration-1000 delay-700 ${
						mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
					}`}>
					<h2 className="text-3xl font-bold mb-6">Key Learnings</h2>
					<Card>
						<CardContent className="py-6">
							<ul className="space-y-3">
								{project.learnings.map((learning, idx) => (
									<li key={idx} className="flex items-start gap-3">
										<ChevronRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
										<span className="text-muted-foreground leading-relaxed">
											{learning}
										</span>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>
				</div>
			)}

			{/* Next Project Navigation */}
			<div
				className={`mt-16 transition-all duration-1000 delay-800 ${
					mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
				}`}>
				<Card className="bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 border-primary/20 hover:shadow-xl transition-all duration-300">
					<CardContent className="py-8">
						<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
							<div>
								<p className="text-sm text-muted-foreground mb-2">
									Next Project
								</p>
								<h3 className="text-2xl font-bold">{nextProject.title}</h3>
								<p className="text-muted-foreground mt-1">
									{nextProject.short}
								</p>
							</div>
							<Button asChild size="lg" className="gap-2">
								<Link href={`/projects/${nextProject.slug}`}>
									<span>View Project</span>
									<ChevronRight className="w-4 h-4" />
								</Link>
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</main>
	);
}
