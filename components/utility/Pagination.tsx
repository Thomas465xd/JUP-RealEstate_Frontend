import Link from "next/link";

type PaginationProps = {
	route: string;
	page: number;
	totalPages: number;
	maxPageButtons?: number;
	searchParams?: URLSearchParams; // Changed from searchQuery to accept all params
};

export default function Pagination({
	route,
	page,
	totalPages,
	maxPageButtons = 5,
	searchParams,
}: PaginationProps) {
	const actualMaxButtons = Math.min(maxPageButtons, totalPages);

	// Helper function to build URL with all search params preserved
	const buildUrlWithPage = (pageNumber: number): string => {
		if (!searchParams) {
			return `${route}?page=${pageNumber}`;
		}

		const params = new URLSearchParams(searchParams);
		params.set('page', pageNumber.toString());
		
		return `${route}?${params.toString()}`;
	};

	const getVisiblePages = () => {
		if (totalPages <= actualMaxButtons) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}

		const sideButtonCount = Math.floor((actualMaxButtons - 2) / 2);

		let startPage = Math.max(2, page - sideButtonCount);
		let endPage = Math.min(totalPages - 1, page + sideButtonCount);

		if (startPage <= 2) {
			endPage = Math.min(1 + actualMaxButtons, totalPages - 1);
		}
		if (endPage >= totalPages - 1) {
			startPage = Math.max(2, totalPages - actualMaxButtons);
		}

		const visiblePages = [1];

		if (startPage > 2) {
			visiblePages.push(-1);
		}

		for (let i = startPage; i <= endPage; i++) {
			visiblePages.push(i);
		}

		if (endPage < totalPages - 1) {
			visiblePages.push(-2);
		}

		if (totalPages > 1) {
			visiblePages.push(totalPages);
		}

		return visiblePages;
	};

	const visiblePages = getVisiblePages();

	return (
		<nav className="flex flex-wrap justify-center items-center gap-2 py-10">
			{/* Previous page button */}
			{page > 1 && (
				<Link
					href={buildUrlWithPage(page - 1)}
					aria-label="Previous page"
					className="flex items-center justify-center w-10 h-10 
                        bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 
                        text-lg font-bold rounded-md shadow-md 
                        ring-1 ring-zinc-300 dark:ring-zinc-700 
                        hover:bg-zinc-200 dark:hover:bg-zinc-700 
                        transition-all"
				>
					&laquo;
				</Link>
			)}

			{/* Page buttons */}
			{visiblePages.map((pageNum, index) => {
				if (pageNum < 0) {
					return (
						<span
							key={`ellipsis-${index}`}
							className="flex items-center justify-center w-10 h-10 text-zinc-500 dark:text-zinc-400"
						>
							&hellip;
						</span>
					);
				}

				return (
					<Link
						key={`page-${pageNum}`}
						href={buildUrlWithPage(pageNum)}
						className={`flex items-center justify-center w-10 h-10 text-sm font-bold rounded-md shadow-md ring-1 transition-all
            ${
					page === pageNum
						? "bg-blue-500 text-white ring-blue-500"
						: "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 ring-zinc-300 dark:ring-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700"
				}`}
					>
						{pageNum}
					</Link>
				);
			})}

			{/* Next page button */}
			{page < totalPages && (
				<Link
					href={buildUrlWithPage(page + 1)}
					aria-label="Next page"
					className="flex items-center justify-center w-10 h-10 
                        bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 
                        text-lg font-bold rounded-md shadow-md 
                        ring-1 ring-zinc-300 dark:ring-zinc-700 
                        hover:bg-zinc-200 dark:hover:bg-zinc-700 
                        transition-all"
				>
					&raquo;
				</Link>
			)}
		</nav>
	);
}