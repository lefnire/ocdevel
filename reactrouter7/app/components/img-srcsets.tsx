import React from 'react';

/**
 * Renders a responsive image using the <picture> element with AVIF and WebP sources.
 * Optimizes for LCP/CLS by allowing specification of loading, fetchpriority, width, and height.
 *
 * - Provides AVIF and WebP formats. AVIF is preferred, WebP is the fallback.
 * - Handles 1 or 2 image sizes per format:
 *   - If 2 sizes: First is for mobile (<= 550px), second for larger screens.
 *   - If 1 size: Used for all screen widths.
 * - Requires `alt`, `webp`, `width`, and `height`.
 */
interface ImgSrcsetsProps {
  /** Array of AVIF image URLs (1 or 2). Optional, but recommended for SEO. */
  avif?: string[];
  /** Array of WebP image URLs (1 or 2). Required. Must match the number of avif URLs if avif is provided. */
  webp: string[];
  /** Alt text for the image. Required for accessibility. */
  alt: string;
  /** Width of the image (largest size). Required to prevent CLS. */
  width: number;
  /** Height of the image (largest size). Required to prevent CLS. */
  height: number;
  /** CSS class name(s) for the <picture> element. */
  className?: string;
  /** Loading strategy ('eager' or 'lazy'). Defaults to 'lazy'. Use 'eager' for above-the-fold images. */
  loading?: 'eager' | 'lazy';
  /** Fetch priority ('high', 'low', 'auto'). Defaults to 'auto'. Use 'high' for critical, above-the-fold images. */
  fetchpriority?: 'high' | 'low' | 'auto';
}

export function ImgSrcsets({
  avif,
  webp,
  alt,
  width,
  height,
  className,
  loading = 'lazy', // Default to lazy loading
  fetchpriority = 'auto', // Default fetch priority
}: ImgSrcsetsProps) {
  if (avif && avif.length !== webp.length) {
    console.warn('ImgSrcsets: avif and webp arrays must have the same length.');
    // Potentially return null or a fallback, but for now, proceed cautiously.
  }

  const hasTwoSizes = webp.length === 2;
  const mobileMaxWidth = 550; // Define mobile breakpoint

  // Determine the src for the fallback <img> tag (largest WebP)
  const fallbackSrc = webp[webp.length - 1];

  return (
    <picture className={className}>
      {/* AVIF Sources */}
      {avif?.map((src, index) => {
        if (hasTwoSizes) {
          const media = index === 0 ? `(max-width: ${mobileMaxWidth}px)` : `(min-width: ${mobileMaxWidth + 1}px)`;
          return <source key={`avif-${index}`} type="image/avif" srcSet={src} media={media} />;
        } else {
          // Single size
          return <source key={`avif-${index}`} type="image/avif" srcSet={src} />;
        }
      })}

      {/* WebP Sources */}
      {webp.map((src, index) => {
        if (hasTwoSizes) {
          const media = index === 0 ? `(max-width: ${mobileMaxWidth}px)` : `(min-width: ${mobileMaxWidth + 1}px)`;
          return <source key={`webp-${index}`} type="image/webp" srcSet={src} media={media} />;
        } else {
          // Single size
          return <source key={`webp-${index}`} type="image/webp" srcSet={src} />;
        }
      })}

      {/* Fallback Image */}
      <img
        src={fallbackSrc}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchpriority} // Note: React uses fetchPriority (camelCase)
        // Optionally add decoding="async" for non-critical images
        // decoding={loading === 'lazy' ? 'async' : 'auto'}
      />
    </picture>
  );
}

/*
 * ================= Sample Usage =================
 */

/*
 * Scenario 1: Above the Fold (e.g., Hero Image)
 * - Critical for LCP/CLS.
 * - Use `loading="eager"` and `fetchpriority="high"`.
 * - Provide accurate `width` and `height`.
 * - Assume two sizes: small (150px) and large (290px).
 */
// const AboveFoldImage = () => (
//   <ImgSrcsets
//     avif={['/assets/hero-mobile.avif', '/assets/hero-desktop.avif']}
//     webp={['/assets/hero-mobile.webp', '/assets/hero-desktop.webp']}
//     alt="Descriptive alt text for the hero image"
//     width={290} // Width of the largest image version
//     height={290} // Height of the largest image version
//     loading="eager"
//     fetchpriority="high"
//     className="hero-image"
//   />
// );

/*
 * Scenario 2: Below the Fold (e.g., Image further down the page)
 * - Less critical for initial load.
 * - Use `loading="lazy"` (default) and `fetchpriority="auto"` (default) or "low".
 * - Still provide `width` and `height` to prevent layout shifts when scrolled into view.
 * - Assume only one size is needed (250px).
 */
// const BelowFoldImage = () => (
//   <ImgSrcsets
//     avif={['/assets/product-feature.avif']}
//     webp={['/assets/product-feature.webp']}
//     alt="Alt text describing the product feature"
//     width={250}
//     height={180} // Example height
//     // loading="lazy" // Default
//     // fetchpriority="auto" // Default
//     className="feature-image"
//   />
// );
