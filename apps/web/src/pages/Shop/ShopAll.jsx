
// Old shop all page

// import React, { useEffect, useState } from 'react';
// import { FixedSizeList as List } from 'react-window';

// import { IPAddress } from '../../data/IPAddress';

// import { BrandInfo } from '../../components/BrandInfo';
// import { HorizontalScroll } from '../../layouts/HorizontalScroll/HorizontalScroll';
// import './ShopAll.css'

// export function ShopAll() {
//     const [brandsList, setBrandsList] = useState([]);

//     useEffect(() => {
//         fetch(`${IPAddress}/brands-list`)
//             .then(response => response.json())
//             .then(data => setBrandsList(data))
//             .catch(error => console.error('Error fetching brands:', error));
//     }, []);

//     const Row = ({ index, style }) => {
//         const brand = brandsList[index];
//         if (index === 0) {
//             const brand = brandsList[index];
//             return (
//                 <div style={style}>
//                     <HorizontalScroll BrandInfo={<BrandInfo brand={brand} />} brand={brand} />
//                 </div>
//             );
//         } else {
//             const brand = brandsList[index];
//             return (
//                 <div style={style}>
//                     <HorizontalScroll BrandInfo={<BrandInfo brand={brand} />} brand={brand} />
//                 </div>
//             );
//         }
//     };

//     return (
//         <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, overflow: 'auto', backgroundColor: 'white' }}>
//             {brandsList.length > 0 ? (
//                 <List
//                     height={1000}
//                     itemCount={brandsList.length}
//                     itemSize={510}
//                     width={'100%'}
//                 >
//                     {Row}
//                 </List>
//             ) : (
//                 [...Array(5)].map((_, index) => (
//                     <HorizontalScroll key={index} />
//                 ))
//             )}
//         </div>
//     );
// }

import React, { useEffect, useState } from 'react';
import { IPAddress } from '../../data/IPAddress';
import { GridLayout } from '../../layouts/GridLayout/GridLayout';
import { Filters } from '../../components/FiltersAndSort/Filters';

import './ShopAll.css'
import { createSearchParams, useSearchParams } from 'react-router-dom';


export function ShopAll() {
    let [items, setItems] = useState(null)
    let [searchParams, setSearchParams] = useSearchParams({})
    let [metadata, setMetadata] = useState({
        'brands': [],
        'colors': [],
        'genders': [],
        'categories': [],
        'materials': [],
        'item_count': 0,
    });

    useEffect(() => {
        setItems(null)
        setMetadata({
            'brands': [],
            'colors': [],
            'genders': [],
            'categories': [],
            'materials': [],
            'item_count': 0,
        })
        fetch(`${IPAddress}/search?${searchParams.toString()}`)
            .then(response => response.json())
            .then(data => {
                setItems(data)
            })
            .catch(error => console.error('Error fetching data:', error));
        fetch(`${IPAddress}/metadata?${searchParams.toString()}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setMetadata(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [
        searchParams.get('category'),
        searchParams.get('brand'),
        searchParams.get('gender'),
        searchParams.get('color'),
        searchParams.get('material'),
        searchParams.get('sort_by'),
        searchParams.get('availability'),
        searchParams.get('page')
    ]);


    return <>
        <h1>
            {metadata['item_count']} Items
        </h1>
        <Filters searchParams={searchParams} setSearchParams={setSearchParams} metadata={metadata} />
        <GridLayout products={items} />
    </>

}