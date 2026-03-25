import { useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import gsap from 'gsap'
import heroPortrait from '../assets/zyzz.jpg'
import { LightRays } from './LightRays'

type IntroScreenProps = {
  open: boolean
  onStart: () => void
}

export function IntroScreen({ open, onStart }: IntroScreenProps) {
  const panelRef = useRef<HTMLDivElement | null>(null)
  const timeoutRef = useRef<number | null>(null)
  const [isLaunching, setIsLaunching] = useState(false)

  useEffect(() => {
    if (!open) {
      return
    }

    if (panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { y: 36, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
        },
      )
    }
  }, [open])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  if (!open && !isLaunching) {
    return null
  }

  const launch = () => {
    if (isLaunching) {
      return
    }

    setIsLaunching(true)

    void confetti({
      particleCount: 180,
      spread: 130,
      startVelocity: 42,
      origin: { y: 0.58 },
      colors: ['#f472b6', '#c084fc', '#22d3ee', '#fde68a'],
    })

    if (panelRef.current) {
      gsap.to(panelRef.current, {
        y: -26,
        opacity: 0,
        scale: 0.94,
        duration: 0.75,
        ease: 'power3.inOut',
      })
    }

    timeoutRef.current = window.setTimeout(() => {
      setIsLaunching(false)
      onStart()
    }, 720)
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden px-4 transition duration-500 ${
        isLaunching ? 'bg-slate-950/70 opacity-0' : 'bg-slate-950 opacity-100'
      }`}
    >
      <div
        ref={panelRef}
        className="relative flex min-h-screen w-full max-w-none items-center justify-center overflow-hidden"
      >
        <LightRays />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(15,23,42,0.14),_rgba(2,6,23,0.82)_55%,_rgba(2,6,23,0.98)_100%)]" />
        <div className="absolute left-1/2 top-[48%] h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/16 blur-[140px]" />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-2 text-center">
          <div className="relative mx-auto w-full max-w-[20rem] md:max-w-[24rem]">
            <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.32),_rgba(34,211,238,0.12)_40%,_transparent_72%)] blur-2xl" />
            <div className="absolute inset-[-1px] rounded-[2rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.5),rgba(255,255,255,0.06),rgba(34,211,238,0.3),rgba(168,85,247,0.32))]" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 shadow-[0_30px_120px_rgba(2,6,23,0.75)]">
              <img
                src={heroPortrait}
                alt="Іменинник"
                className="h-[24rem] w-full object-cover object-top opacity-92 md:h-[28rem]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.18),rgba(2,6,23,0.35)_44%,rgba(2,6,23,0.88)_100%)]" />
            </div>
          </div>

          <span className="mt-8 inline-flex rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[11px] font-semibold tracking-[0.34em] uppercase text-slate-200">
            Сьогодні офіційно день легенди
          </span>
          <h1 className="font-display gradient-text mt-5 max-w-4xl text-4xl leading-[1.02] font-bold md:text-7xl">
            До привітань для самого стильного тіпа
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
            Тисни кнопку й далі буде красиво: фоточки, теплі слова, трохи
            мемного суржику і вайб, де все крутиться навколо іменинника.
          </p>
          <button
            type="button"
            onClick={launch}
            className="soft-shadow mt-8 inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-extrabold tracking-[0.28em] uppercase text-slate-950 transition hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(255,255,255,0.26)] md:px-10 md:text-base"
          >
            До привітань
          </button>
        </div>
      </div>
    </div>
  )
}
