/**
 * SubcategorySelect Component
 *
 * Dropdown para seleção de subcategorias.
 * Carrega subcategorias da API e exibe em formato dropdown acessível.
 *
 * @module components/domain/dashboard/subcategory-select
 * @author Rainer Teixeira
 */

'use client';

import * as React from 'react';
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react';

import { cn } from '@rainersoft/ui';
import { Button } from '@rainersoft/ui';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@rainersoft/ui';
import { Popover, PopoverContent, PopoverTrigger } from '@rainersoft/ui';
import { privateBlogCategories as categoriesService } from '@/lib/api';
import type { PostCategory } from '@/lib/api/types/public/blog';

interface SubcategorySelectProps {
  value?: string;
  onChange: (subcategoryId: string) => void;
  placeholder?: string;
  className?: string;
}

/**
 * Componente de seleção de subcategoria com busca e autocomplete.
 *
 * @param value - ID da subcategoria selecionada
 * @param onChange - Callback quando subcategoria é selecionada
 * @param placeholder - Texto do placeholder
 * @param className - Classes CSS adicionais
 */
export function SubcategorySelect({
  value,
  onChange,
  placeholder = 'Selecione uma subcategoria',
  className,
}: SubcategorySelectProps) {
  const [open, setOpen] = React.useState(false);
  const [subcategories, setSubcategories] = React.useState<PostCategory[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    loadSubcategories();
  }, []);

  const loadSubcategories = async () => {
    try {
      setIsLoading(true);
      const categories = await categoriesService.getCategoriesAdmin();
      setSubcategories(categories);
    } catch (error) {
      console.error('Erro ao carregar subcategorias:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedSubcategory = subcategories.find(sub => sub.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'w-full justify-between',
            !value && 'text-muted-foreground',
            className
          )}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Carregando...
            </>
          ) : selectedSubcategory ? (
            selectedSubcategory.name
          ) : (
            placeholder
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Buscar subcategoria..." />
          <CommandEmpty>Nenhuma subcategoria encontrada.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {subcategories.map(subcategory => (
              <CommandItem
                key={subcategory.id}
                value={subcategory.name}
                onSelect={() => {
                  onChange(subcategory.id);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === subcategory.id ? 'opacity-100' : 'opacity-0'
                  )}
                />
                <div className="flex-1">
                  <div className="font-medium">{subcategory.name}</div>
                  {subcategory.description && (
                    <div className="text-xs text-muted-foreground">
                      {subcategory.description}
                    </div>
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}


