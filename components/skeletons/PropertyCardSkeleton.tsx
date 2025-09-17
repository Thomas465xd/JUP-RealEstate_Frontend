export default function PropertyCardSkeleton() {
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
