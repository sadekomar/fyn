"use client"

import { useEffect } from "react";
import Link from "next/link";

export function BrandsNavigator({ brandsList, params }) {
    useEffect(() => {
        let activeBrand = document.querySelector(".active");
        if (activeBrand) {
            activeBrand.scrollIntoView({
                inline: 'center',
                block: 'center'
            });
        }
    }, [params.brand, brandsList])

    return <div className="brands-nav-wrapper">
        {
            brandsList.map((brand, index) => (
                <Link className="brands-nav" href={`/brands/${brand}`} key={index}>
                    {params.brand === brand ?
                        <b style={{ fontWeight: '900' }} className="active"> {brand} </b> :
                        brand}
                </Link>
            ))
        }
    </div>;
}