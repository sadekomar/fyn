"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import * as Dialog from '@radix-ui/react-dialog';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { CustomHamburgerIcon, CustomMagnifyingGlassIcon, CrossIcon, CartIcon, CustomHeartIcon, InstagramIcon, TiktokIcon, LinkedinIcon } from '../../Icons/CustomIcons'

import { getFromLocalStorage } from '../../../utils/localStorageUtils';

import './SideBar.css'
import { brandsPages } from '../../../data/brandsPages'
import { extendedCategories } from '../../../data/extendedCategories';

export function SideBar() {
    let [open, setOpen] = useState(false)

    const closeSideBar = () => {
        setOpen(false);
    }

    const NavLink = ({ href, children }) => {
        return (
            <NavigationMenu.Link className='hamburger-link' onClick={closeSideBar} asChild>
                <Link href={href}>{children}</Link>
            </NavigationMenu.Link>
        );
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
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger className='DialogTrigger' asChild>
                <button className='hamburger-icon' name='side menu'>
                    <CustomHamburgerIcon />
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay />
                <Dialog.Title></Dialog.Title>
                <Dialog.Content className='hamburger-container' aria-describedby={undefined}>
                    <NavigationMenu.Root orientation='vertical'>
                        <div className='hamburgermenu-top-buttons'>
                            <Dialog.Close asChild>
                                <button className='hamburgermenu-button'>
                                    <CrossIcon />
                                </button>
                            </Dialog.Close>
                            <div className='hamburgermenu-topright-buttons'>
                                <NavigationMenu.Item>
                                    <NavLink href='/cart'>
                                        <button className='hamburgermenu-button'>
                                            <CartIcon fill='black' />
                                            <div className='cart-count-badge'>{cartCount}</div>
                                        </button>
                                    </NavLink>
                                </NavigationMenu.Item>

                                <NavigationMenu.Item>
                                    <NavLink href={'/likes'}>
                                        <button className='hamburgermenu-button'>
                                            <CustomHeartIcon fill='black' />
                                        </button>

                                    </NavLink>
                                </NavigationMenu.Item>
                                <NavigationMenu.Item>
                                    <NavLink href={'/search'}>
                                        <button className='hamburgermenu-button'>
                                            <CustomMagnifyingGlassIcon fill={'black'} />
                                        </button>
                                    </NavLink>
                                </NavigationMenu.Item>
                            </div>

                        </div>
                        <NavigationMenu.List className="hamburger-level-one">
                            <NavigationMenu.Item>
                                <NavLink href='/'>
                                    Home
                                </NavLink>
                            </NavigationMenu.Item>

                            <NavigationMenu.Item>
                                <NavigationMenu.Trigger className='hamburger-link' asChild>
                                    <span>
                                        Shop
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path className='vertical-plus-stroke' d="M4.56 0H7.44V12H4.56V0Z" fill='black' />
                                            <path d="M0 7.44V4.56H12V7.44H0Z" fill="black" />
                                        </svg>

                                    </span>
                                </NavigationMenu.Trigger>
                                <NavigationMenu.Content className="hamburger-level-two">
                                    <NavigationMenu.Sub>
                                        <NavigationMenu.Item>
                                            <NavLink href={'/categories'}>
                                                All Categories
                                            </NavLink>
                                        </NavigationMenu.Item>
                                        {
                                            Object.keys(extendedCategories).map((parentCategory, index) => (
                                                <NavigationMenu.Item key={index}>
                                                    <NavigationMenu.Trigger className='hamburger-link' asChild>
                                                        <span>
                                                            {parentCategory}
                                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path className='vertical-plus-stroke' d="M4.56 0H7.44V12H4.56V0Z" fill='black' />
                                                                <path d="M0 7.44V4.56H12V7.44H0Z" fill="black" />
                                                            </svg>
                                                        </span>
                                                    </NavigationMenu.Trigger>
                                                    <NavigationMenu.Content className='hamburger-level-three'>
                                                        {
                                                            Object.keys(extendedCategories[parentCategory]).map((categoryKey, indexTwo) => {
                                                                const category = extendedCategories[parentCategory][categoryKey];
                                                                return (
                                                                    <NavLink href={category.link} key={indexTwo}>
                                                                        {category.term}
                                                                    </NavLink>
                                                                );
                                                            })
                                                        }
                                                    </NavigationMenu.Content>
                                                </NavigationMenu.Item>
                                            ))
                                        }

                                    </NavigationMenu.Sub>
                                </NavigationMenu.Content>
                            </NavigationMenu.Item>

                            <NavigationMenu.Item>
                                <NavigationMenu.Trigger className='hamburger-link' asChild>
                                    <span>
                                        Brands
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path className='vertical-plus-stroke' d="M4.56 0H7.44V12H4.56V0Z" fill='black' />
                                            <path d="M0 7.44V4.56H12V7.44H0Z" fill="black" />
                                        </svg>
                                    </span>
                                </NavigationMenu.Trigger>
                                <NavigationMenu.Content className='hamburger-level-two'>
                                    {
                                        Object.keys(brandsPages).map((brandsPage, index) => (
                                            <NavLink href={brandsPages[brandsPage].link} key={index}>{brandsPage}</NavLink>
                                        ))
                                    }
                                </NavigationMenu.Content>
                            </NavigationMenu.Item>

                            <NavigationMenu.Item>
                                <NavigationMenu.Trigger className='hamburger-link' asChild>
                                    <span>
                                        You
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path className='vertical-plus-stroke' d="M4.56 0H7.44V12H4.56V0Z" fill='black' />
                                            <path d="M0 7.44V4.56H12V7.44H0Z" fill="black" />
                                        </svg>
                                    </span>
                                </NavigationMenu.Trigger>
                                <NavigationMenu.Content className='hamburger-level-two'>
                                    <NavLink href={'/cart'}>Cart</NavLink>
                                    <NavLink href={'/likes'}>Likes</NavLink>
                                    <NavLink href={'/following'}>Following</NavLink>
                                    <NavLink href={'/comparison'}>Comparisons</NavLink>
                                    <NavLink href={'/history'}>History</NavLink>
                                </NavigationMenu.Content>
                            </NavigationMenu.Item>

                            <NavigationMenu.Item>
                                <NavLink href={'/about'}>About</NavLink>
                            </NavigationMenu.Item>
                        </NavigationMenu.List>
                    </NavigationMenu.Root>

                    <div className='contact-section-wrapper'>
                        <div className='socials-wrapper'>
                            <a href='https://www.instagram.com/loomcairo' target="_blank">
                                <InstagramIcon />
                            </a>
                            <a href='https://www.tiktok.com/@loomcairo' target="_blank">
                                <TiktokIcon />
                            </a>
                            <a href='https://linkedin.com' target='_blank'>
                                <LinkedinIcon />
                            </a>
                        </div>
                        <p>loomcairo@gmail.com</p>
                        <p>Cairo, Egypt</p>
                    </div>

                </Dialog.Content>
            </Dialog.Portal >
        </Dialog.Root >
    </>;
}