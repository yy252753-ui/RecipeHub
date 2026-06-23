import Image from "next/image";
import { ImageIcon } from "lucide-react";

type FoodImageProps = {
  label: string;
  src?: string | null;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function FoodImage({
  label,
  src,
  height = 220,
  className,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 267px",
}: FoodImageProps) {
  return (
    <div
      className={`relative grid overflow-hidden bg-[linear-gradient(135deg,#fff7ed,#eaf2fe_55%,#f2fff6)] ${className ?? ""}`}
      style={{ height }}
    >
      {src ? (
        <Image
          src={src}
          alt={label}
          fill
          className="object-cover"
          priority={priority}
          sizes={sizes}
        />
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
