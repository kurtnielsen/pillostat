'use client';

import { useState } from 'react';
import Image from 'next/image';

interface GalleryImage {
  id: string;
  src: string;
  fallback: string;
  alt: string;
  category: string;
}

// Images with local paths and Unsplash fallbacks
// To use your own images: save to /public/images/property/ with matching filenames
const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: '/images/property/hero.jpg',
    fallback: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&h=800&fit=crop',
    alt: 'Waterfront home on Liberty Bay - 20186 Front St NE, Poulsbo',
    category: 'Waterfront Views',
  },
  {
    id: '2',
    src: '/images/property/exterior-1.jpg',
    fallback: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop',
    alt: 'Home exterior with Olympic Mountain views',
    category: 'Exterior',
  },
  {
    id: '3',
    src: '/images/property/kitchen.jpg',
    fallback: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop',
    alt: 'Modern fully-equipped kitchen',
    category: 'Kitchen',
  },
  {
    id: '4',
    src: '/images/property/bedroom-1.jpg',
    fallback: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&h=800&fit=crop',
    alt: 'Cozy bedroom with premium bedding',
    category: 'Bedroom',
  },
  {
    id: '5',
    src: '/images/property/living-room.jpg',
    fallback: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=800&fit=crop',
    alt: 'Spacious living room with bay views',
    category: 'Living Room',
  },
  {
    id: '6',
    src: '/images/property/bathroom-1.jpg',
    fallback: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&h=800&fit=crop',
    alt: 'Clean modern bathroom',
    category: 'Bathroom',
  },
  {
    id: '7',
    src: '/images/property/deck.jpg',
    fallback: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop',
    alt: 'Private deck with Liberty Bay views',
    category: 'Outdoor Deck',
  },
  {
    id: '8',
    src: '/images/property/view.jpg',
    fallback: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
    alt: 'Olympic Mountain views from the property',
    category: 'Mountain Views',
  },
];

interface ImageGalleryProps {
  compact?: boolean;
}

export default function ImageGallery({ compact = false }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Track which images failed to load (local not found) and use fallback
  const handleImageError = (imageId: string) => {
    setImageErrors(prev => ({ ...prev, [imageId]: true }));
  };

  // Get the correct src - use fallback if local image failed
  const getImageSrc = (image: GalleryImage) => {
    return imageErrors[image.id] ? image.fallback : image.src;
  };

  const openLightbox = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next'
      ? (currentIndex + 1) % galleryImages.length
      : (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') navigateImage('next');
    if (e.key === 'ArrowLeft') navigateImage('prev');
  };

  if (compact) {
    return (
      <div className="relative">
        {/* Hero Image */}
        <div
          className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden cursor-pointer group"
          onClick={() => openLightbox(galleryImages[0], 0)}
        >
          <Image
            src={getImageSrc(galleryImages[0])}
            alt={galleryImages[0].alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => handleImageError(galleryImages[0].id)}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <span className="text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              {galleryImages[0].category}
            </span>
          </div>
          {/* Local image indicator */}
          {!imageErrors[galleryImages[0].id] && (
            <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Your Photo
            </div>
          )}
        </div>

        {/* Thumbnail Strip */}
        <div className="mt-4 grid grid-cols-4 md:grid-cols-6 gap-2">
          {galleryImages.slice(1, 6).map((image, index) => (
            <div
              key={image.id}
              className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => openLightbox(image, index + 1)}
            >
              <Image
                src={getImageSrc(image)}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                onError={() => handleImageError(image.id)}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </div>
          ))}
          <button
            onClick={() => openLightbox(galleryImages[0], 0)}
            className="relative aspect-square rounded-lg overflow-hidden bg-neutral-900 flex items-center justify-center text-white hover:bg-neutral-800 transition-colors"
          >
            <div className="text-center">
              <svg className="w-6 h-6 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span className="text-xs font-medium">View All</span>
              <span className="text-xs opacity-75">({galleryImages.length})</span>
            </div>
          </button>
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2 z-50"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
              className="absolute left-4 text-white/80 hover:text-white p-2 z-50"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
              className="absolute right-4 text-white/80 hover:text-white p-2 z-50"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Main image */}
            <div
              className="relative w-full h-full max-w-6xl max-h-[80vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={getImageSrc(selectedImage)}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                onError={() => handleImageError(selectedImage.id)}
              />
            </div>

            {/* Image info */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-white">
              <p className="text-lg font-medium mb-1">{selectedImage.alt}</p>
              <p className="text-sm text-white/60">
                {currentIndex + 1} of {galleryImages.length} - {selectedImage.category}
              </p>
            </div>

            {/* Thumbnail strip in lightbox */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-black/50 rounded-lg backdrop-blur-sm">
              {galleryImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={(e) => { e.stopPropagation(); openLightbox(image, index); }}
                  className={`relative w-16 h-12 rounded overflow-hidden transition-all ${
                    currentIndex === index ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={getImageSrc(image)}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    onError={() => handleImageError(image.id)}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Full gallery view for unit detail pages
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-neutral-900">Property Gallery</h2>
        <button
          onClick={() => openLightbox(galleryImages[0], 0)}
          className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          View all {galleryImages.length} photos
        </button>
      </div>

      {/* Bento grid layout */}
      <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[500px]">
        <div
          className="col-span-2 row-span-2 relative rounded-xl overflow-hidden cursor-pointer group"
          onClick={() => openLightbox(galleryImages[0], 0)}
        >
          <Image
            src={getImageSrc(galleryImages[0])}
            alt={galleryImages[0].alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => handleImageError(galleryImages[0].id)}
            priority
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          <span className="absolute bottom-4 left-4 text-white text-sm font-medium bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
            {galleryImages[0].category}
          </span>
        </div>
        {galleryImages.slice(1, 5).map((image, index) => (
          <div
            key={image.id}
            className="relative rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => openLightbox(image, index + 1)}
          >
            <Image
              src={getImageSrc(image)}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              onError={() => handleImageError(image.id)}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            {index === 3 && galleryImages.length > 5 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white text-lg font-medium">+{galleryImages.length - 5} more</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox - same as compact version */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 z-50"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
            className="absolute left-4 text-white/80 hover:text-white p-2 z-50"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
            className="absolute right-4 text-white/80 hover:text-white p-2 z-50"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div
            className="relative w-full h-full max-w-6xl max-h-[80vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={getImageSrc(selectedImage)}
              alt={selectedImage.alt}
              fill
              className="object-contain"
              onError={() => handleImageError(selectedImage.id)}
            />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-white">
            <p className="text-lg font-medium mb-1">{selectedImage.alt}</p>
            <p className="text-sm text-white/60">
              {currentIndex + 1} of {galleryImages.length} - {selectedImage.category}
            </p>
          </div>

          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-black/50 rounded-lg backdrop-blur-sm max-w-full overflow-x-auto">
            {galleryImages.map((image, index) => (
              <button
                key={image.id}
                onClick={(e) => { e.stopPropagation(); openLightbox(image, index); }}
                className={`relative w-16 h-12 rounded overflow-hidden transition-all flex-shrink-0 ${
                  currentIndex === index ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <Image
                  src={getImageSrc(image)}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  onError={() => handleImageError(image.id)}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export { galleryImages };
