"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Flex } from '@radix-ui/themes';
import { ClockIcon, Cross1Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Helmet } from 'react-helmet';

import { IPAddress } from '../../data/IPAddress';
import { autofillSuggestionsList } from '../../data/autofillSuggestions';

import { GridLayout } from '../../layouts/GridLayout/GridLayout';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import './SearchPage.css'
import { Pagination } from '../../components/Pagination/Pagination';

import { FiltersAndCount } from '../../components/FiltersAndCount/FiltersAndCount';
// import AllCategoriesPage from '../all-categories/page';
import { ColorPills } from '../(home)/(ColorPills)/ColorPills';

export default function SearchPage() {
    const searchParams = useSearchParams();
    let [products, setProducts] = useState(null)
    let [searchHistory, setSearchHistory] = useState(null)
    let [autofill, setAutofill] = useState(null);
    let [numberOfItems, setNumberOfItems] = useState(null);
    const router = useRouter();
    const pathname = usePathname();

    let isEmpty;
    let [metadata, setMetadata] = useState({
        'brands': [],
        'colors': [],
        'genders': [],
        'categories': [],
        'materials': [],
    });


    let searchFieldRef = useRef();
    let autofillRef = useRef();

    // Fetching data
    function search(query) {
        if (query != '' && query != ' ') {
            setProducts(null)

            fetch(`${IPAddress}/search?query=${query}`)
                .then((response) => (response.json()))
                .then((data) => {
                    setProducts(data || null);
                })
                .catch(reason => console.log(reason))

            fetch(`${IPAddress}/metadata?query=${query}`)
                .then((response) => (response.json()))
                .then((data) => {
                    setMetadata(data)
                    setNumberOfItems(data['item_count'] || 0)
                })
                .catch(reason => console.log(reason))

            addToSearchHistory(query)
        }
    }

    useEffect(() => {
        if (searchParams.toString() != '' && searchParams.get('query') != '' && searchParams.get('query') != ' ') {
            setProducts(null)
            searchFieldRef.current.value = searchParams.get('query')
            fetch(`${IPAddress}/search?${searchParams.toString()}`)
                .then((response) => (response.json()))
                .then((data) => {
                    setProducts(data || null);
                })
                .catch(reason => console.log(reason))

            fetch(`${IPAddress}/metadata?${searchParams.toString()}`)
                .then((response) => (response.json()))
                .then((data) => {
                    setMetadata(data)
                    setNumberOfItems(data['item_count'] || 0)
                })
                .catch(reason => console.log(reason))
        }
        else {
            searchFieldRef.current.focus()
        }
    }, [
        searchParams.get('brand'),
        searchParams.get('gender'),
        searchParams.get('color'),
        searchParams.get('category'),
        searchParams.get('material'),
        searchParams.get('sort_by'),
        searchParams.get('availability'),
        searchParams.get('page')
    ])


    // Autofill
    function generateAutofillSuggestions() {
        const query = searchFieldRef.current.value;

        let recentlySearched = JSON.parse(localStorage.getItem('recentlySearched') || '[]')
        let filteredSearchResults = recentlySearched.filter(searchTerm => {
            return searchTerm.toLowerCase().includes(query.toLowerCase())
        })
        setSearchHistory(filteredSearchResults)

        if (query == '' || query == ' ') {
            setAutofill(null);
        }
        else {
            let filteredResults = autofillSuggestionsList.filter(autofillTerm =>
                autofillTerm.toLowerCase().includes(query.toLowerCase())
            );

            filteredResults = filteredResults.filter(autofillTerm =>
                !recentlySearched.some(searchTerm =>
                    searchTerm.toLowerCase() === autofillTerm.toLowerCase()
                )
            );
            setAutofill(filteredResults);
        }
    };


    // Search History
    useEffect(() => {
        const recentlySearched = JSON.parse(localStorage.getItem('recentlySearched') || '[]');
        recentlySearched.reverse();
        setSearchHistory(recentlySearched)
    }, [])

    function addToSearchHistory(searchString) {
        if (searchString != '' && searchString != ' ') {
            setSearchHistory(null)
        }
        let recentlySearched = JSON.parse(localStorage.getItem('recentlySearched') || '[]');
        recentlySearched.reverse()
        let isRecentlySearched = recentlySearched.includes(searchString);
        if (isRecentlySearched) {
            // Don't add it again.
            recentlySearched = recentlySearched.filter(itemSearchString => itemSearchString !== searchString);
            recentlySearched.push(searchString);
        } else {
            recentlySearched.push(searchString);
            if (recentlySearched.length > 200) {
                recentlySearched = recentlySearched.slice(recentlySearched.length - 200);
            }
        }
        localStorage.setItem('recentlySearched', JSON.stringify(recentlySearched));
        setSearchHistory(recentlySearched)
    }

    function removeFromSearchHistory(searchString) {
        const recentlySearched = JSON.parse(localStorage.getItem('recentlySearched') || '[]');
        const index = recentlySearched.indexOf(searchString);
        if (index !== -1) {
            recentlySearched.splice(index, 1);
        }
        localStorage.setItem('recentlySearched', JSON.stringify(recentlySearched))
        // removeFromLocalStorage('recentlySearched', searchString)
        setSearchHistory(recentlySearched)
        searchFieldRef.current.focus()
    }

    // Clear search field
    function clearSearchField() {
        searchFieldRef.current.value = '';
        setAutofill(null);
        searchFieldRef.current.focus()
    }

    return <>
        <Helmet>
            <title>{searchParams.get('query')}</title>
        </Helmet>
        <Flex direction={'column'}>
            <div className='search-and-autofill'>
                <div className={`searchbar-wrapper ${!searchParams.get('query') ? 'startup-searchbar-wrapper' : ''}`}>
                    <div className="searchbar">
                        <div className='magnifying-glass'>
                            <MagnifyingGlassIcon />
                        </div>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                router.push(pathname + `?query=${searchFieldRef.current.value}`)

                                search(searchFieldRef.current.value);
                                searchFieldRef.current.blur();
                            }}
                            action='.'
                            style={{ width: '100%' }}
                            className='searchbar-form'
                        >
                            <input
                                className='searchbar-input'
                                placeholder='Search'
                                name='search'
                                ref={searchFieldRef}
                                type="search"
                                onChange={() => {
                                    generateAutofillSuggestions();
                                }}
                                onFocus={() => {
                                    autofillRef.current?.classList.remove('search-blurred')
                                }}
                                onBlur={() => {
                                    const isTouchDevice = () => {
                                        return window.matchMedia("(pointer: coarse)").matches;
                                    };
                                    let delayTime = isTouchDevice() ? 1 : 200;

                                    setTimeout(() => {
                                        autofillRef.current?.classList.add('search-blurred')
                                    }, delayTime);
                                }}
                            />
                            <input type="submit" hidden value="" />

                        </form>
                        <button className='clear-search-button' onClick={clearSearchField} onTouchEnd={clearSearchField}>
                            <Cross1Icon className='cross-icon' />
                        </button>
                    </div>
                </div>
                <div
                    ref={autofillRef}
                    className={`autofill-wrapper search-blurred ${!searchParams.get('query') ? 'autofill-wrapper-initial' : ''}`}>
                    {searchHistory &&
                        searchHistory.slice(0, 12).map((suggestion, index) => (
                            <div className='search-history-button'>
                                <button
                                    key={index}
                                    onClick={() => {
                                        searchFieldRef.current.value = suggestion;
                                        router.push(pathname + `?query=${suggestion}`);

                                        search(suggestion)
                                        generateAutofillSuggestions()
                                    }}
                                    className='suggestion-button'>
                                    <ClockIcon /> {suggestion}
                                </button>
                                <button onClick={() => {
                                    removeFromSearchHistory(suggestion)
                                }} className='remove-from-search-history-button'>
                                    <Cross1Icon />
                                </button>
                            </div>
                        ))
                    }
                    {
                        autofill &&
                        autofill.slice(0, 12).map((suggestion, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    searchFieldRef.current.value = suggestion;
                                    router.push(pathname + `?query=${suggestion}`);


                                    search(suggestion)
                                    generateAutofillSuggestions()
                                }}
                                className='suggestion-button'>
                                <MagnifyingGlassIcon /> {suggestion}
                            </button>
                        ))
                    }
                </div>
            </div>

            {
                searchParams.get('query') &&
                <>
                    {/* <ColorPills searchParams={searchParams} setSearchParams={setSearchParams} metadata={metadata} /> */}
                    <FiltersAndCount numberOfItems={numberOfItems} metadata={metadata} />
                    <GridLayout products={products} emptyState={isEmpty} />
                    <Pagination numberOfItems={numberOfItems} />
                </>
            }


            {/* {
                (!searchParams.get('query')) ?
                    <>
                        <AllCategoriesPage />
                    </>
                    :
                    <div></div>
            } */}
        </Flex >
    </>;
}


