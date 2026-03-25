import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { TouchEvent } from 'react'
import gsap from 'gsap'
import { birthdayWishes } from '../data/wishes'
import { photoEntries } from '../lib/photos'

type PointerStart = {
  x: number
  y: number
}

export function OrbitalGallery() {
  const [rotation, setRotation] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isFlipped, setIsFlipped] = useState(false)
  const touchStartRef = useRef<PointerStart | null>(null)
  const stageRef = useRef<HTMLDivElement | null>(null)
  const selectedPhoto =
    selectedIndex === null ? null : photoEntries[selectedIndex % photoEntries.length]

  useLayoutEffect(() => {
    if (!stageRef.current) {
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-orbit-card]',
        { opacity: 0, scale: 0.4 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.06,
          ease: 'back.out(1.4)',
        },
      )
    }, stageRef)

    return () => ctx.revert()
  }, [])

  const orbitCards = useMemo(() => {
    const radiusX = typeof window !== 'undefined' && window.innerWidth < 768 ? 130 : 255
    const radiusY = typeof window !== 'undefined' && window.innerWidth < 768 ? 86 : 148

    return photoEntries.map((photo, index) => {
      const angle = (Math.PI * 2 * index) / photoEntries.length + rotation
      const x = Math.cos(angle) * radiusX
      const y = Math.sin(angle) * radiusY
      const depth = (Math.sin(angle) + 1) / 2
      const scale = 0.72 + depth * 0.4
      const opacity = 0.42 + depth * 0.58
      const tilt = x / 32

      return {
        photo,
        index,
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale}) rotate(${tilt}deg)`,
        zIndex: Math.round(depth * 100),
        opacity,
      }
    })
  }, [rotation])

  const activeWish =
    selectedIndex === null ? birthdayWishes[0] : birthdayWishes[selectedIndex % birthdayWishes.length]

  const rotateLeft = () => {
    setRotation((value) => value - Math.PI / 6)
  }

  const rotateRight = () => {
    setRotation((value) => value + Math.PI / 6)
  }

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0]
    touchStartRef.current = { x: touch.clientX, y: touch.clientY }
  }

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (!touchStartRef.current) {
      return
    }

    const touch = event.changedTouches[0]
    const deltaX = touch.clientX - touchStartRef.current.x
    const deltaY = touch.clientY - touchStartRef.current.y
    touchStartRef.current = null

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 34) {
      setRotation((value) => value + (deltaX > 0 ? Math.PI / 7 : -Math.PI / 7))
    }
  }

  const openCard = (index: number) => {
    setSelectedIndex(index)
    setIsFlipped(false)
  }

  const closeCard = () => {
    setSelectedIndex(null)
    setIsFlipped(false)
  }

  return (
    <>
      <div className="glass-panel rounded-[2rem] p-4 md:p-6">
        {/* Header — hidden on mobile, shown on desktop */}
        <div className="hidden md:flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-[0.24em] uppercase text-cyan-200">
              dome gallery mode
            </p>
            <h3 className="mt-3 text-2xl font-bold text-white md:text-3xl">
              Крути орбіту та тицяй у фото
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300 md:text-base">
              На десктопі користуйся кнопками або просто вибирай улюблений кадр.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={rotateLeft}
              className="rounded-full border border-white/12 bg-white/6 px-5 py-3 text-xs font-bold tracking-[0.24em] uppercase text-white transition hover:bg-white/12"
            >
              Ліво
            </button>
            <button
              type="button"
              onClick={rotateRight}
              className="rounded-full border border-white/12 bg-white/6 px-5 py-3 text-xs font-bold tracking-[0.24em] uppercase text-white transition hover:bg-white/12"
            >
              Право
            </button>
          </div>
        </div>

        {/* Mobile: minimal label + swipe hint */}
        <div className="flex items-center justify-between gap-3 md:hidden">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-cyan-200">
            свайпай або тицяй
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={rotateLeft}
              className="rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-[10px] font-bold uppercase text-white"
            >
              ←
            </button>
            <button
              type="button"
              onClick={rotateRight}
              className="rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-[10px] font-bold uppercase text-white"
            >
              →
            </button>
          </div>
        </div>

        {/* Mobile horizontal scroll cards */}
        <div className="mt-4 md:hidden">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-slate-950/90 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-slate-950/90 to-transparent" />

            <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-3">
              {photoEntries.map((photo, index) => {
                const wish = birthdayWishes[index % birthdayWishes.length]

                return (
                  <button
                    key={`${photo.id}-mobile`}
                    type="button"
                    onClick={() => openCard(index)}
                    className={`shimmer-border relative min-w-[72vw] snap-center overflow-hidden rounded-[1.6rem] bg-gradient-to-br ${wish.accent} p-[1px] text-left shadow-[0_18px_60px_rgba(15,23,42,0.5)]`}
                  >
                    <div className="relative h-[52vw] min-h-[200px] max-h-[260px] rounded-[calc(1.6rem-1px)] bg-slate-950/90">
                      {photo.src ? (
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.32),_rgba(91,33,182,0.92))] p-6 text-center text-xs font-bold uppercase tracking-[0.22em] text-white">
                          Фото скоро тут
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <h4 className="text-base font-bold text-white">{photo.title}</h4>
                        <p className="mt-1 text-xs font-semibold text-cyan-200">
                          тицяй для флипу
                        </p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Desktop orbital ring */}
        <div
          ref={stageRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="photo-ring relative mt-8 hidden h-[24rem] overflow-hidden rounded-[1.75rem] bg-slate-950/65 md:block md:h-[32rem]"
        >
          <div className="orbital-glow absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full md:h-56 md:w-56" />
          <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.45),_rgba(91,33,182,0.95))] shadow-[0_0_90px_rgba(124,58,237,0.35)] md:h-36 md:w-36" />

          {orbitCards.map((item) => (
            <button
              key={item.photo.id}
              type="button"
              data-orbit-card
              onClick={() => openCard(item.index)}
              className="group absolute left-1/2 top-1/2 h-28 w-24 overflow-hidden rounded-[1.2rem] border border-white/16 bg-slate-900/90 transition duration-500 hover:-translate-y-2 md:h-44 md:w-36"
              style={{
                transform: item.transform,
                zIndex: item.zIndex,
                opacity: item.opacity,
              }}
            >
              {item.photo.src ? (
                <img
                  src={item.photo.src}
                  alt={item.photo.alt}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.35),_rgba(91,33,182,0.88))] p-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-white">
                  Фото
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Card modal */}
      {selectedPhoto ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 px-4 py-6 backdrop-blur-md">
          {/* Close button */}
          <button
            type="button"
            onClick={closeCard}
            className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/50 text-sm font-bold text-white hover:bg-white/10"
          >
            ✕
          </button>

          {/* Mobile: single flip card */}
          <div className="w-full max-w-sm md:hidden">
            <button
              type="button"
              onClick={() => setIsFlipped((v) => !v)}
              className={`birthday-card-flip relative h-[68svh] w-full rounded-[2rem] text-left ${
                isFlipped ? 'is-flipped' : ''
              }`}
            >
              {/* Front: photo */}
              <div className="birthday-card-face glass-panel absolute inset-0 overflow-hidden rounded-[2rem]">
                {selectedPhoto.src ? (
                  <img
                    src={selectedPhoto.src}
                    alt={selectedPhoto.alt}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(192,132,252,0.42),_rgba(8,15,36,0.96))] p-8 text-center">
                    <div>
                      <p className="text-xs font-semibold tracking-[0.34em] uppercase text-cyan-200">
                        photo slot
                      </p>
                      <h4 className="mt-4 font-display text-2xl text-white">
                        Фото тут буде
                      </h4>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h4 className="text-xl font-bold text-white">{selectedPhoto.title}</h4>
                  <p className="mt-2 text-xs font-semibold text-cyan-200/80">
                    тицяй щоб перевернути
                  </p>
                </div>
              </div>

              {/* Back: wish */}
              <div className={`birthday-card-face back glass-panel absolute inset-0 overflow-hidden rounded-[2rem] p-6`}>
                <span className="inline-flex rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-[10px] font-semibold tracking-[0.28em] uppercase text-slate-100">
                  побажання
                </span>
                <h4 className="mt-4 font-display text-2xl leading-tight text-white">
                  {activeWish.title}
                </h4>
                <p className="mt-4 text-sm leading-7 text-slate-200">
                  {selectedPhoto.note}
                </p>
                <div
                  className={`mt-4 rounded-[1.3rem] bg-gradient-to-br ${activeWish.accent} p-[1px]`}
                >
                  <div className="rounded-[calc(1.3rem-1px)] bg-slate-950/92 px-4 py-4">
                    <p className="text-sm leading-7 text-slate-100">
                      {activeWish.message}
                    </p>
                    <p className="mt-3 text-xs font-semibold text-cyan-100">
                      {activeWish.punchline}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-xs text-slate-400">
                  Тицяй знову щоб перевернути назад
                </p>
              </div>
            </button>
          </div>

          {/* Desktop: two-column layout */}
          <div className="hidden w-full max-w-5xl overflow-y-auto md:block">
            <div className="grid gap-6 md:grid-cols-[1.2fr,0.8fr]">
              <button
                type="button"
                onClick={() => setIsFlipped((value) => !value)}
                className={`birthday-card-flip relative h-[28rem] w-full rounded-[2rem] text-left md:h-[34rem] ${
                  isFlipped ? 'is-flipped' : ''
                }`}
              >
                <div className="birthday-card-face glass-panel absolute inset-0 overflow-hidden rounded-[2rem]">
                  {selectedPhoto.src ? (
                    <img
                      src={selectedPhoto.src}
                      alt={selectedPhoto.alt}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(192,132,252,0.42),_rgba(8,15,36,0.96))] p-10 text-center">
                      <div>
                        <p className="text-xs font-semibold tracking-[0.34em] uppercase text-cyan-200">
                          photo slot
                        </p>
                        <h4 className="mt-4 font-display text-3xl text-white">
                          Фото підтягнеться сюди автоматично
                        </h4>
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/65 to-transparent px-6 py-6">
                    <p className="text-xs font-semibold tracking-[0.28em] uppercase text-cyan-200">
                      натисни на картку
                    </p>
                    <h4 className="mt-3 text-2xl font-bold text-white md:text-3xl">
                      {selectedPhoto.title}
                    </h4>
                  </div>
                </div>

                <div className="birthday-card-face back glass-panel absolute inset-0 overflow-hidden rounded-[2rem] p-7 md:p-9">
                  <span className="inline-flex rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[11px] font-semibold tracking-[0.28em] uppercase text-slate-100">
                    коротке послання
                  </span>
                  <h4 className="mt-5 font-display text-3xl leading-tight text-white md:text-4xl">
                    {activeWish.title}
                  </h4>
                  <p className="mt-5 text-base leading-8 text-slate-200 md:text-lg">
                    {selectedPhoto.note}
                  </p>
                  <div
                    className={`mt-6 rounded-[1.5rem] bg-gradient-to-br ${activeWish.accent} p-[1px]`}
                  >
                    <div className="rounded-[calc(1.5rem-1px)] bg-slate-950/92 px-5 py-5">
                      <p className="text-sm leading-7 text-slate-100">
                        {activeWish.message}
                      </p>
                      <p className="mt-4 text-sm font-semibold text-cyan-100">
                        {activeWish.punchline}
                      </p>
                    </div>
                  </div>
                </div>
              </button>

              <div className="glass-panel rounded-[2rem] p-6 md:p-8">
                <p className="text-xs font-semibold tracking-[0.32em] uppercase text-cyan-200">
                  картка-побажання
                </p>
                <h4 className="mt-4 text-2xl font-bold text-white md:text-3xl">
                  {activeWish.title}
                </h4>
                <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base">
                  {activeWish.message}
                </p>
                <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/6 p-5">
                  <p className="text-sm leading-7 text-slate-200">
                    {activeWish.punchline}
                  </p>
                </div>
                <p className="mt-6 text-sm leading-7 text-slate-400">
                  Якщо хочеш перевернути картку назад, просто тицяй по великому
                  превʼю ще раз.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
