/**
 * Testes para componente TeamCard
 */

// Mock do CSS primeiro
jest.mock('@/app/globals.css', () => ({}));

import { TeamCard } from '@/components/domain/sobre/team-card';
import { render, screen } from '@testing-library/react';

describe('TeamCard', () => {
  const mockMember = {
    name: 'Test Member',
    role: 'Developer',
    description: 'Test bio',
    skills: ['React', 'TypeScript'],
  };

  it('deve renderizar o card de membro', () => {
    render(<TeamCard {...mockMember} />);
    expect(screen.getByText('Test Member')).toBeInTheDocument();
  });

  it('deve exibir role do membro', () => {
    render(<TeamCard {...mockMember} />);
    expect(screen.getByText('Developer')).toBeInTheDocument();
  });

  it('deve exibir descrição do membro', () => {
    render(<TeamCard {...mockMember} />);
    expect(screen.getByText('Test bio')).toBeInTheDocument();
  });
});
