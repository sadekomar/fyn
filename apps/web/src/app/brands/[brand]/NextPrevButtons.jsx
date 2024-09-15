"use client"

import Link from "next/link";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import { useParams, useRouter } from "next/navigation";

export function NextPrevButtons({ brandsList }) {
    const params = useParams();
    const router = useRouter();

    function goToPrevBrand() {
        const currentBrandIndex = brandsList.indexOf(params.brand.replaceAll('%20', ' '));
        const prevBrand = brandsList[(currentBrandIndex - 1 + brandsList.length) % brandsList.length] 

        router.push('/brands/' + prevBrand)
    }

    function goToNextBrand() {
        let currentBrandIndex = brandsList.indexOf(params.brand.replaceAll('%20', ' '));
        const nextBrand = brandsList[(currentBrandIndex + 1 + brandsList.length) % brandsList.length];

        router.push('/brands/' + nextBrand);
    }

    return <div className="brand-nav-buttons-wrapper">
        <button className="brand-nav-button" onClick={goToPrevBrand}>
            <CaretLeftIcon width='25px' height='25px' /> Previous Brand
        </button>
        <button className="brand-nav-button" onClick={goToNextBrand}>
            Next Brand <CaretRightIcon width='25px' height='25px' />
        </button>
    </div>;
    return <div className="brand-nav-buttons-wrapper">
        <Link className="brand-nav-button" href={`/brands/${brandsList[(brandsList.indexOf(params.brand) - 1 + brandsList.length) % brandsList.length]}`}>
            <CaretLeftIcon width='25px' height='25px' /> Previous Brand
        </Link>
        <Link className="brand-nav-button" href={`/brands/${brandsList[(brandsList.indexOf(params.brand) + 1 + brandsList.length) % brandsList.length]}`}>
            Next Brand
            <CaretRightIcon width='25px' height='25px' />
        </Link>
    </div>;
}