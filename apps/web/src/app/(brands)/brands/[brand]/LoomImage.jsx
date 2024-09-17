"use client"

import { useState } from "react";

export function LoomImage({ src }) {
    let [isLoaded, setIsLoaded] = useState(false);

    return <img className={`BrandImage ${isLoaded ? 'brand-image-loaded' : ''}`} src={src} onLoad={() => { setIsLoaded(true); }} sizes="400px" alt="" />;
}