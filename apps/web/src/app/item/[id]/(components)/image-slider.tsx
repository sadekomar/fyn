"use client";

import { UnivyrImage } from "@/components/clyo-image";
import { debounce } from "lodash";
import { Dialog } from "@radix-ui/themes";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import "./SnapScroller.css";

export const ImageSlider = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (sliderRef.current) {
      const newIndex = Math.round(
        sliderRef.current.scrollLeft / sliderRef.current.clientWidth,
      );
      setCurrentIndex(newIndex);
    }
  };

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

  return (
    <div className="md:hidden">
      <div
        ref={sliderRef}
        className="mandatory scroll-snap-stop-always scrollbar-hide flex h-[440px] w-full snap-x snap-mandatory overflow-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onScroll={debounce(handleScroll, 10)}
      >
        {images.map((image, index) => (
          <Dialog.Root key={index}>
            <Dialog.Trigger>
              <UnivyrImage
                alt={`${name}-${index + 1}`}
                key={index}
                sizes="(max-width: 768px) 180px, 240px"
                src={image}
                className="h-full w-full flex-none snap-center bg-gray-200 object-contain"
              />
            </Dialog.Trigger>
            <Dialog.Description></Dialog.Description>
            <Dialog.Content className="mobile-images-modal">
              <Dialog.Title className="sr-only">
                <div>Image {index + 1}</div>
              </Dialog.Title>
              <Dialog.Close className="mobile-images-modal-exit">
                <X className="h-4 w-4" />
              </Dialog.Close>
              <UnivyrImage
                className="SnapScroller__Image"
                src={image}
                sizes="300px"
              />
            </Dialog.Content>
          </Dialog.Root>
        ))}
      </div>
      <div className="my-2 flex justify-center gap-1">
        {images.map((image, index) => (
          <div
            key={index}
            className={`h-[6px] rounded-full transition-all ${
              index === currentIndex
                ? "w-[20px] scale-105 bg-[#a6a2de]"
                : "w-[12px] bg-gray-500/50"
            }`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};
