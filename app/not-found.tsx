'use client';

/**
 * Not Found Page Component (404 - Cyber Worlds Runner)
 *
 * Página 404 interativa com jogo de plataforma. Easter egg completo com
 * 10 mundos temáticos, sistema de progresso, estatísticas e suporte a
 * dark/light mode.
 *
 * @module app/not-found
 * @fileoverview Página 404 com jogo de plataforma interativo
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Renderizada automaticamente pelo Next.js quando rota não encontrada
 * // Acessível em qualquer URL inválida (ex: /pagina-inexistente)
 * ```
 *
 * @remarks
 * Características do jogo:
 * - 10 mundos temáticos com dificuldade progressiva
 * - Sistema de vidas, moedas e pontuação
 * - Progresso salvo em localStorage
 * - Controles por teclado (setas, WASD, espaço)
 * - Canvas 2D com animações suaves
 * - Suporte a dark/light mode
 */

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { hexToRGBA } from '@/lib/utils';
import { darkThemeColors, lightThemeColors, tokens } from '@rainersoft/design-tokens';
import {
    Crown,
    Flame,
    Gamepad2,
    Gem,
    Ghost,
    Heart,
    Home,
    Pause,
    Play,
    RotateCcw,
    Skull,
    Sparkles,
    Star,
    Trophy,
    Zap,
} from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

// Tipos
type GameObject = { x: number; y: number; width: number; height: number };
type Platform = GameObject & { color: string };
type Enemy = GameObject & { direction: number; type: string; color: string };
type Coin = GameObject & { collected: boolean };

// Mundos temáticos
const WORLDS = [
  {
    id: 1,
    name: 'Cyber City',
    theme: 'cyberpunk',
    icon: Zap,
    colors: {
      bg: 'from-purple-900 via-black to-cyan-900',
      platform: lightThemeColors.primitive.cyan[500],
      enemy: lightThemeColors.primitive.purple[500],
      coin: lightThemeColors.primitive.amber[400],
    },
    description: 'Cidade neon futurística',
    difficulty: '⭐ Fácil',
  },
  {
    id: 2,
    name: 'Mario Land',
    theme: 'mario',
    icon: Star,
    colors: {
      bg: 'from-blue-400 via-green-300 to-blue-500',
      platform: 'var(--color-status-warning)', // Brown específico do Mario (usando token)
      enemy: lightThemeColors.primitive.red[500],
      coin: lightThemeColors.primitive.amber[400],
    },
    description: 'Reino dos cogumelos',
    difficulty: '⭐ Fácil/Médio',
  },
  {
    id: 3,
    name: 'DOOM Hell',
    theme: 'doom',
    icon: Flame,
    colors: {
      bg: 'from-red-950 via-black to-orange-950',
      platform: 'var(--color-status-error)', // Dark red usando token
      enemy: lightThemeColors.primitive.red[600],
      coin: lightThemeColors.primitive.orange[500],
    },
    description: 'Inferno demoníaco',
    difficulty: '⭐⭐ Médio',
  },
  {
    id: 4,
    name: 'Contra Base',
    theme: 'contra',
    icon: Skull,
    colors: {
      bg: 'from-gray-800 via-green-900 to-gray-700',
      platform: lightThemeColors.primitive.neutral[600],
      enemy: lightThemeColors.primitive.green[500],
      coin: lightThemeColors.primitive.blue[400],
    },
    description: 'Base militar',
    difficulty: '⭐⭐ Médio/Difícil',
  },
  {
    id: 5,
    name: 'Pac-Maze',
    theme: 'pacman',
    icon: Ghost,
    colors: {
      bg: 'from-blue-900 via-black to-purple-900',
      platform: lightThemeColors.primitive.blue[800],
      enemy: lightThemeColors.primitive.pink[500],
      coin: lightThemeColors.primitive.amber[300],
    },
    description: 'Labirinto fantasma',
    difficulty: '⭐⭐⭐ Difícil',
  },
  {
    id: 6,
    name: 'Crystal Cave',
    theme: 'crystal',
    icon: Gem,
    colors: {
      bg: 'from-indigo-900 via-purple-800 to-pink-900',
      platform: lightThemeColors.primitive.purple[300],
      enemy: lightThemeColors.primitive.purple[400],
      coin: lightThemeColors.primitive.pink[300],
    },
    description: 'Caverna de cristais',
    difficulty: '⭐⭐⭐ Difícil',
  },
  {
    id: 7,
    name: 'Space Station',
    theme: 'space',
    icon: Sparkles,
    colors: {
      bg: 'from-gray-900 via-blue-950 to-black',
      platform: lightThemeColors.primitive.neutral[600],
      enemy: lightThemeColors.primitive.blue[500],
      coin: lightThemeColors.primitive.amber[400],
    },
    description: 'Estação espacial',
    difficulty: '⭐⭐⭐⭐ Muito Difícil',
  },
  {
    id: 8,
    name: 'Neon Jungle',
    theme: 'jungle',
    icon: Zap,
    colors: {
      bg: 'from-green-900 via-emerald-800 to-teal-900',
      platform: lightThemeColors.primitive.green[500],
      enemy: lightThemeColors.primitive.amber[500],
      coin: lightThemeColors.primitive.amber[400],
    },
    description: 'Selva bioluminescente',
    difficulty: '⭐⭐⭐⭐ Muito Difícil',
  },
  {
    id: 9,
    name: 'Dark Castle',
    theme: 'castle',
    icon: Crown,
    colors: {
      bg: 'from-slate-900 via-gray-900 to-stone-900',
      platform: lightThemeColors.primitive.neutral[500],
      enemy: lightThemeColors.primitive.purple[600],
      coin: lightThemeColors.primitive.amber[400],
    },
    description: 'Castelo sombrio',
    difficulty: '⭐⭐⭐⭐⭐ Extremo',
  },
  {
    id: 10,
    name: 'Digital Matrix',
    theme: 'matrix',
    icon: Zap,
    colors: {
      bg: 'from-black via-green-950 to-black',
      platform: lightThemeColors.primitive.green[500],
      enemy: lightThemeColors.primitive.red[500],
      coin: lightThemeColors.primitive.green[500],
    },
    description: 'Mundo digital',
    difficulty: '⭐⭐⭐⭐⭐ MASTER',
  },
];

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 450;
const GRAVITY = 0.6;
const JUMP_FORCE = -13;
const MOVE_SPEED = 5;
const PLAYER_SIZE = 28;

export default function NotFound() {
  /**
   * Estado de montagem do componente.
   * Previne hidratação incorreta ao acessar localStorage no servidor.
   */
  const [mounted, setMounted] = useState(false);

  /**
   * Estado do jogo.
   * Controla em qual fase o jogo está: menu, jogando, pausado ou game over.
   */
  const [gameState, setGameState] = useState<
    'menu' | 'playing' | 'paused' | 'gameover'
  >('menu');

  /**
   * Estados do jogo.
   * selectedWorld: Mundo atualmente selecionado/iniciado (1-10).
   * score: Pontuação atual do jogador.
   * highScore: Maior pontuação alcançada (salva em localStorage).
   * lives: Vidas restantes do jogador (inicia com 3).
   * coinsCollected: Moedas coletadas no mundo atual.
   * totalCoins: Total de moedas disponíveis no mundo atual.
   * worldsCompleted: Array com IDs dos mundos completados.
   * showFocusHint: Flag para exibir dica de foco no canvas.
   */
  const [selectedWorld, setSelectedWorld] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [coinsCollected, setCoinsCollected] = useState(0);
  const [totalCoins, setTotalCoins] = useState(0);
  const [worldsCompleted, setWorldsCompleted] = useState<number[]>([]);
  const [showFocusHint, setShowFocusHint] = useState(true);

  /**
   * Referências do jogo.
   * canvasRef: Referência ao elemento canvas HTML.
   * animationRef: ID do requestAnimationFrame para cancelar animação.
   * playerRef: Estado do player (posição, velocidade, pulo).
   * keysRef: Estado das teclas pressionadas (controles).
   */
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  const playerRef = useRef({
    x: 100,
    y: 0,
    velocityY: 0,
    velocityX: 0,
    isJumping: false,
  });

  const keysRef = useRef({
    left: false,
    right: false,
    up: false,
    space: false,
  });

  const platformsRef = useRef<Platform[]>([]);
  const enemiesRef = useRef<Enemy[]>([]);
  const coinsRef = useRef<Coin[]>([]);

  /**
   * Desenha ícones no canvas usando SVG paths.
   * Suporta diferentes tipos de ícones (player, inimigo, moeda) com efeito de glow opcional.
   *
   * @param ctx - Contexto 2D do canvas
   * @param iconType - Tipo de ícone a desenhar ('player', 'enemy', 'coin')
   * @param x - Posição X no canvas
   * @param y - Posição Y no canvas
   * @param size - Tamanho do ícone
   * @param color - Cor do ícone
   * @param glow - Se true, adiciona efeito de brilho ao redor do ícone
   */
  // @ts-expect-error - TypeScript não reconhece tipos DOM corretamente neste contexto
  const drawIcon = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      iconType: string,
      x: number,
      y: number,
      size: number,
      color: string,
      glow: boolean = true
    ) => {
      ctx.save();
      ctx.translate(x, y);

      if (glow) {
        ctx.shadowColor = color;
        ctx.shadowBlur = 15;
      }

      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;

      // Desenhar diferentes ícones baseados no tipo
      switch (iconType) {
        case 'player':
          // Robô/Player Cyber (estilo pixel art avançado)
          // Corpo principal
          ctx.fillRect(-size / 2, -size / 3, size, size * 0.9);
          ctx.strokeRect(-size / 2, -size / 3, size, size * 0.9);

          // Cabeça
          ctx.fillRect(-size / 3, -size / 2, size * 0.66, size / 3);
          ctx.strokeRect(-size / 3, -size / 2, size * 0.66, size / 3);

          // Antenas
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(-size / 4, -size / 2 - 5, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.moveTo(-size / 4, -size / 2);
          ctx.lineTo(-size / 4, -size / 2 - 5);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(size / 4, -size / 2 - 5, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.moveTo(size / 4, -size / 2);
          ctx.lineTo(size / 4, -size / 2 - 5);
          ctx.stroke();

          // Olhos brilhantes
          ctx.fillStyle = tokens.colors.light.text.inverse;
          ctx.shadowColor = tokens.colors.light.text.inverse;
          ctx.shadowBlur = 5;
          ctx.fillRect(-size / 4, -size / 2 + size / 6, size / 5, size / 5);
          ctx.fillRect(size / 10, -size / 2 + size / 6, size / 5, size / 5);

          // Boca (linha)
          ctx.strokeStyle = tokens.colors.light.text.inverse;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-size / 4, -size / 6);
          ctx.lineTo(size / 4, -size / 6);
          ctx.stroke();

          // Pernas/Base
          ctx.fillStyle = color;
          ctx.fillRect(-size / 3, size / 2, size / 4, size / 8);
          ctx.fillRect(size / 12, size / 2, size / 4, size / 8);
          break;

        case 'enemy-cyber':
          // Inimigo cyber (hexágono)
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const px = (Math.cos(angle) * size) / 2;
            const py = (Math.sin(angle) * size) / 2;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          break;

        case 'enemy-mario':
          // Cogumelo (círculo com bolinha)
          ctx.beginPath();
          ctx.arc(0, size / 8, size / 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = tokens.colors.light.text.inverse;
          ctx.beginPath();
          ctx.arc(-size / 4, 0, size / 6, 0, Math.PI * 2);
          ctx.arc(size / 4, 0, size / 6, 0, Math.PI * 2);
          ctx.fill();
          break;

        case 'enemy-doom':
          // Demônio (triângulo invertido com chifres)
          ctx.beginPath();
          ctx.moveTo(0, size / 2);
          ctx.lineTo(-size / 2, -size / 2);
          ctx.lineTo(size / 2, -size / 2);
          ctx.closePath();
          ctx.fill();
          // Chifres
          ctx.beginPath();
          ctx.moveTo(-size / 2, -size / 2);
          ctx.lineTo(-size / 2 - 5, -size / 2 - 8);
          ctx.moveTo(size / 2, -size / 2);
          ctx.lineTo(size / 2 + 5, -size / 2 - 8);
          ctx.stroke();
          break;

        case 'enemy-ghost':
        case 'enemy-pacman':
          // Fantasma (ondulado embaixo)
          ctx.beginPath();
          ctx.arc(0, -size / 4, size / 2, Math.PI, 0, false);
          ctx.lineTo(size / 2, size / 2);
          ctx.lineTo(size / 3, size / 3);
          ctx.lineTo(size / 6, size / 2);
          ctx.lineTo(0, size / 3);
          ctx.lineTo(-size / 6, size / 2);
          ctx.lineTo(-size / 3, size / 3);
          ctx.lineTo(-size / 2, size / 2);
          ctx.closePath();
          ctx.fill();
          // Olhos
          ctx.fillStyle = tokens.colors.light.text.inverse;
          ctx.beginPath();
          ctx.arc(-size / 6, -size / 4, size / 8, 0, Math.PI * 2);
          ctx.arc(size / 6, -size / 4, size / 8, 0, Math.PI * 2);
          ctx.fill();
          break;

        case 'enemy-contra':
          // Soldado (retângulo com capacete)
          ctx.fillRect(-size / 2, -size / 2, size, size);
          ctx.strokeRect(-size / 2, -size / 2, size, size);
          // Capacete
          ctx.beginPath();
          ctx.arc(0, -size / 2, size / 3, Math.PI, 0);
          ctx.fill();
          break;

        case 'enemy-crystal':
          // Cristal (diamante)
          ctx.beginPath();
          ctx.moveTo(0, -size / 2);
          ctx.lineTo(size / 2, 0);
          ctx.lineTo(0, size / 2);
          ctx.lineTo(-size / 2, 0);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          break;

        case 'enemy-space':
          // Alienígena (oval)
          ctx.beginPath();
          ctx.ellipse(0, 0, size / 2, size / 3, 0, 0, Math.PI * 2);
          ctx.fill();
          // Antenas
          ctx.beginPath();
          ctx.moveTo(-size / 4, -size / 3);
          ctx.lineTo(-size / 3, -size / 2);
          ctx.arc(-size / 3, -size / 2, 2, 0, Math.PI * 2);
          ctx.moveTo(size / 4, -size / 3);
          ctx.lineTo(size / 3, -size / 2);
          ctx.arc(size / 3, -size / 2, 2, 0, Math.PI * 2);
          ctx.stroke();
          break;

        case 'enemy-jungle':
          // Inseto (hexágono com asas)
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const px = (Math.cos(angle) * size) / 3;
            const py = (Math.sin(angle) * size) / 3;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.fill();
          break;

        case 'enemy-castle':
          // Morcego (triângulo com asas)
          ctx.beginPath();
          ctx.moveTo(-size / 2, 0);
          ctx.lineTo(-size / 4, -size / 3);
          ctx.lineTo(0, 0);
          ctx.lineTo(size / 4, -size / 3);
          ctx.lineTo(size / 2, 0);
          ctx.lineTo(0, size / 4);
          ctx.closePath();
          ctx.fill();
          break;

        case 'enemy-matrix':
          // Agente (quadrado com óculos)
          ctx.fillRect(-size / 2, -size / 2, size, size);
          ctx.fillStyle = tokens.colors.light.background.inverse;
          ctx.fillRect(-size / 3, -size / 4, (size / 3) * 2, size / 6);
          break;

        case 'coin':
          // Moeda (círculo com símbolo)
          ctx.beginPath();
          ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = tokens.colors.light.background.inverse;
          ctx.font = `bold ${size * 0.7}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('◆', 0, 0);
          break;

        default:
          // Círculo padrão
          ctx.beginPath();
          ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
          ctx.fill();
      }

      ctx.restore();
    },
    []
  );

  /**
   * Inicializa mundo do jogo com configurações específicas.
   * Define cores de plataformas, inimigos e moedas baseado no tema do mundo.
   *
   * @param worldId - ID do mundo a ser inicializado (1-10)
   */
  // @ts-expect-error - TypeScript não reconhece tipos DOM corretamente neste contexto
  const initWorld = useCallback((worldId: number) => {
    const world = WORLDS.find(w => w.id === worldId);
    if (!world) return;

    const platformColor = world.colors.platform;
    const enemyColor = world.colors.enemy;
    // Dificuldade baseada no ID do mundo (pode ser usado futuramente para ajustar velocidade/quantidade de inimigos)

    // Layouts únicos por mundo com dificuldade progressiva
    let platforms: Platform[] = [];
    let enemies: Enemy[] = [];
    let coinPositions: { x: number; y: number }[] = [];

    switch (worldId) {
      case 1: // Cyber City - Fácil (Escada ascendente suave)
        platforms = [
          {
            x: 0,
            y: CANVAS_HEIGHT - 40,
            width: 250,
            height: 40,
            color: platformColor,
          },
          { x: 150, y: 360, width: 150, height: 20, color: platformColor },
          { x: 350, y: 300, width: 150, height: 20, color: platformColor },
          { x: 550, y: 240, width: 150, height: 20, color: platformColor },
          { x: 350, y: 180, width: 200, height: 20, color: platformColor },
        ];
        enemies = [
          {
            x: 200,
            y: 340,
            width: 30,
            height: 30,
            direction: 1,
            type: world.theme,
            color: enemyColor,
          },
        ];
        coinPositions = [
          { x: 200, y: 330 },
          { x: 400, y: 270 },
          { x: 600, y: 210 },
          { x: 450, y: 150 },
        ];
        break;

      case 2: // Mario Land - Fácil/Médio (Pulos laterais)
        platforms = [
          {
            x: 50,
            y: CANVAS_HEIGHT - 40,
            width: 180,
            height: 40,
            color: platformColor,
          },
          {
            x: 570,
            y: CANVAS_HEIGHT - 40,
            width: 180,
            height: 40,
            color: platformColor,
          },
          { x: 100, y: 360, width: 120, height: 20, color: platformColor },
          { x: 280, y: 320, width: 100, height: 20, color: platformColor },
          { x: 430, y: 280, width: 100, height: 20, color: platformColor },
          { x: 580, y: 240, width: 120, height: 20, color: platformColor },
          { x: 250, y: 180, width: 180, height: 20, color: platformColor },
          { x: 500, y: 130, width: 150, height: 20, color: platformColor },
        ];
        enemies = [
          {
            x: 150,
            y: 340,
            width: 30,
            height: 30,
            direction: 1,
            type: world.theme,
            color: enemyColor,
          },
          {
            x: 330,
            y: 300,
            width: 30,
            height: 30,
            direction: -1,
            type: world.theme,
            color: enemyColor,
          },
        ];
        coinPositions = [
          { x: 150, y: 330 },
          { x: 320, y: 290 },
          { x: 470, y: 250 },
          { x: 630, y: 210 },
          { x: 350, y: 150 },
        ];
        break;

      case 3: // DOOM Hell - Médio (Plataformas centralizadas - abismo dos lados)
        platforms = [
          {
            x: 300,
            y: CANVAS_HEIGHT - 40,
            width: 200,
            height: 40,
            color: platformColor,
          },
          { x: 200, y: 360, width: 120, height: 18, color: platformColor },
          { x: 480, y: 360, width: 120, height: 18, color: platformColor },
          { x: 150, y: 300, width: 100, height: 18, color: platformColor },
          { x: 350, y: 280, width: 100, height: 18, color: platformColor },
          { x: 550, y: 300, width: 100, height: 18, color: platformColor },
          { x: 250, y: 220, width: 120, height: 18, color: platformColor },
          { x: 430, y: 220, width: 120, height: 18, color: platformColor },
          { x: 350, y: 140, width: 100, height: 18, color: platformColor },
        ];
        enemies = [
          {
            x: 230,
            y: 340,
            width: 30,
            height: 30,
            direction: 1,
            type: world.theme,
            color: enemyColor,
          },
          {
            x: 380,
            y: 260,
            width: 30,
            height: 30,
            direction: -1,
            type: world.theme,
            color: enemyColor,
          },
          {
            x: 280,
            y: 200,
            width: 30,
            height: 30,
            direction: 1,
            type: world.theme,
            color: enemyColor,
          },
        ];
        coinPositions = [
          { x: 250, y: 340 },
          { x: 530, y: 340 },
          { x: 180, y: 270 },
          { x: 380, y: 250 },
          { x: 380, y: 110 },
        ];
        break;

      case 4: // Contra Base - Médio/Difícil (Zigzag militar)
        platforms = [
          {
            x: 0,
            y: CANVAS_HEIGHT - 40,
            width: 150,
            height: 40,
            color: platformColor,
          },
          {
            x: 650,
            y: CANVAS_HEIGHT - 40,
            width: 150,
            height: 40,
            color: platformColor,
          },
          { x: 80, y: 360, width: 100, height: 18, color: platformColor },
          { x: 250, y: 310, width: 100, height: 18, color: platformColor },
          { x: 420, y: 260, width: 100, height: 18, color: platformColor },
          { x: 590, y: 210, width: 100, height: 18, color: platformColor },
          { x: 170, y: 160, width: 100, height: 18, color: platformColor },
          { x: 500, y: 130, width: 120, height: 18, color: platformColor },
          { x: 350, y: 80, width: 100, height: 18, color: platformColor },
        ];
        enemies = [
          {
            x: 100,
            y: 340,
            width: 30,
            height: 30,
            direction: 1,
            type: world.theme,
            color: enemyColor,
          },
          {
            x: 270,
            y: 290,
            width: 30,
            height: 30,
            direction: -1,
            type: world.theme,
            color: enemyColor,
          },
          {
            x: 440,
            y: 240,
            width: 30,
            height: 30,
            direction: 1,
            type: world.theme,
            color: enemyColor,
          },
          {
            x: 610,
            y: 190,
            width: 30,
            height: 30,
            direction: -1,
            type: world.theme,
            color: enemyColor,
          },
        ];
        coinPositions = [
          { x: 110, y: 330 },
          { x: 280, y: 280 },
          { x: 450, y: 230 },
          { x: 620, y: 180 },
          { x: 380, y: 50 },
          { x: 700, y: 380 },
        ];
        break;

      case 5: // Pac-Maze - Difícil (Labirinto - blocos alternados)
        platforms = [
          {
            x: 0,
            y: CANVAS_HEIGHT - 40,
            width: 120,
            height: 40,
            color: platformColor,
          },
          {
            x: 680,
            y: CANVAS_HEIGHT - 40,
            width: 120,
            height: 40,
            color: platformColor,
          },
          // Linha inferior
          { x: 50, y: 380, width: 70, height: 15, color: platformColor },
          { x: 180, y: 380, width: 70, height: 15, color: platformColor },
          { x: 310, y: 380, width: 70, height: 15, color: platformColor },
          { x: 440, y: 380, width: 70, height: 15, color: platformColor },
          { x: 570, y: 380, width: 70, height: 15, color: platformColor },
          // Linha média-baixa
          { x: 110, y: 320, width: 70, height: 15, color: platformColor },
          { x: 240, y: 320, width: 70, height: 15, color: platformColor },
          { x: 500, y: 320, width: 70, height: 15, color: platformColor },
          { x: 630, y: 320, width: 70, height: 15, color: platformColor },
          // Linha média
          { x: 50, y: 250, width: 70, height: 15, color: platformColor },
          { x: 310, y: 250, width: 80, height: 15, color: platformColor },
          { x: 570, y: 250, width: 70, height: 15, color: platformColor },
          // Linha alta
          { x: 180, y: 180, width: 80, height: 15, color: platformColor },
          { x: 450, y: 180, width: 80, height: 15, color: platformColor },
          // Topo
          { x: 300, y: 100, width: 120, height: 15, color: platformColor },
        ];
        // Usar cores do mundo ou cores variadas baseadas no tema
        const enemyColors = [
          enemyColor, // Cor principal do inimigo do mundo
          world.colors.enemy, // Cor do mundo (pode ser a mesma ou variar)
          world.colors.coin, // Cor da moeda como variação
        ] as const;
        enemies = [
          {
            x: 80,
            y: 360,
            width: 30,
            height: 30,
            direction: 1,
            type: world.theme,
            color: enemyColors[0] ?? enemyColor,
          },
          {
            x: 210,
            y: 360,
            width: 30,
            height: 30,
            direction: -1,
            type: world.theme,
            color: enemyColors[1] ?? enemyColor,
          },
          {
            x: 140,
            y: 300,
            width: 30,
            height: 30,
            direction: 1,
            type: world.theme,
            color: enemyColors[2] ?? enemyColor,
          },
          {
            x: 530,
            y: 300,
            width: 30,
            height: 30,
            direction: -1,
            type: world.theme,
            color: enemyColors[0] ?? enemyColor,
          },
          {
            x: 340,
            y: 230,
            width: 30,
            height: 30,
            direction: 1,
            type: world.theme,
            color: enemyColors[1] ?? enemyColor,
          },
        ];
        coinPositions = [
          { x: 85, y: 360 },
          { x: 215, y: 360 },
          { x: 345, y: 360 },
          { x: 145, y: 290 },
          { x: 345, y: 220 },
          { x: 210, y: 150 },
          { x: 350, y: 70 },
        ];
        break;

      case 6: // Crystal Cave - Difícil (Pirâmide invertida)
        platforms = [
          {
            x: 0,
            y: CANVAS_HEIGHT - 40,
            width: 120,
            height: 40,
            color: platformColor,
          },
          {
            x: 680,
            y: CANVAS_HEIGHT - 40,
            width: 120,
            height: 40,
            color: platformColor,
          },
          { x: 350, y: 370, width: 100, height: 18, color: platformColor },
          // Forma de V
          { x: 200, y: 320, width: 90, height: 18, color: platformColor },
          { x: 510, y: 320, width: 90, height: 18, color: platformColor },
          { x: 100, y: 260, width: 80, height: 18, color: platformColor },
          { x: 620, y: 260, width: 80, height: 18, color: platformColor },
          { x: 50, y: 190, width: 70, height: 18, color: platformColor },
          { x: 680, y: 190, width: 70, height: 18, color: platformColor },
          // Centro alto
          { x: 350, y: 120, width: 100, height: 18, color: platformColor },
        ];
        enemies = [
          {
            x: 380,
            y: 350,
            width: 30,
            height: 30,
            direction: 1,
            type: world.theme,
            color: enemyColor,
          },
          {
            x: 220,
            y: 300,
            width: 30,
            height: 30,
            direction: -1,
            type: world.theme,
            color: enemyColor,
          },
          {
            x: 540,
            y: 300,
            width: 30,
            height: 30,
            direction: 1,
            type: world.theme,
            color: enemyColor,
          },
          {
            x: 120,
            y: 240,
            width: 30,
            height: 30,
            direction: -1,
            type: world.theme,
            color: enemyColor,
          },
          {
            x: 640,
            y: 240,
            width: 30,
            height: 30,
            direction: 1,
            type: world.theme,
            color: enemyColor,
          },
        ];
        coinPositions = [
          { x: 380, y: 340 },
          { x: 230, y: 290 },
          { x: 550, y: 290 },
          { x: 80, y: 230 },
          { x: 700, y: 230 },
          { x: 380, y: 90 },
        ];
        break;

      case 7: // Space Station - Muito Difícil (Órbitas circulares)
        platforms = [
          {
            x: 30,
            y: CANVAS_HEIGHT - 40,
            width: 100,
            height: 40,
            color: platformColor,
          },
          {
            x: 670,
            y: CANVAS_HEIGHT - 40,
            width: 100,
            height: 40,
            color: platformColor,
          },
          // Círculo esquerdo
          { x: 80, y: 360, width: 60, height: 15, color: platformColor },
          { x: 50, y: 300, width: 60, height: 15, color: platformColor },
          { x: 80, y: 240, width: 60, height: 15, color: platformColor },
          { x: 150, y: 190, width: 60, height: 15, color: platformColor },
          // Círculo direito
          { x: 660, y: 360, width: 60, height: 15, color: platformColor },
          { x: 690, y: 300, width: 60, height: 15, color: platformColor },
          { x: 660, y: 240, width: 60, height: 15, color: platformColor },
          { x: 590, y: 190, width: 60, height: 15, color: platformColor },
          // Centro
          { x: 350, y: 280, width: 100, height: 15, color: platformColor },
          { x: 300, y: 160, width: 200, height: 15, color: platformColor },
          { x: 370, y: 80, width: 60, height: 15, color: platformColor },
        ];
        enemies = [
          {
            x: 90,
            y: 340,
            width: 30,
            height: 30,
            direction: 1,
            type: world.theme,
            color: enemyColor,
          },
          {
            x: 60,
            y: 280,
            width: 30,
            height: 30,
            direction: -1,
            type: world.theme,
            color: enemyColor,
          },
          {
            x: 670,
            y: 340,
            width: 30,
            height: 30,
            direction: 1,
            type: world.theme,
            color: enemyColor,
          },
          {
            x: 700,
            y: 280,
            width: 30,
            height: 30,
            direction: -1,
            type: world.theme,
            color: enemyColor,
          },
          {
            x: 380,
            y: 260,
            width: 30,
            height: 30,
            direction: 1,
            type: world.theme,
            color: enemyColor,
          },
          {
            x: 350,
            y: 140,
            width: 30,
            height: 30,
            direction: -1,
            type: world.theme,
            color: enemyColor,
          },
        ];
        coinPositions = [
          { x: 90, y: 330 },
          { x: 60, y: 270 },
          { x: 680, y: 330 },
          { x: 710, y: 270 },
          { x: 380, y: 250 },
          { x: 380, y: 130 },
          { x: 380, y: 50 },
          { x: 170, y: 160 },
        ];
        break;

      case 8: // Neon Jungle - Muito Difícil (Trepadeira - vertical íngreme)
        platforms = [
          {
            x: 20,
            y: CANVAS_HEIGHT - 40,
            width: 80,
            height: 40,
            color: platformColor,
          },
          {
            x: 700,
            y: CANVAS_HEIGHT - 40,
            width: 80,
            height: 40,
            color: platformColor,
          },
          // Subida esquerda íngreme
          { x: 40, y: 380, width: 55, height: 15, color: platformColor },
          { x: 70, y: 340, width: 55, height: 15, color: platformColor },
          { x: 100, y: 300, width: 55, height: 15, color: platformColor },
          { x: 130, y: 260, width: 55, height: 15, color: platformColor },
          { x: 160, y: 220, width: 55, height: 15, color: platformColor },
          { x: 190, y: 180, width: 55, height: 15, color: platformColor },
          { x: 220, y: 140, width: 55, height: 15, color: platformColor },
          { x: 250, y: 100, width: 55, height: 15, color: platformColor },
          // Plataforma alta
          { x: 350, y: 80, width: 150, height: 15, color: platformColor },
          // Descida direita
          { x: 550, y: 120, width: 55, height: 15, color: platformColor },
          { x: 640, y: 180, width: 55, height: 15, color: platformColor },
          { x: 720, y: 240, width: 60, height: 15, color: platformColor },
        ];
        enemies = [
          {
            x: 50,
            y: 360,
            width: 30,
            height: 30,
            direction: 1,
            type: world.theme,
            color: enemyColor,
          },
          {
            x: 90,
            y: 320,
            width: 30,
            height: 30,
            direction: -1,
            type: world.theme,
            color: enemyColor,
          },
          {
            x: 120,
            y: 280,
            width: 30,
            height: 30,
            direction: 1,
            type: world.theme,
            color: enemyColor,
          },
          {
            x: 150,
            y: 240,
            width: 30,
            height: 30,
            direction: -1,
            type: world.theme,
            color: enemyColor,
          },
          {
            x: 180,
            y: 200,
            width: 30,
            height: 30,
            direction: 1,
            type: world.theme,
            color: enemyColor,
          },
          {
            x: 400,
            y: 60,
            width: 30,
            height: 30,
            direction: -1,
            type: world.theme,
            color: enemyColor,
          },
          {
            x: 650,
            y: 160,
            width: 30,
            height: 30,
            direction: 1,
            type: world.theme,
            color: enemyColor,
          },
        ];
        coinPositions = [
          { x: 55, y: 360 },
          { x: 100, y: 310 },
          { x: 145, y: 270 },
          { x: 175, y: 230 },
          { x: 210, y: 190 },
          { x: 240, y: 150 },
          { x: 280, y: 80 },
          { x: 420, y: 50 },
          { x: 560, y: 90 },
        ];
        break;

      case 9: // Dark Castle - Extremo (Torres gêmeas perigosas)
        platforms = [
          {
            x: 20,
            y: CANVAS_HEIGHT - 40,
            width: 70,
            height: 40,
            color: platformColor,
          },
          {
            x: 710,
            y: CANVAS_HEIGHT - 40,
            width: 70,
            height: 40,
            color: platformColor,
          },
          // Torre esquerda
          { x: 30, y: 380, width: 45, height: 12, color: platformColor },
          { x: 35, y: 340, width: 45, height: 12, color: platformColor },
          { x: 30, y: 300, width: 45, height: 12, color: platformColor },
          { x: 35, y: 260, width: 45, height: 12, color: platformColor },
          { x: 30, y: 220, width: 45, height: 12, color: platformColor },
          { x: 35, y: 180, width: 45, height: 12, color: platformColor },
          { x: 30, y: 140, width: 45, height: 12, color: platformColor },
          { x: 35, y: 100, width: 45, height: 12, color: platformColor },
          // Torre direita
          { x: 720, y: 380, width: 45, height: 12, color: platformColor },
          { x: 715, y: 340, width: 45, height: 12, color: platformColor },
          { x: 720, y: 300, width: 45, height: 12, color: platformColor },
          { x: 715, y: 260, width: 45, height: 12, color: platformColor },
          { x: 720, y: 220, width: 45, height: 12, color: platformColor },
          { x: 715, y: 180, width: 45, height: 12, color: platformColor },
          // Pontes centrais
          { x: 300, y: 320, width: 200, height: 12, color: platformColor },
          { x: 350, y: 200, width: 100, height: 12, color: platformColor },
          { x: 320, y: 80, width: 160, height: 12, color: platformColor },
        ];
        enemies = [
          {
            x: 40,
            y: 360,
            width: 30,
            height: 30,
            direction: 1,
            type: world.theme,
            color: enemyColor,
          },
          {
            x: 35,
            y: 320,
            width: 30,
            height: 30,
            direction: -1,
            type: world.theme,
            color: enemyColor,
          },
          {
            x: 40,
            y: 280,
            width: 30,
            height: 30,
            direction: 1,
            type: world.theme,
            color: enemyColor,
          },
          {
            x: 730,
            y: 360,
            width: 30,
            height: 30,
            direction: -1,
            type: world.theme,
            color: enemyColor,
          },
          {
            x: 720,
            y: 320,
            width: 30,
            height: 30,
            direction: 1,
            type: world.theme,
            color: enemyColor,
          },
          {
            x: 350,
            y: 300,
            width: 30,
            height: 30,
            direction: -1,
            type: world.theme,
            color: enemyColor,
          },
          {
            x: 380,
            y: 180,
            width: 30,
            height: 30,
            direction: 1,
            type: world.theme,
            color: enemyColor,
          },
          {
            x: 370,
            y: 60,
            width: 30,
            height: 30,
            direction: -1,
            type: world.theme,
            color: enemyColor,
          },
        ];
        coinPositions = [
          { x: 45, y: 360 },
          { x: 40, y: 260 },
          { x: 40, y: 160 },
          { x: 735, y: 360 },
          { x: 730, y: 260 },
          { x: 380, y: 290 },
          { x: 380, y: 170 },
          { x: 380, y: 50 },
          { x: 50, y: 80 },
          { x: 740, y: 150 },
        ];
        break;

      case 10: // Digital Matrix - MASTER (Código binário - linha única insana)
        platforms = [
          {
            x: 10,
            y: CANVAS_HEIGHT - 40,
            width: 50,
            height: 40,
            color: platformColor,
          },
          {
            x: 740,
            y: CANVAS_HEIGHT - 40,
            width: 50,
            height: 40,
            color: platformColor,
          },
          // Linha única diagonal apertada
          { x: 25, y: 390, width: 35, height: 10, color: platformColor },
          { x: 90, y: 370, width: 35, height: 10, color: platformColor },
          { x: 155, y: 350, width: 35, height: 10, color: platformColor },
          { x: 220, y: 330, width: 35, height: 10, color: platformColor },
          { x: 285, y: 310, width: 35, height: 10, color: platformColor },
          { x: 350, y: 290, width: 35, height: 10, color: platformColor },
          { x: 415, y: 270, width: 35, height: 10, color: platformColor },
          { x: 480, y: 250, width: 35, height: 10, color: platformColor },
          { x: 545, y: 230, width: 35, height: 10, color: platformColor },
          { x: 610, y: 210, width: 35, height: 10, color: platformColor },
          { x: 675, y: 190, width: 35, height: 10, color: platformColor },
          { x: 740, y: 170, width: 35, height: 10, color: platformColor },
          // Plataformas laterais micro
          { x: 150, y: 200, width: 50, height: 10, color: platformColor },
          { x: 600, y: 130, width: 50, height: 10, color: platformColor },
          { x: 350, y: 100, width: 100, height: 10, color: platformColor },
          { x: 400, y: 50, width: 40, height: 10, color: platformColor },
        ];
        enemies = [
          {
            x: 30,
            y: 370,
            width: 28,
            height: 28,
            direction: 1,
            type: world.theme,
            color: enemyColor,
          },
          {
            x: 100,
            y: 350,
            width: 28,
            height: 28,
            direction: -1,
            type: world.theme,
            color: enemyColor,
          },
          {
            x: 165,
            y: 330,
            width: 28,
            height: 28,
            direction: 1,
            type: world.theme,
            color: enemyColor,
          },
          {
            x: 230,
            y: 310,
            width: 28,
            height: 28,
            direction: -1,
            type: world.theme,
            color: enemyColor,
          },
          {
            x: 295,
            y: 290,
            width: 28,
            height: 28,
            direction: 1,
            type: world.theme,
            color: enemyColor,
          },
          {
            x: 360,
            y: 270,
            width: 28,
            height: 28,
            direction: -1,
            type: world.theme,
            color: enemyColor,
          },
          {
            x: 425,
            y: 250,
            width: 28,
            height: 28,
            direction: 1,
            type: world.theme,
            color: enemyColor,
          },
          {
            x: 490,
            y: 230,
            width: 28,
            height: 28,
            direction: -1,
            type: world.theme,
            color: enemyColor,
          },
          {
            x: 555,
            y: 210,
            width: 28,
            height: 28,
            direction: 1,
            type: world.theme,
            color: enemyColor,
          },
          {
            x: 685,
            y: 170,
            width: 28,
            height: 28,
            direction: -1,
            type: world.theme,
            color: enemyColor,
          },
        ];
        coinPositions = [
          { x: 35, y: 375 },
          { x: 105, y: 355 },
          { x: 170, y: 335 },
          { x: 235, y: 315 },
          { x: 300, y: 295 },
          { x: 365, y: 275 },
          { x: 430, y: 255 },
          { x: 495, y: 235 },
          { x: 560, y: 215 },
          { x: 625, y: 195 },
          { x: 690, y: 175 },
          { x: 420, y: 25 },
        ];
        break;
    }

    platformsRef.current = platforms;
    enemiesRef.current = enemies;

    coinsRef.current = coinPositions.map((pos: { x: number; y: number }) => ({
      ...pos,
      width: 18,
      height: 18,
      collected: false,
    }));

    setTotalCoins(coinPositions.length);
    setCoinsCollected(0);

    playerRef.current = {
      x: 100,
      y: 0,
      velocityY: 0,
      velocityX: 0,
      isJumping: false,
    };
  }, []);

  /**
   * Verifica colisão entre dois objetos do jogo.
   * Usa algoritmo AABB (Axis-Aligned Bounding Box) para detecção de colisão.
   *
   * @param obj1 - Primeiro objeto (player, inimigo, moeda, etc.)
   * @param obj2 - Segundo objeto (plataforma, inimigo, moeda, etc.)
   * @returns {boolean} True se houver colisão, false caso contrário
   */
  const checkCollision = (obj1: GameObject, obj2: GameObject): boolean => {
    return (
      obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.y + obj1.height > obj2.y
    );
  };

  /**
   * Atualiza estado do jogo a cada frame.
   * Processa física, colisões, coleta de moedas e detecção de game over.
   */
  // @ts-expect-error - TypeScript não reconhece tipos DOM corretamente neste contexto
  const updateGame = useCallback(() => {
    if (gameState !== 'playing') return;

    const player = playerRef.current;

    if (keysRef.current.left) player.velocityX = -MOVE_SPEED;
    else if (keysRef.current.right) player.velocityX = MOVE_SPEED;
    else player.velocityX = 0;

    player.velocityY += GRAVITY;

    if ((keysRef.current.up || keysRef.current.space) && !player.isJumping) {
      player.velocityY = JUMP_FORCE;
      player.isJumping = true;
    }

    player.x += player.velocityX;
    player.y += player.velocityY;

    if (player.x < 0) player.x = 0;
    if (player.x > CANVAS_WIDTH - PLAYER_SIZE)
      player.x = CANVAS_WIDTH - PLAYER_SIZE;

    platformsRef.current.forEach((platform: Platform) => {
      if (
        player.y + PLAYER_SIZE >= platform.y &&
        player.y + PLAYER_SIZE <= platform.y + platform.height &&
        player.x + PLAYER_SIZE > platform.x &&
        player.x < platform.x + platform.width &&
        player.velocityY >= 0
      ) {
        player.y = platform.y - PLAYER_SIZE;
        player.velocityY = 0;
        player.isJumping = false;
      }
    });

    enemiesRef.current.forEach((enemy: Enemy) => {
      const playerObj = {
        x: player.x,
        y: player.y,
        width: PLAYER_SIZE,
        height: PLAYER_SIZE,
      };
      if (checkCollision(playerObj, enemy)) {
        setLives(prev => {
          const newLives = prev - 1;
          if (newLives <= 0) {
            setGameState('gameover');
            if (score > highScore) {
              setHighScore(score);
              localStorage.setItem('cyberworlds-highscore', String(score));
            }
          }
          return newLives;
        });
        player.x = 100;
        player.y = 0;
        player.velocityY = 0;
      }
    });

    coinsRef.current.forEach((coin: Coin) => {
      if (!coin.collected) {
        const playerObj = {
          x: player.x,
          y: player.y,
          width: PLAYER_SIZE,
          height: PLAYER_SIZE,
        };
        if (checkCollision(playerObj, coin)) {
          coin.collected = true;
          setScore(prev => prev + 100);
          setCoinsCollected(prev => {
            const newCount = prev + 1;
            if (newCount === totalCoins && selectedWorld) {
              setWorldsCompleted(prev => [
                ...new Set([...prev, selectedWorld]),
              ]);
              setTimeout(() => {
                setGameState('menu');
              }, 1000);
            }
            return newCount;
          });
        }
      }
    });

    // Atualizar posição e movimento dos inimigos
    // Velocidade aumenta progressivamente conforme o ID do mundo (dificuldade crescente)
    const enemySpeed = 1.5 + (selectedWorld || 1) * 0.3;
    enemiesRef.current.forEach((enemy: Enemy) => {
      enemy.x += enemy.direction * enemySpeed;
      if (enemy.x <= 0 || enemy.x >= CANVAS_WIDTH - enemy.width) {
        enemy.direction *= -1;
      }
    });

    if (player.y > CANVAS_HEIGHT) {
      setLives(prev => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          setGameState('gameover');
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('cyberworlds-highscore', String(score));
          }
        }
        return newLives;
      });
      player.x = 100;
      player.y = 0;
      player.velocityY = 0;
    }
  }, [gameState, score, highScore, totalCoins, selectedWorld]);

  /**
   * Renderiza frame do jogo no canvas.
   * Desenha background, plataformas, player, inimigos, moedas e UI.
   */
  // @ts-expect-error - TypeScript não reconhece tipos DOM corretamente neste contexto
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D | null;
    if (!ctx) return;

    const player = playerRef.current;
    const world = selectedWorld
      ? WORLDS.find(w => w.id === selectedWorld)
      : null;
    if (!world) return;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Background único para cada mundo
    const isDark = document.documentElement.classList.contains('dark');
    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);

    switch (world.theme) {
      case 'cyberpunk':
        gradient.addColorStop(0, isDark ? tokens.colors.dark.primitive.purple[900] : tokens.colors.light.primitive.purple[100]);
        gradient.addColorStop(0.5, isDark ? tokens.colors.dark.background.primary : tokens.colors.light.primitive.blue[100]);
        gradient.addColorStop(1, isDark ? tokens.colors.dark.primitive.cyan[900] : tokens.colors.light.primitive.cyan[200]);
        break;
      case 'mario':
        gradient.addColorStop(0, isDark ? tokens.colors.dark.primitive.blue[800] : tokens.colors.light.primitive.blue[300]);
        gradient.addColorStop(1, isDark ? tokens.colors.dark.primitive.green[700] : tokens.colors.light.primitive.green[400]);
        break;
      case 'doom':
        gradient.addColorStop(0, tokens.colors.light.primitive.red[900]);
        gradient.addColorStop(0.5, tokens.colors.light.primitive.red[800]);
        gradient.addColorStop(1, tokens.colors.light.primitive.red[800]);
        break;
      case 'contra':
        gradient.addColorStop(0, isDark ? tokens.colors.dark.surface.tertiary : tokens.colors.light.primitive.neutral[400]);
        gradient.addColorStop(1, isDark ? tokens.colors.dark.primitive.green[700] : tokens.colors.light.primitive.emerald[300]);
        break;
      case 'pacman':
        gradient.addColorStop(0, isDark ? tokens.colors.dark.primitive.blue[800] : tokens.colors.light.primitive.blue[500]);
        gradient.addColorStop(1, isDark ? tokens.colors.dark.primitive.purple[800] : tokens.colors.light.primitive.purple[300]);
        break;
      case 'crystal':
        gradient.addColorStop(0, isDark ? tokens.colors.dark.primitive.purple[800] : tokens.colors.light.primitive.purple[200]);
        gradient.addColorStop(0.5, isDark ? tokens.colors.dark.primitive.pink[800] : tokens.colors.light.primitive.purple[100]);
        gradient.addColorStop(1, isDark ? tokens.colors.dark.primitive.pink[900] : tokens.colors.light.primitive.pink[200]);
        break;
      case 'space':
        gradient.addColorStop(0, isDark ? tokens.colors.dark.background.primary : tokens.colors.light.primitive.neutral[600]);
        gradient.addColorStop(0.5, isDark ? tokens.colors.dark.primitive.blue[800] : tokens.colors.light.primitive.cyan[300]);
        gradient.addColorStop(1, isDark ? tokens.colors.dark.background.primary : tokens.colors.light.primitive.neutral[800]);
        break;
      case 'jungle':
        gradient.addColorStop(0, isDark ? tokens.colors.dark.primitive.green[700] : tokens.colors.light.primitive.emerald[300]);
        gradient.addColorStop(0.5, isDark ? tokens.colors.dark.primitive.green[800] : tokens.colors.light.primitive.emerald[200]);
        gradient.addColorStop(1, isDark ? tokens.colors.dark.primitive.green[700] : tokens.colors.light.primitive.cyan[200]);
        break;
      case 'castle':
        gradient.addColorStop(0, isDark ? tokens.colors.dark.surface.secondary : tokens.colors.light.primitive.neutral[500]);
        gradient.addColorStop(0.5, isDark ? tokens.colors.dark.surface.tertiary : tokens.colors.light.primitive.neutral[400]);
        gradient.addColorStop(1, isDark ? tokens.colors.dark.surface.primary : tokens.colors.light.primitive.neutral[600]);
        break;
      case 'matrix':
        gradient.addColorStop(0, tokens.colors.dark.background.primary);
        gradient.addColorStop(0.5, tokens.colors.dark.primitive.green[900]);
        gradient.addColorStop(1, tokens.colors.dark.background.primary);
        // Adicionar "chuva" de código - usando cor verde da biblioteca
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        // Usar hexToRGBA para converter cor da biblioteca para rgba
        ctx.fillStyle = hexToRGBA(lightThemeColors.primitive.green[500], 0.1);
        for (let i = 0; i < 20; i++) {
          const x = (i * 40) % CANVAS_WIDTH;
          const offset = (Date.now() / 50 + i * 100) % CANVAS_HEIGHT;
          ctx.fillRect(x, offset, 2, 20);
        }
        break;
      default:
        gradient.addColorStop(0, isDark ? tokens.colors.dark.background.primary : tokens.colors.light.primitive.blue[50]);
        gradient.addColorStop(1, isDark ? tokens.colors.dark.background.secondary : tokens.colors.light.primitive.blue[100]);
    }

    if (world.theme !== 'matrix') {
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    // Plataformas
    platformsRef.current.forEach((platform: Platform) => {
      ctx.fillStyle = isDark ? platform.color : platform.color;
      ctx.shadowColor = platform.color;
      ctx.shadowBlur = isDark ? 10 : 5;
      ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
      ctx.shadowBlur = 0;

      ctx.strokeStyle = isDark ? tokens.colors.dark.text.inverse : tokens.colors.light.background.inverse;
      ctx.globalAlpha = isDark ? 0.5 : 0.3;
      ctx.lineWidth = 2;
      ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
      ctx.globalAlpha = 1;
    });

    // Moedas
    coinsRef.current.forEach((coin: Coin) => {
      if (!coin.collected) {
        const pulse = Math.sin(Date.now() / 200) * 3;
        drawIcon(
          ctx,
          'coin',
          coin.x + coin.width / 2 + pulse,
          coin.y + coin.height / 2,
          coin.width + pulse * 2,
          world.colors.coin,
          true
        );
      }
    });

    // Inimigos
    enemiesRef.current.forEach((enemy: Enemy) => {
      const enemyIconType = `enemy-${enemy.type}`;
      drawIcon(
        ctx,
        enemyIconType,
        enemy.x + enemy.width / 2,
        enemy.y + enemy.height / 2,
        enemy.width,
        enemy.color,
        true
      );
    });

    // Jogador - usando cores primitivas da biblioteca
    const playerColor = isDark ? darkThemeColors.primitive.cyan[300] : lightThemeColors.primitive.cyan[500];
    drawIcon(
      ctx,
      'player',
      player.x + PLAYER_SIZE / 2,
      player.y + PLAYER_SIZE / 2,
      PLAYER_SIZE,
      playerColor,
      true
    );
  }, [selectedWorld, drawIcon]);

  /**
   * Loop principal de animação do jogo.
   * Executa updateGame e render a cada frame usando requestAnimationFrame.
   */
  useEffect(() => {
    if (gameState !== 'playing') return;

    const loop = () => {
      updateGame();
      render();
      animationRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [gameState, updateGame, render]);

  /**
   * Auto-focus no canvas quando o jogo inicia.
   * Garante que teclado funcione imediatamente após iniciar jogo.
   */
  useEffect(() => {
    if (gameState === 'playing' && canvasRef.current) {
      canvasRef.current.focus();
      canvasRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [gameState]);

  /**
   * Previne scroll da página durante o jogo.
   * Evita que scroll da página interfira nos controles do jogo.
   */
  useEffect(() => {
    if (gameState !== 'playing') return;

    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    // Prevenir scroll com teclas
    const preventKeyScroll = (e: KeyboardEvent) => {
      if (
        ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', preventKeyScroll);

    return () => {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventKeyScroll);
    };
  }, [gameState]);

  /**
   * Gerencia controles de teclado do jogo.
   * Captura eventos de teclas (setas, WASD, espaço, Escape) e atualiza estado de movimento.
   */
  useEffect(() => {
    if (gameState !== 'playing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevenir comportamento padrão de todas as teclas do jogo
      if (
        [
          'ArrowUp',
          'ArrowDown',
          'ArrowLeft',
          'ArrowRight',
          ' ',
          'w',
          'a',
          's',
          'd',
          'W',
          'A',
          'S',
          'D',
          'Escape',
        ].includes(e.key)
      ) {
        e.preventDefault();
      }

      if (e.key === 'Escape') {
        setGameState(prev => (prev === 'playing' ? 'paused' : 'playing'));
      }

      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A')
        keysRef.current.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D')
        keysRef.current.right = true;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W')
        keysRef.current.up = true;
      if (e.key === ' ') keysRef.current.space = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A')
        keysRef.current.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D')
        keysRef.current.right = false;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W')
        keysRef.current.up = false;
      if (e.key === ' ') keysRef.current.space = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  /**
   * Inicializa componente e carrega dados salvos.
   * Atualiza título da página e restaura highscore e mundos completados do localStorage.
   */
  useEffect(() => {
    setMounted(true);

    // Atualizar título da página
    document.title = '404 - Página Não Encontrada | Easter Egg';

    const saved = localStorage.getItem('cyberworlds-highscore');
    if (saved) setHighScore(parseInt(saved));
    const completed = localStorage.getItem('cyberworlds-completed');
    if (completed) setWorldsCompleted(JSON.parse(completed));
  }, []);

  /**
   * Salva mundos completados no localStorage.
   * Persiste progresso do jogador entre sessões.
   */
  useEffect(() => {
    if (worldsCompleted.length > 0) {
      localStorage.setItem(
        'cyberworlds-completed',
        JSON.stringify(worldsCompleted)
      );
    }
  }, [worldsCompleted]);

  /**
   * Inicia um mundo específico do jogo.
   * Reseta estado do jogo e inicializa mundo selecionado.
   *
   * @param worldId - ID do mundo a ser iniciado (1-10)
   */
  const startWorld = (worldId: number) => {
    setSelectedWorld(worldId);
    initWorld(worldId);
    setGameState('playing');
    setLives(3);
    setShowFocusHint(true); // Mostrar dica ao iniciar novo mundo
  };

  /**
   * Reseta jogo atual mantendo o mundo selecionado.
   * Reinicia vidas, estado e mostra dica de foco novamente.
   */
  const resetGame = () => {
    if (selectedWorld) {
      initWorld(selectedWorld);
      setLives(3);
      setGameState('playing');
      setShowFocusHint(true);
    }
  };

  /**
   * Handler de clique no canvas.
   * Garante que canvas tenha foco para capturar eventos de teclado.
   */
  const handleCanvasClick = () => {
    if (canvasRef.current && gameState === 'playing') {
      canvasRef.current.focus();
      setShowFocusHint(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-background via-background to-muted flex items-center justify-center p-4 relative overflow-hidden">
      <div className="relative z-10 w-full max-w-7xl">
        {/* Header - 404 Easter Egg */}
        <div className="text-center mb-6">
          <Badge variant="destructive" className="mb-3">
            ERRO 404
          </Badge>

          <h1 className="text-4xl sm:text-5xl font-black mb-2">
            <span className="block text-muted-foreground text-lg mb-1">
              Página Não Encontrada
            </span>
            <span className="bg-linear-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              CYBER WORLDS
            </span>
          </h1>

          <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-4">
            Mas ei! Encontramos um <strong>Easter Egg</strong> 🎮 — Complete os
            10 mundos temáticos!
          </p>

          <Button variant="outline" size="sm" asChild>
            <Link href="/">
              <Home className="h-3 w-3 mr-2" />
              Voltar ao Início
            </Link>
          </Button>
        </div>

        {/* Menu Principal */}
        {gameState === 'menu' && (
          <Tabs defaultValue="worlds" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="worlds">Mundos</TabsTrigger>
              <TabsTrigger value="stats">Estatísticas</TabsTrigger>
            </TabsList>

            <TabsContent value="worlds" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Gamepad2 className="w-5 h-5" />
                    Escolha seu Mundo
                  </CardTitle>
                  <CardDescription className="text-xs">
                    10 mundos temáticos • Colete todas as moedas para completar
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    {WORLDS.map((world: typeof WORLDS[0]) => {
                      const Icon = world.icon;
                      const isCompleted = worldsCompleted.includes(world.id);

                      // Calcular info do mundo
                      const enemyCount =
                        world.id === 10
                          ? 10
                          : world.id >= 7
                            ? 6 + world.id - 7
                            : world.id;
                      const coinCount =
                        world.id === 10
                          ? 12
                          : world.id >= 5
                            ? 5 + world.id
                            : 4 + world.id;

                      return (
                        <Card
                          key={world.id}
                          className={`cursor-pointer transition-all hover:scale-105 hover:shadow-lg ${
                            isCompleted
                              ? 'border-green-500 dark:border-green-400'
                              : ''
                          }`}
                          onClick={() => startWorld(world.id)}
                        >
                          <CardContent className="p-4 text-center">
                            <div className="flex justify-between items-start mb-2">
                              <Badge variant="secondary" className="text-xs">
                                #{world.id}
                              </Badge>
                              {isCompleted && (
                                <Trophy className="w-4 h-4 text-green-500 dark:text-green-400" />
                              )}
                            </div>
                            <Icon className="w-10 h-10 mx-auto mb-2 text-primary" />
                            <h3 className="font-bold text-sm mb-1">
                              {world.name}
                            </h3>
                            <p className="text-xs text-muted-foreground mb-1">
                              {world.description}
                            </p>
                            <Badge
                              variant="outline"
                              className="text-xs mb-2"
                            >
                              {world.difficulty}
                            </Badge>
                            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                              <span>👾 {enemyCount}</span>
                              <span>•</span>
                              <span>💰 {coinCount}</span>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stats">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Trophy className="w-5 h-5" />
                    Estatísticas
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Seu progresso no Easter Egg da página 404
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                          <div className="text-3xl font-black">{highScore}</div>
                          <div className="text-xs text-muted-foreground">
                            Recorde
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <Sparkles className="w-8 h-8 mx-auto mb-2 text-green-500" />
                          <div className="text-3xl font-black">
                            {worldsCompleted.length}/10
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Mundos Completos
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <Crown className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                          <div className="text-3xl font-black">
                            {Math.floor((worldsCompleted.length / 10) * 100)}%
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Progresso
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">
                        Progresso Geral
                      </span>
                      <span className="font-bold">
                        {worldsCompleted.length}/10
                      </span>
                    </div>
                    <Progress
                      value={(worldsCompleted.length / 10) * 100}
                      className="h-3"
                    />
                  </div>

                  {worldsCompleted.length === 10 && (
                    <Card className="border-yellow-500 bg-yellow-500/10">
                      <CardContent className="pt-6 text-center">
                        <Crown className="w-12 h-12 mx-auto mb-3 text-yellow-500" />
                        <h3 className="font-black text-xl mb-2">PARABÉNS!</h3>
                        <p className="text-sm text-muted-foreground">
                          Você completou todos os 10 mundos!
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  <Card className="border-yellow-500/30 bg-yellow-500/5">
                    <CardContent className="pt-4">
                      <div className="text-center">
                        <Sparkles className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                        <p className="text-xs font-semibold text-foreground mb-1">
                          🎁 Easter Egg 404
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Erro transformado em diversão interativa!
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {/* Tela de Jogo */}
        {(gameState === 'playing' || gameState === 'paused') &&
          selectedWorld && (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_800px_1fr] gap-4">
              {/* Painel Esquerdo */}
              <Card>
                <CardContent className="pt-4 space-y-3">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">
                      MUNDO
                    </div>
                    <Badge variant="outline" className="text-xs">
                      #{selectedWorld}
                    </Badge>
                  </div>

                  <div>
                    <div className="text-xs text-muted-foreground mb-1">
                      PONTOS
                    </div>
                    <div className="text-2xl font-black">{score}</div>
                  </div>

                  <div>
                    <div className="text-xs text-muted-foreground mb-1">
                      VIDAS
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: lives }).map((_: unknown, i: number) => (
                        <Heart
                          key={i}
                          className="w-5 h-5 fill-red-500 text-red-500"
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] mb-1">
                      <span className="text-muted-foreground">Moedas</span>
                      <span className="font-bold">
                        {coinsCollected}/{totalCoins}
                      </span>
                    </div>
                    <Progress
                      value={(coinsCollected / totalCoins) * 100}
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Canvas */}
              <Card>
                <CardContent className="p-4">
                  <div className="relative">
                    <canvas
                      ref={canvasRef}
                      width={CANVAS_WIDTH}
                      height={CANVAS_HEIGHT}
                      tabIndex={0}
                      onClick={handleCanvasClick}
                      className="w-full border-2 rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
                      style={{
                        cursor: 'none',
                      }}
                    />

                    {/* Indicador de foco - clique para ativar */}
                    {gameState === 'playing' && showFocusHint && (
                      <div
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center rounded-lg cursor-pointer"
                        onClick={handleCanvasClick}
                      >
                        <div className="bg-background border-2 border-primary rounded-lg p-6 text-center animate-pulse">
                          <Gamepad2 className="w-16 h-16 mx-auto mb-3 text-primary" />
                          <h3 className="font-bold text-xl mb-2">
                            Clique para Jogar
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            Ativa controles • Cursor invisível
                          </p>
                        </div>
                      </div>
                    )}

                    {gameState === 'playing' && !showFocusHint && (
                      <div className="absolute top-2 left-2 bg-primary/10 border border-primary/30 rounded-lg px-3 py-1 backdrop-blur-sm pointer-events-none">
                        <p className="text-xs text-primary font-mono flex items-center gap-2">
                          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                          Jogo ativo
                        </p>
                      </div>
                    )}

                    {gameState === 'paused' && (
                      <div className="absolute inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center rounded-lg">
                        <div className="text-center">
                          <Pause className="w-16 h-16 mx-auto mb-3 text-primary" />
                          <h3 className="text-2xl font-bold mb-1">PAUSADO</h3>
                          <p className="text-sm text-muted-foreground">
                            ESC para continuar
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Painel Direito */}
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <h3 className="font-bold mb-2 flex items-center gap-2 text-sm">
                      <Gamepad2 className="w-4 h-4" />
                      Controles
                    </h3>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">← →</span>
                        <span>Mover</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          ↑ / ESPAÇO
                        </span>
                        <span>Pular</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ESC</span>
                        <span>Pausar</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() =>
                      setGameState(prev =>
                        prev === 'playing' ? 'paused' : 'playing'
                      )
                    }
                  >
                    {gameState === 'paused' ? (
                      <Play className="w-4 h-4 mr-2" />
                    ) : (
                      <Pause className="w-4 h-4 mr-2" />
                    )}
                    {gameState === 'paused' ? 'Continuar' : 'Pausar'}
                  </Button>

                  <div className="space-y-2">
                    <Button
                      className="w-full"
                      variant="destructive"
                      size="sm"
                      onClick={() => setGameState('menu')}
                    >
                      Sair do Mundo
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="w-full"
                    >
                      <Link href="/">
                        <Home className="h-3 w-3 mr-1" />
                        Voltar ao Início
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

        {/* Game Over */}
        {gameState === 'gameover' && (
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6 text-center">
              <h2 className="text-3xl font-black mb-3">GAME OVER</h2>
              <div className="mb-6">
                <div className="text-sm text-muted-foreground mb-1">
                  Pontuação
                </div>
                <div className="text-4xl font-black">{score}</div>
                {score === highScore && score > 0 && (
                  <Badge variant="secondary" className="mt-2">
                    <Trophy className="w-3 h-3 mr-1" />
                    Recorde!
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                <Button onClick={resetGame} className="flex-1" size="sm">
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Tentar de Novo
                </Button>
                <Button
                  onClick={() => setGameState('menu')}
                  variant="outline"
                  className="flex-1"
                  size="sm"
                >
                  Menu
                </Button>
                <Button asChild variant="outline" className="flex-1" size="sm">
                  <Link href="/">
                    <Home className="h-3 w-3 mr-1" />
                    Início
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer Compacto */}
        {gameState === 'menu' && (
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Button variant="default" size="sm" asChild>
                <Link href="/">
                  <Home className="h-3 w-3 mr-1" />
                  Início
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/blog">Blog</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/contato">Contato</Link>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Erro 404 • Easter Egg Interativo 🎮
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        /* Grid pattern removido - fundo limpo */
      `}</style>
    </div>
  );
}
