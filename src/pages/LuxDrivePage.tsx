import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { CarScene } from '../components/CarScene'

const luxuryNotes = [
  'Шоб тачка була така, шоб сусіди думали: ого, це вже інший рівень.',
  'Шоб пальне оплачувалося легше, ніж ранкова кава.',
  'Шоб життя їхало мʼяко, дорого і без тупих ям.',
]

export function LuxDrivePage() {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (!rootRef.current) {
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-drive-reveal]',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
        },
      )
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} className="pb-24 pt-28 md:pt-36">
      <section className="section-shell">
        <div className="grid gap-6 lg:grid-cols-[0.92fr,1.08fr] lg:items-center">
          <div data-drive-reveal>
            <span className="inline-flex rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[11px] font-semibold tracking-[0.32em] uppercase text-amber-200">
              lux drive mode
            </span>
            <h1 className="font-display mt-5 text-4xl leading-[1.08] font-bold md:text-6xl">
              Окреме побажання на тему{' '}
              <span className="gradient-text">дорогих тачок і жирного успіху</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 md:text-lg">
              Тут усе просто: бажаємо імениннику такого рівня життя, де красива
              машина це вже не мрія, а нормальна частина буднів.
            </p>
          </div>

          <div data-drive-reveal>
            <CarScene />
          </div>
        </div>
      </section>

      <section className="section-shell mt-10 grid gap-5 md:grid-cols-3">
        {luxuryNotes.map((note) => (
          <div
            key={note}
            data-drive-reveal
            className="glass-panel rounded-[1.6rem] p-6"
          >
            <p className="text-sm leading-7 text-slate-200">{note}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
