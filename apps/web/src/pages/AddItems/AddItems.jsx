import { useEffect, useState } from "react";
import { ItemCard } from "../../components/ItemCard/ItemCard";
import { IPAddress } from "../../data/IPAddress";

import './AddItems.css'

export function AddItems() {
    const [itemIds, setItemIds] = useState([])

    useEffect(() => {
        fetch(`${IPAddress}/search?brand=vee`)
            .then((response) => response.json())
            .then((data) => {
                const ids = data.map(item => item.id)
                setItemIds(ids)
            })
            .catch((error) => console.error('Error fetching data:', error))
    }, [])

    return <>
        <div className="add-items-grid">
            {itemIds.map(id => (
                <UpdateItemCard key={id} id={id} />
            ))}
        </div >
    </>
}

function UpdateItemCard({ id }) {
    const [editableItem, setEditableItem] = useState(null)
    const [thumbnailImage, setThumbnailImage] = useState('')

    useEffect(() => {
        fetch(`${IPAddress}/id?id=${id}&raw_data=true`)
            .then((response) => (
                response.json()
            ))
            .then((data) => {
                setEditableItem(data)
                const sizedImage = data.images[0].replace('loom-image-dimensions', '380')
                setThumbnailImage(sizedImage)
                console.log(data)
            })
    }, [])

    function showThumbnailImage(e, index) {
        if (index == 0) {
            const unsizedImageUrl = e.target.value;
            const resizedImageUrl = unsizedImageUrl.replace('loom-image-dimensions', '380')
            setThumbnailImage(resizedImageUrl)
        }
    }

    function addExtraImage() {
        setEditableItem(prevItem => ({
            ...prevItem,
            images: [...prevItem.images, '']
        }));
    }

    function updateItem(event) {
        event.preventDefault()

        const filteredImages = editableItem.images.filter(image => image.trim() !== '');
        const filteredItem = {
            ...editableItem,
            images: filteredImages
        };

        console.log(filteredItem)

        fetch(`${IPAddress}/edit-item`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'id': filteredItem.id,
                'name': filteredItem.name,
                'price': filteredItem.price,
                'description': filteredItem.description,
                'link': filteredItem.link,
                'brand': filteredItem.brand,
                'images': filteredItem.images
            })
        })
            .then((response) => (console.log(response)))
    }

    return <>
        {
            editableItem && <>
                <div>
                    <img src={thumbnailImage} className="add-item-image" alt="" />
                    <form className="add-item-form" onSubmit={updateItem}>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" value={editableItem['name']} onChange={(e) => setEditableItem({ ...editableItem, name: e.target.value })} />
                        <label htmlFor="price">Price</label>
                        <input type="number" id="price" value={editableItem['price']} onChange={(e) => setEditableItem({ ...editableItem, price: e.target.value })} />

                        <label htmlFor="brand">Brand</label>
                        <input type="text" id="brand" value={editableItem['brand']} onChange={(e) => setEditableItem({ ...editableItem, brand: e.target.value })} />

                        <label htmlFor="description">description</label>
                        <input type="text" id="description" value={editableItem['description']} onChange={(e) => setEditableItem({ ...editableItem, description: e.target.value })} />

                        <label htmlFor="">Images</label>
                        {editableItem['images'].map((image, index) => (
                            <input
                                key={index}
                                type="url"
                                id={`imageLink${index + 1}`}
                                name={`imageLink${index + 1}`}
                                value={image}
                                onChange={(e) => {
                                    showThumbnailImage(e, index);

                                    const updatedImages = [...editableItem.images];
                                    updatedImages[index] = e.target.value;
                                    setEditableItem({
                                        ...editableItem,
                                        images: updatedImages
                                    });
                                }} />
                        ))}
                        <button type="button" onClick={addExtraImage}>Add Image</button>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </>
        }
    </>;
}

function AddItemCard() {
    let [imageLink, setImageLink] = useState('')

    function addItem(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        const name = formData.get('name')
        const price = formData.get('price')
        const imageLink = formData.get('imageLink')
        const imageLink2 = formData.get('imageLink2')
        const imageLink3 = formData.get('imageLink3')

        const imageLinks = [imageLink, imageLink2, imageLink3].filter(link => link && link.trim() !== '');
        const description = formData.get('description');
        const link = 'https://www.instagram.com/the.vee__/'
        const brand = 'vee';

        // You can now use these values as needed
        console.log(name, price, imageLink, description)

        fetch(`${IPAddress}/add-item`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'name': name,
                'price': price,
                'description': description,
                'link': link,
                'brand': brand,
                'images': imageLinks
            })
        })
        // Reset form fields
        event.target.reset()
    }

    function showImage(e) {
        const unsizedImageUrl = e.target.value;
        const resizedImageUrl = unsizedImageUrl.replace('loom-image-dimensions', '380')

        setImageLink(resizedImageUrl);

    }

    return <div className="add-item-wrapper">

        <img src={imageLink} className="add-item-image" alt="" />
        <form className="add-item-form" onSubmit={addItem}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" />
            <label htmlFor="price">Price</label>
            <input type="number" id="price" name="price" />
            <label htmlFor="imageLink">Images</label>
            <input type="url" id="imageLink" name="imageLink" onChange={(e) => {
                setImageLink(e.target.value);
                console.log(e.target.value);
                showImage(e);
            }} />
            <input type="url" id="imageLink2" name="imageLink2" />
            <input type="url" id="imageLink3" name="imageLink3" />


            <label htmlFor="description">Description</label>
            <textarea id="description" name="description"></textarea>
            <button type="submit">Add</button>
        </form>
    </div>;
}


// https://res.cloudinary.com/dffgye7z3/image/upload/w_loom-image-dimensions/v1723839250/vee-1_txfhzz.webp
// https://res.cloudinary.com/dffgye7z3/image/upload/w_loom-image-dimensions/v1723839250/vee-2_r753t4.webp
// https://res.cloudinary.com/dffgye7z3/image/upload/w_loom-image-dimensions/v1723839250/vee-3_troknb.webp
// https://res.cloudinary.com/dffgye7z3/image/upload/w_loom-image-dimensions/v1723839250/vee-4_pqndrn.webp
// https://res.cloudinary.com/dffgye7z3/image/upload/w_loom-image-dimensions/v1723839250/vee-5_dazvuu.webp
// https://res.cloudinary.com/dffgye7z3/image/upload/w_loom-image-dimensions/v1723839251/vee-6_g7pys2.webp
// https://res.cloudinary.com/dffgye7z3/image/upload/w_loom-image-dimensions/v1723839254/vee-7_ekh7dl.webp
// https://res.cloudinary.com/dffgye7z3/image/upload/w_loom-image-dimensions/v1723839251/vee-8_hfycxw.webp
// https://res.cloudinary.com/dffgye7z3/image/upload/w_loom-image-dimensions/v1723839252/vee-9_efioci.webp
// https://res.cloudinary.com/dffgye7z3/image/upload/w_loom-image-dimensions/v1723839251/vee-10_vobngt.webp
// https://res.cloudinary.com/dffgye7z3/image/upload/w_loom-image-dimensions/v1723839251/vee-11_quqzdj.webp

// https://res.cloudinary.com/dffgye7z3/image/upload/w_loom-image-dimensions/v1723839253/vee-12_ai4vog.webp