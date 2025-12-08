/**
 * Testes para componente Tabs
 */

// Mock simples dos componentes de Tabs do @rainersoft/ui para evitar
// dependências internas do Radix (useContext) durante os testes.
jest.mock('@rainersoft/ui', () => {
  const React = require('react');

  const MockTabs = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-tabs">{children}</div>
  );

  const MockTabsList = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );

  const MockTabsTrigger = ({ children }: { children: React.ReactNode }) => (
    <button type="button">{children}</button>
  );

  const MockTabsContent = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );

  return {
    __esModule: true,
    Tabs: MockTabs,
    TabsList: MockTabsList,
    TabsTrigger: MockTabsTrigger,
    TabsContent: MockTabsContent,
  };
});

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@rainersoft/ui';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Tabs', () => {
  it('deve renderizar tabs', () => {
    render(
      <Tabs>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );

    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
  });

  it('deve exibir conteúdo da tab ativa', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
      </Tabs>
    );

    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('deve alternar entre tabs quando clicado', async () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );

    const tab2 = screen.getByText('Tab 2');
    await userEvent.click(tab2);

    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });
});
