"use client"

import React, { useEffect, useRef, useState } from 'react';

import './FollowButton.css'

export function FollowButton({ brand, className }) {
    const [isFollowing, setIsFollowing] = useState(false);
    let followButtonRef = useRef(null)

    useEffect(() => {
        const following = JSON.parse(localStorage.getItem('following') || '[]');
        const isFollowing = following.includes(brand);
        setIsFollowing(isFollowing);
    }, [brand])

    const toggleIcon = (e) => {
        setIsFollowing((currentlyFollowing) => !currentlyFollowing);

        let following = JSON.parse(localStorage.getItem('following') || '[]');
        if (isFollowing) {
            following = following.filter(followingBrand => followingBrand !== brand);
        } else {
            following.push(brand);
        }

        localStorage.setItem('following', JSON.stringify(following));
    };

    return <>
        
        <button onClick={toggleIcon} className={`follow-button ${isFollowing ? 'followed' : ''} ${className}`}>
            {isFollowing ? 'Following' : 'Follow'}
        </button>
    </>;
}
