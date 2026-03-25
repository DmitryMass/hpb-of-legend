import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { birthdayWishes } from '../data/wishes'

export function WishDeck() {
  const [activeId, setActiveId] = useState(birthdayWishes[0].id)
  const rootRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (!rootRef.current) {
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-wish-card]',
        { opacity: 0, y: 30, rotateX: -12 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power3.out',
        },
      )
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {birthdayWishes.map((wish) => {
        const isActive = wish.id === activeId

        return (
          <button
            key={wish.id}
            type="button"
            data-wish-card
            onClick={() => setActiveId(wish.id)}
            className={`group relative overflow-hidden rounded-[1.75rem] p-[1px] text-left transition duration-500 ${
              isActive ? 'scale-[1.01]' : 'hover:-translate-y-1'
            } bg-gradient-to-br ${wish.accent}`}
          >
            <div
              className={`h-full rounded-[calc(1.75rem-1px)] border border-white/10 px-6 py-6 transition ${
                isActive
                  ? 'bg-slate-950/96 shadow-[0_28px_80px_rgba(17,24,39,0.6)]'
                  : 'bg-slate-950/88'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs font-semibold tracking-[0.28em] uppercase text-slate-300">
                  побажання
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-[11px] font-bold tracking-[0.24em] uppercase ${
                    isActive
                      ? 'bg-white text-slate-950'
                      : 'border border-white/10 bg-white/6 text-slate-200'
                  }`}
                >
                  {isActive ? 'активне' : 'тицяй'}
                </span>
              </div>
              <h3 className="mt-5 text-2xl font-bold text-white">{wish.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base">
                {wish.message}
              </p>
              <div className="mt-6 rounded-[1.35rem] border border-white/10 bg-white/6 p-4">
                <p className="text-sm leading-7 text-slate-100">{wish.punchline}</p>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
