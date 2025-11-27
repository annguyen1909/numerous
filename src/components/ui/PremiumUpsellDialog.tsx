"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X, Crown, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PremiumUpsellDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PremiumUpsellDialog({ open, onOpenChange }: PremiumUpsellDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-lg rounded-2xl border border-[#FFAC33]/30 bg-[#0F0F14]/90 shadow-2xl p-6">
          <div className="flex items-start justify-between mb-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFAC33]/20 border border-[#FFAC33]/30 text-[#FFAC33] text-xs font-semibold">
              <Crown className="w-4 h-4" /> Premium
            </div>
            <Dialog.Close asChild>
              <button className="p-2 rounded-lg hover:bg-white/5 transition-colors" aria-label="Close">
                <X className="w-5 h-5 text-[#a1a1aa]" />
              </button>
            </Dialog.Close>
          </div>

          <Dialog.Title className="text-2xl font-bold mb-2">Nâng cấp Premium</Dialog.Title>
          <Dialog.Description className="text-[#a1a1aa] mb-4">
            Nhận báo cáo chuyên sâu, dự đoán 12 tháng, và file PDF thiết kế chuyên nghiệp.
          </Dialog.Description>

          <ul className="space-y-2 mb-6">
            {["Phân tích cực kỳ chi tiết","Dự đoán 12 tháng cá nhân hóa","Download PDF chất lượng cao"].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#FFAC33]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex gap-3">
            <Button asChild className="flex-1" variant="secondary">
              <a href="/premium">
                Nâng cấp ngay
              </a>
            </Button>
            <Dialog.Close asChild>
              <Button variant="outline" className="flex-1">Để sau</Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
