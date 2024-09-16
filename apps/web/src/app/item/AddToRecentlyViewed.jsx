"use client"
import { useEffect } from "react";
import { useParams } from "next/navigation";

export function AddToRecentlyViewed() {
    const params = useParams();

    useEffect(() => {
        // Add item to recently viewed
        let id = parseInt(params.id);
        let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
        let isRecentlyViewed = recentlyViewed.includes(id);
        
        if (isRecentlyViewed) {
            recentlyViewed = recentlyViewed.filter(itemId => itemId !== id);
            recentlyViewed.push(id);
        }
        else {
            recentlyViewed.push(id);
            if (recentlyViewed.length > 200) {
                recentlyViewed = recentlyViewed.slice(recentlyViewed.length - 200);
            }
        }
        localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
    }, [params])
    return <></>;
}