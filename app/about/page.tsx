"use client";
import Image from "next/image";
import { Section } from "@/components/site/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import {
	Calendar,
	GraduationCap,
	MapPin,
	Briefcase,
	Code2,
	Database,
	Globe,
	Server,
	Laptop,
	Award,
	CheckCircle2,
} from "lucide-react";

export default function AboutPage() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<main className="py-10">
			{/* Hero Section */}
			<div
				className={`mb-12 transition-all duration-1000 ${
					mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
				}`}>
				<div className="flex flex-col gap-6">
					<div className="flex items-start gap-6">
						<div className="relative group">
							<div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-4xl font-bold text-white shadow-xl group-hover:scale-105 transition-transform duration-300">
								HD
							</div>
							<div className="absolute -inset-1 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
						</div>

						<div className="flex-1">
							<h1 className="text-4xl sm:text-5xl font-bold mb-3">
								Harshil Dholakia
							</h1>
							<p className="text-xl text-muted-foreground mb-4">
								Full-Stack Developer | ASP.NET & SQL Server Specialist
							</p>
							<div className="flex flex-wrap gap-2">
								<InfoBadge
									icon={<MapPin className="w-3 h-3" />}
									text="Ontario, Canada"
								/>
								<InfoBadge
									icon={<Briefcase className="w-3 h-3" />}
									text="Open to Work"
									color="green"
								/>
								<InfoBadge
									icon={<GraduationCap className="w-3 h-3" />}
									text="Conestoga College Graduate"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Professional Summary */}
			<Section
				title="Professional Summary"
				description="Who I am and what I do">
				<Card
					className={`transition-all duration-1000 delay-200 hover:shadow-lg ${
						mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
					}`}>
					<CardContent className="py-6 space-y-4">
						<p className="text-lg leading-relaxed">
							I'm a{" "}
							<strong className="text-foreground">full-stack developer</strong>{" "}
							with a strong foundation in enterprise-grade backend systems and
							modern frontend technologies. Recently completed the post
							graduation diploma from{" "}
							<strong className="text-foreground">
								{" "}
								Conestoga College's Web development program (2025)
							</strong>
							, I bring hands-on experience building production-ready
							applications from the ground up.
						</p>
						<p className="text-muted-foreground leading-relaxed">
							My expertise lies in{" "}
							<strong className="text-foreground">ASP.NET</strong> and
							<strong className="text-foreground"> Microsoft SQL Server</strong>
							, where I've developed strong backend systems, designed normalized
							database schemas, and implemented complex business logic with
							stored procedures and triggers. On the frontend, I create
							responsive, user-friendly interfaces using{" "}
							<strong className="text-foreground">
								React, Next.js, and TypeScript
							</strong>
							.
						</p>
						<p className="text-muted-foreground leading-relaxed">
							I'm passionate about writing clean, maintainable code and building
							systems that scale. Whether it's architecting a database,
							designing an API, or crafting a seamless user experience, I
							approach every project with attention to detail and a commitment
							to quality.
						</p>
					</CardContent>
				</Card>
			</Section>

			{/* Technical Expertise */}
			<Section
				title="Technical Expertise"
				description="Technologies and tools I work with">
				<div className="grid md:grid-cols-2 gap-6">
					<ExpertiseCard
						icon={<Server className="w-6 h-6" />}
						title="Backend Development"
						skills={[
							"ASP.NET Core / .NET Framework",
							"C# & Entity Framework",
							"RESTful API Design",
							"Microsoft SQL Server",
							"T-SQL, Stored Procedures, Triggers",
							"Node.js & Express",
							"MongoDB & NoSQL Databases",
							"Authentication & Authorization",
						]}
						color="purple"
						delay="delay-300"
						mounted={mounted}
					/>

					<ExpertiseCard
						icon={<Laptop className="w-6 h-6" />}
						title="Frontend Development"
						skills={[
							"React.js & Next.js",
							"TypeScript & JavaScript (ES6+)",
							"HTML5, CSS3, Tailwind CSS",
							"Responsive & Mobile-First Design",
							"State Management (Context, Redux)",
							"Component Libraries (shadcn/ui)",
							"AJAX, Fetch API, Axios",
							"jQuery (Legacy Support)",
						]}
						color="blue"
						delay="delay-400"
						mounted={mounted}
					/>

					<ExpertiseCard
						icon={<Code2 className="w-6 h-6" />}
						title="Mobile Development"
						skills={[
							"Flutter & Dart",
							"Cross-platform Mobile Apps",
							"Material Design",
							"State Management (Provider, Bloc)",
							"REST API Integration",
							"Local Storage & SQLite",
							"Firebase Integration",
						]}
						color="cyan"
						delay="delay-500"
						mounted={mounted}
					/>

					<ExpertiseCard
						icon={<Globe className="w-6 h-6" />}
						title="DevOps & Tools"
						skills={[
							"Git & GitHub",
							"VisualSVN & SVN",
							"IIS Server Configuration",
							"Server Management & Deployment",
							"Visual Studio & VS Code",
							"SQL Server Management Studio",
							"Postman API Testing",
							"Azure DevOps Basics",
						]}
						color="green"
						delay="delay-600"
						mounted={mounted}
					/>
				</div>
			</Section>

			{/* Professional Experience - Add this after Education section and before Work Approach */}
			<Section
				title="Professional Experience"
				description="My journey in software development">
				<div className="space-y-6">
					{/* Junior Full-Stack Developer */}
					<Card
						className={`transition-all duration-1000 delay-750 hover:shadow-lg group ${
							mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
						}`}>
						<CardContent className="py-6">
							<div className="flex items-start gap-4">
								<Image
									src="/GNWebsoft_Logo.png"
									alt="GNWebsoft Logo"
									width={60}
									height={60}
									className="w-15 h-15 object-contain"
								/>
								<div className="flex-1">
									<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
										<div>
											<h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
												Junior Full-Stack Developer
											</h3>
											<p className="text-muted-foreground font-medium">
												GNWebsoft
											</p>
										</div>
										<div className="flex items-center gap-2 text-sm text-muted-foreground">
											<Calendar className="w-4 h-4" />
											<span>Jun, 2023 - Mar, 2024</span>
										</div>
									</div>

									<div className="space-y-4">
										<p className="text-sm text-muted-foreground leading-relaxed">
											Contributed to enterprise web application development,
											working across the full stack from database design to user
											interface implementation.
										</p>

										<div className="space-y-3">
											<p className="text-sm font-medium">
												Key Responsibilities & Achievements:
											</p>
											<ul className="space-y-2">
												<li className="flex items-start gap-3 text-sm text-muted-foreground">
													<div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
													<span>
														Developed and maintained strong backend systems
														using{" "}
														<strong className="text-foreground">
															ASP.NET{" "}
														</strong>{" "}
														and
														<strong className="text-foreground"> C#</strong>,
														implementing business logic and data validation
													</span>
												</li>
												<li className="flex items-start gap-3 text-sm text-muted-foreground">
													<div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
													<span>
														Designed and optimized database schemas, stored
														procedures, and queries in
														<strong className="text-foreground">
															{" "}
															Microsoft SQL Server
														</strong>{" "}
														for improved performance
													</span>
												</li>
												<li className="flex items-start gap-3 text-sm text-muted-foreground">
													<div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
													<span>
														Built responsive front-end interfaces using{" "}
														<strong className="text-foreground">
															React.js
														</strong>
														,
														<strong className="text-foreground">
															{" "}
															JavaScript
														</strong>
														, and modern CSS frameworks
													</span>
												</li>
												<li className="flex items-start gap-3 text-sm text-muted-foreground">
													<div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
													<span>
														Collaborated with senior developers using{" "}
														<strong className="text-foreground">Git</strong> and
														<strong className="text-foreground">
															{" "}
															VisualSVN
														</strong>{" "}
														for version control and code reviews
													</span>
												</li>
												<li className="flex items-start gap-3 text-sm text-muted-foreground">
													<div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
													<span>
														Participated in full development lifecycle from
														requirements gathering to deployment and maintenance
													</span>
												</li>
												<li className="flex items-start gap-3 text-sm text-muted-foreground">
													<div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
													<span>
														Debugged and resolved production issues, ensuring
														application stability and user satisfaction
													</span>
												</li>
											</ul>
										</div>

										<div className="flex flex-wrap gap-2 pt-2">
											<Badge variant="secondary" className="text-xs">
												ASP.NET
											</Badge>
											<Badge variant="secondary" className="text-xs">
												C#
											</Badge>
											<Badge variant="secondary" className="text-xs">
												SQL Server
											</Badge>
											<Badge variant="secondary" className="text-xs">
												React.js
											</Badge>
											<Badge variant="secondary" className="text-xs">
												JavaScript
											</Badge>
											<Badge variant="secondary" className="text-xs">
												Git/SVN
											</Badge>
											<Badge variant="secondary" className="text-xs">
												REST APIs
											</Badge>
											<Badge variant="secondary" className="text-xs">
												.NET Core
											</Badge>
											<Badge variant="secondary" className="text-xs">
												Entity Framework
											</Badge>
											<Badge variant="secondary" className="text-xs">
												Flutter
											</Badge>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Intern */}
					<Card
						className={`transition-all duration-1000 delay-850 hover:shadow-lg group ${
							mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
						}`}>
						<CardContent className="py-6">
							<div className="flex items-start gap-4">
								<img
									src="/GNWebsoft_Logo.png"
									alt="GNWebsoft Logo"
									className="w-15 h-15 object-contain"
								/>
								<div className="flex-1">
									<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
										<div>
											<h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
												Full-Stack Development Intern
											</h3>
											<p className="text-muted-foreground font-medium">
												GNWebsoft
											</p>
										</div>
										<div className="flex items-center gap-2 text-sm text-muted-foreground">
											<Calendar className="w-4 h-4" />
											<span>Aug, 2022 - May, 2023</span>
										</div>
									</div>

									<div className="space-y-4">
										<p className="text-sm text-muted-foreground leading-relaxed">
											Started my professional journey as an intern, gaining
											hands-on experience with modern web development
											technologies and industry best practices.
										</p>

										<div className="space-y-3">
											<p className="text-sm font-medium">
												Learning & Contributions:
											</p>
											<ul className="space-y-2">
												<li className="flex items-start gap-3 text-sm text-muted-foreground">
													<div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
													<span>
														Learned enterprise-level ASP.NET development
														patterns and best practices under senior developer
														mentorship
													</span>
												</li>
												<li className="flex items-start gap-3 text-sm text-muted-foreground">
													<div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
													<span>
														Assisted in building and testing web application
														features, writing clean and maintainable code
													</span>
												</li>
												<li className="flex items-start gap-3 text-sm text-muted-foreground">
													<div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
													<span>
														Gained practical experience with SQL database
														operations, including CRUD operations and query
														optimization
													</span>
												</li>
												<li className="flex items-start gap-3 text-sm text-muted-foreground">
													<div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
													<span>
														Participated in daily stand-ups, code reviews, and
														agile development processes
													</span>
												</li>
												<li className="flex items-start gap-3 text-sm text-muted-foreground">
													<div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
													<span>
														Developed frontend components using HTML, CSS,
														JavaScript, and jQuery for existing projects
													</span>
												</li>
											</ul>
										</div>

										<div className="flex flex-wrap gap-2 pt-2">
											<Badge variant="secondary" className="text-xs">
												ASP.NET
											</Badge>
											<Badge variant="secondary" className="text-xs">
												MSSQL
											</Badge>
											<Badge variant="secondary" className="text-xs">
												JavaScript
											</Badge>
											<Badge variant="secondary" className="text-xs">
												jQuery
											</Badge>
											<Badge variant="secondary" className="text-xs">
												HTML/CSS
											</Badge>
											<Badge variant="secondary" className="text-xs">
												Agile
											</Badge>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</Section>

			{/* Education */}
			<Section
				title="Education"
				description="Academic background and certifications">
				<Card
					className={`transition-all duration-1000 delay-700 hover:shadow-lg ${
						mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
					}`}>
					<CardContent className="py-6">
						<div className="flex items-start gap-4">
							<div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
								<Image
									src="/Conestoga_College_Logo.png"
									alt="Conestoga College Logo"
									width={48}
									height={48}
									className="w-12 h-12 object-contain"
								/>
							</div>
							<div className="flex-1">
								<h3 className="text-xl font-semibold mb-2">
									Web Development | Post Graduation Diploma
								</h3>
								<p className="text-muted-foreground mb-2">
									Conestoga College, Doon Campus, Ontario
								</p>
								<div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
									<Calendar className="w-4 h-4" />
									<span>Graduated: 2025</span>
								</div>
								<div className="space-y-2">
									<p className="text-md font">Key Coursework:</p>
									<div className="flex flex-wrap gap-2">
										<Badge variant="secondary">Database Design & SQL</Badge>
										<Badge variant="secondary">JS Frameworks</Badge>
										<Badge variant="secondary">Frontend Development</Badge>
										<Badge variant="secondary">Backend Development</Badge>
										<Badge variant="secondary">Software Engineering</Badge>
										<Badge variant="secondary">Mobile App Development</Badge>
										<Badge variant="secondary">Project Management</Badge>
									</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card
					className={`mt-4 transition-all duration-1000 delay-700 hover:shadow-lg ${
						mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
					}`}>
					<CardContent className="py-6">
						<div className="flex items-start gap-4">
							<div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
								<Image
									src="/GTU_Logo.png"
									alt="GTU Logo"
									width={48}
									height={48}
									className="w-12 h-12 object-contain"
								/>
							</div>
							<div className="flex-1">
								<h3 className="text-xl font-semibold mb-2">
									Computer Engineering | B.Tech
								</h3>
								<p className="text-muted-foreground mb-2">
									Gujarat Technological University, Ahmedabad
								</p>
								<div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
									<Calendar className="w-4 h-4" />
									<span>Graduated: 2023</span>
								</div>
								<div className="space-y-2">
									<p className="text-md font">Key Coursework:</p>
									<div className="flex flex-wrap gap-2">
										<Badge variant="secondary">
											Object-Oriented Programming
										</Badge>
										<Badge variant="secondary">Database Design & SQL</Badge>
										<Badge variant="secondary">Web Development</Badge>
										<Badge variant="secondary">
											Data Structures & Algorithms
										</Badge>
										<Badge variant="secondary">Software Engineering</Badge>
										<Badge variant="secondary">Mobile App Development</Badge>
										<Badge variant="secondary">Computer Networks</Badge>
										<Badge variant="secondary">Java</Badge>
										<Badge variant="secondary">C</Badge>
										<Badge variant="secondary">Python</Badge>
									</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</Section>

			{/* Work Approach */}
			<Section title="My Approach" description="How I work and what I value">
				<div className="grid md:grid-cols-3 gap-6">
					<ApproachCard
						icon="🎯"
						title="Problem Solver"
						description="I break down complex challenges into manageable pieces and deliver practical, efficient solutions that work."
						delay="delay-800"
						mounted={mounted}
					/>
					<ApproachCard
						icon="📚"
						title="Continuous Learner"
						description="Technology evolves fast. I stay current with best practices and new tools to deliver modern, maintainable code."
						delay="delay-900"
						mounted={mounted}
					/>
					<ApproachCard
						icon="🤝"
						title="Team Player"
						description="Clear communication, clean code, and comprehensive documentation make collaboration seamless and productive."
						delay="delay-1000"
						mounted={mounted}
					/>
				</div>
			</Section>

			{/* Core Strengths */}
			<Section title="Core Strengths" description="What sets me apart">
				<Card
					className={`transition-all duration-1000 delay-1100 hover:shadow-lg ${
						mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
					}`}>
					<CardContent className="py-6">
						<div className="grid md:grid-cols-2 gap-4">
							<StrengthItem text="Deep understanding of database design and optimization" />
							<StrengthItem text="Strong foundation in object-oriented programming principles" />
							<StrengthItem text="Experience with full development lifecycle" />
							<StrengthItem text="Ability to translate requirements into technical solutions" />
							<StrengthItem text="Clean, well-documented, maintainable code" />
							<StrengthItem text="Fast learner and adaptable to new technologies" />
							<StrengthItem text="Strong debugging and troubleshooting skills" />
							<StrengthItem text="Attention to detail and commitment to quality" />
						</div>
					</CardContent>
				</Card>
			</Section>

			{/* Currently */}
			<Section title="Currently" description="What I'm focusing on right now">
				<Card
					className={`transition-all duration-1000 delay-1200 hover:shadow-lg border-l-4 border-l-primary ${
						mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
					}`}>
					<CardContent className="py-6 space-y-4">
						<div className="flex items-start gap-3">
							<Award className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
							<div>
								<p className="font-medium mb-2">
									Open to Full-Time Opportunities
								</p>
								<p className="text-sm text-muted-foreground">
									I'm actively seeking full-stack developer positions in Canada
									(Open Work Permit holder). Particularly interested in roles
									involving ASP.NET, SQL Server, and modern web technologies.
								</p>
							</div>
						</div>
						<div className="flex items-start gap-3">
							<Code2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
							<div>
								<p className="font-medium mb-2">Building & Learning</p>
								<p className="text-sm text-muted-foreground">
									Working on personal projects to deepen my expertise in Next.js
									14+, TypeScript, and exploring cloud deployment with Azure.
									Always experimenting with new tools and patterns.
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</Section>
		</main>
	);
}

// Reusable Components
function InfoBadge({
	icon,
	text,
	color = "blue",
}: {
	icon: React.ReactNode;
	text: string;
	color?: string;
}) {
	const colors = {
		blue: "bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-400",
		green:
			"bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-400",
	};

	return (
		<Badge
			variant="outline"
			className={`${colors[color as keyof typeof colors]} gap-1.5`}>
			{icon}
			<span className="text-xs">{text}</span>
		</Badge>
	);
}

function ExpertiseCard({
	icon,
	title,
	skills,
	color,
	delay,
	mounted,
}: {
	icon: React.ReactNode;
	title: string;
	skills: string[];
	color: string;
	delay: string;
	mounted: boolean;
}) {
	const colors = {
		purple: "from-purple-500/10 to-purple-500/5 border-purple-500/20",
		blue: "from-blue-500/10 to-blue-500/5 border-blue-500/20",
		cyan: "from-cyan-500/10 to-cyan-500/5 border-cyan-500/20",
		green: "from-green-500/10 to-green-500/5 border-green-500/20",
	};

	const iconColors = {
		purple: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
		blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
		cyan: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
		green: "bg-green-500/10 text-green-600 dark:text-green-400",
	};

	return (
		<Card
			className={`transition-all duration-1000 ${delay} hover:shadow-lg hover:scale-105 bg-gradient-to-br ${colors[color as keyof typeof colors]} ${
				mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
			}`}>
			<CardContent className="py-6 space-y-4">
				<div className="flex items-center gap-3">
					<div
						className={`w-10 h-10 rounded-lg ${iconColors[color as keyof typeof iconColors]} flex items-center justify-center`}>
						{icon}
					</div>
					<h3 className="text-lg font-semibold">{title}</h3>
				</div>
				<ul className="space-y-2">
					{skills.map((skill, idx) => (
						<li
							key={idx}
							className="flex items-start gap-2 text-sm text-muted-foreground">
							<CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
							<span>{skill}</span>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	);
}

function ApproachCard({
	icon,
	title,
	description,
	delay,
	mounted,
}: {
	icon: string;
	title: string;
	description: string;
	delay: string;
	mounted: boolean;
}) {
	return (
		<Card
			className={`transition-all duration-1000 ${delay} hover:shadow-lg hover:scale-105 ${
				mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
			}`}>
			<CardContent className="py-6 space-y-3">
				<div className="text-4xl">{icon}</div>
				<h3 className="text-lg font-semibold">{title}</h3>
				<p className="text-sm text-muted-foreground leading-relaxed">
					{description}
				</p>
			</CardContent>
		</Card>
	);
}

function StrengthItem({ text }: { text: string }) {
	return (
		<div className="flex items-start gap-2">
			<CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
			<span className="text-sm text-muted-foreground">{text}</span>
		</div>
	);
}
