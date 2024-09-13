import './CategorySelector.css'

export function CategorySelector({ metadata, searchParams, setSearchParams }) {
    function toggleCategory(category) {
        setSearchParams((currentSearchParams) => {
            const newParams = new URLSearchParams(currentSearchParams);
            if (currentSearchParams.get('category') == category) {
                newParams.set('category', 'all')
            }
            else {
                newParams.set('category', category);
            }
            newParams.set('page', 1);
            return newParams;
        });
    }


    return <div className="category-selector-scroller">
        {(metadata['categories'].length === 0) &&
            <>
                <div className="categorySliderPlaceholder">
                    <div className="categoryPlaceholder">
                        <div className="categorySlider__Image--placeholder"></div>
                        <span style={{ height: '12px', background: '#f0f0f0', width: '12ch', display: 'inline-block', textAlign: 'center', margin: '0px', padding: '0px' }}></span>
                    </div>
                    <div className="categoryPlaceholder">
                        <div className="categorySlider__Image--placeholder"></div>
                        <span style={{ height: '12px', background: '#f0f0f0', width: '12ch', display: 'inline-block', textAlign: 'center', margin: '0px', padding: '0px' }}></span>
                    </div>
                    <div className="categoryPlaceholder">
                        <div className="categorySlider__Image--placeholder"></div>
                        <span style={{ height: '12px', background: '#f0f0f0', width: '12ch', display: 'inline-block', textAlign: 'center', margin: '0px', padding: '0px' }}></span>
                    </div>
                    <div className="categoryPlaceholder">
                        <div className="categorySlider__Image--placeholder"></div>
                        <span style={{ height: '12px', background: '#f0f0f0', width: '12ch', display: 'inline-block', textAlign: 'center', margin: '0px', padding: '0px' }}></span>
                    </div>
                    <div className="categoryPlaceholder">
                        <div className="categorySlider__Image--placeholder"></div>
                        <span style={{ height: '12px', background: '#f0f0f0', width: '12ch', display: 'inline-block', textAlign: 'center', margin: '0px', padding: '0px' }}></span>
                    </div>
                </div>

            </>}
        {
            metadata['categories'].map((categoryObject, index) => (
                <div className="category-selector-wrapper" key={index} onClick={() => { toggleCategory(categoryObject.category); }}>
                    <img className="category-selector__img" src={categoryObject.image} alt={categoryObject.category} />
                    <button className={`category-selector__button ${categoryObject.category === searchParams.get('category') ? 'category-selector__button-selected' : ''}`}>{categoryObject.category} ({categoryObject.count})</button>
                </div>
            ))
        }
    </div>;
}