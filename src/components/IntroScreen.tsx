import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';
import heroPortrait from '../assets/vladzyzz.jpg';
import Prism from './Prism';

type IntroScreenProps = {
  open: boolean;
  onStart: () => void;
};

export function IntroScreen({ open, onStart }: IntroScreenProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const [isLaunching, setIsLaunching] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
      );
    }
  }, [open]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!open && !isLaunching) return null;

  const launch = () => {
    if (isLaunching) return;
    setIsLaunching(true);

    void confetti({
      particleCount: 180,
      spread: 130,
      startVelocity: 42,
      origin: { y: 0.58 },
      colors: ['#f472b6', '#c084fc', '#22d3ee', '#fde68a'],
    });

    if (panelRef.current) {
      gsap.to(panelRef.current, {
        opacity: 0,
        scale: 0.96,
        duration: 0.7,
        ease: 'power3.inOut',
      });
    }

    timeoutRef.current = window.setTimeout(() => {
      setIsLaunching(false);
      onStart();
    }, 680);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-slate-950 transition duration-500 ${
        isLaunching ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Prism full-screen background */}
      <div className='pointer-events-none absolute inset-0'>
        <Prism
          transparent={false}
          timeScale={0.45}
          glow={1.1}
          scale={3.4}
          noise={0.25}
          bloom={1.1}
          colorFrequency={0.9}
        />
      </div>

      {/* Dark vignette over prism */}
      <div className='absolute inset-0 bg-slate-950/60' />

      {/* Photo card — fullscreen on mobile, centered tall card on desktop */}
      <div
        ref={panelRef}
        className='relative z-10 h-dvh w-full md:h-[90vh] md:max-w-sm md:rounded-[2.5rem] md:overflow-hidden md:shadow-[0_40px_120px_rgba(2,6,23,0.85)]'
      >
        {/* Border glow on desktop */}
        <div className='pointer-events-none absolute inset-[-1px] hidden rounded-[2.5rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.45),rgba(255,255,255,0.04),rgba(34,211,238,0.28),rgba(168,85,247,0.3))] md:block' />

        {/* Photo */}
        <img
          src={heroPortrait}
          alt='Іменинник'
          className='h-full w-full object-cover object-center'
        />

        {/* Top gradient + badge */}
        <div className='absolute inset-x-0 top-0 flex flex-col items-center bg-gradient-to-b from-black/70 via-black/30 to-transparent px-5 pb-16 pt-safe-top pt-10'>
          <span className='inline-flex rounded-full border border-white/20 bg-black/40 px-4 py-2 text-[11px] font-semibold tracking-[0.3em] uppercase text-white backdrop-blur-sm'>
            Сьогодні офіційно день легенди
          </span>
        </div>

        {/* Bottom gradient + title + button */}
        <div className='absolute inset-x-0 bottom-0 flex flex-col items-center bg-gradient-to-t from-black via-black/60 to-transparent px-5 pb-10 pt-24'>
          <button
            type='button'
            onClick={launch}
            className='soft-shadow mt-6 inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-xs font-extrabold tracking-[0.26em] uppercase text-slate-950 transition hover:-translate-y-1 active:scale-95 sm:text-sm'
          >
            До привітань
          </button>
        </div>
      </div>
    </div>
  );
}
