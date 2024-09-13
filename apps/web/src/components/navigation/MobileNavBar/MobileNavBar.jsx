import Link from 'next/link';
import { CustomMagnifyingGlassIcon } from '../../Icons/CustomIcons';

import { SideBar } from './SideBar';

import './MobileNavBar.css'
import '../../PWA.css'


export function MobileNavBar() {
    return <>
        <div className='MobileNavBar'>
            <SideBar />

            <Link href={'/'} className='loom-nav-icon'>
                <img height={'22px'} src="/branding/loom.png" alt="Loom logo" />
            </Link>
            <Link href={'/search'} className='search-icon'>
                <CustomMagnifyingGlassIcon />
            </Link>
        </div >
    </>;
}



