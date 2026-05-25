import Link from 'next/link'

interface NewsCardProps {
  id: string
  slug?: string
  title: string
  excerpt: string
  category: string
  date: string
  imageUrl: string
  locale: string
  readMore: string
}

export function NewsCard({
  id,
  slug,
  title,
  excerpt,
  category,
  date,
  imageUrl,
  locale,
  readMore,
}: NewsCardProps) {
  const targetId = slug || id
  return (
    <Link
      href={`/${locale}/news/${targetId}`}
      className="bg-surface rounded-xl overflow-hidden border border-outline-variant/30 flex flex-col group cursor-pointer hover:shadow-md transition-shadow focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          alt=""
          src={imageUrl.startsWith('/') ? imageUrl : `/images/${imageUrl}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 motion-reduce:group-hover:scale-100 motion-reduce:transition-none"
        />
        <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-sm px-3 py-1 rounded text-label-sm font-label-sm font-bold text-teal-text">
          {category}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <span className="text-body-sm font-body-sm text-gray-500 mb-2">{date}</span>
        <h3 className="text-headline-sm font-headline-sm text-on-background mb-3 group-hover:text-pink transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-body-sm font-body-sm text-on-surface-variant mb-4 line-clamp-3 flex-1">
          {excerpt}
        </p>
        <span className="text-teal-text group-hover:text-pink transition-colors text-label-sm font-label-sm flex items-center gap-1 mt-auto">
          {readMore}{' '}
          <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_right_alt</span>
        </span>
      </div>
    </Link>
  )
}
