import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import DomeGallery from '../components/DomeGallery';
import { photoEntries } from '../lib/photos';

const domeImages = photoEntries.map((p) => ({
  src: p.src ?? '',
  alt: p.alt,
}));

export function MemoriesPage() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-memories-reveal]',
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;
    const prevent = (e: TouchEvent) => e.preventDefault();
    el.addEventListener('touchmove', prevent, { passive: false });
    return () => el.removeEventListener('touchmove', prevent);
  }, []);

  return (
    <div ref={rootRef} className='pb-20 pt-2 md:pt-20'>
      <section className='section-shell pb-3' data-memories-reveal>
        <h1 className='font-display mt-3 text-xl font-bold leading-[1.15] sm:text-2xl md:text-3xl'>
          Кадри де іменинник{' '}
          <span className='gradient-text'>роздає красу і вайб</span>
        </h1>
        <p className='mt-1.5 text-xs text-slate-400 sm:text-sm'>
          Тягни щоб крутити ✦ тицяй на фото щоб відкрити
        </p>
      </section>

      {/* DomeGallery — НЕ в data-memories-reveal, щоб не ховалась через GSAP */}
      <div
        ref={galleryRef}
        className='w-full'
        style={{ height: 'calc(100dvh - 160px)', minHeight: 380, touchAction: 'none' }}
      >
        <DomeGallery
          images={domeImages}
          grayscale={false}
          overlayBlurColor='#050816'
          fit={0.55}
          dragSensitivity={18}
          openedImageWidth='min(420px, 90vw)'
          openedImageHeight='min(420px, 62vh)'
          imageBorderRadius='18px'
          openedImageBorderRadius='22px'
          minRadius={460}
        />
      </div>
    </div>
  );
}
