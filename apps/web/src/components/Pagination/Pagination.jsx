"use client"
import React, { useEffect, useState } from "react";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";

import './Pagination.css'

// search brand functionality
// filter by color
// filter by category
export function Pagination({ searchParams, setSearchParams, numberOfItems }) {
    let currentPage = parseInt(searchParams.get('page') || '1');
    let numberOfPages;
    let [visiblePages, setVisiblePages] = useState([]);
    let pageNumbers = [];

    useEffect(() => {
        let itemsPerPage = 100;
        if (numberOfItems) {
            numberOfPages = Math.ceil(numberOfItems / itemsPerPage);
            if (numberOfPages == 0) {
                numberOfPages = 1;
            }
            pageNumbers = Array.from({ length: numberOfPages }, (_, index) => index + 1);
            const start = Math.max(currentPage - 1, 0);
            const end = Math.min(start + 2, numberOfPages);
            setVisiblePages(pageNumbers);
        }
        else {
            console.log('number of items didnt load yet')
        }
    }, [numberOfItems])


    function goToPage(index) {
        window.scrollTo({
            top: 0,
        });
        setSearchParams((currentSearchParams) => {
            const newParams = new URLSearchParams(currentSearchParams);
            newParams.set('page', index);
            return newParams;
        });
    }

    function nextPage() {
        window.scrollTo({
            top: 0,
        });
        let nextPageNumber = parseInt(searchParams.get('page') || '1') + 1;
        setSearchParams((currentSearchParams) => {
            const newParams = new URLSearchParams(currentSearchParams);
            newParams.set('page', nextPageNumber);
            return newParams;
        });
    }

    function previousPage() {
        window.scrollTo({
            top: 0,
        });
        let previousPageNumber = parseInt(searchParams.get('page') || '1') - 1;
        setSearchParams((currentSearchParams) => {
            const newParams = new URLSearchParams(currentSearchParams);
            newParams.set('page', previousPageNumber);
            return newParams;
        });
    }

    function isFirstPage() {
        let currentPage = searchParams.get('page') || '1';
        if (currentPage == '1') {
            return true;
        }
        else {
            return false;
        }
    }

    function isLastPage() {
        currentPage = parseInt(searchParams.get('page') || 1);
        const itemsPerPage = 100;
        numberOfPages = Math.ceil(numberOfItems / itemsPerPage);
        if (currentPage === numberOfPages) {
            return true;
        }
        else {
            return false;
        }
    }

    return <>
        <div className="pagination-wrapper">
            <button className="pagination-button" onClick={previousPage} disabled={isFirstPage()}><CaretLeftIcon />Previous</button>
            {
                visiblePages.map((number, index) => (
                    <button
                        className={`pagination-number ${currentPage === number ? 'pagination-selected' : ''}`}
                        onClick={() => { goToPage(index + 1); }} key={index + 1}>
                        {number}
                    </button>
                ))
            }

            <button className="pagination-button" onClick={nextPage} disabled={isLastPage()}>Next <CaretRightIcon /></button>
        </div>
    </>;
}
