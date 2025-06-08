// // @ts-nocheck
// "use client";

// import React from "react";
// import { useState, useRef, useEffect } from "react";
// import { Dialog } from "@radix-ui/themes";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import "./SnapScroller.css";

// import { CrossIcon } from "../Icons/CustomIcons";
// import { LoomImage } from "../LoomImage";

// interface SnapScrollerProps {
//   images: string[];
//   height?: string;
// }

// export function SnapScroller({ images, height = "440px" }: SnapScrollerProps) {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [scrollLeft, setScrollLeft] = useState(0);
//   const [imageStillLoading, setImageStillLoading] = useState(true);

//   const snapScrollerRef = useRef<HTMLDivElement>(null);

//   const goToSlide = (index: number) => {
//     setCurrentImageIndex(index);
//     if (snapScrollerRef.current) {
//       const slideWidth = snapScrollerRef.current.offsetWidth;
//       snapScrollerRef.current.scrollTo({
//         left: index * slideWidth,
//         behavior: "smooth",
//       });
//     }
//   };

//   const goToPrevious = () => {
//     const newIndex =
//       currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
//     goToSlide(newIndex);
//   };

//   const goToNext = () => {
//     const newIndex =
//       currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
//     goToSlide(newIndex);
//   };

//   const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
//     setIsDragging(true);
//     setStartX(e.pageX - (snapScrollerRef.current?.offsetLeft || 0));
//     setScrollLeft(snapScrollerRef.current?.scrollLeft || 0);
//   };

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!isDragging || !snapScrollerRef.current) return;
//     e.preventDefault();
//     const x = e.pageX - (snapScrollerRef.current.offsetLeft || 0);
//     const walk = (x - startX) * 2;
//     snapScrollerRef.current.scrollLeft = scrollLeft - walk;
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//     if (snapScrollerRef.current) {
//       const slideWidth = snapScrollerRef.current.offsetWidth;
//       const newIndex = Math.round(
//         snapScrollerRef.current.scrollLeft / slideWidth,
//       );
//       setCurrentImageIndex(Math.max(0, Math.min(newIndex, images.length - 1)));
//     }
//   };

//   const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
//     setIsDragging(true);
//     setStartX(e.touches[0].pageX - (snapScrollerRef.current?.offsetLeft || 0));
//     setScrollLeft(snapScrollerRef.current?.scrollLeft || 0);
//   };

//   const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
//     if (!isDragging || !snapScrollerRef.current) return;
//     const x = e.touches[0].pageX - (snapScrollerRef.current.offsetLeft || 0);
//     const walk = (x - startX) * 2;
//     snapScrollerRef.current.scrollLeft = scrollLeft - walk;
//   };

//   const handleTouchEnd = () => {
//     setIsDragging(false);
//     if (snapScrollerRef.current) {
//       const slideWidth = snapScrollerRef.current.offsetWidth;
//       const newIndex = Math.round(
//         snapScrollerRef.current.scrollLeft / slideWidth,
//       );
//       setCurrentImageIndex(Math.max(0, Math.min(newIndex, images.length - 1)));
//     }
//   };

//   const handleScroll = () => {
//     if (snapScrollerRef.current && !isDragging) {
//       const slideWidth = snapScrollerRef.current.offsetWidth;
//       const newIndex = Math.round(
//         snapScrollerRef.current.scrollLeft / slideWidth,
//       );
//       setCurrentImageIndex(newIndex);
//     }
//   };

//   useEffect(() => {
//     const snapScroller = snapScrollerRef.current;
//     if (snapScroller) {
//       snapScroller.addEventListener("scroll", handleScroll);
//       return () => snapScroller.removeEventListener("scroll", handleScroll);
//     }
//   }, []);

//   function stopPulse(event: React.SyntheticEvent<HTMLImageElement>) {
//     const container = event.currentTarget.parentNode as HTMLElement;
//     container.classList.remove("LoadingPulse");
//     const image = event.currentTarget;
//     image.classList.add("ShowImage");
//   }

//   if (!images || images.length === 0) {
//     return null;
//   }

//   return (
//     <div className="snap-scroller-wrapper ItemImagePhoneDisplay relative">
//       {/* placeholder img */}
//       <LoomImage
//         src={images[0]}
//         srcSet={images[0]}
//         sizes="(max-width: 768px) 170px, 285px"
//         style={{
//           position: "absolute",
//           height: height,
//           width: "100%",
//           objectFit: "contain",
//           display: imageStillLoading ? "block" : "none",
//           zIndex: "1",
//           backgroundColor: "rgb(224, 224, 224)",
//         }}
//       />
//       {/* actual image */}
//       <div
//         className="Modal__SnapScroller"
//         id="snapScroller"
//         ref={snapScrollerRef}
//         style={{ height: height }}
//         dir="ltr"
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//         onMouseLeave={handleMouseUp}
//         onTouchStart={handleTouchStart}
//         onTouchMove={handleTouchMove}
//         onTouchEnd={handleTouchEnd}
//       >
//         {images.map((image, index) => (
//           <Dialog.Root key={index}>
//             <Dialog.Trigger>
//               <div
//                 style={{ height: height }}
//                 className="SnapScroller__ImageContainer LoadingPulse"
//               >
//                 <LoomImage
//                   className="SnapScroller__Image"
//                   src={image}
//                   sizes="300px"
//                   onLoad={stopPulse}
//                 />
//               </div>
//             </Dialog.Trigger>
//             <Dialog.Description></Dialog.Description>
//             <Dialog.Content className="mobile-images-modal">
//               <Dialog.Title className="sr-only">
//                 <h1>Image {index + 1}</h1>
//               </Dialog.Title>
//               <Dialog.Close className="mobile-images-modal-exit">
//                 <button>
//                   <CrossIcon />
//                 </button>
//               </Dialog.Close>
//               <LoomImage
//                 className="SnapScroller__Image"
//                 src={image}
//                 srcSet={image}
//                 sizes="300px"
//                 onLoad={stopPulse}
//               />
//             </Dialog.Content>
//           </Dialog.Root>
//         ))}
//       </div>

//       {/* Navigation Arrows */}
//       {images.length > 1 && (
//         <>
//           <Button
//             variant="ghost"
//             size="icon"
//             className="absolute top-1/2 left-2 h-8 w-8 -translate-y-1/2 rounded-full bg-black/20 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/40"
//             onClick={goToPrevious}
//           >
//             <ChevronLeft className="h-4 w-4" />
//           </Button>
//           <Button
//             variant="ghost"
//             size="icon"
//             className="absolute top-1/2 right-2 h-8 w-8 -translate-y-1/2 rounded-full bg-black/20 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/40"
//             onClick={goToNext}
//           >
//             <ChevronRight className="h-4 w-4" />
//           </Button>
//         </>
//       )}

//       {/* Dot Indicators */}
//       {images.length > 1 && (
//         <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 space-x-1">
//           {images.map((_, index) => (
//             <button
//               key={index}
//               className={`h-2 w-2 rounded-full transition-all duration-200 ${
//                 index === currentImageIndex
//                   ? "scale-110 bg-white"
//                   : "bg-white/50 hover:bg-white/75"
//               }`}
//               onClick={() => goToSlide(index)}
//             />
//           ))}
//         </div>
//       )}

//       {/* Image Counter */}
//       {images.length > 1 && (
//         <div className="absolute top-3 right-3 rounded-full bg-black/50 px-2 py-1 text-xs text-white">
//           {currentImageIndex + 1} / {images.length}
//         </div>
//       )}
//     </div>
//   );
// }
