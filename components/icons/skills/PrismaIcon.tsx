/**
 * Prisma Icon Component
 *
 * @module components/icons/skills/PrismaIcon
 * @author Rainer Teixeira
 * @version 2.0.0
 */

export function PrismaIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className || 'w-full h-full'}
      fill="currentColor"
    >
      <path d="M21.807 18.285L13.553.756a1.324 1.324 0 0 0-1.129-.754 1.31 1.31 0 0 0-1.206.626l-8.952 14.5a1.356 1.356 0 0 0 .016 1.455l4.376 6.227a1.363 1.363 0 0 0 1.543.463l12.838-4.354a1.325 1.325 0 0 0 .828-1.436 1.336 1.336 0 0 0-.06-.198zM17.663 17.27l-7.648 2.592-3.13-4.45 5.912-9.568 4.866 11.426z" />
    </svg>
  );
}
