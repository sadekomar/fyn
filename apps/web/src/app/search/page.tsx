"use client";

import React, { useEffect, useRef, useState } from "react";
import { ClockIcon, X, Search } from "lucide-react";

import { autofillSuggestionsList } from "../../data/autofillSuggestions";

import { GridLayout } from "../../layouts/GridLayout/GridLayout";

import { useSearchParams, usePathname } from "next/navigation";
import "./SearchPage.css";
import { PaginationControl } from "@/components/Pagination/PaginationControl";

import { FiltersAndCount } from "../../components/FiltersAndCount/FiltersAndCount";
import { ColorPills } from "../(home)/(components)/color-pills";
import { ItemCardsI, MetadataI } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { clientHttp } from "@/lib/queries/http.service";

export default function SearchPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryString = searchParams.toString();
  const queryStringArray = Array.from(searchParams.entries());

  const { data: products } = useQuery({
    queryKey: ["/search", ...queryStringArray],
    queryFn: () => clientHttp.get<ItemCardsI[]>(`/items?${queryString}`),
  });

  const { data: metadata } = useQuery({
    queryKey: ["/metadata", ...queryStringArray],
    queryFn: () => clientHttp.get<MetadataI>(`/items-metadata?${queryString}`),
  });

  let searchFieldRef = useRef<HTMLInputElement>(null);
  let autofillRef = useRef<HTMLDivElement>(null);
  let [searchHistory, setSearchHistory] = useState<string[]>([]);
  let [autofill, setAutofill] = useState<string[]>([]);

  // Fetching data
  function search(query: string) {
    addToSearchHistory(query);
    window.history.pushState(null, "", pathname + `?search=${query}`);
  }

  // Autofill
  function generateAutofillSuggestions() {
    const query = searchFieldRef.current?.value;

    let recentlySearched = JSON.parse(
      localStorage.getItem("recentlySearched") || "[]",
    );
    let filteredSearchResults = recentlySearched.filter(
      (searchTerm: string) => {
        return searchTerm.toLowerCase().includes(query?.toLowerCase() || "");
      },
    );
    setSearchHistory(filteredSearchResults);

    if (query == "" || query == " ") {
      setAutofill([]);
    } else {
      let filteredResults = autofillSuggestionsList.filter(
        (autofillTerm: string) =>
          autofillTerm.toLowerCase().includes(query?.toLowerCase() || ""),
      );

      filteredResults = filteredResults.filter(
        (autofillTerm: string) =>
          !recentlySearched.some(
            (searchTerm: string) =>
              searchTerm.toLowerCase() === autofillTerm.toLowerCase(),
          ),
      );
      setAutofill(filteredResults);
    }
  }

  // Search History
  useEffect(() => {
    const recentlySearched = JSON.parse(
      localStorage.getItem("recentlySearched") || "[]",
    );
    recentlySearched.reverse();
    setSearchHistory(recentlySearched);
    if (searchFieldRef.current) {
      searchFieldRef.current.value = searchParams.get("search") || "";
    }
  }, [searchParams]);

  function addToSearchHistory(searchString: string) {
    if (searchString != "" && searchString != " ") {
      setSearchHistory([]);
    }
    let recentlySearched = JSON.parse(
      localStorage.getItem("recentlySearched") || "[]",
    );
    recentlySearched.reverse();
    let isRecentlySearched = recentlySearched.includes(searchString);
    if (isRecentlySearched) {
      // Don't add it again.
      recentlySearched = recentlySearched.filter(
        (itemSearchString: string) => itemSearchString !== searchString,
      );
      recentlySearched.push(searchString);
    } else {
      recentlySearched.push(searchString);
      if (recentlySearched.length > 200) {
        recentlySearched = recentlySearched.slice(
          recentlySearched.length - 200,
        );
      }
    }
    localStorage.setItem("recentlySearched", JSON.stringify(recentlySearched));
    setSearchHistory(recentlySearched);
  }

  function removeFromSearchHistory(searchString: string) {
    const recentlySearched = JSON.parse(
      localStorage.getItem("recentlySearched") || "[]",
    );
    const index = recentlySearched.indexOf(searchString);
    if (index !== -1) {
      recentlySearched.splice(index, 1);
    }
    localStorage.setItem("recentlySearched", JSON.stringify(recentlySearched));
    // removeFromLocalStorage('recentlySearched', searchString)
    setSearchHistory(recentlySearched);
    searchFieldRef.current?.focus();
  }

  // Clear search field
  function clearSearchField() {
    searchFieldRef.current!.value = "";
    setAutofill([]);
    searchFieldRef.current?.focus();
  }

  return (
    <>
      <div className="flex min-h-dvh flex-col">
        <div className="search-and-autofill">
          <div
            className={`searchbar-wrapper ${!searchParams.get("search") ? "startup-searchbar-wrapper" : ""}`}
          >
            <div className="searchbar">
              <div className="magnifying-glass">
                <Search />
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  if (searchFieldRef.current) {
                    window.history.pushState(
                      null,
                      "",
                      pathname + `?search=${searchFieldRef.current.value}`,
                    );

                    search(searchFieldRef.current.value);
                    searchFieldRef.current.blur();
                  }
                }}
                action="."
                style={{ width: "100%" }}
                className="searchbar-form"
              >
                <input
                  className="searchbar-input"
                  placeholder="Search"
                  name="search"
                  ref={searchFieldRef}
                  type="search"
                  autoFocus
                  onChange={generateAutofillSuggestions}
                  onFocus={() => {
                    autofillRef.current?.classList.remove("search-blurred");
                  }}
                  onBlur={() => {
                    const isTouchDevice = () => {
                      return window.matchMedia("(pointer: coarse)").matches;
                    };
                    let delayTime = isTouchDevice() ? 1 : 200;

                    setTimeout(() => {
                      autofillRef.current?.classList.add("search-blurred");
                    }, delayTime);
                  }}
                />
                <input type="submit" hidden value="" />
              </form>
              <button
                className="clear-search-button"
                onClick={clearSearchField}
                onTouchEnd={clearSearchField}
              >
                <X className="cross-icon" />
              </button>
            </div>
          </div>
          <div
            ref={autofillRef}
            className={`autofill-wrapper search-blurred ${!searchParams.get("search") ? "autofill-wrapper-initial" : ""}`}
          >
            {searchHistory &&
              searchHistory.slice(0, 12).map((suggestion, index) => (
                <div key={index} className="search-history-button">
                  <button
                    key={index}
                    onClick={() => {
                      if (searchFieldRef.current) {
                        searchFieldRef.current.value = suggestion;
                      }
                      window.history.pushState(
                        null,
                        "",
                        pathname + `?search=${suggestion}`,
                      );

                      search(suggestion);
                      generateAutofillSuggestions();
                    }}
                    className="suggestion-button"
                  >
                    <ClockIcon /> {suggestion}
                  </button>
                  <button
                    onClick={() => {
                      removeFromSearchHistory(suggestion);
                    }}
                    className="remove-from-search-history-button"
                  >
                    <X />
                  </button>
                </div>
              ))}
            {autofill &&
              autofill.slice(0, 12).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (searchFieldRef.current) {
                      searchFieldRef.current.value = suggestion;
                    }
                    window.history.pushState(
                      null,
                      "",
                      pathname + `?search=${suggestion}`,
                    );

                    search(suggestion);
                    generateAutofillSuggestions();
                  }}
                  className="suggestion-button"
                >
                  <Search /> {suggestion}
                </button>
              ))}
          </div>
        </div>

        {searchParams.get("search") && (
          <>
            <ColorPills metadata={metadata} />
            <FiltersAndCount metadata={metadata} />
            <GridLayout items={products} />
            <PaginationControl metadata={metadata} />
          </>
        )}

        {/* {
                (!searchParams.get('query')) ?
                    <>
                        <AllCategoriesPage />
                    </>
                    :
                    <div></div>
            } */}
      </div>
    </>
  );
}
