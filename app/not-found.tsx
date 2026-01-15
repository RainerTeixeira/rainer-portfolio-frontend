'use client';

import { Button } from '@rainersoft/ui';
import { Home } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Página não encontrada</p>
        <Button asChild>
          <Link href="/"><Home className="w-4 h-4 mr-2" />Voltar ao Início</Link>
        </Button>
      </div>
    </div>
  );
}

;


