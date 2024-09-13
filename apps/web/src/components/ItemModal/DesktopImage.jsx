import React, { useState } from 'react';
import { Flex, Avatar, IconButton, ScrollArea } from '@radix-ui/themes';
import { CaretLeftIcon, CaretRightIcon } from '@radix-ui/react-icons';

export function DesktopImage({ images }) {
    const [selectedImage, setSelectedImage] = useState(images[0]);
    const [imageStillLoading, setImageStillLoading] = useState(true);

    function nextImage() {
        const currentIndex = images.indexOf(selectedImage);
        console.log(currentIndex)
        const newIndex = (currentIndex + 1 + images.length) % images.length;
        setSelectedImage(images[newIndex]);
    }
    function previousImage() {
        const currentIndex = images.indexOf(selectedImage);
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        setSelectedImage(images[newIndex]);
    }

    return <>
        {
            imageStillLoading &&
            (
                <img
                    src={selectedImage['src']}
                    srcSet={selectedImage['srcset']}
                    sizes="(max-width: 768px) 170px, 285px"
                    className='Modal__ImagePlaceholder'
                    style={{
                        backgroundColor: 'rgb(224, 224, 224)'
                    }}
                />
            )
        }
        <img
            className='Modal__Image'
            src={selectedImage['src']}
            srcSet={selectedImage['srcset']}
            sizes="350px"
            style={{ display: imageStillLoading ? 'none' : 'block'}}
            onLoad={() => setImageStillLoading(false)}
        />

        <IconButton variant='soft' className='Modal__ImageContainer__PreviousButton' onClick={previousImage}>
            <CaretLeftIcon style={{ height: '28px', width: '28px' }} />
        </IconButton>
        <IconButton variant='soft' className='Modal__ImageContainer__NextButton' onClick={nextImage}>
            <CaretRightIcon style={{ height: '28px', width: '28px' }} />
        </IconButton>

        <Flex direction={'row'} className='Modal__ImagePicker'>
            {images.map((image, index) => (
                <Avatar key={index} className='Modal__ImagePicker__Avatars' src={image['src']} srcSet={image['srcset']} sizes="350px" style={{
                    margin: selectedImage['src'] == image['src'] ? '1px' : '0px',
                    opacity: selectedImage['src'] == image['src'] ? '1' : '0.4',
                }} onClick={() => setSelectedImage(image)} onMouseOver={() => setSelectedImage(image)} radius='none' />
            ))}
        </Flex>
    </>;
}
