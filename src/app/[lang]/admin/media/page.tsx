import React from 'react';
import { Image as ImageIcon, Upload, FileText, CheckCircle2 } from 'lucide-react';
import { getAllMedia } from '@/lib/admin/admin-store';
import { Button } from '@/components/ui/button';

export default async function AdminMediaPage({
  params,
}: {
  params: { lang: string };
}) {
  const locale = params.lang || 'bn';
  const media = await getAllMedia();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h2 className="text-2xl font-bold font-bengali-heading text-foreground flex items-center gap-2.5">
            <ImageIcon className="w-6 h-6 text-primary" />
            <span>মিডিয়া লাইব্রেরি (Media Library)</span>
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            বইয়ের প্রচ্ছদ, মূল পাণ্ডুলিপির স্ক্যান এবং চিত্রকর্ম ব্যবস্থাপনা
          </p>
        </div>

        <label className="cursor-pointer">
          <Button variant="accent" size="sm" className="font-semibold shadow-xs flex items-center gap-1.5 pointer-events-none">
            <Upload className="w-4 h-4" />
            <span>নতুন ছবি আপলোড</span>
          </Button>
          <input type="file" className="hidden" accept="image/*" />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {media.map((item) => (
          <div
            key={item.id}
            className="bg-surface rounded-2xl border border-border shadow-xs overflow-hidden group hover:border-accent/40 transition-all"
          >
            <div className="h-44 bg-muted/40 flex items-center justify-center text-muted-foreground relative">
              <ImageIcon className="w-12 h-12 text-accent/60 group-hover:scale-110 transition-transform" />
              <span className="absolute bottom-2 right-2 text-[10px] bg-black/60 text-white px-2 py-0.5 rounded font-mono">
                {(item.sizeBytes / 1024).toFixed(0)} KB
              </span>
            </div>

            <div className="p-4 space-y-1">
              <div className="font-semibold text-xs text-foreground truncate" title={item.fileName}>
                {item.fileName}
              </div>
              <div className="text-[11px] text-muted-foreground truncate">
                {item.altText}
              </div>
              <div className="text-[10px] text-muted-foreground/80 font-mono pt-1 border-t border-border mt-2">
                আপলোডকারী: {item.uploadedBy}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
