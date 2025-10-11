import { Package } from "lucide-react";

export function EmptyState({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
      <Package className="h-12 w-12 text-gray-400" />
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {children}
    </div>
  );
}
