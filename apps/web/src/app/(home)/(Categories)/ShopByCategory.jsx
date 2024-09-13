import Link from 'next/link';

// import '../Featured/FeaturedSection.css'
import './Categories.css'

export function ShopByCategory() {
    return <>
        <div className='categories-wrapper'>
            <Link href={'/categories/jeans'}>
                <div className="category">
                    <img src="https://res.cloudinary.com/dffgye7z3/image/upload/w_580/v1725840213/jeans_mibzae.webp" alt="Jeans category" />
                    <div className='category-title-wrapper'>
                        <h3 className='category-title' href="">Jeans</h3>
                    </div>
                </div>
            </Link>
            <Link href={'/categories/t-shirts'}>
                <div className="category">
                    <img src="https://res.cloudinary.com/dffgye7z3/image/upload/w_580/v1725840213/t-shirts_dj1gu1.webp" alt="T-shirts category" />
                    <div className='category-title-wrapper'>
                        <h3 className='category-title' href="">T-Shirts</h3>
                    </div>
                </div>
            </Link>
            <Link href={'/categories/cargos'}>
                <div className="category">
                    <img src="https://res.cloudinary.com/dffgye7z3/image/upload/w_580/v1725840213/cargos_dp32eh.webp" alt="Cargos category" />
                    <div className='category-title-wrapper'>
                        <h3 className='category-title' href="">Cargos</h3>
                    </div>
                </div>
            </Link>
            <Link href={'/categories/shirts'}>
                <div className="category">
                    <img src="https://res.cloudinary.com/dffgye7z3/image/upload/w_580/v1725840213/shirts_lgr5qn.webp" alt="Shirts category" />
                    <div className='category-title-wrapper'>
                        <h3 className='category-title' href="">Shirts</h3>
                    </div>
                </div>
            </Link>
        </div>
    </>;
}
