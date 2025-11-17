import type { Meta, StoryObj } from '@storybook/react';
import { Download, Heart, Settings } from 'lucide-react';
import { Button } from './button';

const meta = {
  title: 'UI Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de botão versátil com múltiplas variantes e tamanhos. Usa design tokens para cores, espaçamentos e tipografia.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
        'neon',
        'glass',
      ],
      description: 'Variante visual do botão',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'Tamanho do botão',
    },
    disabled: {
      control: 'boolean',
      description: 'Se o botão está desabilitado',
    },
    asChild: {
      control: 'boolean',
      description: 'Renderiza como child component (Slot)',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Botão padrão - variante mais comum
 */
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
  },
};

/**
 * Botão destrutivo - para ações perigosas
 */
export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
  },
};

/**
 * Botão outline - estilo com borda
 */
export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

/**
 * Botão secundário - estilo alternativo
 */
export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

/**
 * Botão ghost - estilo minimalista
 */
export const Ghost: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
  },
};

/**
 * Botão link - estilo de link
 */
export const Link: Story = {
  args: {
    children: 'Link Button',
    variant: 'link',
  },
};

/**
 * Botão neon - efeito neon cyberpunk
 */
export const Neon: Story = {
  args: {
    children: 'Neon Button',
    variant: 'neon',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

/**
 * Botão glass - efeito glassmorphism
 */
export const Glass: Story = {
  args: {
    children: 'Glass Button',
    variant: 'glass',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

/**
 * Botões com ícones
 */
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>
        <Download className="mr-2 h-4 w-4" />
        Download
      </Button>
      <Button variant="outline">
        <Heart className="mr-2 h-4 w-4" />
        Favorite
      </Button>
      <Button variant="ghost">
        <Settings className="mr-2 h-4 w-4" />
        Settings
      </Button>
    </div>
  ),
};

/**
 * Tamanhos disponíveis
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <Settings className="h-4 w-4" />
      </Button>
    </div>
  ),
};

/**
 * Estados do botão
 */
export const States: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>Normal</Button>
      <Button disabled>Disabled</Button>
      <Button variant="outline" disabled>
        Disabled Outline
      </Button>
    </div>
  ),
};

/**
 * Todas as variantes
 */
export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="neon">Neon</Button>
      <Button variant="glass">Glass</Button>
    </div>
  ),
};

