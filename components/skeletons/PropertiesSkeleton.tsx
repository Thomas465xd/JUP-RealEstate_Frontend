"use client";

import PropertyCardSkeleton from "./PropertyCardSkeleton";

interface PropertySkeletonProps {
	count?: number; // Number of skeleton cards to show (default: 6)
}

// Main skeleton component
export default function PropertiesSkeleton({
	count = 6,
}: PropertySkeletonProps = {}) {
	return (
		<section className="py-16 bg-zinc-50 dark:bg-zinc-900 transition-colors duration-200">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header skeleton */}
				<div className="text-center mb-12">
					<div className="w-80 h-8 bg-zinc-300 dark:bg-zinc-600 rounded mx-auto mb-4 animate-pulse"></div>
					<div className="space-y-2">
						<div className="w-96 h-4 bg-zinc-200 dark:bg-zinc-700 rounded mx-auto animate-pulse"></div>
						<div className="w-80 h-4 bg-zinc-200 dark:bg-zinc-700 rounded mx-auto animate-pulse"></div>
						<div className="w-72 h-4 bg-zinc-200 dark:bg-zinc-700 rounded mx-auto animate-pulse"></div>
					</div>
				</div>

				{/* Properties grid skeleton */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
					{[...Array(count)].map((_, index) => (
						<PropertyCardSkeleton key={index} />
					))}
				</div>

				{/* Pagination skeleton */}
				<div className="flex justify-center items-center space-x-2">
					<div className="w-2 h-2 bg-blue-300 dark:bg-blue-600 rounded-full animate-pulse"></div>
					<div className="w-24 h-4 bg-zinc-300 dark:bg-zinc-600 rounded animate-pulse"></div>
					<div className="w-2 h-2 bg-blue-300 dark:bg-blue-600 rounded-full animate-pulse"></div>
				</div>
			</div>
		</section>
	);
}
