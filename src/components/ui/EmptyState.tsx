import { FileQuestion } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-[#3f3f46]/40 bg-[#1a1a1f]/50 p-12 text-center">
      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
        <FileQuestion className="w-10 h-10 text-[#6B4BFF]" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      {description && <p className="text-[#a1a1aa] mb-6">{description}</p>}
      {action}
    </div>
  );
}
