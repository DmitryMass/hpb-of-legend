const rays = [
  { left: '4%', width: '14%', delay: '0s', duration: '8s', rotate: '-28deg' },
  { left: '14%', width: '12%', delay: '1.2s', duration: '10s', rotate: '-16deg' },
  { left: '26%', width: '11%', delay: '0.4s', duration: '9s', rotate: '-8deg' },
  { left: '39%', width: '13%', delay: '1.8s', duration: '11s', rotate: '0deg' },
  { left: '52%', width: '11%', delay: '0.8s', duration: '8.8s', rotate: '9deg' },
  { left: '64%', width: '13%', delay: '1.5s', duration: '10.5s', rotate: '17deg' },
  { left: '77%', width: '12%', delay: '0.2s', duration: '9.4s', rotate: '26deg' },
]

export function LightRays() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[62%] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.34),_rgba(34,211,238,0.24)_18%,_rgba(124,58,237,0.14)_38%,_transparent_74%)] blur-[42px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_rgba(255,255,255,0.04)_24%,_transparent_42%)]" />
      <div className="absolute inset-x-[14%] top-0 h-[52%] rounded-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.26),_rgba(56,189,248,0.12)_26%,_transparent_68%)] blur-[54px]" />

      {rays.map((ray) => (
        <span
          key={`${ray.left}-${ray.rotate}`}
          className="light-ray absolute top-[-16%] h-[92%] rounded-full"
          style={{
            left: ray.left,
            width: ray.width,
            rotate: ray.rotate,
            animationDelay: ray.delay,
            animationDuration: ray.duration,
          }}
        />
      ))}
    </div>
  )
}
