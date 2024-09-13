import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, Flex, IconButton, Link } from '@radix-ui/themes';
import { Link as Link } from 'react-router-dom'
import { MagnifyingGlassIcon, CaretDownIcon, MixerHorizontalIcon } from '@radix-ui/react-icons';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';

import { brandsPages } from '../../../data/brandsPages';
import { useResolvedPath } from 'react-router-dom';
import { extendedCategories } from '../../../data/extendedCategories';
import { getFromLocalStorage } from '../../../utils/localStorageUtils';

import { CustomMagnifyingGlassIcon, CartIcon, CustomHeartIcon } from '../../Icons/CustomIcons'

import './NavigationBar.css'


export function NavigationBar() {
    let currentPath = useResolvedPath();

    function highlightSearchBar() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    let [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const monitorCart = () => {
            const cartItems = getFromLocalStorage('cart');
            setCartCount(cartItems.length);
        };

        monitorCart();
        window.addEventListener('localStorageChanged', monitorCart);

        return () => {
            window.removeEventListener('localStorageChanged', monitorCart);
        };
    }, []);

    return <>
        <div className='NavBar'>
            <Link href={'/'}>
                <img style={{ height: '22px', maxWidth: 'none' }} src="/branding/loom.png" alt="" />
            </Link>

            <NavigationMenu.Root className="NavigationMenuRoot">
                <NavigationMenu.List className="NavigationMenuList">
                    <NavigationMenu.Item>
                        <NavigationMenu.Link className='NavigationMenuLink' asChild>
                            <Link className='navmenu-trigger' to={'/'}>Home</Link>
                        </NavigationMenu.Link>
                    </NavigationMenu.Item>

                    <NavigationMenu.Item>
                        <NavigationMenu.Trigger className='NavigationMenuTrigger' asChild>
                            <span>
                                <Link className='navmenu-trigger' to={'/all-categories'}>Shop</Link>
                                <CaretDownIcon className="CaretDown" aria-hidden />
                            </span>
                        </NavigationMenu.Trigger>
                        <NavigationMenu.Content className='NavigationMenuContent'>
                            <div className='mega-menu-content'>
                                {
                                    Object.keys(extendedCategories).map((parentCategory, index) => (
                                        <div className='mega-menu-section' key={index}>
                                            <p className='mega-menu-section-title'>
                                                {parentCategory}
                                            </p>
                                            {
                                                Object.keys(extendedCategories[parentCategory]).map((categoryKey, indexTwo) => {
                                                    const category = extendedCategories[parentCategory][categoryKey];
                                                    return (
                                                        <NavigationMenu.Item key={indexTwo}>
                                                            <NavigationMenu.Link>
                                                                <Link className='navmenu-link' to={category.link}>
                                                                    {category.term}
                                                                </Link>
                                                            </NavigationMenu.Link>
                                                        </NavigationMenu.Item>
                                                    );
                                                })
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        </NavigationMenu.Content>

                    </NavigationMenu.Item>

                    <NavigationMenu.Item>
                        <NavigationMenu.Trigger className='NavigationMenuTrigger' asChild>
                            <span>
                                <Link className='navmenu-trigger' to={'/brands'}>Brands</Link>
                                <CaretDownIcon className="CaretDown" aria-hidden />
                            </span>
                        </NavigationMenu.Trigger>
                        <NavigationMenu.Content className='NavigationMenuContent'>
                            <div className='mega-menu-content'>
                                <div className='mega-menu-section'>
                                    {
                                        Object.keys(brandsPages).map((brandPage, index) => (
                                            <NavigationMenu.Item className='NavigationMenuItem' key={index}>
                                                <NavigationMenu.Link>
                                                    <Link className='navmenu-link' to={brandsPages[brandPage]['link']}>{brandPage}</Link>
                                                </NavigationMenu.Link>
                                            </NavigationMenu.Item>
                                        ))
                                    }
                                </div>
                            </div>
                        </NavigationMenu.Content>
                    </NavigationMenu.Item>

                    <NavigationMenu.Item>
                        <NavigationMenu.Trigger className='NavigationMenuTrigger' asChild>
                            <span>
                                <Link className='navmenu-trigger' to={'/liked-items'}>You</Link>
                                <CaretDownIcon className="CaretDown" aria-hidden />
                            </span>
                        </NavigationMenu.Trigger>
                        <NavigationMenu.Content className='NavigationMenuContent'>
                            <div className='mega-menu-content'>
                                <div className='mega-menu-section'>
                                    <NavigationMenu.Item>
                                        <NavigationMenu.Link>
                                            <Link className='navmenu-link' to={'/cart'}>Cart</Link>
                                        </NavigationMenu.Link>
                                    </NavigationMenu.Item>
                                    <NavigationMenu.Item>
                                        <NavigationMenu.Link>
                                            <Link className='navmenu-link' to={'/liked-items'}>Likes</Link>
                                        </NavigationMenu.Link>
                                    </NavigationMenu.Item>
                                    <NavigationMenu.Item>
                                        <NavigationMenu.Link>
                                            <Link className='navmenu-link' to={'/following'}>Following</Link>
                                        </NavigationMenu.Link>
                                    </NavigationMenu.Item>
                                    <NavigationMenu.Item>
                                        <NavigationMenu.Link>
                                            <Link className='navmenu-link' to={'/history'}>History</Link>
                                        </NavigationMenu.Link>
                                    </NavigationMenu.Item>
                                </div>
                            </div>
                        </NavigationMenu.Content>
                    </NavigationMenu.Item>

                    <NavigationMenu.Item>
                        <NavigationMenu.Link className='NavigationMenuLink' asChild>
                            <Link className='navmenu-trigger' to={'/about'}>About</Link>
                        </NavigationMenu.Link>
                    </NavigationMenu.Item>
                    
                    {/* <NavigationMenu.Item>
                        <NavigationMenu.Link className='NavigationMenuLink' asChild>
                            <Link className='navmenu-trigger' to={'/add-items'}>Add Items</Link>
                        </NavigationMenu.Link>
                    </NavigationMenu.Item> */}

                    <NavigationMenu.Indicator className="NavigationMenuIndicator">
                        <div className="Arrow" />
                    </NavigationMenu.Indicator>
                </NavigationMenu.List>

                <div className="ViewportPosition">
                    <NavigationMenu.Viewport className="NavigationMenuViewport" />
                </div>
            </NavigationMenu.Root>

            <IconButton ml={'6'} className='navmenu-button' variant='ghost' asChild>
                <Link href={'/liked-items'}>
                    <CustomHeartIcon />
                </Link>
            </IconButton>
            <IconButton ml={'6'} className='navmenu-button' variant='ghost' asChild>
                <Link href={'/cart'}>
                    <CartIcon />
                    <div className='cart-count-badge cart-count-desktop'>{cartCount}</div>
                </Link>
            </IconButton>

            {
                (currentPath.pathname == '/search') ? (
                    <IconButton ml={'6'} className='navmenu-button' variant='ghost' onClick={highlightSearchBar}>
                        <Link href={'/search'}>
                            <CustomMagnifyingGlassIcon />
                        </Link>
                    </IconButton>
                ) : (
                    <IconButton ml={'6'} className='navmenu-button' variant='ghost' asChild>
                        <Link href={'/search'}>
                            <CustomMagnifyingGlassIcon />
                        </Link>
                    </IconButton>
                )
            }
        </div >
    </>;
}