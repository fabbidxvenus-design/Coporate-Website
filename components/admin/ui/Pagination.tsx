interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className="py-3 px-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
      <span className="text-xs text-gray-500">Trang {currentPage} / {totalPages}</span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center rounded text-gray-400 bg-white border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-sm">chevron_left</span>
        </button>
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition-colors ${
              currentPage === page
                ? 'bg-[#006672] text-white'
                : 'text-gray-600 bg-white border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}
        {totalPages > 5 && <span className="px-2 text-gray-400">...</span>}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="w-8 h-8 flex items-center justify-center rounded text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-sm">chevron_right</span>
        </button>
      </div>
    </div>
  )
}
