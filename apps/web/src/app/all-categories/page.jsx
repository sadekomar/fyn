import Link from 'next/link';

import { extendedCategories } from '../../data/extendedCategories';
import './AllCategories.css'

export const metadata = {
    title: 'All Categories - Loom',
    description: 'Find everything you need on Loom Cairo. Shop more than 17000 items in Cairo, Alexandria, Egypt. Shop now and explore the largest selection of local fashion brands.',
    robots: 'index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large',
    keywords: 'Loom Cairo, Local Brands, Fashion Brands, Egyptian Local Brands',
    openGraph: {
        title: 'All Categories - Loom',
        description: 'Find everything you need on Loom Cairo. Shop more than 17000 items in Cairo, Alexandria, Egypt. Shop now and explore the largest selection of local fashion brands.',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'All Categories - Loom',
        description: 'Find everything you need on Loom Cairo. Shop more than 17000 items in Cairo, Alexandria, Egypt. Shop now and explore the largest selection of local fashion brands.',
    },
}


export default function AllCategoriesPage({searchParams}) {
    if (searchParams) {
        console.log(searchParams.gender)
    } else {
        console.log('not available')
    }

    function generateCategoryLink(categoryLink) {
        let genderParam;
        const noGenderSpecified = !searchParams.gender
        if (noGenderSpecified) {
            return categoryLink
        }
        if (categoryLink.includes('?')) {
            genderParam = `&gender=${searchParams.gender}`
        } else {
            genderParam = `?gender=${searchParams.gender}`
        }
        return categoryLink + genderParam
    }

    function generateCategoryImage(category) {
        let genderParam;
        const noGenderSpecified = !searchParams.gender
        if (noGenderSpecified) {
            return category.image
        }
        if (searchParams.gender == 'men,unisex') {
            return `/categories/${category.term}-men.webp`
        }
        if (searchParams.gender === 'women,unisex') {
            return `/categories/${category.term}-women.webp`
        }
    }

    function isCategoryCompatibleWithGender(category) {
        const userInMenCategories = (searchParams.gender == 'men,unisex')

        if (('women_only' in category) && userInMenCategories) {
            return false
        }
        return true
    }

    return (<>

        <div>
            {
                Object.keys(extendedCategories).map((parentCategory, index) => (
                    <>
                        <h1 className='parent-category-title'>{parentCategory}</h1>
                        <div className='parent-category-slider'>
                            {
                                Object.keys(extendedCategories[parentCategory]).map((categoryKey, indexTwo) => {
                                    const category = extendedCategories[parentCategory][categoryKey];
                                    return (
                                        isCategoryCompatibleWithGender(category) ?
                                            <Link href={generateCategoryLink(category.link)}>
                                                <img src={generateCategoryImage(category)} alt="" />
                                                <button className='category-slider-label'>
                                                    {category.term}
                                                    <ArrowIcon />
                                                </button>
                                            </Link> :
                                            null
                                    );
                                })
                            }
                        </div >
                    </>
                ))
            }
        </div >
    </>);
}




function ArrowIcon() {
    return <svg height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>;
}

