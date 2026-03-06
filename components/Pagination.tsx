"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const goToPage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(page));
        router.push(`?${params.toString()}`);
    };

    if (totalPages <= 1) return null;

    return (
        <div className="mt-12 flex items-center justify-center gap-4">
            <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage <= 1}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-white dark:bg-white/5 border border-nordic-dark/10 dark:border-white/10 text-nordic-dark dark:text-white font-medium rounded-lg transition-all hover:border-mosque hover:text-mosque disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-nordic-dark/10 disabled:hover:text-nordic-dark dark:disabled:hover:text-white"
                aria-label="Previous page"
            >
                <span className="material-icons text-sm">arrow_back</span>
                Prev
            </button>

            <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => goToPage(page)}
                        aria-current={page === currentPage ? "page" : undefined}
                        className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${page === currentPage
                                ? "bg-mosque text-white shadow-sm"
                                : "bg-white dark:bg-white/5 border border-nordic-dark/10 dark:border-white/10 text-nordic-dark dark:text-white hover:border-mosque hover:text-mosque"
                            }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-white dark:bg-white/5 border border-nordic-dark/10 dark:border-white/10 text-nordic-dark dark:text-white font-medium rounded-lg transition-all hover:border-mosque hover:text-mosque disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-nordic-dark/10 disabled:hover:text-nordic-dark dark:disabled:hover:text-white"
                aria-label="Next page"
            >
                Next
                <span className="material-icons text-sm">arrow_forward</span>
            </button>
        </div>
    );
}
