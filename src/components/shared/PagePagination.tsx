"use client";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface PagePaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function PagePagination({ page, totalPages, onPageChange }: PagePaginationProps) {
    if (totalPages <= 1) return null;

    const go = (e: React.MouseEvent, p: number) => {
        e.preventDefault();
        onPageChange(Math.min(Math.max(p, 0), totalPages - 1));
    };

    return (
        <Pagination className="mt-4">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" onClick={(e) => go(e, page - 1)} />
                </PaginationItem>
                {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                        <PaginationLink
                            href="#"
                            isActive={i === page}
                            onClick={(e) => go(e, i)}
                        >
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext href="#" onClick={(e) => go(e, page + 1)} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
