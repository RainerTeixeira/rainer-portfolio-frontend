/**
 * Testes para componente TeamCard
 */

import { TeamCard } from '@/components/sobre/team-card';
import { render, screen } from '@testing-library/react';

describe('TeamCard', () => {
  const mockMember = {
    fullName: 'Test Member',
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
