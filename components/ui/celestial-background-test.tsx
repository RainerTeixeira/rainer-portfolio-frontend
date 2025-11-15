/**
 * Teste simples do Celestial Background
 * Para verificar se o componente está renderizando
 */

'use client';

export function CelestialBackgroundTest() {
  return (
    <div
      className="fixed inset-0 pointer-events-none dark:opacity-100 opacity-0 transition-opacity duration-1000"
      style={{ zIndex: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      aria-hidden="true"
    >
      <div className="absolute top-10 left-10 w-20 h-20 bg-red-500 rounded-full" />
      <div className="absolute top-20 left-20 w-10 h-10 bg-blue-500 rounded-full" />
      <div className="absolute top-30 left-30 w-5 h-5 bg-green-500 rounded-full" />
    </div>
  );
}
