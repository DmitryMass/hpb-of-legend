import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'

type HomePageProps = {
  photoCount: number
}

const previewCards = [
  {
    title: 'Галерея-орбіта',
    description: 'Крутимо фоточки, ловимо вайб і відкриваємо красиві картки.',
    to: '/memories',
  },
  {
    title: 'Пачка побажань',
    description: 'Теплі слова, трохи суржику і чесний гумор без душнини.',
    to: '/wishes',
  },
  {
    title: 'Режим люкс-тачка',
    description: 'Окремий блок про дорогі машини, гроші й стиль життя.',
    to: '/lux-drive',
  },
]

export function HomePage({ photoCount }: HomePageProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (!rootRef.current) {
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-home-reveal]',
        { opacity: 0, y: 28 },
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
    <div ref={rootRef} className="pb-24 pt-24 md:pt-32">
      <section className="section-shell">
        <div className="glass-panel shimmer-border relative overflow-hidden rounded-[2rem] px-6 py-8 md:px-12 md:py-14">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="relative">
            <span
              data-home-reveal
              className="inline-flex rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[11px] font-semibold tracking-[0.32em] uppercase text-slate-200"
            >
              birthday special edition
            </span>
            <h1
              data-home-reveal
              className="font-display mt-6 max-w-4xl text-4xl leading-[1.04] font-bold tracking-tight md:text-6xl"
            >
              Сайт-поздоровлення, де іменинник виглядає{' '}
              <span className="gradient-text">як головна зірка цієї планети</span>
            </h1>
            <p
              data-home-reveal
              className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-xl"
            >
              Тут буде все як треба: фоточки, анімації, короткі прикольні
              побажання і навіть окремий режим на тему дорогих тачок та ще
              дорожчих мрій.
            </p>
            <div
              data-home-reveal
              className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap"
            >
              <Link
                to="/memories"
                className="soft-shadow inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-extrabold tracking-[0.2em] uppercase text-slate-950 transition hover:-translate-y-1"
              >
                Погнали до фото
              </Link>
              <Link
                to="/wishes"
                className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/6 px-7 py-4 text-sm font-semibold tracking-[0.2em] uppercase text-slate-100 transition hover:bg-white/10"
              >
                Читати побажання
              </Link>
            </div>
            <div
              data-home-reveal
              className="mt-8 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100"
            >
              {photoCount > 0
                ? `Уже підхоплено ${photoCount} фото для галереї`
                : 'Галерея вже готова і чекає, коли фото підтягнуться в assets'}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell mt-8 grid gap-5 md:mt-10 md:grid-cols-3">
        {previewCards.map((card, index) => (
          <Link
            key={card.to}
            to={card.to}
            data-home-reveal
            className="glass-panel group rounded-[1.75rem] p-6 transition hover:-translate-y-1 hover:bg-white/10"
          >
            <span className="text-sm font-semibold tracking-[0.26em] uppercase text-slate-400">
              0{index + 1}
            </span>
            <h2 className="mt-4 text-2xl font-bold text-white">{card.title}</h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              {card.description}
            </p>
            <span className="mt-6 inline-flex text-sm font-semibold text-cyan-200 transition group-hover:translate-x-1">
              Відкрити сцену
            </span>
          </Link>
        ))}
      </section>
    </div>
  )
}
