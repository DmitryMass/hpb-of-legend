import { NavLink } from 'react-router-dom'

type FloatingNavProps = {
  hidden: boolean
}

const links = [
  { to: '/', label: 'Старт' },
  { to: '/memories', label: 'Фото' },
  { to: '/lux-drive', label: 'Тачка' },
]

export function FloatingNav({ hidden }: FloatingNavProps) {
  return (
    <nav
      className={`fixed inset-x-0 z-40 mx-auto w-fit transition duration-500 ${
        hidden
          ? 'pointer-events-none top-4 opacity-0'
          : 'bottom-4 opacity-100 md:top-6 md:bottom-auto'
      }`}
      aria-label="Навігація по святковому сайту"
    >
      <div className="glass-panel flex items-center gap-1 rounded-full px-2 py-2 md:gap-2 md:px-3">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `rounded-full px-3 py-2 text-xs font-semibold tracking-[0.18em] uppercase transition md:px-4 ${
                isActive
                  ? 'bg-white shadow-[0_10px_30px_rgba(255,255,255,0.25)]'
                  : 'text-slate-200/82 hover:bg-white/10 hover:text-white'
              }`
            }
            style={({ isActive }) => isActive ? { color: '#020617' } : undefined}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
