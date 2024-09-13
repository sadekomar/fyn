import { BuyNowLink, ItemData, PhoneImages, SimilarItems } from "../ItemPage/ItemPage"
import { useEffect, useState } from "react";
import { IPAddress } from "../../data/IPAddress";
import { getFromLocalStorage } from "../../utils/localStorageUtils";
import { HorizontalScroller } from "../../layouts/HorizontalScroller/HorizontalScroller";

import './ComparisonPage.css'

export function ComparisonPage() {
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
                <PhoneImages data={firstItemData} height="260px" />
                <div className="comparison-item-left">
                    <ItemData data={firstItemData} />
                </div>
            </div>
            <div className="comparison-item">
                <PhoneImages data={secondItemData} height="260px" />
                <div className="comparison-item-right">
                    <ItemData data={secondItemData} />
                </div>
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
                            <HorizontalScroller />
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
                            <HorizontalScroller />
                        </div>
                    </>
            }
        </div>
    </>;
}
