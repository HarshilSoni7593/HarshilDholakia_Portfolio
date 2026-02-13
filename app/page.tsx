"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/site/section";
import { projects } from "../src/data/projects";

export default function HomePage() {
	const featured = projects.slice(0, 2);

	return (
		<>
			{/* <header className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          left stuff
          <div className="flex items-center gap-3">
          </div>
        </div>
      </header> */}
			<main className="py-10">
				<section className="py-14">
					<div className="flex flex-col gap-6">
						<div className="flex flex-col gap-4">
							<h1 className="text-4xl sm:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-muted-foreground animate-gradient">
								Harshil Dholakia
								<span className="block text-muted-foreground text-xl sm:text-3xl font-medium mt-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 dark:from-purple-400 dark:via-blue-400 dark:to-cyan-400">
									Full-Stack Developer specializing in ASP.NET & SQL Server
								</span>
							</h1>

							<p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
								I specialize in building end-to-end applications with modern web
								technologies and enterprise-grade backend systems. From Database
								design, Backend in ASP.NET to React frontends, I deliver
								production-ready solutions that scale.
							</p>
						</div>

						<div
							className={`grid grid-cols-2 sm:grid-cols-4 gap-4 transition-all duration-2000 delay-2000`}>
							<StatCard
								number="2+"
								label="Years Experience"
								delay="delay-[20000ms]"
							/>
							<StatCard
								number={String(projects.length)}
								label="Projects Delivered"
								delay="delay-[30000ms]"
							/>
							<StatCard
								number="2025"
								label="Graduate - Conestoga"
								delay="delay-[40000ms]"
							/>
							<StatCard
								number="100%"
								label="Support in ERP implementation"
								delay="delay-[50000ms]"
							/>
						</div>

						{/* Tech Stack with Logos */}
						<div className="flex flex-col gap-4">
							<p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
								Core Technologies
							</p>
							<div className="flex flex-wrap gap-3">
								{/* ASP.NET */}
								<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#512BD4]/10 border border-[#512BD4]/20 backdrop-blur-sm">
									<Image
										src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg"
										alt="ASP.NET"
										width={20}
										height={20}
										className="w-5 h-5"
									/>
									<span className="text-sm font-medium text-[#512BD4]">
										ASP.NET
									</span>
								</div>

								{/* Next.js */}
								<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/10 dark:bg-white/10 border border-black/20 dark:border-white/20 backdrop-blur-sm">
									<Image
										src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
										alt="Next.js"
										width={20}
										height={20}
										className="w-5 h-5 dark:invert"
									/>
									<span className="text-sm font-medium">Next.js</span>
								</div>

								{/* TypeScript */}
								<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3178C6]/10 border border-[#3178C6]/20 backdrop-blur-sm">
									<Image
										src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
										alt="TypeScript"
										width={20}
										height={20}
										className="w-5 h-5"
									/>
									<span className="text-sm font-medium text-[#3178C6]">
										TypeScript
									</span>
								</div>

								{/* React */}
								<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#61DAFB]/10 border border-[#61DAFB]/20 backdrop-blur-sm">
									<Image
										src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
										alt="React"
										width={20}
										height={20}
										className="w-5 h-5"
									/>
									<span className="text-sm font-medium text-[#61DAFB]">
										React
									</span>
								</div>

								{/* Node.js */}
								<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#339933]/10 border border-[#339933]/20 backdrop-blur-sm">
									<Image
										src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
										alt="Node.js"
										width={20}
										height={20}
										className="w-5 h-5"
									/>
									<span className="text-sm font-medium text-[#339933]">
										Node.js
									</span>
								</div>

								{/* MSSQL */}
								<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#CC2927]/10 border border-[#CC2927]/20 backdrop-blur-sm">
									<Image
										src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg"
										alt="MSSQL"
										width={20}
										height={20}
										className="w-5 h-5"
									/>
									<span className="text-sm font-medium text-[#CC2927]">
										MSSQL
									</span>
								</div>

								{/* MongoDB */}
								<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#47A248]/10 border border-[#47A248]/20 backdrop-blur-sm">
									<Image
										src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
										alt="MongoDB"
										width={20}
										height={20}
										className="w-5 h-5"
									/>
									<span className="text-sm font-medium text-[#47A248]">
										MongoDB
									</span>
								</div>

								{/* Flutter */}
								<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#02569B]/10 border border-[#02569B]/20 backdrop-blur-sm">
									<Image
										src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg"
										alt="Flutter"
										width={20}
										height={20}
										className="w-5 h-5"
									/>
									<span className="text-sm font-medium text-[#02569B]">
										Flutter
									</span>
								</div>

								{/* Git */}
								<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F05032]/10 border border-[#F05032]/20 backdrop-blur-sm">
									<Image
										src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
										alt="Git"
										width={20}
										height={20}
										className="w-5 h-5"
									/>
									<span className="text-sm font-medium text-[#F05032]">
										Git
									</span>
								</div>
							</div>
						</div>

						{/* Key Capabilities - Enhanced */}
						<div className="grid sm:grid-cols-3 gap-6 py-6">
							<div className="group relative overflow-hidden rounded-xl border bg-card p-6 hover:shadow-lg transition-all duration-300">
								<div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
								<div className="relative z-10 flex flex-col gap-3">
									<div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-2xl">
										⚡
									</div>
									<h3 className="text-xl font-semibold">Backend Systems</h3>
									<p className="text-sm text-muted-foreground leading-relaxed">
										Building robust RESTful APIs, designing scalable database
										architectures, and implementing complex server-side logic
										with ASP.NET Core and Node.js. Experience with both SQL and
										NoSQL databases for optimal data management.
									</p>
									<div className="flex flex-wrap gap-2 mt-2">
										<Badge variant="outline" className="text-xs">
											API Design
										</Badge>
										<Badge variant="outline" className="text-xs">
											Database Schema
										</Badge>
										<Badge variant="outline" className="text-xs">
											Authentication
										</Badge>
									</div>
								</div>
							</div>

							<div className="group relative overflow-hidden rounded-xl border bg-card p-6 hover:shadow-lg transition-all duration-300">
								<div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
								<div className="relative z-10 flex flex-col gap-3">
									<div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center text-2xl">
										🎨
									</div>
									<h3 className="text-xl font-semibold">Modern Frontends</h3>
									<p className="text-sm text-muted-foreground leading-relaxed">
										Creating responsive, performant user interfaces with React,
										Next.js, and TypeScript. From pixel-perfect designs to
										smooth animations, I build experiences users love with
										mobile-first approaches.
									</p>
									<div className="flex flex-wrap gap-2 mt-2">
										<Badge variant="outline" className="text-xs">
											Responsive Design
										</Badge>
										<Badge variant="outline" className="text-xs">
											State Management
										</Badge>
										<Badge variant="outline" className="text-xs">
											Performance
										</Badge>
									</div>
								</div>
							</div>

							<div className="group relative overflow-hidden rounded-xl border bg-card p-6 hover:shadow-lg transition-all duration-300">
								<div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
								<div className="relative z-10 flex flex-col gap-3">
									<div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center text-2xl">
										🚀
									</div>
									<h3 className="text-xl font-semibold">DevOps & Deployment</h3>
									<p className="text-sm text-muted-foreground leading-relaxed">
										Managing the complete deployment lifecycle from version
										control (Git/SVN) to production servers. Implementing CI/CD
										pipelines, server configuration, and ensuring reliable
										application delivery.
									</p>
									<div className="flex flex-wrap gap-2 mt-2">
										<Badge variant="outline" className="text-xs">
											Version Control
										</Badge>
										<Badge variant="outline" className="text-xs">
											Server Management
										</Badge>
										<Badge variant="outline" className="text-xs">
											CI/CD
										</Badge>
									</div>
								</div>
							</div>
						</div>

						{/* CTA Buttons */}
						<div className="flex flex-col sm:flex-row gap-3 pt-2">
							<Button asChild size="lg">
								<Link href="/projects">View My Work</Link>
							</Button>
							<Button asChild variant="outline" size="lg">
								<Link href="/contact">Get In Touch</Link>
							</Button>
						</div>
					</div>
				</section>

				{/* Featured Projects */}
				<Section
					title="Featured Projects"
					description="A few projects that best represent my work.">
					<div className="grid gap-4 sm:grid-cols-2">
						{featured.map((p) => (
							<Card key={p.slug} className="h-full">
								<CardHeader>
									<CardTitle className="text-lg">{p.title}</CardTitle>
									<p className="text-sm text-muted-foreground">{p.short}</p>
								</CardHeader>
								<CardContent className="flex flex-col gap-4">
									<div className="flex flex-wrap gap-2">
										{p.stack.slice(0, 4).map((s) => (
											<Badge key={s} variant="secondary">
												{s}
											</Badge>
										))}
									</div>
									<div className="flex gap-2">
										<Button asChild size="sm">
											<Link href={`/projects/${p.slug}`}>Case Study</Link>
										</Button>
										<Button asChild size="sm" variant="outline">
											<Link href="/projects">All Projects</Link>
										</Button>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</Section>
			</main>
		</>
	);
}
function StatCard({
	number,
	label,
	delay,
}: {
	number: string;
	label: string;
	delay: string;
}) {
	return (
		<div
			className={`group flex flex-col gap-1 p-4 rounded-lg border bg-card/50 backdrop-blur-sm hover:bg-card transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in ${delay}`}>
			<div className="text-2xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
				{number}
			</div>
			<div className="text-sm text-muted-foreground">{label}</div>
		</div>
	);
}
