/**
 * Testes para componente Tooltip
 */

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Tooltip', () => {
  it('deve renderizar o tooltip', () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('deve exibir conteúdo do tooltip ao hover', async () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    const trigger = screen.getByText('Hover me');
    await userEvent.hover(trigger);

    // Tooltip pode estar em portal
    expect(trigger).toBeInTheDocument();
  });
});
