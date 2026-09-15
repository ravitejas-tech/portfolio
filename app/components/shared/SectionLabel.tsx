interface SectionLabelProps {
  label: string;
  number?: string;
}

export function SectionLabel({ label, number }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3 mb-8 md:mb-12">
      {number && (
        <span className="text-label text-[var(--color-accent)]">{number}</span>
      )}
      <span className="accent-line" />
      <span className="text-label text-[var(--color-text-secondary)]">
        {label}
      </span>
    </div>
  );
}
