import { LikeButton } from "@/components/ItemCard/LikeButton";
import { ShareButton } from "@/components/ShareButton";

export default function ItemDataPlaceholder() {
    return <>
        <div style={{ height: '440px', backgroundColor: 'rgb(224, 224, 224)' }}></div>
        <div className='ItemGrid'>
            <div className='itempage-placeholder-wrapper'>
                <div className='image-pills-wrapper'>
                    <div className='image-pill image-pill-selected'></div>
                    <div className='image-pill'></div>
                    <div className='image-pill'></div>
                    <div className='image-pill'></div>
                </div>
                <div className='name-placeholder'></div>
                <div className='brand-placeholder'></div>
                <div className='price-placeholder'></div>
                <div className='share-like-placeholder-wrapper'>
                    <LikeButton className={'ItemPage_Button'} />
                    <ShareButton className={'ItemPage_Button'} />
                </div>
                <div className='sizes-title-placeholder'></div>
                <div className='sizes-placeholders-wrapper'>
                    <div className='sizes-placeholder'></div>
                    <div className='sizes-placeholder'></div>
                    <div className='sizes-placeholder'></div>
                </div>
                <div className='cart-button-placeholder'></div>
                <div className='buy-button-placeholder'></div>
            </div>
        </div>
    </>;
}