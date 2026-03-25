import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { OrbitalGallery } from '../components/OrbitalGallery'
import { photoEntries } from '../lib/photos'

export function MemoriesPage() {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const photoCount = photoEntries.filter((photo) => !photo.isPlaceholder).length

  useLayoutEffect(() => {
    if (!rootRef.current) {
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-memories-reveal]',
        { opacity: 0, y: 26 },
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
        <div className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr] lg:items-end">
          <div data-memories-reveal>
            <span className="inline-flex rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[11px] font-semibold tracking-[0.32em] uppercase text-cyan-100">
              memories orbit
            </span>
            <h1 className="font-display mt-5 text-4xl leading-[1.08] font-bold md:text-6xl">
              Тута зібрані кадри, де іменинник просто{' '}
              <span className="gradient-text">роздає красу і вайб</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 md:text-lg">
              Галерея зроблена так, щоб фото не просто лежали списком, а реально
              крутилися навколо центру, ніби маленька особиста планета
              спогадів.
            </p>
          </div>

          <div
            data-memories-reveal
            className="glass-panel rounded-[1.8rem] p-6 md:p-7"
          >
            <p className="text-sm font-semibold tracking-[0.24em] uppercase text-slate-400">
              коротка статистика
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.4rem] border border-white/10 bg-white/6 p-5">
                <p className="text-3xl font-black text-white">{photoCount || '??'}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Фото на орбіті прямо зараз.
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-white/10 bg-white/6 p-5">
                <p className="text-3xl font-black text-white">1 tap</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  І відкривається картка з фліпом та побажанням.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell mt-10" data-memories-reveal>
        <OrbitalGallery />
      </section>
    </div>
  )
}
