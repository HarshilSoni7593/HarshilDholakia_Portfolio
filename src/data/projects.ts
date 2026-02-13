export type Project = {
	slug: string;
	title: string;
	short: string;
	description: string;
	stack: string[];
	links: { label: string; href: string }[];
	highlights: string[];

	year?: number;
	role?: string; // e.g., "Solo Developer", "Lead Developer", "Team of 3"
	duration?: string; // e.g., "3 months", "2 weeks"
	overview?: string;
	hurdles?: { challenge: string; solution: string }[];
	features?: { title: string; description: string }[];
	technical?: string[];
	results?: { metric: string; description: string }[];
	learnings?: string[];
};

export const projects: Project[] = [
	{
		slug: "University-Management-System",
		title: "University Management System",
		short:
			"Full-stack university management system with student and course management.",
		description:
			"A comprehensive university management system with features for managing students, courses, and administrative workflows.",
		stack: [
			"ASP.NET (3-Tier Architecture)",
			"SQL Server",
			"Bootstrap",
			"JavaScript",
			"AJAX",
			"VisualSVN",
			"3rd Party APIs",
			"ERP Support",
			"Metronic UI",
		],
		links: [
			{ label: "Case Study", href: "/projects/university-management-system" },
		],
		highlights: [
			"Implemented a 3-tier architecture with clear separation of concerns",
			"Designed a relational database schema for students, courses, and enrollments",
			"Developed CRUD operations with ASP.NET Web Forms and AJAX for a responsive user experience",
			"Managed timetable and attendance modules with complex business logic",
			"Gave an ERP support for administrative workflows and reporting",
		],
		year: 2023,
		role: "Full Stack Developer",
		duration: "ongoing",
		overview:
			"A university management system designed to streamline administrative tasks and improve student management.",
		hurdles: [
			{
				challenge:
					"Managing complex relationships between students, courses, and staff",
				solution:
					"Designed a well-structured database schema and implemented efficient data access patterns.",
			},
			{
				challenge: "Ensuring data integrity and consistency across modules",
				solution:
					"Implemented robust validation and error handling mechanisms in the application.",
			},
			{
				challenge: "Managing large data sets for daily attendance module",
				solution:
					"Optimized database queries with the daily schedulers to update data, backup, clear and well managed seperation of data tables and implemented pagination for efficient data retrieval.",
			},
			{
				challenge:
					"Ensuring a responsive user experience with ASP.NET Web Forms",
				solution:
					"Utilized AJAX for asynchronous operations and improved UI responsiveness.",
			},
			{
				challenge: "Integrating ERP support for administrative workflows",
				solution:
					"Implemented modular architecture to allow for seamless integration of ERP features.",
			},
		],
		features: [
			{
				title: "User Management",
				description:
					"Role-based access control for administrators, staff, and students with secure authentication and authorization.",
			},
			{
				title: "Staff & Student Management",
				description:
					"CRUD operations for staff and student records, including enrollment, academic history, attendance tracking, promote and passout.",
			},
			{
				title: "Course Management",
				description:
					"Management of courses, course categories, course exam types and exams with complex business logic.",
			},
			{
				title: "Timetable Management",
				description:
					"Scheduling and management of class timetables, staff time allocation, resource allocation with conflict resolution.",
			},
			{
				title: "Attendance Management",
				description:
					"Tracking and reporting of student attendance with support for various attendance types and reporting.",
			},
			{
				title: "Administrative Workflows",
				description: "ERP support for administrative tasks and reporting.",
			},
		],
		technical: [
			"ASP.NET Web Forms for the presentation layer",
			"SQL Server for the database layer with a relational schema",
			"AJAX for asynchronous operations and improved user experience",
			"Bootstrap for responsive design and UI components",
		],
		results: [
			{
				metric: "Efficiency",
				description:
					"Reduced administrative workload by 30% through streamlined workflows.",
			},
			{
				metric: "Data Accuracy",
				description:
					"Improved data accuracy and integrity with a well-designed database schema.",
			},
			{
				metric: "User Satisfaction",
				description:
					"Improved user satisfaction with a responsive and intuitive interface.",
			},
		],
		learnings: [
			"Importance of a well-designed architecture for scalability and maintainability",
			"Challenges of managing complex relationships in a university setting",
			"Benefits of using AJAX for a responsive user experience",
		],
	},
	{
		slug: "GN-ERP",
		title: "GN ERP System",
		short:
			"Enterprise resource planning system for managing business operations and ticket management.",
		description:
			"An enterprise resource planning system designed to streamline business operations and improve efficiency.",
		stack: [
			"ASP.NET (3-Tier Architecture)",
			"SQL Server",
			"Bootstrap",
			"JavaScript",
			"AJAX",
		],
		links: [{ label: "Case Study", href: "/projects/gn-erp" }],
		highlights: [
			"Designed modular architecture for scalability",
			"Implemented centralized data management and reporting",
			"Developed user-friendly interfaces for administrative tasks",
			"Integrated with existing enterprise systems for seamless data flow",
		],
		year: 2022,
		role: "Full Stack Developer",
		duration: "8 months",
		overview:
			"An ERP system designed to streamline business operations and improve efficiency across departments.",
		hurdles: [
			{
				challenge: "Integrating with existing enterprise systems",
				solution:
					"Implemented modular architecture to allow for seamless integration and data flow between systems.",
			},
			{
				challenge: "Ensuring data integrity and consistency across modules",
				solution:
					"Implemented robust validation and error handling mechanisms in the application to maintain data integrity.",
			},
			{
				challenge:
					"Managing complex workflows and processes across departments",
				solution:
					"Designed a flexible workflow engine to accommodate various business processes and ensure smooth operations.",
			},
			{
				challenge:
					"Ensuring a responsive user experience with ASP.NET Web Forms",
				solution:
					"Implemented responsive design patterns and optimized UI components for better user experience.",
			},
		],
		features: [
			{
				title: "Centralized Data Management",
				description:
					"A centralized database for managing all business data with robust reporting capabilities.",
			},
			{
				title: "Workflow Management",
				description:
					"A flexible workflow engine to manage complex business processes across departments.",
			},
			{
				title: "User Management",
				description:
					"Role-based access control for administrators and staff with secure authentication and authorization.",
			},
			{
				title: "Integration with Existing Systems",
				description:
					"Seamless integration with existing enterprise systems for data flow and synchronization.",
			},
			{
				title: "Ticket Management",
				description:
					"A ticket management system for tracking and resolving customer issues with support for various ticket types and reporting.",
			},
		],
		technical: [
			"ASP.NET Web Forms for the presentation layer",
			"SQL Server for the database layer with a relational schema",
			"AJAX for asynchronous operations and improved user experience",
			"Bootstrap for responsive design and UI components",
		],
		results: [
			{
				metric: "Operational Efficiency",
				description:
					"Improved operational efficiency by 25% through streamlined workflows and centralized data management.",
			},
			{
				metric: "Data Accuracy",
				description:
					"Enhanced data accuracy and integrity with robust validation and error handling.",
			},
			{
				metric: "User Satisfaction",
				description:
					"Increased user satisfaction with a responsive and intuitive interface.",
			},
		],
		learnings: [
			"Importance of modular architecture for scalability and integration",
			"Challenges of managing complex workflows in an enterprise setting",
			"Benefits of centralized data management for reporting and decision-making",
		],
	},
	{
		slug: "rajwadi-tiffin",
		title: "Rajwadi Tiffin Service Platform",
		short: "Subscription plans, admin workflows, and ordering experience.",
		description:
			"A full-stack system for managing meal plans, subscriptions, and operational workflows.",
		stack: [".NET Core", "React", "TypeScript", "SQL Server", "Stripe"],
		links: [{ label: "Case Study", href: "/projects/rajwadi-tiffin" }],
		highlights: [
			"Designed clean architecture style API boundaries",
			"Implemented plan + pricing structures",
			"Focused on maintainable domain model design",
		],
	},
	{
		slug: "insightboard",
		title: "Insightboard Analytics Dashboard",
		short: "Business insights dashboard with admin analytics endpoints.",
		description:
			"A dashboard-style app for summarizing revenue, orders, and operational metrics.",
		stack: ["Laravel", "Vue 3", "Tailwind", "MySQL"],
		links: [{ label: "Case Study", href: "/projects/insightboard" }],
		highlights: [
			"Admin analytics endpoints design",
			"Charts + filters UX",
			"Data integrity + validation focus",
		],
	},
];
