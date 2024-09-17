import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Pagination } from '../../components/Pagination/Pagination';
import { Helmet } from 'react-helmet';

import { IPAddress } from '../../data/IPAddress';

import './CategoryPage.css'

import { GridLayout } from '../../layouts/GridLayout/GridLayout';
import useSWR from 'swr';
import { ColorPills } from '../Home/components/ColorPills/ColorPills';
import { newCategories } from '../../data/categories';
import { FiltersAndCount } from '../../components/FiltersAndCount/FiltersAndCount';

const fetcher = (...args) => fetch(...args).then(res => res.json())


export function CategoryPage() {
    const param = useParams()
    let [searchParams, setSearchParams] = useSearchParams({ 'filter_automatically': 'categories' })
    const [products, setProducts] = useState(null);
    let [numberOfItems, setNumberOfItems] = useState(null);

    let [metadata, setMetadata] = useState({
        'brands': [],
        'colors': [],
        'genders': [],
        'categories': [],
        'materials': [],
    });

    useEffect(() => {
        setProducts(null)
        console.log(`${IPAddress}/search?category=${param['category']}&${searchParams.toString()}`)
        fetch(`${IPAddress}/search?category=${param['category']}&${searchParams.toString()}`)
            .then(response => response.json())
            .then(data => {
                setProducts(data)
            })
            .then(() => {
                fetch(`${IPAddress}/metadata?category=${param['category']}&${searchParams.toString()}`)
                    .then(response => response.json())
                    .then(data => {
                        setMetadata(data);
                        setNumberOfItems(data['item_count'] || 0);
                    })
                    .catch(error => console.error('Error fetching data:', error));
            })
            .catch(error => console.error('Error fetching data:', error));

    }, [
        param['category'],
        searchParams.get('brand'),
        searchParams.get('gender'),
        searchParams.get('color'),
        searchParams.get('material'),
        searchParams.get('sort_by'),
        searchParams.get('availability'),
        searchParams.get('page')
    ]);

    return <>
        <Helmet>
            <title>{param['category'].charAt(0).toUpperCase() + param['category'].slice(1)}</title>
        </Helmet>
        <div className="category-page-header">
            <img src={newCategories[param['category']]?.['image'] || ''} alt="" />
            <div className='category-page-title-wrapper'>
                <h2 className="category-page-title">{param['category']}</h2>
            </div>
        </div>

        <ColorPills searchParams={searchParams} setSearchParams={setSearchParams} metadata={metadata} />

        <FiltersAndCount numberOfItems={numberOfItems} searchParams={searchParams} setSearchParams={setSearchParams} metadata={metadata} />
        <GridLayout products={products} />
        <Pagination searchParams={searchParams} setSearchParams={setSearchParams} numberOfItems={numberOfItems} />
    </>;
}
