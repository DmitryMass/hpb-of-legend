import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'

type HomePageProps = {
  photoCount: number
}

export function HomePage({ photoCount }: HomePageProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (!rootRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-home-reveal]',
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} className="flex min-h-dvh flex-col items-center justify-center pb-20 pt-16 px-4">
      <div className="w-full max-w-xl">
        <div className="glass-panel shimmer-border relative overflow-hidden rounded-[2rem] px-5 py-7 md:px-10 md:py-12">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="relative">
            <span
              data-home-reveal
              className="inline-flex rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-[10px] font-semibold tracking-[0.28em] uppercase text-slate-200 sm:text-[11px]"
            >
              birthday special edition
            </span>
            <h1
              data-home-reveal
              className="font-display mt-4 text-2xl font-bold leading-[1.1] tracking-tight sm:text-3xl md:text-4xl"
            >
              Сайт де іменинник виглядає{' '}
              <span className="gradient-text">як головна зірка планети</span>
            </h1>

            <div
              data-home-reveal
              className="mt-6 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                to="/memories"
                className="soft-shadow inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-xs font-extrabold tracking-[0.2em] uppercase transition hover:-translate-y-1 sm:text-sm"
                style={{ color: '#020617' }}
              >
                Погнали до фото
              </Link>
              <Link
                to="/lux-drive"
                className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/6 px-6 py-3 text-xs font-semibold tracking-[0.2em] uppercase text-slate-100 transition hover:bg-white/10 sm:text-sm"
              >
                Люкс-тачка
              </Link>
            </div>

            {photoCount > 0 && (
              <div
                data-home-reveal
                className="mt-5 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-xs text-cyan-100"
              >
                {photoCount} фото вже в галереї
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
