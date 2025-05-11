"use client";

import React, { useEffect, useRef, useState } from "react";
import { Flex } from "@radix-ui/themes";
import { ClockIcon, X, Search } from "lucide-react";

import { IPAddress } from "../../data/IPAddress";
import { autofillSuggestionsList } from "../../data/autofillSuggestions";

import { GridLayout } from "../../layouts/GridLayout/GridLayout";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import "./SearchPage.css";
import { PaginationControl } from "@/components/Pagination/PaginationControl";

import { FiltersAndCount } from "../../components/FiltersAndCount/FiltersAndCount";
import { ColorPills } from "../(home)/(ColorPills)/ColorPills";
import { ItemCardsI, MetadataI } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { HttpMethods, httpService } from "@/queries/http.service";
import { ControlledSearchComponent } from "./SearchComponent";

export default function SearchPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryString = searchParams.toString();
  const queryStringArray = Array.from(searchParams.entries());

  const { data: products } = useQuery({
    queryKey: ["/search", ...queryStringArray],
    queryFn: () =>
      httpService<ItemCardsI[]>(HttpMethods.GET, `/items?${queryString}`, {
        isServer: false,
        isResponseJson: true,
      }),
  });

  const { data: metadata } = useQuery({
    queryKey: ["/metadata", ...queryStringArray],
    queryFn: () =>
      httpService<MetadataI>(
        HttpMethods.GET,
        `/items-metadata?${queryString}`,
        {
          isServer: false,
          isResponseJson: true,
        },
      ),
  });

  // let [products, setProducts] = useState<ItemCardsI[]>([]);
  // let [metadata, setMetadata] = useState<MetadataI>();
  let searchFieldRef = useRef<HTMLInputElement>(null);
  let autofillRef = useRef<HTMLDivElement>(null);
  const [searchField, setSearchField] = useState<string>("");
  let [searchHistory, setSearchHistory] = useState<string[]>([]);
  let [autofill, setAutofill] = useState<string[]>([]);

  // useEffect(() => {
  //   if (
  //     searchParams.toString() != "" &&
  //     searchParams.get("query") != "" &&
  //     searchParams.get("query") != " "
  //   ) {
  //     setProducts(null);
  //     searchFieldRef.current.value = searchParams.get("query");
  //     fetch(`${IPAddress}/search?${searchParams.toString()}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setProducts(data || null);
  //       })
  //       .catch((reason) => console.log(reason));

  //     fetch(`${IPAddress}/metadata?${searchParams.toString()}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setMetadata(data);
  //         setNumberOfItems(data["item_count"] || 0);
  //       })
  //       .catch((reason) => console.log(reason));
  //   } else {
  //     searchFieldRef.current.focus();
  //   }
  // }, [
  //   searchParams.get("brand"),
  //   searchParams.get("gender"),
  //   searchParams.get("color"),
  //   searchParams.get("category"),
  //   searchParams.get("material"),
  //   searchParams.get("sort_by"),
  //   searchParams.get("availability"),
  //   searchParams.get("page"),
  // ]);

  // okay how does search work?
  // just like filters i want search to do that as well
  // on mount if a search param exists then fetch the data
  //

  // Fetching data
  function search(query: string) {
    if (query != "" && query != " ") {
      // fetch(`${IPAddress}/search?query=${query}`)
      //   .then((response) => response.json())
      //   .then((data) => {
      //     setProducts(data || null);
      //   })
      //   .catch((reason) => console.log(reason));

      // fetch(`${IPAddress}/metadata?query=${query}`)
      //   .then((response) => response.json())
      //   .then((data) => {
      //     setMetadata(data);
      //     setNumberOfItems(data["item_count"] || 0);
      //   })
      //   .catch((reason) => console.log(reason));

      addToSearchHistory(query);
      router.push(pathname + `?query=${query}`);
    }
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
  }, []);

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
      <Flex direction={"column"}>
        <ControlledSearchComponent />
        <div className="search-and-autofill">
          <div
            className={`searchbar-wrapper ${!searchParams.get("query") ? "startup-searchbar-wrapper" : ""}`}
          >
            <div className="searchbar">
              <div className="magnifying-glass">
                <Search />
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("submitted");

                  if (searchFieldRef.current) {
                    router.push(
                      pathname + `?query=${searchFieldRef.current.value}`,
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
                  value={searchField}
                  type="search"
                  onChange={(e) => {
                    setSearchField(e.target.value);
                    // generateAutofillSuggestions();
                  }}
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
            className={`autofill-wrapper search-blurred ${!searchParams.get("query") ? "autofill-wrapper-initial" : ""}`}
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
                      router.push(pathname + `?query=${suggestion}`);

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
                    router.push(pathname + `?query=${suggestion}`);

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

        {searchParams.get("query") && (
          <>
            <ColorPills metadata={metadata} />
            <FiltersAndCount metadata={metadata} />
            <GridLayout items={products} />
            {/* <PaginationControl metadata={metadata} /> */}
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
      </Flex>
    </>
  );
}
