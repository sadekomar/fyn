"use client"

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import './ColorPills.css'

export function ColorPills({ metadata }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const currentColor = searchParams.get('color')

    function toggleColor(color) {
        const params = new URLSearchParams(searchParams);
        params.set('page', 1);

        if (currentColor == color) {
            params.set('color', 'all');
            router.push(pathname + '?' + params.toString());
        }
        else {
            params.set('color', color)
            router.push(pathname + '?' + params.toString());
        }
    }

    return <div className='color-pills-wrapper'>
        <div className={`color-pill ${searchParams.get('color') === 'all' ? 'color-pill-selected' : ''}`} onClick={() => { toggleColor('all'); }}>
            All
        </div>

        {
            metadata['colors'].map((colorObject, index) => (
                <div
                    key={index}
                    className={`color-pill ${colorObject.color === searchParams.get('color') ? 'color-pill-selected' : ''}`}
                    onClick={() => toggleColor(colorObject.color)}
                >
                    {colorObject.color} ({colorObject.count})
                </div>
            ))
        }
    </div>;
}
