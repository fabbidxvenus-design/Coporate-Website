export interface DataTableColumn<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T, index: number) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T extends { id: string }> {
  columns: DataTableColumn<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
  'aria-label'?: string;
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  loading,
  emptyMessage = 'Không có dữ liệu.',
  'aria-label': ariaLabel,
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div aria-live="polite" aria-busy="true" className="flex justify-center py-12">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div role="status" aria-live="polite" className="text-center py-12 text-body-sm text-on-surface-variant">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table aria-label={ariaLabel} className="w-full text-left">
        <thead className="border-b border-surface-container-high bg-surface-container-low">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                scope="col"
                className={cn('px-6 py-3 text-label-md font-semibold text-on-surface-variant', col.className)}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-container-high">
          {data.map((item, index) => (
            <tr key={item.id} className="hover:bg-surface-container-low transition-colors">
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className={cn('px-6 py-4 text-body-sm text-on-surface', col.className)}
                >
                  {col.render ? col.render(item, index) : String((item as Record<string, unknown>)[col.key as string] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';