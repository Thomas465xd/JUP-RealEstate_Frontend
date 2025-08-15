"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
	Search,
	X,
	Filter,
	Users,
	UserCheck,
	UserX,
	Clock,
} from "lucide-react";

interface SearchUsersProps {
	darkMode?: boolean;
	totalUsers?: number;
	onSearchChange?: (query: string, filters: SearchFilters) => void;
}

interface SearchFilters {
	role?: string;
	status?: string;
	dateRange?: string;
	sortBy?: string;
}

export const SearchUsers = ({
	darkMode = false,
	totalUsers = 0,
	onSearchChange,
}: SearchUsersProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [searchQuery, setSearchQuery] = useState(
		searchParams.get("search") || ""
	);
	const [showFilters, setShowFilters] = useState(false);
	const [isSearching, setIsSearching] = useState(false);
	const searchInputRef = useRef<HTMLInputElement>(null);

	const [filters, setFilters] = useState<SearchFilters>({
		role: searchParams.get("role") || "",
		status: searchParams.get("status") || "",
		dateRange: searchParams.get("dateRange") || "",
		sortBy: searchParams.get("sortBy") || "name",
	});

	// Focus search input on component mount
	useEffect(() => {
		searchInputRef.current?.focus();
	}, []);

	// Debounced search effect
	useEffect(() => {
		const timer = setTimeout(() => {
			handleSearch();
		}, 300);

		return () => clearTimeout(timer);
	}, [searchQuery, filters]);

	const handleSearch = () => {
		setIsSearching(true);

		const params = new URLSearchParams();

		if (searchQuery.trim()) params.set("search", searchQuery.trim());
		if (filters.role) params.set("role", filters.role);
		if (filters.status) params.set("status", filters.status);
		if (filters.dateRange) params.set("dateRange", filters.dateRange);
		if (filters.sortBy) params.set("sortBy", filters.sortBy);

		const queryString = params.toString();
		const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

		router.push(newUrl);
		onSearchChange?.(searchQuery, filters);

		// Simulate search delay
		setTimeout(() => setIsSearching(false), 500);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleSearch();
	};

	const clearSearch = () => {
		setSearchQuery("");
		setFilters({
			role: "",
			status: "",
			dateRange: "",
			sortBy: "name",
		});
		router.push(pathname);
		onSearchChange?.("", {});
	};

	const updateFilter = (key: keyof SearchFilters, value: string) => {
		setFilters((prev) => ({ ...prev, [key]: value }));
	};

	const hasActiveFilters = Object.values(filters).some(
		(value) => value && value !== "name"
	);
	const hasSearch = searchQuery.length > 0;

	return (
		<div
			className={`w-full space-y-4 ${
				darkMode ? "text-white" : "text-gray-900"
			}`}
		>
			{/* Main Search Bar */}
			<div
				className={`relative rounded-lg border transition-all duration-200 ${
					darkMode
						? "bg-gray-800 border-gray-700 focus-within:border-blue-500"
						: "bg-white border-gray-300 focus-within:border-blue-500"
				} ${isSearching ? "animate-pulse" : ""}`}
			>
				<div className="relative">
					<div className="flex items-center">
						<div className="pl-4">
							<Search
								className={`h-5 w-5 ${
									darkMode ? "text-gray-400" : "text-gray-500"
								} ${isSearching ? "animate-spin" : ""}`}
							/>
						</div>

						<input
							ref={searchInputRef}
							type="text"
							placeholder="Search users by name, email, or ID..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							onKeyDown={(e) =>
								e.key === "Enter" && handleSubmit(e as any)
							}
							className={`w-full px-4 py-3 text-sm bg-transparent border-none outline-none placeholder:text-gray-500 ${
								darkMode ? "text-white" : "text-gray-900"
							}`}
						/>

						<div className="flex items-center pr-2 space-x-2">
							{(hasSearch || hasActiveFilters) && (
								<button
									type="button"
									onClick={clearSearch}
									className={`p-1 rounded-full transition-colors ${
										darkMode
											? "hover:bg-gray-700 text-gray-400 hover:text-gray-300"
											: "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
									}`}
									title="Clear search"
								>
									<X className="h-4 w-4" />
								</button>
							)}

							<button
								type="button"
								onClick={() => setShowFilters(!showFilters)}
								className={`p-2 rounded-md transition-all duration-200 ${
									hasActiveFilters || showFilters
										? darkMode
											? "bg-blue-600 text-white"
											: "bg-blue-500 text-white"
										: darkMode
										? "hover:bg-gray-700 text-gray-400 hover:text-gray-300"
										: "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
								}`}
								title="Toggle filters"
							>
								<Filter className="h-4 w-4" />
							</button>

							<button
								type="button"
								onClick={handleSearch}
								className={`px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 transform hover:scale-105 ${
									darkMode
										? "bg-blue-600 hover:bg-blue-700 text-white"
										: "bg-blue-500 hover:bg-blue-600 text-white"
								} ${
									isSearching
										? "opacity-75 cursor-not-allowed"
										: ""
								}`}
								disabled={isSearching}
							>
								{isSearching ? "Searching..." : "Search"}
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Advanced Filters */}
			<div
				className={`transition-all duration-300 ease-in-out overflow-hidden ${
					showFilters ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
				}`}
			>
				<div
					className={`p-4 rounded-lg border space-y-4 ${
						darkMode
							? "bg-gray-800 border-gray-700"
							: "bg-gray-50 border-gray-200"
					}`}
				>
					<div className="flex items-center justify-between">
						<h3
							className={`font-medium text-sm ${
								darkMode ? "text-gray-200" : "text-gray-700"
							}`}
						>
							Advanced Filters
						</h3>
						{hasActiveFilters && (
							<span
								className={`text-xs px-2 py-1 rounded-full ${
									darkMode
										? "bg-blue-600 text-blue-100"
										: "bg-blue-100 text-blue-700"
								}`}
							>
								{
									Object.values(filters).filter(
										(v) => v && v !== "name"
									).length
								}{" "}
								active
							</span>
						)}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						{/* Role Filter */}
						<div className="space-y-2">
							<label
								className={`block text-xs font-medium ${
									darkMode ? "text-gray-300" : "text-gray-600"
								}`}
							>
								Role
							</label>
							<select
								value={filters.role}
								onChange={(e) =>
									updateFilter("role", e.target.value)
								}
								className={`w-full px-3 py-2 text-sm rounded-md border transition-colors ${
									darkMode
										? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
										: "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
								} outline-none`}
							>
								<option value="">All Roles</option>
								<option value="admin">Admin</option>
								<option value="moderator">Moderator</option>
								<option value="user">User</option>
							</select>
						</div>

						{/* Status Filter */}
						<div className="space-y-2">
							<label
								className={`block text-xs font-medium ${
									darkMode ? "text-gray-300" : "text-gray-600"
								}`}
							>
								Status
							</label>
							<select
								value={filters.status}
								onChange={(e) =>
									updateFilter("status", e.target.value)
								}
								className={`w-full px-3 py-2 text-sm rounded-md border transition-colors ${
									darkMode
										? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
										: "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
								} outline-none`}
							>
								<option value="">All Status</option>
								<option value="active">Active</option>
								<option value="inactive">Inactive</option>
								<option value="pending">Pending</option>
							</select>
						</div>

						{/* Date Range Filter */}
						<div className="space-y-2">
							<label
								className={`block text-xs font-medium ${
									darkMode ? "text-gray-300" : "text-gray-600"
								}`}
							>
								Date Joined
							</label>
							<select
								value={filters.dateRange}
								onChange={(e) =>
									updateFilter("dateRange", e.target.value)
								}
								className={`w-full px-3 py-2 text-sm rounded-md border transition-colors ${
									darkMode
										? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
										: "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
								} outline-none`}
							>
								<option value="">All Time</option>
								<option value="today">Today</option>
								<option value="week">This Week</option>
								<option value="month">This Month</option>
								<option value="year">This Year</option>
							</select>
						</div>

						{/* Sort By */}
						<div className="space-y-2">
							<label
								className={`block text-xs font-medium ${
									darkMode ? "text-gray-300" : "text-gray-600"
								}`}
							>
								Sort By
							</label>
							<select
								value={filters.sortBy}
								onChange={(e) =>
									updateFilter("sortBy", e.target.value)
								}
								className={`w-full px-3 py-2 text-sm rounded-md border transition-colors ${
									darkMode
										? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
										: "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
								} outline-none`}
							>
								<option value="name">Name (A-Z)</option>
								<option value="name_desc">Name (Z-A)</option>
								<option value="email">Email (A-Z)</option>
								<option value="created">
									Date Created (Newest)
								</option>
								<option value="created_desc">
									Date Created (Oldest)
								</option>
								<option value="last_active">Last Active</option>
							</select>
						</div>
					</div>
				</div>
			</div>

			{/* Search Stats */}
			{totalUsers > 0 && (
				<div
					className={`flex items-center justify-between text-sm ${
						darkMode ? "text-gray-400" : "text-gray-600"
					}`}
				>
					<div className="flex items-center space-x-4">
						<div className="flex items-center space-x-2">
							<Users className="h-4 w-4" />
							<span>{totalUsers} total users</span>
						</div>

						{hasSearch && (
							<div className="flex items-center space-x-2">
								<Search className="h-4 w-4" />
								<span>Searching for "{searchQuery}"</span>
							</div>
						)}
					</div>

					<div className="flex items-center space-x-4">
						{hasActiveFilters && (
							<button
								onClick={clearSearch}
								className={`text-sm underline transition-colors ${
									darkMode
										? "text-blue-400 hover:text-blue-300"
										: "text-blue-600 hover:text-blue-700"
								}`}
							>
								Clear all filters
							</button>
						)}

						<div
							className={`flex items-center space-x-1 ${
								isSearching ? "animate-pulse" : ""
							}`}
						>
							<Clock className="h-3 w-3" />
							<span className="text-xs">
								Last updated: just now
							</span>
						</div>
					</div>
				</div>
			)}

			{/* Quick Filter Chips */}
			{(hasSearch || hasActiveFilters) && (
				<div className="flex items-center flex-wrap gap-2">
					<span
						className={`text-sm ${
							darkMode ? "text-gray-400" : "text-gray-600"
						}`}
					>
						Active filters:
					</span>

					{hasSearch && (
						<span
							className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
								darkMode
									? "bg-blue-600 text-blue-100"
									: "bg-blue-100 text-blue-700"
							}`}
						>
							<Search className="h-3 w-3 mr-1" />"{searchQuery}"
							<button
								onClick={() => setSearchQuery("")}
								className="ml-2 hover:bg-blue-700 rounded-full p-0.5"
							>
								<X className="h-3 w-3" />
							</button>
						</span>
					)}

					{filters.role && (
						<span
							className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
								darkMode
									? "bg-purple-600 text-purple-100"
									: "bg-purple-100 text-purple-700"
							}`}
						>
							<UserCheck className="h-3 w-3 mr-1" />
							Role: {filters.role}
							<button
								onClick={() => updateFilter("role", "")}
								className="ml-2 hover:bg-purple-700 rounded-full p-0.5"
							>
								<X className="h-3 w-3" />
							</button>
						</span>
					)}

					{filters.status && (
						<span
							className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
								darkMode
									? "bg-green-600 text-green-100"
									: "bg-green-100 text-green-700"
							}`}
						>
							Status: {filters.status}
							<button
								onClick={() => updateFilter("status", "")}
								className="ml-2 hover:bg-green-700 rounded-full p-0.5"
							>
								<X className="h-3 w-3" />
							</button>
						</span>
					)}
				</div>
			)}
		</div>
	);
};
