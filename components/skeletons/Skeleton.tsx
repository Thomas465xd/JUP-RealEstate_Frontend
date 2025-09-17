import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function Skeleton() {
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		//! Check for saved theme preference or default to light mode
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme) {
			setIsDarkMode(savedTheme === "dark");
		} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			setIsDarkMode(true);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("theme", isDarkMode ? "dark" : "light");
	}, [isDarkMode]);

	const toggleTheme = () => {
		setIsDarkMode(!isDarkMode);
	};

	const skeletonClass = `animate-pulse ${
		isDarkMode ? "bg-zinc-700" : "bg-zinc-200"
	} rounded`;

	return (
		<div
			className={`min-h-screen ${
				isDarkMode ? "bg-zinc-900 text-white" : "bg-white text-gray-900"
			}`}
		>
			{/* Header */}
			<header
				className={`${
					isDarkMode ? "bg-zinc-800" : "bg-zinc-50"
				} border-b ${
					isDarkMode ? "border-gray-700" : "border-gray-200"
				}`}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						{/* Logo skeleton */}
						<div className="flex items-center">
							<div
								className={`${skeletonClass} w-12 h-12 mr-3`}
							></div>
							<div className={`${skeletonClass} w-32 h-6`}></div>
						</div>

						{/* Navigation skeleton */}
						<div className="hidden md:flex space-x-8">
							{[...Array(6)].map((_, i) => (
								<div
									key={i}
									className={`${skeletonClass} w-16 h-4`}
								></div>
							))}
						</div>

						{/* Contact info skeleton */}
						<div className="hidden lg:flex items-center space-x-6">
							<div className={`${skeletonClass} w-24 h-4`}></div>
							<div className={`${skeletonClass} w-28 h-4`}></div>
							<div className={`${skeletonClass} w-20 h-4`}></div>

							{/* Theme toggle button */}
							<button
								onClick={toggleTheme}
								className={`p-2 rounded-lg ${
									isDarkMode
										? "bg-zinc-700 hover:bg-zinc-600"
										: "bg-zinc-200 hover:bg-zinc-300"
								} transition-colors`}
								aria-label="Toggle theme"
							>
								{isDarkMode ? (
									<Sun className="w-4 h-4" />
								) : (
									<Moon className="w-4 h-4" />
								)}
							</button>
						</div>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<div className="relative h-96 overflow-hidden">
				{/* Background image skeleton */}
				<div className={`${skeletonClass} w-full h-full`}>
					{/* Gradient overlay skeleton */}
					<div
						className={`absolute inset-0 ${
							isDarkMode
								? "bg-gradient-to-r from-gray-900/70 to-gray-800/30"
								: "bg-gradient-to-r from-gray-600/70 to-gray-400/30"
						}`}
					></div>
				</div>

				{/* Hero content skeleton */}
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="text-center">
						<div
							className={`${skeletonClass} w-80 h-12 mx-auto mb-4`}
						></div>
						<div
							className={`${skeletonClass} w-48 h-6 mx-auto`}
						></div>
					</div>
				</div>
			</div>

			{/* Filter Section */}
			<div
				className={`${
					isDarkMode ? "bg-zinc-800" : "bg-zinc-100"
				} py-6 border-t ${
					isDarkMode ? "border-gray-700" : "border-gray-200"
				}`}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
						{/* Filter dropdowns skeleton */}
						{[
							"Operación",
							"Tipo Propiedad",
							"Región Metropolitana",
							"Comuna",
						].map((label, i) => (
							<div key={i} className="space-y-2">
								<div
									className={`${skeletonClass} w-20 h-4`}
								></div>
								<div
									className={`${skeletonClass} w-full h-10 rounded-md`}
								></div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Loading indicator */}
			<div className="flex justify-center items-center py-12">
				<div className="flex items-center space-x-2">
					<div
						className={`${skeletonClass} w-2 h-2 rounded-full animate-bounce`}
						style={{ animationDelay: "0ms" }}
					></div>
					<div
						className={`${skeletonClass} w-2 h-2 rounded-full animate-bounce`}
						style={{ animationDelay: "150ms" }}
					></div>
					<div
						className={`${skeletonClass} w-2 h-2 rounded-full animate-bounce`}
						style={{ animationDelay: "300ms" }}
					></div>
					<span
						className={`ml-3 text-sm ${
							isDarkMode ? "text-gray-300" : "text-gray-600"
						}`}
					>
						Cargando propiedades...
					</span>
				</div>
			</div>

			{/* Property grid skeleton */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{[...Array(6)].map((_, i) => (
						<div
							key={i}
							className={`${
								isDarkMode ? "bg-zinc-800" : "bg-white"
							} rounded-lg shadow-md overflow-hidden border ${
								isDarkMode
									? "border-gray-700"
									: "border-gray-200"
							}`}
						>
							{/* Property image skeleton */}
							<div
								className={`${skeletonClass} w-full h-48`}
							></div>

							{/* Property content skeleton */}
							<div className="p-4 space-y-3">
								<div
									className={`${skeletonClass} w-3/4 h-6`}
								></div>
								<div
									className={`${skeletonClass} w-1/2 h-4`}
								></div>
								<div
									className={`${skeletonClass} w-full h-4`}
								></div>
								<div className="flex justify-between items-center pt-2">
									<div
										className={`${skeletonClass} w-20 h-6`}
									></div>
									<div
										className={`${skeletonClass} w-16 h-8 rounded-md`}
									></div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Footer skeleton */}
			<footer
				className={`${
					isDarkMode ? "bg-zinc-800" : "bg-zinc-100"
				} border-t ${
					isDarkMode ? "border-gray-700" : "border-gray-200"
				} py-8 mt-12`}
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{[...Array(3)].map((_, i) => (
							<div key={i} className="space-y-4">
								<div
									className={`${skeletonClass} w-24 h-5`}
								></div>
								<div className="space-y-2">
									{[...Array(4)].map((_, j) => (
										<div
											key={j}
											className={`${skeletonClass} w-32 h-4`}
										></div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</footer>
		</div>
	);
};
