"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({ currentPage, totalPages, baseUrl }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center gap-2" aria-label="Pagination">
      {/* Previous Page Button */}
      <Link
        href={createPageURL(currentPage - 1)}
        className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed pointer-events-none bg-gray-50"
            : "text-gray-700 bg-white border border-gray-200 hover:border-[#1565c0] hover:text-[#1565c0] hover:shadow-md"
        }`}
        aria-disabled={currentPage === 1}
      >
        <ChevronLeft size={18} />
        <span className="hidden sm:inline">Previous</span>
      </Link>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {getPageNumbers().map((page, index) => (
          page === "..." ? (
            <span
              key={`dots-${index}`}
              className="px-3 py-2 text-gray-500"
            >
              ⋯
            </span>
          ) : (
            <Link
              key={page}
              href={createPageURL(page)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                currentPage === page
                  ? "bg-[#1565c0] text-white shadow-md shadow-[#1565c0]/25"
                  : "text-gray-700 bg-white border border-gray-200 hover:border-[#1565c0] hover:text-[#1565c0] hover:shadow-md"
              }`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </Link>
          )
        ))}
      </div>

      {/* Next Page Button */}
      <Link
        href={createPageURL(currentPage + 1)}
        className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed pointer-events-none bg-gray-50"
            : "text-gray-700 bg-white border border-gray-200 hover:border-[#1565c0] hover:text-[#1565c0] hover:shadow-md"
        }`}
        aria-disabled={currentPage === totalPages}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={18} />
      </Link>
    </nav>
  );
}