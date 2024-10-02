"use client"

import './Pagination.css'
import { CaretLeftIcon, CaretRightIcon } from '@radix-ui/react-icons';

import { useSearchParams } from "next/navigation";

export function PaginationControl({ metadata }) {
    const ITEMS_PER_PAGE = 100;
    let numberOfItems = metadata['item_count'] || 0;
    let numberOfPages = Math.ceil(numberOfItems / ITEMS_PER_PAGE);
    let pageNumbers = Array.from({ length: numberOfPages }, (_, index) => index + 1);

    const searchParams = useSearchParams();
    let currentPage = parseInt(searchParams.get('page') || 1);

    function goToPage(index) {
        const params = new URLSearchParams(searchParams);
        params.set('page', index);
        window.history.pushState(null, '', `?${params.toString()}`)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    function goToNextPage() {
        const nextPageNumber = parseInt(searchParams.get('page') || '1') + 1;
        const params = new URLSearchParams(searchParams);
        params.set('page', nextPageNumber);
        window.history.pushState(null, '', `?${params.toString()}`)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    function goToPrevPage() {
        const previousPageNumber = parseInt(searchParams.get('page') || '1') - 1;
        const params = new URLSearchParams(searchParams);
        params.set('page', previousPageNumber);
        window.history.pushState(null, '', `?${params.toString()}`)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
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