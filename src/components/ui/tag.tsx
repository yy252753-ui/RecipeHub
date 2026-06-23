export function Tag({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-bold ${
        active
          ? "bg-[var(--color-background-neutral-inverse)] text-white"
          : "bg-[var(--color-background-neutral-tertiary)] text-[var(--color-text-neutral-secondary)]"
      }`}
    >
      #{children}
    </span>
  );
}
