import './ColorPills.css'

export function ColorPills({ searchParams, setSearchParams, metadata }) {
    function toggleColor(color) {
        setSearchParams((currentSearchParams) => {
            console.log(currentSearchParams)
            const newParams = new URLSearchParams(currentSearchParams);
            if (currentSearchParams.get('color') == color) {
                newParams.set('color', 'all')
            }
            else {
                newParams.set('color', color);
            }
            newParams.set('page', 1);
            return newParams;
        });
    }

    return <div className='color-pills-wrapper'>
        {
            (searchParams.get('color') == 'all') ?
                <div className='color-pill color-pill-selected' onClick={() => { toggleColor('all'); }}>All</div> :
                <div className='color-pill' onClick={() => { toggleColor('all'); }}>All</div>
        }

        {
            metadata['colors'].map((colorObject, index) => (
                (colorObject.color == searchParams.get('color')) ?
                    <>
                        <div key={index} className='color-pill color-pill-selected' onClick={() => { toggleColor(colorObject.color); }}>{colorObject.color} ({colorObject.count})</div>
                    </> :
                    <>
                        <div key={index} className='color-pill' onClick={() => { toggleColor(colorObject.color); }}>{colorObject.color} ({colorObject.count})</div>
                    </>
            ))
        }

        {(metadata['categories'].length === 0) &&
            [...Array(20)].map((_, index) => (
                <span key={index} style={{ width: '90px' }}></span>
            ))}
    </div>;
}
