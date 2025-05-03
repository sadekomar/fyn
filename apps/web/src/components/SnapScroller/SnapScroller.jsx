"use client";

import React from "react";
import { useState, useRef, useEffect } from "react";
import { Dialog } from "@radix-ui/themes";
import "./SnapScroller.css";

import { CrossIcon } from "../Icons/CustomIcons";

export function SnapScroller({ images, height = "440px" }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  let [imageStillLoading, setImageStillLoading] = useState(true);

  const snapScrollerRef = useRef(null);

  useEffect(() => {
    const snapScroller = snapScrollerRef.current;

    const handleScroll = () => {
      const scrollLeft = snapScroller.scrollLeft;
      const containerWidth = snapScroller.offsetWidth;
      const children = snapScroller.children;

      let currentIndex = 0;
      let minDistance = Math.abs(scrollLeft - children[0].offsetLeft);

      for (let i = 1; i < children.length; i++) {
        const distance = Math.abs(scrollLeft - children[i].offsetLeft);
        if (distance < minDistance) {
          minDistance = distance;
          currentIndex = i;
        }
      }

      setCurrentImageIndex(currentIndex);
    };

    snapScroller.addEventListener("scroll", handleScroll);

    return () => {
      snapScroller.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function stopPulse(event) {
    const container = event.target.parentNode;
    container.classList.remove("LoadingPulse");
    const image = event.target;
    image.classList.add("ShowImage");
  }

  return (
    <>
      <div className="snap-scroller-wrapper ItemImagePhoneDisplay">
        {/* placeholder img */}
        <img
          src={images[0]}
          srcSet={images[0]}
          sizes="(max-width: 768px) 170px, 285px"
          style={{
            position: "absolute",
            height: height,
            width: "100%",
            objectFit: "contain",
            display: imageStillLoading ? "block" : "none",
            zIndex: "1",
            backgroundColor: "rgb(224, 224, 224)",
          }}
        />
        {/* actual image */}
        <div
          className="Modal__SnapScroller"
          id="snapScroller"
          ref={snapScrollerRef}
          style={{ height: height }}
          dir="ltr"
        >
          {images.map((image, index) => (
            <Dialog.Root key={index} className="mobile-image-modal-root">
              <Dialog.Trigger>
                <div
                  style={{ height: height }}
                  className="SnapScroller__ImageContainer LoadingPulse"
                >
                  <img
                    className="SnapScroller__Image"
                    src={image}
                    sizes="300px"
                    onLoad={(e) => {
                      stopPulse(e);
                      setImageStillLoading(false);
                    }}
                  />
                </div>
              </Dialog.Trigger>
              <Dialog.Description></Dialog.Description>
              <Dialog.Content className="mobile-images-modal">
                <Dialog.Close className="mobile-images-modal-exit">
                  <button>
                    <CrossIcon />
                  </button>
                </Dialog.Close>
                <img
                  className="SnapScroller__Image"
                  src={image["src"]}
                  srcSet={image["srcset"]}
                  sizes="300px"
                  onLoad={(e) => {
                    stopPulse(e);
                    setImageStillLoading(false);
                  }}
                />
              </Dialog.Content>
            </Dialog.Root>
          ))}
        </div>

        <div className="image-pills-wrapper">
          {images.map((_, index) => (
            <div
              key={index}
              className={`image-pill ${currentImageIndex == index ? "image-pill-selected" : ""}`}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
}
