"use client";

interface PropertyDetailsSkeletonProps {
	showThumbnails?: boolean; // Whether to show thumbnail skeleton gallery
}

export default function PropertyDetailsSkeleton({
	showThumbnails = true,
}: PropertyDetailsSkeletonProps = {}) {
	return (
		<div className="min-h-screen bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white">
			{/* Back button skeleton */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
				<div className="flex items-center space-x-2">
					<div className="w-4 h-4 bg-gray-300 dark:bg-zinc-700 rounded animate-pulse"></div>
					<div className="w-16 h-4 bg-gray-300 dark:bg-zinc-700 rounded animate-pulse"></div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
					{/* Left side - Image and thumbnails */}
					<div className="lg:flex-1 lg:max-w-3xl">
						{/* Main image skeleton */}
						<div className="relative">
							<div className="h-64 sm:h-80 lg:h-[500px] bg-gray-200 dark:bg-zinc-800 animate-pulse rounded-2xl">
								{/* Status badges skeleton */}
								<div className="absolute top-4 left-4 flex space-x-2">
									<div className="w-16 h-6 bg-red-200 dark:bg-red-600/30 rounded animate-pulse"></div>
									<div className="w-20 h-6 bg-blue-200 dark:bg-blue-600/30 rounded animate-pulse"></div>
								</div>

								{/* Favorite button skeleton */}
								<div className="absolute top-4 right-4">
									<div className="w-10 h-10 bg-gray-300/70 dark:bg-zinc-700/50 rounded-full animate-pulse"></div>
								</div>

								{/* Navigation arrows skeleton */}
								<div className="absolute left-4 top-1/2 transform -translate-y-1/2">
									<div className="w-8 h-8 bg-gray-300/70 dark:bg-zinc-700/50 rounded-full animate-pulse"></div>
								</div>
								<div className="absolute right-4 top-1/2 transform -translate-y-1/2">
									<div className="w-8 h-8 bg-gray-300/70 dark:bg-zinc-700/50 rounded-full animate-pulse"></div>
								</div>

								{/* Carousel dots skeleton */}
								<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
									{[...Array(4)].map((_, i) => (
										<div
											key={i}
											className="w-2 h-2 bg-gray-400 dark:bg-zinc-600 rounded-full animate-pulse"
										></div>
									))}
								</div>
							</div>

							{/* Thumbnail gallery skeleton */}
							{showThumbnails && (
								<div className="flex space-x-2 mt-4">
									{[...Array(4)].map((_, i) => (
										<div
											key={i}
											className="w-16 h-12 sm:w-20 sm:h-14 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse flex-shrink-0"
										></div>
									))}
								</div>
							)}
						</div>
					</div>

					{/* Right side - Property details */}
					<div className="lg:flex-1 lg:max-w-lg">
						<div className="lg:sticky lg:top-8">
							{/* Property type skeleton */}
							<div className="flex items-center space-x-2 mb-4">
								<div className="w-5 h-5 bg-gray-300 dark:bg-zinc-700 rounded animate-pulse"></div>
								<div className="w-24 h-5 bg-gray-300 dark:bg-zinc-700 rounded animate-pulse"></div>
							</div>

							{/* Title skeleton */}
							<div className="w-32 h-8 bg-gray-300 dark:bg-zinc-700 rounded animate-pulse mb-2"></div>

							{/* Location skeleton */}
							<div className="flex items-center space-x-2 mb-6">
								<div className="w-4 h-4 bg-gray-300 dark:bg-zinc-700 rounded animate-pulse"></div>
								<div className="space-y-1">
									<div className="w-48 h-4 bg-gray-300 dark:bg-zinc-700 rounded animate-pulse"></div>
									<div className="w-40 h-3 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse"></div>
								</div>
							</div>

							{/* Price skeleton */}
							<div className="mb-6">
								<div className="w-16 h-4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse mb-2"></div>
								<div className="w-48 h-8 bg-gray-300 dark:bg-zinc-700 rounded animate-pulse"></div>
							</div>

							{/* Property features skeleton */}
							<div className="grid grid-cols-2 gap-4 mb-6">
								{/* Dormitorios */}
								<div className="flex items-center space-x-2">
									<div className="w-4 h-4 bg-gray-300 dark:bg-zinc-700 rounded animate-pulse"></div>
									<div className="w-20 h-4 bg-gray-300 dark:bg-zinc-700 rounded animate-pulse"></div>
								</div>

								{/* Baños */}
								<div className="flex items-center space-x-2">
									<div className="w-4 h-4 bg-gray-300 dark:bg-zinc-700 rounded animate-pulse"></div>
									<div className="w-16 h-4 bg-gray-300 dark:bg-zinc-700 rounded animate-pulse"></div>
								</div>

								{/* Estacionamiento */}
								<div className="flex items-center space-x-2">
									<div className="w-4 h-4 bg-gray-300 dark:bg-zinc-700 rounded animate-pulse"></div>
									<div className="w-12 h-4 bg-gray-300 dark:bg-zinc-700 rounded animate-pulse"></div>
								</div>

								{/* Area */}
								<div className="flex items-center space-x-2">
									<div className="w-4 h-4 bg-gray-300 dark:bg-zinc-700 rounded animate-pulse"></div>
									<div className="w-16 h-4 bg-gray-300 dark:bg-zinc-700 rounded animate-pulse"></div>
								</div>
							</div>

							{/* Address section skeleton */}
							<div className="mb-6">
								<div className="w-20 h-5 bg-gray-300 dark:bg-zinc-700 rounded animate-pulse mb-3"></div>
								<div className="space-y-2">
									<div className="w-36 h-4 bg-gray-300 dark:bg-zinc-700 rounded animate-pulse"></div>
									<div className="w-44 h-3 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse"></div>
								</div>
								{/* Condominio button skeleton */}
								<div className="w-24 h-6 bg-blue-200 dark:bg-blue-600/30 rounded animate-pulse mt-3"></div>
							</div>

							{/* Contact section skeleton */}
							<div className="mb-8">
								<div className="w-48 h-5 bg-gray-300 dark:bg-zinc-700 rounded animate-pulse mb-4"></div>

								{/* Contact buttons skeleton */}
								<div className="space-y-3">
									<div className="w-full h-12 bg-blue-200 dark:bg-blue-600/30 rounded-lg animate-pulse"></div>
									<div className="w-full h-12 bg-green-200 dark:bg-green-600/30 rounded-lg animate-pulse"></div>
									<div className="w-full h-12 bg-gray-300/70 dark:bg-zinc-700/50 rounded-lg animate-pulse"></div>
								</div>
							</div>

							{/* Description section skeleton */}
							<div className="mb-8">
								<div className="w-24 h-6 bg-gray-300 dark:bg-zinc-700 rounded animate-pulse mb-4"></div>
								<div className="space-y-2">
									<div className="w-full h-4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse"></div>
									<div className="w-4/5 h-4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse"></div>
									<div className="w-3/4 h-4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse"></div>
								</div>
							</div>

							{/* Agent info skeleton */}
							<div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-zinc-800/50 rounded-lg">
								<div className="flex items-center space-x-3">
									<div className="w-12 h-12 bg-gray-300 dark:bg-zinc-700 rounded animate-pulse"></div>
									<div className="space-y-2">
										<div className="w-32 h-4 bg-gray-300 dark:bg-zinc-700 rounded animate-pulse"></div>
										<div className="w-24 h-3 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse"></div>
										<div className="w-28 h-3 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}