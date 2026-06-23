import { ImageIcon } from "lucide-react";

type FoodImageProps = {
  label: string;
  src?: string | null;
  height?: number;
  className?: string;
};

export function FoodImage({ label, src, height = 220, className }: FoodImageProps) {
  return (
    <div
      className={`relative grid overflow-hidden bg-[linear-gradient(135deg,#fff7ed,#eaf2fe_55%,#f2fff6)] ${className ?? ""}`}
      style={{ minHeight: height }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={label} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,146,0,0.18),transparent_30%),radial-gradient(circle_at_75%_70%,rgba(0,102,255,0.16),transparent_28%)]" />
          <div className="relative m-auto flex flex-col items-center gap-3 text-[var(--color-text-neutral-tertiary)]">
            <ImageIcon size={34} />
            <span className="max-w-52 text-center text-sm font-bold">{label}</span>
          </div>
        </>
      )}
    </div>
  );
}
