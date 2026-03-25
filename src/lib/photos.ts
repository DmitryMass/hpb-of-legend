import { memoryCaptions } from '../data/wishes'

export type PhotoEntry = {
  id: string
  src?: string
  alt: string
  title: string
  note: string
  isPlaceholder?: boolean
}

const photoModules = import.meta.glob('../assets/**/*.{png,jpg,jpeg,webp,avif,gif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const assetPhotos: PhotoEntry[] = Object.entries(photoModules)
  .sort(([left], [right]) => left.localeCompare(right))
  .map(([path, src], index) => {
    const caption = memoryCaptions[index % memoryCaptions.length]
    const fileName = path.split('/').pop() ?? `photo-${index + 1}`
    const cleanName = fileName.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')

    return {
      id: `photo-${index + 1}`,
      src,
      alt: `Фото ${cleanName}`,
      title: caption.title,
      note: caption.note,
    }
  })

const placeholders: PhotoEntry[] = memoryCaptions.map((caption, index) => ({
  id: `placeholder-${index + 1}`,
  alt: `Тимчасове фото ${index + 1}`,
  title: caption.title,
  note: 'Як тільки фото підтягнуться в src/assets, тут буде чистий космос.',
  isPlaceholder: true,
}))

export const photoEntries = assetPhotos.length > 0 ? assetPhotos : placeholders
