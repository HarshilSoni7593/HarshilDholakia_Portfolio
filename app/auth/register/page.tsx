"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { authApi, ApiError } from "@/lib/api";
import { useAuth } from "@/app/context/AuthContext";
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
	const router = useRouter();
	const { login } = useAuth();

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [passwordStrength, setPasswordStrength] = useState<string>("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		// Check password strength
		if (name === "password") {
			if (value.length < 8) {
				setPasswordStrength("weak");
			} else if (value.length < 12) {
				setPasswordStrength("medium");
			} else {
				setPasswordStrength("strong");
			}
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		// Validation
		if (formData.password !== formData.confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		if (formData.password.length < 8) {
			setError("Password must be at least 8 characters");
			return;
		}

		setIsLoading(true);

		try {
			const response = await authApi.register({
				email: formData.email,
				password: formData.password,
				firstName: formData.firstName,
				lastName: formData.lastName,
			});

			// Auto-login after successful registration
			login(response);

			// Redirect to learn page
			router.push("/learn");
		} catch (err) {
			const apiError = err as ApiError;
			setError(apiError.message || "Registration failed. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	const getPasswordStrengthColor = () => {
		switch (passwordStrength) {
			case "weak":
				return "bg-red-500";
			case "medium":
				return "bg-yellow-500";
			case "strong":
				return "bg-green-500";
			default:
				return "bg-gray-300";
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center py-12 px-4">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold text-center">
						Create an Account
					</CardTitle>
					<CardDescription className="text-center">
						Start your learning journey today
					</CardDescription>
				</CardHeader>

				<form onSubmit={handleSubmit}>
					<CardContent className="space-y-4">
						{error && (
							<Alert variant="destructive">
								<AlertCircle className="h-4 w-4" />
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						)}

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="firstName">First Name</Label>
								<Input
									id="firstName"
									name="firstName"
									placeholder="Harshil"
									value={formData.firstName}
									onChange={handleChange}
									required
									disabled={isLoading}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="lastName">Last Name</Label>
								<Input
									id="lastName"
									name="lastName"
									placeholder="Dholakia"
									value={formData.lastName}
									onChange={handleChange}
									required
									disabled={isLoading}
								/>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="harshil@example.com"
								value={formData.email}
								onChange={handleChange}
								required
								disabled={isLoading}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<div className="relative">
								<Input
									id="password"
									name="password"
									type={showPassword ? "text" : "password"}
									placeholder="••••••••"
									value={formData.password}
									onChange={handleChange}
									required
									disabled={isLoading}
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
									tabIndex={-1}>
									{showPassword ? (
										<EyeOff className="h-4 w-4" />
									) : (
										<Eye className="h-4 w-4" />
									)}
								</button>
							</div>

							{formData.password && (
								<div className="space-y-1">
									<div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
										<div
											className={`h-full transition-all ${getPasswordStrengthColor()}`}
											style={{
												width:
													passwordStrength === "weak"
														? "33%"
														: passwordStrength === "medium"
															? "66%"
															: "100%",
											}}
										/>
									</div>
									<p className="text-xs text-muted-foreground">
										Password strength: {passwordStrength}
									</p>
								</div>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="confirmPassword">Confirm Password</Label>
							<Input
								id="confirmPassword"
								name="confirmPassword"
								type="password"
								placeholder="••••••••"
								value={formData.confirmPassword}
								onChange={handleChange}
								required
								disabled={isLoading}
							/>
							{formData.confirmPassword &&
								formData.password === formData.confirmPassword && (
									<p className="text-xs text-green-600 flex items-center gap-1">
										<CheckCircle2 className="h-3 w-3" />
										Passwords match
									</p>
								)}
						</div>
					</CardContent>

					<CardFooter className="flex flex-col gap-4 mt-4">
						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Creating account...
								</>
							) : (
								"Create Account"
							)}
						</Button>

						<p className="text-sm text-center text-muted-foreground">
							Already have an account?{" "}
							<Link
								href="/auth/login"
								className="text-primary hover:underline font-medium">
								Sign in
							</Link>
						</p>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
