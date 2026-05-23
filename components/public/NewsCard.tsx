import Link from 'next/link'

interface NewsCardProps {
  id: string
  title: string
  excerpt: string
  category: string
  date: string
  imageUrl: string
}

export function NewsCard({
  id,
  title,
  excerpt,
  category,
  date,
  imageUrl,
}: NewsCardProps) {
  return (
    <Link
      href={`/news/${id}`}
      className="bg-surface rounded-xl overflow-hidden border border-outline-variant/30 flex flex-col group cursor-pointer hover:shadow-md transition-shadow focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          alt=""
          src={imageUrl}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 motion-reduce:group-hover:scale-100 motion-reduce:transition-none"
        />
        <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-sm px-3 py-1 rounded text-label-sm font-label-sm font-bold text-primary">
          {category}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <span className="text-body-sm font-body-sm text-outline mb-2">{date}</span>
        <h3 className="text-headline-sm font-headline-sm text-on-background mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-body-sm font-body-sm text-on-surface-variant mb-4 line-clamp-3 flex-1">
          {excerpt}
        </p>
        <span className="text-primary text-label-sm font-label-sm flex items-center gap-1 mt-auto">
          Đọc tiếp{' '}
          <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_right_alt</span>
        </span>
      </div>
    </Link>
  )
}