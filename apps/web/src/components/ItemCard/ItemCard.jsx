import Link from 'next/link';
// import { motion } from 'framer-motion';

import './ItemCard.css';
import './Feather.css';
import { IPAddress } from '../../data/IPAddress';

import { LikeButton } from './LikeButton';
import { CompareButton } from '../CompareButton';

export function ItemCard({ id, name, price, date, brand, description, link, images, sizes, gender, color, colors, category, material, initialMinWidth = 170, imgLoading = 'lazy', className }) {

    return (
        <>
            <div className={`ItemCard ${className}`}>
                <LikeButton id={id} className='LikeButton' />
                <CompareButton id={id} className='CompareButton' />
                <Link href={`/item/${id}`}>
                    <img
                        loading={imgLoading}
                        src={images[0]['src']}
                        srcSet={images[0]['srcset']}
                        sizes="(max-width: 768px) 170px, 285px"
                        alt={name}
                        style={{
                            display: 'block',
                            objectFit: 'cover',
                            width: '100%',
                            maxWidth: '100%',
                            height: '340px',
                            backgroundColor: 'var(--gray-5)',
                            borderRadius: '8px',
                            transitionProperty: 'width',
                            transitionDuration: '0.3s',
                            transitionTimingFunction: 'ease',
                            transitionDelay: '0s',
                        }} />
                </Link>

                <Link href={`/item/${id}`}>
                    {name}
                </Link>
                <Link href={`/brands/${brand}`}>
                    {brand}
                </Link>
                <data value={price}>LE {price.toLocaleString()}</data>

                <div className='color-circles-wrapper'>
                    {
                        colors &&
                        colors.map((color, index) => (
                            <div className='color-circle' style={{ backgroundColor: color }} key={index}></div>
                        ))
                    }
                </div>
                {/* <Text size={'1'}>category</Text> */}
                {/* <CategoryComponent id={id} category={category} /> */}
                {/* <Text size={'1'}>color</Text>
                    <ColorComponent id={id} color={color} />
                    <Text size={'1'}>Gender</Text> */}
                {/* <GenderComponent id={id} gender={gender} /> */}
                {/* <Text size={'1'}>Material</Text>
                <MaterialComponent id={id} material={material} /> */}
            </div>



        </>
    );
}

function CategoryComponent({ id, category }) {
    let [categoryState, setCategoryState] = useState(category)
    let [listOfCategories, setListOfCategories] = useState([])

    useEffect(() => {
        fetch(`${IPAddress}/category`)
            .then((response) => (
                response.json()
            ))
            .then((data) => {
                setListOfCategories(data)
            })
    }, [])

    async function updateCategory(id, newCategory) {
        try {
            setCategoryState(newCategory)
            let response = await fetch(`${IPAddress}/category`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ item_id: id, new_category: newCategory })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('category updated successfully')
            } else {
                console.log('there was an error updating category')
                setCategoryState(category)
            }
        }
        catch (error) {
            console.log(`there was an error updating gender: ${error}`)
            setCategoryState(category)
        }
    }

    return <>
        <select name="selectingCategory" value={category} id="categorySelect" onChange={(e) => { updateCategory(id, e.target.value); }} style={{ fontFamily: '--apple-system, sans-serif', height: '40px' }}>
            <option value="null">null</option>
            {
                listOfCategories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))
            }
        </select>
    </>
}

function ColorComponent({ id, color }) {
    let [colorState, setColorState] = useState(color)
    let [listOfColors, setListOfColors] = useState([])
    useEffect(() => {
        fetch(`${IPAddress}/colors`)
            .then((response) => (
                response.json()
            ))
            .then((data) => {
                // console.log(data)
                setListOfColors(data)
            })
    }, [])

    async function updateCategory(id, newColor) {
        try {
            setColorState(newColor)
            let response = await fetch(`${IPAddress}/color`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ item_id: id, new_color: newColor })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Color updated successfully')
            } else {
                console.log('there was an error updating color')
                setColorState(color)
            }
        }
        catch (error) {
            console.log(`there was an error updating color: ${error}`)
            setColorState(color)
        }
    }

    return <>
        <select name="selectColor" value={color} id="categorySelect" onChange={(e) => { updateCategory(id, e.target.value); }} style={{ fontFamily: '--apple-system, sans-serif', height: '40px' }}>
            <option value="null">null</option>
            {
                listOfColors.map((color, index) => (
                    <option key={index} value={color}>{color}</option>
                ))
            }
        </select>
    </>
}

function GenderComponent({ id, gender }) {
    let [genderState, setGenderState] = useState(gender)
    async function updateGender(id, newGender) {
        try {
            setGenderState(newGender)
            let response = await fetch(`${IPAddress}/gender`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ item_id: id, new_gender: newGender })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Gender updated successfully')
            } else {
                console.log('there was an error updating gender')
                setGenderState(gender)
            }
        }
        catch (error) {
            console.log(`there was an error updating gender: ${error}`)
            setGenderState(gender)
        }
    }

    return <select id="sortingSelect" value={genderState} onChange={(e) => { updateGender(id, e.target.value); }} style={{ fontFamily: '--apple-system, sans-serif', height: '40px' }}>
        <option value="">null</option>
        <option value="women">women</option>
        <option value="unisex">unisex</option>
        <option value="men">men</option>
        <option value="kids">kids</option>
    </select>;
}

function MaterialComponent({ id, material }) {
    let [materialState, setMaterialState] = useState(material)
    async function updateMaterial(id, newMaterial) {
        try {
            setMaterialState(newMaterial)
            let response = await fetch(`${IPAddress}/material`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ item_id: id, new_material: newMaterial })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Material updated successfully')
            } else {
                console.log('there was an error updating gender')
                setMaterialState(material)
            }
        }
        catch (error) {
            console.log(`there was an error updating material: ${error}`)
            setMaterialState(material)
        }
    }

    return <select id="sortingSelect" value={materialState} onChange={(e) => { updateMaterial(id, e.target.value); }} style={{ fontFamily: '--apple-system, sans-serif', height: '40px' }}>
        <option value="null">null</option>
        <option value="linen">linen</option>
        <option value="denim">denim</option>
        <option value="leather">leather</option>
        <option value="jersey">jersey</option>
        <option value="twill">twill</option>
        <option value="other">other</option>
    </select>;
}
