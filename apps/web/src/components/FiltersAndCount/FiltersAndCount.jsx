import { Filters } from '../FiltersAndSort/Filters';

import './FiltersAndCount.css'

export function FiltersAndCount({ numberOfItems, searchParams, setSearchParams, metadata }) {
    return <>
        <Filters searchParams={searchParams} setSearchParams={setSearchParams} metadata={metadata} />
        <p className='item-count'>{numberOfItems && numberOfItems} Items</p>
    </>;
}
