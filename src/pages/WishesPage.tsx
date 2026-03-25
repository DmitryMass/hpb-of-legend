import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { WishDeck } from '../components/WishDeck'

export function WishesPage() {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (!rootRef.current) {
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-wishes-reveal]',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
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
        <div className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
          <div data-wishes-reveal>
            <span className="inline-flex rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[11px] font-semibold tracking-[0.32em] uppercase text-fuchsia-200">
              wish deck
            </span>
            <h1 className="font-display mt-5 text-4xl leading-[1.08] font-bold md:text-6xl">
              Тут лежать побажання від душі, але{' '}
              <span className="gradient-text">без офіціозу і нудоти</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 md:text-lg">
              Клікай по картках і дивись різні варіанти: трохи смішно, трохи
              тепло, місцями по-суржику, зате щиро.
            </p>
          </div>

          <div
            data-wishes-reveal
            className="glass-panel rounded-[1.75rem] p-6 md:p-7"
          >
            <p className="text-sm font-semibold tracking-[0.24em] uppercase text-slate-400">
              що тут по вайбу
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-200 md:text-base">
              <li>Щастя без приколів від життя.</li>
              <li>Грошей більше, ніж потрібно на нормальний настрій.</li>
              <li>Людей поруч тільки з адекватною енергією.</li>
              <li>І нуль відсотків душнини в оточенні.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section-shell mt-10" data-wishes-reveal>
        <WishDeck />
      </section>
    </div>
  )
}
