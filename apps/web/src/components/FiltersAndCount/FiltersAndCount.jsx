import { Filters } from '../FiltersAndSort/Filters';

import './FiltersAndCount.css'

export function FiltersAndCount({ numberOfItems, metadata }) {

    return <>
        <Filters metadata={metadata} />
        <p className='item-count'>{numberOfItems} Items</p>
    </>;
}