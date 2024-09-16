import { HorizontalScroller } from "./HorizontalScroller";

export function HScrollerPlaceholder() {
    return <>
        <div className='h-scroller-title'>
            <span className="scroller-title-placeholder"></span>
        </div>
        <HorizontalScroller />
    </>;
}