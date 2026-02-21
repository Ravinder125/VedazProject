
interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({
    page = 1,
    onPageChange,
    totalPages = 1,
}: PaginationProps) => {
    if (totalPages <= 1) return null;

    const generatePages = () => {
        const pages: (number | string)[] = [];

        const siblingCount = 1 // Page beside current;
        const left = Math.max(page - siblingCount, 1);
        const right = Math.min(page + siblingCount, totalPages);

        // Always include first page 
        if (left < 1) {
            pages.push(1);
            if (left > 2) pages.push("...");
        }

        // Middle pages
        for (let i = left; i <= right; i++) {
            pages.push(i)
        }

        // Always include last page
        if (right < totalPages) {
            if (right < totalPages - 1) pages.push("...")
            pages.push(totalPages)
        }

        return pages;
    }

    const pages = generatePages();

    return (
        <div className="flex justify-center items-center gap-2 ">
            <button
                className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                disabled={page === 0}
                onClick={() => onPageChange(page - 1)}
            >
                Prev
            </button>

            {pages.map((p) =>
                p === "..." ? (
                    <span key={p} className="px-2">...</span>
                ) : (
                    <button
                        key={p}
                        className={`px-3 py-1 border rounded cursor-pointer disabled:cursor-not-allowed
                                 ${page === p
                                ? "bg-primary text-white"
                                : ""
                            }`}
                        onClick={() => onPageChange(Number(p))}
                    >
                        {p}
                    </button>
                ))
            }

            <button
                className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                disabled={page === totalPages}
                onClick={() => onPageChange(page + 1)}
            >
                Next
            </button>
        </div >
    )
}

export default Pagination