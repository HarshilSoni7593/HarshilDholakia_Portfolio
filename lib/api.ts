const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7212";

export interface AuthResponse {
	token: string;
	userId: number;
	email: string;
	firstName: string;
	lastName: string;
	role: string;
}

export interface RegisterRequest {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface ApiError {
	message: string;
	errors?: Record<string, string[]>;
}

export interface CourseListDto {
	id: number;
	slug: string;
	title: string;
	description: string;
	level: string;
	thumbnailUrl?: string;
	isPublished: boolean;
	createdAt: string;
	moduleCount: number;
	lessonCount: number;
	enrolledCount: number;
	isEnrolled: boolean;
	progressPercentage?: number;
}

export interface ModuleDto {
	id: number;
	slug: string;
	title: string;
	description: string;
	orderIndex: number;
	lessons: LessonDto[];
	lessonCount: number;
	totalDuration: number;
	completedLessons: number;
	progressPercentage: number;
}

export interface LessonDto {
	id: number;
	slug: string;
	title: string;
	description: string;
	orderIndex: number;
	duration?: number;
	videoUrl?: string;
	isPublished: boolean;
	isCompleted: boolean;
	timeSpentSeconds: number;
}

export interface CourseDetailDto {
	id: number;
	slug: string;
	title: string;
	description: string;
	level: string;
	thumbnailUrl?: string;
	isPublished: boolean;
	createdAt: string;
	updatedAt: string;
	createdById: number;
	createdByName: string;
	modules: ModuleDto[];
	totalLessons: number;
	totalDuration: number;
	enrolledCount: number;
	isEnrolled: boolean;
	progressPercentage?: number;
}

export interface LessonNavigationDto {
	id: number;
	slug: string;
	title: string;
}

export interface LessonDetailDto {
	id: number;
	slug: string;
	title: string;
	description: string;
	content: string;
	orderIndex: number;
	duration?: number;
	videoUrl?: string;
	moduleId: number;
	moduleTitle: string;
	courseId: number;
	courseTitle: string;
	previousLesson?: LessonNavigationDto;
	nextLesson?: LessonNavigationDto;
	isCompleted: boolean;
	timeSpentSeconds: number;
}

export interface EnrollmentDto {
	id: number;
	userId: number;
	courseId: number;
	courseSlug: string;
	courseTitle: string;
	courseDescription: string;
	courseLevel: string;
	courseThumbnailUrl?: string;
	enrolledAt: string;
	completedAt?: string;
	progressPercentage: number;
	totalLessons: number;
	completedLessons: number;
	totalDuration: number;
}

export interface EnrollmentResponse {
	success: boolean;
	message: string;
	enrollment?: EnrollmentDto;
}

export interface ProgressDto {
	id: number;
	userId: number;
	lessonId: number;
	isCompleted: boolean;
	completedAt?: string;
	timeSpentSeconds: number;
}

export interface ProgressResponse {
	success: boolean;
	message: string;
	progress?: ProgressDto;
	courseProgressPercentage: number;
}

async function apiCall<T>(endpoint: string, options?: RequestInit): Promise<T> {
	const url = `${API_BASE_URL}${endpoint}`;
	const config: RequestInit = {
		...options,
		headers: {
			"Content-Type": "application/json",
			...options?.headers,
		},
	};

	try {
		const response = await fetch(url, config);
		const data = await response.json();

		if (!response.ok) {
			throw {
				message: data.message || "Something went wrong",
				errors: data.errors,
			} as ApiError;
		}
		return data as T;
	} catch (error) {
		if (error && typeof error === "object" && "message" in error) {
			throw error;
		}
		throw {
			message: "Network error, please check your connection",
		} as ApiError;
	}
}

export const authApi = {
	register: async (data: RegisterRequest): Promise<AuthResponse> => {
		return apiCall<AuthResponse>("/api/auth/register", {
			method: "POST",
			body: JSON.stringify(data),
		});
	},

	login: async (data: LoginRequest): Promise<AuthResponse> => {
		return apiCall<AuthResponse>("/api/auth/login", {
			method: "POST",
			body: JSON.stringify(data),
		});
	},

	checkEmail: async (email: string): Promise<{ available: boolean }> => {
		return apiCall<{ available: boolean }>(
			`/api/auth/check-email?email=${encodeURIComponent(email)}`,
		);
	},
};

export const protectedApi = {
	getCurrentUser: async (token: string) => {
		return apiCall("/api/user/me", {
			headers: { Authorization: `Bearer ${token}` },
		});
	},
};

export const courseApi = {
	// Get all courses
	getAllCourses: async (token?: string): Promise<CourseListDto[]> => {
		return apiCall<CourseListDto[]>("/api/course", {
			headers: token ? { Authorization: `Bearer ${token}` } : {},
		});
	},

	// Get course by slug
	getCourseBySlug: async (
		slug: string,
		token?: string,
	): Promise<CourseDetailDto> => {
		return apiCall<CourseDetailDto>(`/api/Course/${slug}`, {
			headers: token ? { Authorization: `Bearer ${token}` } : {},
		});
	},

	getCourseById: async (
		id: number,
		token: string,
	): Promise<CourseDetailDto> => {
		return apiCall<CourseDetailDto>(`/api/Course/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},
};

export const moduleApi = {
	// Get module by ID with all lessons
	getModuleById: async (
		courseId: number,
		moduleId: number,
		token?: string,
	): Promise<ModuleDto> => {
		return apiCall<ModuleDto>(`/api/courses/${courseId}/modules/${moduleId}`, {
			headers: token ? { Authorization: `Bearer ${token}` } : {},
		});
	},

	// Get all modules for a course
	getModulesByCourse: async (
		courseId: number,
		token?: string,
	): Promise<ModuleDto[]> => {
		return apiCall<ModuleDto[]>(`/api/courses/${courseId}/modules`, {
			headers: token ? { Authorization: `Bearer ${token}` } : {},
		});
	},
};

export const lessonApi = {
	// Get lesson by course slug and lesson slug
	getLessonBySlug: async (
		courseSlug: string,
		lessonSlug: string,
		token?: string,
	): Promise<LessonDetailDto> => {
		return apiCall<LessonDetailDto>(
			`/api/courses/${courseSlug}/lessons/${lessonSlug}`,
			{
				headers: token ? { Authorization: `Bearer ${token}` } : {},
			},
		);
	},
};

export const enrollmentApi = {
	// Enroll in course
	enrollInCourse: async (
		courseId: number,
		token: string,
	): Promise<EnrollmentResponse> => {
		return apiCall<EnrollmentResponse>(`/api/enrollments/courses/${courseId}`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},

	// Unenroll from course
	unenrollFromCourse: async (
		courseId: number,
		token: string,
	): Promise<EnrollmentResponse> => {
		return apiCall<EnrollmentResponse>(`/api/enrollments/courses/${courseId}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},

	// Get my enrolled courses
	getMyCourses: async (token: string): Promise<EnrollmentDto[]> => {
		return apiCall<EnrollmentDto[]>("/api/enrollments/my-courses", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},

	// Check enrollment status
	getEnrollmentStatus: async (
		courseId: number,
		token: string,
	): Promise<{ isEnrolled: boolean }> => {
		return apiCall<{ isEnrolled: boolean }>(
			`/api/enrollments/courses/${courseId}/status`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
	},
};

export const progressApi = {
	// Mark lesson complete
	markLessonComplete: async (
		lessonId: number,
		token: string,
	): Promise<ProgressResponse> => {
		return apiCall<ProgressResponse>(
			`/api/progress/lessons/${lessonId}/complete`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
	},

	// Mark lesson incomplete
	markLessonIncomplete: async (
		lessonId: number,
		token: string,
	): Promise<ProgressResponse> => {
		return apiCall<ProgressResponse>(
			`/api/progress/lessons/${lessonId}/incomplete`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
	},

	// Update time spent
	updateTimeSpent: async (
		lessonId: number,
		timeSpentSeconds: number,
		token: string,
	): Promise<ProgressResponse> => {
		return apiCall<ProgressResponse>(`/api/progress/lessons/${lessonId}/time`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				isCompleted: false,
				timeSpentSeconds,
			}),
		});
	},

	// Get lesson progress
	getLessonProgress: async (
		lessonId: number,
		token: string,
	): Promise<ProgressDto> => {
		return apiCall<ProgressDto>(`/api/progress/lessons/${lessonId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},
};
