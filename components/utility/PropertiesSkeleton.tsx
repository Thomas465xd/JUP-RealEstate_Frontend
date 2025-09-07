"use client";

interface PropertySkeletonProps {
	count?: number; // Number of skeleton cards to show (default: 6)
}

// Individual property card skeleton
function PropertyCardSkeleton() {
	return (
		<div className="bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-md">
			{/* Image skeleton */}
			<div className="relative h-48 bg-zinc-200 dark:bg-zinc-700 animate-pulse">
				{/* Status badge skeleton */}
				<div className="absolute top-3 left-3 w-16 h-6 bg-zinc-300 dark:bg-zinc-600 rounded animate-pulse"></div>

				{/* Carousel dots skeleton */}
				<div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
					{[...Array(4)].map((_, i) => (
						<div
							key={i}
							className="w-2 h-2 bg-zinc-300 dark:bg-zinc-600 rounded-full animate-pulse"
						></div>
					))}
				</div>
			</div>

			{/* Content skeleton */}
			<div className="p-4 space-y-3">
				{/* Property type and icon */}
				<div className="flex items-center space-x-2">
					<div className="w-4 h-4 bg-zinc-300 dark:bg-zinc-600 rounded animate-pulse"></div>
					<div className="w-16 h-4 bg-zinc-300 dark:bg-zinc-600 rounded animate-pulse"></div>
				</div>

				{/* Price skeleton */}
				<div className="w-32 h-6 bg-zinc-300 dark:bg-zinc-600 rounded animate-pulse"></div>

				{/* Title skeleton */}
				<div className="w-3/4 h-4 bg-zinc-300 dark:bg-zinc-600 rounded animate-pulse"></div>

				{/* Address skeleton */}
				<div className="flex items-center space-x-2">
					<div className="w-3 h-3 bg-zinc-300 dark:bg-zinc-600 rounded animate-pulse"></div>
					<div className="w-24 h-3 bg-zinc-300 dark:bg-zinc-600 rounded animate-pulse"></div>
				</div>

				{/* Property details skeleton */}
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-4">
						{/* Bedrooms */}
						<div className="flex items-center space-x-1">
							<div className="w-3 h-3 bg-zinc-300 dark:bg-zinc-600 rounded animate-pulse"></div>
							<div className="w-4 h-3 bg-zinc-300 dark:bg-zinc-600 rounded animate-pulse"></div>
						</div>

						{/* Bathrooms */}
						<div className="flex items-center space-x-1">
							<div className="w-3 h-3 bg-zinc-300 dark:bg-zinc-600 rounded animate-pulse"></div>
							<div className="w-4 h-3 bg-zinc-300 dark:bg-zinc-600 rounded animate-pulse"></div>
						</div>

						{/* Area */}
						<div className="flex items-center space-x-1">
							<div className="w-3 h-3 bg-zinc-300 dark:bg-zinc-600 rounded animate-pulse"></div>
							<div className="w-8 h-3 bg-zinc-300 dark:bg-zinc-600 rounded animate-pulse"></div>
						</div>
					</div>

					{/* Area number */}
					<div className="flex items-center space-x-1">
						<div className="w-8 h-3 bg-zinc-300 dark:bg-zinc-600 rounded animate-pulse"></div>
						<div className="w-6 h-3 bg-zinc-300 dark:bg-zinc-600 rounded animate-pulse"></div>
					</div>
				</div>

				{/* Condominio button skeleton */}
				<div className="w-20 h-6 bg-blue-200 dark:bg-blue-900/30 rounded animate-pulse"></div>
			</div>
		</div>
	);
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
