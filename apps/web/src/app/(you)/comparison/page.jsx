"use client"

import { BuyNowLink } from "@/app/item/[id]/BuyNowLink";
import { SnapScroller } from "@/components/SnapScroller/SnapScroller";
import { ItemData } from "@/app/item/[id]/ItemData";

import { useEffect, useState } from "react";
import { IPAddress } from "@/data/IPAddress";
import { getFromLocalStorage } from "@/utils/localStorageUtils";
import { HorizontalScroller } from "@/layouts/HorizontalScroller/HorizontalScroller";
import { SimilarItems } from "@/app/item/[id]/SimilarItems";
import { ItemDataPlaceholder } from "@/app/item/[id]/ItemDataPlaceholder";
import { HScrollerPlaceholder } from "@/layouts/HorizontalScroller/HScrollerPlaceholder";

import './ComparisonPage.css'

export default function ComparisonPage() {
    let [firstItemData, setFirstItemData] = useState(null);
    let [secondItemData, setSecondItemData] = useState(null);

    useEffect(() => {
        const monitorCompare = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            setFirstItemData(null)
            setSecondItemData(null)

            let comparisonIDs = getFromLocalStorage('compare')
            if (!comparisonIDs || comparisonIDs.length === 0) {
                return
            }

            fetch(`${IPAddress}/id?id=${comparisonIDs[0]}`)
                .then((response) => (response.json()), (reason) => (console.log(`Error due to ${reason}`)))
                .then((rawData) => {
                    setFirstItemData(rawData)
                });

            if (comparisonIDs.length === 1) {
                return
            }
            fetch(`${IPAddress}/id?id=${comparisonIDs[1]}`)
                .then((response) => (response.json()), (reason) => (console.log(`Error due to ${reason}`)))
                .then((rawData) => {
                    setSecondItemData(rawData)
                });

        };

        monitorCompare();
        window.addEventListener('localStorageChanged', monitorCompare);

        return () => {
            window.removeEventListener('localStorageChanged', monitorCompare);
        };
    }, []);


    return <>
        <div className="comparison-items-wrapper">
            <div className="comparison-item">
                {(firstItemData) ? <>
                    <SnapScroller images={firstItemData?.images} height="260px" />
                    <div className="comparison-item-left">
                        <ItemData data={firstItemData} />
                    </div>
                </> : <>
                    <div style={{ height: '260px', backgroundColor: 'rgb(224, 224, 224)' }}></div>
                    <ItemDataPlaceholder />
                </>
                }
            </div>
            <div className="comparison-item">
                {(secondItemData) ?
                    <>
                        <SnapScroller images={secondItemData?.images} height="260px" />
                        <div className="comparison-item-right">
                            <ItemData data={secondItemData} />
                        </div>
                    </> : <>
                        <div style={{ height: '260px', backgroundColor: 'rgb(224, 224, 224)' }}></div>
                        <ItemDataPlaceholder />
                    </>
                }
            </div>
        </div>
        <div className="similar-items-wrapper">
            {
                firstItemData ?
                    <SimilarItems color={firstItemData.colors[0]} gender={firstItemData.gender} category={firstItemData.categories[0]} /> :
                    <>
                        {/* placeholder */}
                        <div className='gray-section-wrapper'>
                            <div className='h-scroller-title'>
                                <div className='scroller-title-placeholder'></div>
                            </div>
                            <HScrollerPlaceholder />
                        </div>
                    </>
            }
            {
                secondItemData ?
                    <SimilarItems color={secondItemData.colors[0]} gender={secondItemData.gender} category={secondItemData.categories[0]} /> :
                    <>
                        {/* placeholder */}
                        <div className='gray-section-wrapper'>
                            <div className='h-scroller-title'>
                                <div className='scroller-title-placeholder'></div>
                            </div>
                            <HScrollerPlaceholder />
                        </div>
                    </>
            }
        </div>
    </>;
}
