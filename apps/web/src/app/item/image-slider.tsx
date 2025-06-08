"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LoomImage } from "@/components/LoomImage";

interface ImageSliderProps {
  images: string[];
  className?: string;
}

export default function ImageSlider({
  images,
  className = "",
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.offsetWidth;
      sliderRef.current.scrollTo({
        left: index * slideWidth,
        behavior: "smooth",
      });
    }
  };

  const goToPrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    goToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    goToSlide(newIndex);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - (sliderRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.offsetWidth;
      const newIndex = Math.round(sliderRef.current.scrollLeft / slideWidth);
      setCurrentIndex(Math.max(0, Math.min(newIndex, images.length - 1)));
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !sliderRef.current) return;
    const x = e.touches[0].pageX - (sliderRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.offsetWidth;
      const newIndex = Math.round(sliderRef.current.scrollLeft / slideWidth);
      setCurrentIndex(Math.max(0, Math.min(newIndex, images.length - 1)));
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (sliderRef.current && !isDragging) {
        const slideWidth = sliderRef.current.offsetWidth;
        const newIndex = Math.round(sliderRef.current.scrollLeft / slideWidth);
        setCurrentIndex(newIndex);
      }
    };
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", handleScroll);
      return () => slider.removeEventListener("scroll", handleScroll);
    }
  }, [isDragging]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div
      className={`relative mx-auto w-full overflow-hidden bg-gray-100 md:hidden ${className}`}
    >
      {/* Image Container */}
      <div className="relative h-[440px]">
        <div
          ref={sliderRef}
          className="scrollbar-hide flex h-full cursor-grab snap-x snap-mandatory overflow-x-auto active:cursor-grabbing"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {images.map((image, index) => (
            <div key={index} className="h-full w-full flex-shrink-0 snap-start">
              <LoomImage
                src={image || "/placeholder.svg"}
                alt={`Slide ${index + 1}`}
                width={400}
                height={400}
                className="h-full w-full object-contain select-none"
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 left-2 h-8 w-8 -translate-y-1/2 rounded-full bg-black/20 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/40"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 right-2 h-8 w-8 -translate-y-1/2 rounded-full bg-black/20 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/40"
              onClick={goToNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {/* Dot Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 space-x-1">
          {images.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-4 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? "scale-110 bg-[#a6a2de]"
                  : "bg-gray-500/50 hover:bg-gray-500/75"
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute top-3 right-3 rounded-full bg-black/50 px-2 py-1 text-xs text-white">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
