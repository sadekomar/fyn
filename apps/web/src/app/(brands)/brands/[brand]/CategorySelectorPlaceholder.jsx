export function CategorySelectorPlaceholder() {
    return <div className='category-selector-scroller'>
        {[...Array(5)].map((_, index) => (
            <div key={index} className="category-selector-wrapper">
                <div className="category-selector__img category-selector__img-placeholder"></div>
                <div className='category-selector__button'></div>
            </div>
        ))}
    </div>;
}
