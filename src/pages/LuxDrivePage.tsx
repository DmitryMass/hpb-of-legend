import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import ModelViewer from '../components/ModelViewer';

const luxuryNotes = [
  'Шоб тачка була така, шоб сусіди думали: ого, це вже інший рівень.',
  'Шоб пальне оплачувалося легше, ніж ранкова кава.',
  'Шоб життя їхало мʼяко, дорого і без тупих ям.',
];

export function LuxDrivePage() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-drive-reveal]',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.85, stagger: 0.12, ease: 'power3.out' }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className='pb-24 pt-6 md:pt-24'>
      <section className='section-shell'>
        <div data-drive-reveal className='mb-5 md:mb-8'>
          <span className='inline-flex rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[11px] font-semibold tracking-[0.32em] uppercase text-amber-200'>
            lux drive mode
          </span>
          <h1 className='font-display mt-4 text-2xl font-bold leading-[1.12] sm:text-3xl'>
            Побажання про{' '}
            <span className='gradient-text'>дорогі тачки і жирний успіх</span>
          </h1>
        </div>

        {/* ModelViewer — explicit height so Three.js canvas gets real pixels */}
        <div
          data-drive-reveal
          className='glass-panel overflow-hidden rounded-[2rem]'
        >
          <ModelViewer
            url='https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/ToyCar/glTF-Binary/ToyCar.glb'
            width='100%'
            height={420}
            modelXOffset={0}
            modelYOffset={0}
            enableMouseParallax={false}
            enableHoverRotation={true}
            enableManualRotation={true}
            enableManualZoom={true}
            environmentPreset='forest'
            autoFrame={true}
            fadeIn={false}
            autoRotate={true}
            autoRotateSpeed={0.4}
            showScreenshotButton={false}
            defaultZoom={1.4}
            minZoomDistance={0.4}
            maxZoomDistance={5}
          />
        </div>
      </section>

      <section className='section-shell mt-6 grid gap-4 sm:grid-cols-3 md:mt-8 md:gap-5'>
        {luxuryNotes.map((note) => (
          <div
            key={note}
            data-drive-reveal
            className='glass-panel rounded-[1.6rem] p-5 md:p-6'
          >
            <p className='text-sm leading-7 text-slate-200'>{note}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
