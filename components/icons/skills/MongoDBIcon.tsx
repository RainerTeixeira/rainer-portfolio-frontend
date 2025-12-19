/**
 * MongoDB Icon Component
 *
 * @module components/icons/skills/MongoDBIcon
 * @author Rainer Teixeira
 * @version 2.0.0
 */

export function MongoDBIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className || 'w-full h-full'}
      fill="currentColor"
    >
      <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296 4.604-3.254 4.293-11.375zM12 19.3s-.571-5.359.142-8.566c.713-3.207 2.061-4.906 2.061-4.906s.429 1.027.572 3.329c.142 2.302-.857 6.93-2.775 10.143z" />
    </svg>
  );
}


