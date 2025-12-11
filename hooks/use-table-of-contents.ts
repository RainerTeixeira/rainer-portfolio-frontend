/**
 * Hook para gerenciar tabela de conteúdos
 * Extrai headings do conteúdo e gera navegação
 */
import { useEffect, useState } from 'react';
import { scrollToElement } from '@rainersoft/utils';

export interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

export function useTableOfContents(content: string | HTMLElement | null) {
  const [items, setItems] = useState<TableOfContentsItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!content) return;

    let headings: HTMLHeadingElement[];

    if (typeof content === 'string') {
      // Se for string, criar um elemento temporário
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      headings = Array.from(tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    } else {
      // Se for HTMLElement, usar diretamente
      headings = Array.from(content.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    }

    const tocItems: TableOfContentsItem[] = headings.map(heading => {
      const id = heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || '';
      
      // Adicionar ID ao heading se não tiver
      if (!heading.id && typeof content !== 'string') {
        heading.id = id;
      }

      return {
        id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName.charAt(1))
      };
    });

    setItems(tocItems);
  }, [content]);

  useEffect(() => {
    const handleScroll = () => {
      const activeHeading = items.find(item => {
        const element = document.getElementById(item.id);
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom > 100;
      });

      if (activeHeading) {
        setActiveId(activeHeading.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  const scrollToItem = (id: string) => {
    scrollToElement(id, { offset: -80 });
  };

  return {
    items,
    activeId,
    scrollToItem
  };
}
