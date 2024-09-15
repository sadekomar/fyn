"use client"

import './Pagination.css'
import { CaretLeftIcon, CaretRightIcon } from '@radix-ui/react-icons';

import { useSearchParams, useRouter, usePathname } from "next/navigation";

export function PaginationControl({ numberOfPages, pageNumbers }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    
    let currentPage = parseInt(searchParams.get('page') || 1);

    function goToPage(index) {
        const params = new URLSearchParams(searchParams);
        params.set('page', index);
        router.push(pathname + '?' + params.toString());
    }

    function goToNextPage() {
        const nextPageNumber = parseInt(searchParams.get('page') || '1') + 1;
        const params = new URLSearchParams(searchParams);
        params.set('page', nextPageNumber);
        router.push(pathname + '?' + params.toString());
    }

    function goToPrevPage() {
        const previousPageNumber = parseInt(searchParams.get('page') || '1') - 1;
        const params = new URLSearchParams(searchParams);
        params.set('page', previousPageNumber);
        router.push(pathname + '?' + params.toString());
    }

    function isFirstPage() {
        return currentPage == '1';
    }

    function isLastPage(numberOfPages) {
        currentPage = parseInt(searchParams.get('page') || 1);
        return currentPage === numberOfPages;
    }

    return <div className="pagination-wrapper">
        <button className="pagination-button" onClick={goToPrevPage} disabled={isFirstPage()}><CaretLeftIcon />Previous</button>
        {pageNumbers.map((number, index) => (
            <button
                className={`pagination-number ${currentPage === number ? 'pagination-selected' : ''}`}
                onClick={() => { goToPage(index + 1); }} key={index + 1}>
                {number}
            </button>
        ))}
        <button className="pagination-button" onClick={goToNextPage} disabled={isLastPage(numberOfPages)}>Next <CaretRightIcon /></button>
    </div>;
}