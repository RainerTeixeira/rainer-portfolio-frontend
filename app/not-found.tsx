'use client';

/**
 * Página 404 Interativa - Cyber Worlds Runner
 * 
 * Easter egg completo com jogo de plataforma que aparece quando uma página não é encontrada.
 * 
 * Características:
 * - 10 mundos temáticos com dificuldade progressiva
 * - Sistema de vidas, moedas e pontuação
 * - Progresso salvo em localStorage
 * - Controles por teclado (setas, WASD, espaço)
 * - Canvas 2D com animações suaves
 * - Suporte a dark/light mode
 * 
 * @module app/not-found
 * @author Rainer Teixeira
 * @version 2.0.1
 * 
 */

import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Progress, Tabs, TabsContent, TabsList, TabsTrigger } from '@rainersoft/ui';
import { darkTheme, lightTheme, tokens } from '@rainersoft/design-tokens';
import { Crown, Flame, Gamepad2, Gem, Ghost, Heart, Home, Pause, Play, RotateCcw, Skull, Sparkles, Star, Trophy, Zap } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

// Tipos do jogo
type GameObject = { x: number; y: number; width: number; height: number };
type Platform = GameObject & { color: string };
type Enemy = GameObject & { direction: number; type: string; color: string };
type Coin = GameObject & { collected: boolean };

// Configurações do jogo
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 450;
const GRAVITY = 0.6;
const JUMP_FORCE = -13;
const MOVE_SPEED = 5;
const PLAYER_SIZE = 28;

// Mundos temáticos do jogo - Usando cores dos design tokens
const WORLDS = [
  {
    id: 1, name: 'Cyber City', theme: 'cyberpunk', icon: Zap,
    colors: { bg: 'from-purple-900 via-black to-cyan-900', platform: tokens.primitives.color.cyan[500], enemy: tokens.primitives.color.purple[500], coin: tokens.primitives.color.yellow[400] },
    description: 'Cidade neon futurística', difficulty: '⭐ Fácil'
  },
  {
    id: 2, name: 'Mario Land', theme: 'mario', icon: Star,
    colors: { bg: 'from-blue-400 via-green-300 to-blue-500', platform: tokens.primitives.color.orange[800], enemy: tokens.primitives.color.red[500], coin: tokens.primitives.color.yellow[400] },
    description: 'Reino dos cogumelos', difficulty: '⭐ Fácil/Médio'
  },
  {
    id: 3, name: 'DOOM Hell', theme: 'doom', icon: Flame,
    colors: { bg: 'from-red-950 via-black to-orange-950', platform: tokens.primitives.color.red[900], enemy: tokens.primitives.color.red[600], coin: tokens.primitives.color.orange[500] },
    description: 'Inferno demoníaco', difficulty: '⭐⭐ Médio'
  },
  {
    id: 4, name: 'Contra Base', theme: 'contra', icon: Skull,
    colors: { bg: 'from-gray-800 via-green-900 to-gray-700', platform: tokens.primitives.color.gray[600], enemy: tokens.primitives.color.green[500], coin: tokens.primitives.color.blue[400] },
    description: 'Base militar', difficulty: '⭐⭐ Médio/Difícil'
  },
  {
    id: 5, name: 'Pac-Maze', theme: 'pacman', icon: Ghost,
    colors: { bg: 'from-blue-900 via-black to-purple-900', platform: tokens.primitives.color.blue[800], enemy: tokens.primitives.color.pink[500], coin: tokens.primitives.color.yellow[300] },
    description: 'Labirinto fantasma', difficulty: '⭐⭐⭐ Difícil'
  },
  {
    id: 6, name: 'Crystal Cave', theme: 'crystal', icon: Gem,
    colors: { bg: 'from-indigo-900 via-purple-800 to-pink-900', platform: tokens.primitives.color.purple[300], enemy: tokens.primitives.color.purple[400], coin: tokens.primitives.color.pink[400] },
    description: 'Caverna de cristais', difficulty: '⭐⭐⭐ Difícil'
  },
  {
    id: 7, name: 'Space Station', theme: 'space', icon: Sparkles,
    colors: { bg: 'from-gray-900 via-blue-950 to-black', platform: tokens.primitives.color.gray[600], enemy: tokens.primitives.color.blue[500], coin: tokens.primitives.color.yellow[400] },
    description: 'Estação espacial', difficulty: '⭐⭐⭐⭐ Muito Difícil'
  },
  {
    id: 8, name: 'Neon Jungle', theme: 'jungle', icon: Zap,
    colors: { bg: 'from-green-900 via-emerald-800 to-teal-900', platform: tokens.primitives.color.green[500], enemy: tokens.primitives.color.orange[500], coin: tokens.primitives.color.yellow[400] },
    description: 'Selva bioluminescente', difficulty: '⭐⭐⭐⭐ Muito Difícil'
  },
  {
    id: 9, name: 'Dark Castle', theme: 'castle', icon: Crown,
    colors: { bg: 'from-slate-900 via-gray-900 to-stone-900', platform: tokens.primitives.color.gray[500], enemy: tokens.primitives.color.purple[600], coin: tokens.primitives.color.yellow[400] },
    description: 'Castelo sombrio', difficulty: '⭐⭐⭐⭐⭐ Extremo'
  },
  {
    id: 10, name: 'Digital Matrix', theme: 'matrix', icon: Zap,
    colors: { bg: 'from-black via-green-950 to-black', platform: tokens.primitives.color.green[500], enemy: tokens.primitives.color.red[500], coin: tokens.primitives.color.green[500] },
    description: 'Mundo digital', difficulty: '⭐⭐⭐⭐⭐ MASTER'
  },
];

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'gameover'>('menu');
  const [selectedWorld, setSelectedWorld] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [coinsCollected, setCoinsCollected] = useState(0);
  const [totalCoins, setTotalCoins] = useState(0);
  const [worldsCompleted, setWorldsCompleted] = useState<number[]>([]);
  const [showFocusHint, setShowFocusHint] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  const playerRef = useRef({
    x: 100, y: 0, velocityY: 0, velocityX: 0, isJumping: false
  });

  const keysRef = useRef({
    left: false, right: false, up: false, space: false
  });

  const platformsRef = useRef<Platform[]>([]);
  const enemiesRef = useRef<Enemy[]>([]);
  const coinsRef = useRef<Coin[]>([]);

  /**
   * Desenha ícones no canvas com efeitos visuais
   */
  const drawIcon = useCallback((
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

    switch (iconType) {
      case 'player':
        ctx.fillRect(-size / 2, -size / 3, size, size * 0.9);
        ctx.strokeRect(-size / 2, -size / 3, size, size * 0.9);
        ctx.fillRect(-size / 3, -size / 2, size * 0.66, size / 3);
        ctx.strokeRect(-size / 3, -size / 2, size * 0.66, size / 3);
        break;
      case 'coin':
        ctx.beginPath();
        ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${size * 0.7}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('◆', 0, 0);
        break;
      default:
        ctx.beginPath();
        ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.restore();
  }, []);

  /**
   * Inicializa um mundo específico do jogo
   */
  const initWorld = useCallback((worldId: number) => {
    const world = WORLDS.find(w => w.id === worldId);
    if (!world) return;

    const platforms: Platform[] = [];
    const enemies: Enemy[] = [];
    const coinPositions: { x: number; y: number }[] = [];

    // Configuração básica para todos os mundos
    platforms.push({
      x: 0, y: CANVAS_HEIGHT - 40, width: 250, height: 40, color: world.colors.platform
    });
    platforms.push({ x: 150, y: 360, width: 150, height: 20, color: world.colors.platform });
    platforms.push({ x: 350, y: 300, width: 150, height: 20, color: world.colors.platform });

    enemies.push({
      x: 200, y: 340, width: 30, height: 30, direction: 1,
      type: world.theme, color: world.colors.enemy
    });

    coinPositions.push(
      { x: 200, y: 330 },
      { x: 400, y: 270 },
      { x: 600, y: 210 }
    );

    platformsRef.current = platforms;
    enemiesRef.current = enemies;
    coinsRef.current = coinPositions.map(pos => ({
      ...pos, width: 18, height: 18, collected: false
    }));

    setTotalCoins(coinPositions.length);
    setCoinsCollected(0);
    playerRef.current = { x: 100, y: 0, velocityY: 0, velocityX: 0, isJumping: false };
  }, []);

  /**
   * Verifica colisão entre dois objetos
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
   * Atualiza a lógica do jogo a cada frame
   */
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
    if (player.x > CANVAS_WIDTH - PLAYER_SIZE) player.x = CANVAS_WIDTH - PLAYER_SIZE;

    // Colisão com plataformas
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

    // Colisão com inimigos
    enemiesRef.current.forEach((enemy: Enemy) => {
      const playerObj = { x: player.x, y: player.y, width: PLAYER_SIZE, height: PLAYER_SIZE };
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

    // Coleta de moedas
    coinsRef.current.forEach((coin: Coin) => {
      if (!coin.collected) {
        const playerObj = { x: player.x, y: player.y, width: PLAYER_SIZE, height: PLAYER_SIZE };
        if (checkCollision(playerObj, coin)) {
          coin.collected = true;
          setScore(prev => prev + 100);
          setCoinsCollected(prev => {
            const newCount = prev + 1;
            if (newCount === totalCoins && selectedWorld) {
              setWorldsCompleted(prev => [...new Set([...prev, selectedWorld])]);
              setTimeout(() => setGameState('menu'), 1000);
            }
            return newCount;
          });
        }
      }
    });

    // Movimento dos inimigos
    const enemySpeed = 1.5 + (selectedWorld || 1) * 0.3;
    enemiesRef.current.forEach((enemy: Enemy) => {
      enemy.x += enemy.direction * enemySpeed;
      if (enemy.x <= 0 || enemy.x >= CANVAS_WIDTH - enemy.width) {
        enemy.direction *= -1;
      }
    });

    // Queda no vazio
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
   * Renderiza o frame do jogo no canvas
   */
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const player = playerRef.current;
    const world = selectedWorld ? WORLDS.find(w => w.id === selectedWorld) : null;
    if (!world) return;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Background
    const isDark = document.documentElement.classList.contains('dark');
    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    gradient.addColorStop(0, isDark ? '#000000' : '#f0f9ff');
    gradient.addColorStop(1, isDark ? '#111827' : '#dbeafe');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Plataformas
    platformsRef.current.forEach((platform: Platform) => {
      ctx.fillStyle = platform.color;
      ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });

    // Moedas
    coinsRef.current.forEach((coin: Coin) => {
      if (!coin.collected) {
        const pulse = Math.sin(Date.now() / 200) * 3;
        drawIcon(
          ctx, 'coin',
          coin.x + coin.width / 2 + pulse,
          coin.y + coin.height / 2,
          coin.width + pulse * 2,
          world.colors.coin, true
        );
      }
    });

    // Inimigos
    enemiesRef.current.forEach((enemy: Enemy) => {
      drawIcon(
        ctx, 'enemy',
        enemy.x + enemy.width / 2,
        enemy.y + enemy.height / 2,
        enemy.width,
        enemy.color, true
      );
    });

    // Jogador - usando token de cor cyan
    const playerColor = tokens.primitives.color.cyan[500];
    drawIcon(
      ctx, 'player',
      player.x + PLAYER_SIZE / 2,
      player.y + PLAYER_SIZE / 2,
      PLAYER_SIZE,
      playerColor, true
    );
  }, [selectedWorld, drawIcon]);

  // Loop de animação
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

  // Controles do teclado
  useEffect(() => {
    if (gameState !== 'playing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === 'Escape') {
        setGameState(prev => prev === 'playing' ? 'paused' : 'playing');
      }

      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keysRef.current.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keysRef.current.right = true;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') keysRef.current.up = true;
      if (e.key === ' ') keysRef.current.space = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keysRef.current.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keysRef.current.right = false;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') keysRef.current.up = false;
      if (e.key === ' ') keysRef.current.space = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  // Inicialização
  useEffect(() => {
    setMounted(true);
    document.title = '404 - Página Não Encontrada | Easter Egg';

    const saved = localStorage.getItem('cyberworlds-highscore');
    if (saved) setHighScore(parseInt(saved));
    const completed = localStorage.getItem('cyberworlds-completed');
    if (completed) setWorldsCompleted(JSON.parse(completed));
  }, []);

  // Salvar progresso
  useEffect(() => {
    if (worldsCompleted.length > 0) {
      localStorage.setItem('cyberworlds-completed', JSON.stringify(worldsCompleted));
    }
  }, [worldsCompleted]);

  /**
   * Inicia um mundo do jogo
   */
  const startWorld = (worldId: number) => {
    setSelectedWorld(worldId);
    initWorld(worldId);
    setGameState('playing');
    setLives(3);
    setShowFocusHint(true);
  };

  /**
   * Reinicia o jogo atual
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
   * Handler de clique no canvas
   */
  const handleCanvasClick = () => {
    if (canvasRef.current && gameState === 'playing') {
      canvasRef.current.focus();
      setShowFocusHint(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-background via-background to-muted flex items-center justify-center p-4">
      <div className="relative z-10 w-full max-w-7xl">
        {/* Header */}
        <div className="text-center mb-6">
          <Badge variant="destructive" className="mb-3">ERRO 404</Badge>
          <h1 className="text-4xl sm:text-5xl font-black mb-2">
            <span className="block text-muted-foreground text-lg mb-1">Página Não Encontrada</span>
            <span className="bg-linear-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              CYBER WORLDS
            </span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-4">
            Mas ei! Encontramos um <strong>Easter Egg</strong> 🎮 — Complete os 10 mundos temáticos!
          </p>
          <Button variant="outline" size="sm" className="gap-2" asChild>
            <Link href="/"><Home className="h-3 w-3 mr-2" />Voltar ao Início</Link>
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
                    <Gamepad2 className="w-5 h-5" /> Escolha seu Mundo
                  </CardTitle>
                  <CardDescription className="text-xs">
                    10 mundos temáticos • Colete todas as moedas para completar
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    {WORLDS.map((world) => {
                      const Icon = world.icon;
                      const isCompleted = worldsCompleted.includes(world.id);
                      return (
                        <Card key={world.id} className={`cursor-pointer transition-all hover:scale-105 hover:shadow-lg ${isCompleted ? 'border-green-500 dark:border-green-400' : ''}`}
                          onClick={() => startWorld(world.id)}>
                          <CardContent className="p-4 text-center">
                            <div className="flex justify-between items-start mb-2">
                              <Badge variant="secondary" className="text-xs">#{world.id}</Badge>
                              {isCompleted && <Trophy className="w-4 h-4 text-green-500 dark:text-green-400" />}
                            </div>
                            <Icon className="w-10 h-10 mx-auto mb-2 text-primary" />
                            <h3 className="font-bold text-sm mb-1">{world.name}</h3>
                            <p className="text-xs text-muted-foreground mb-1">{world.description}</p>
                            <Badge variant="outline" className="text-xs mb-2">{world.difficulty}</Badge>
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
                    <Trophy className="w-5 h-5" /> Estatísticas
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Seu progresso no Easter Egg da página 404
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card><CardContent className="pt-6">
                      <div className="text-center"><Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                        <div className="text-3xl font-black">{highScore}</div>
                        <div className="text-xs text-muted-foreground">Recorde</div>
                      </div>
                    </CardContent></Card>
                    <Card><CardContent className="pt-6">
                      <div className="text-center"><Sparkles className="w-8 h-8 mx-auto mb-2 text-green-500" />
                        <div className="text-3xl font-black">{worldsCompleted.length}/10</div>
                        <div className="text-xs text-muted-foreground">Mundos Completos</div>
                      </div>
                    </CardContent></Card>
                    <Card><CardContent className="pt-6">
                      <div className="text-center"><Crown className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                        <div className="text-3xl font-black">{Math.floor((worldsCompleted.length / 10) * 100)}%</div>
                        <div className="text-xs text-muted-foreground">Progresso</div>
                      </div>
                    </CardContent></Card>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progresso Geral</span>
                      <span className="font-bold">{worldsCompleted.length}/10</span>
                    </div>
                    <Progress value={(worldsCompleted.length / 10) * 100} className="h-3" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {/* Tela de Jogo */}
        {(gameState === 'playing' || gameState === 'paused') && selectedWorld && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_800px_1fr] gap-4">
            {/* Painel Esquerdo */}
            <Card><CardContent className="pt-4 space-y-3">
              <div><div className="text-xs text-muted-foreground mb-1">MUNDO</div>
                <Badge variant="outline" className="text-xs">#{selectedWorld}</Badge></div>
              <div><div className="text-xs text-muted-foreground mb-1">PONTOS</div>
                <div className="text-2xl font-black">{score}</div></div>
              <div><div className="text-xs text-muted-foreground mb-1">VIDAS</div>
                <div className="flex gap-1">
                  {Array.from({ length: lives }).map((_, i) => (
                    <Heart key={i} className="w-5 h-5 fill-red-500 text-red-500" />
                  ))}
                </div></div>
              <div>
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-muted-foreground">Moedas</span>
                  <span className="font-bold">{coinsCollected}/{totalCoins}</span>
                </div>
                <Progress value={(coinsCollected / totalCoins) * 100} className="h-2" />
              </div>
            </CardContent></Card>

            {/* Canvas */}
            <Card><CardContent className="p-4">
              <div className="relative">
                <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} tabIndex={0}
                  onClick={handleCanvasClick}
                  className="w-full border-2 rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
                  style={{ cursor: 'none' }} />

                {gameState === 'playing' && showFocusHint && (
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center rounded-lg cursor-pointer"
                    onClick={handleCanvasClick}>
                    <div className="bg-background border-2 border-primary rounded-lg p-6 text-center animate-pulse">
                      <Gamepad2 className="w-16 h-16 mx-auto mb-3 text-primary" />
                      <h3 className="font-bold text-xl mb-2">Clique para Jogar</h3>
                      <p className="text-xs text-muted-foreground">Ativa controles • Cursor invisível</p>
                    </div>
                  </div>
                )}

                {gameState === 'paused' && (
                  <div className="absolute inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center rounded-lg">
                    <div className="text-center">
                      <Pause className="w-16 h-16 mx-auto mb-3 text-primary" />
                      <h3 className="text-2xl font-bold mb-1">PAUSADO</h3>
                      <p className="text-sm text-muted-foreground">ESC para continuar</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent></Card>

            {/* Painel Direito */}
            <Card><CardContent className="pt-6 space-y-4">
              <div><h3 className="font-bold mb-2 flex items-center gap-2 text-sm">
                  <Gamepad2 className="w-4 h-4" /> Controles</h3>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between"><span className="text-muted-foreground">← →</span><span>Mover</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">↑ / ESPAÇO</span><span>Pular</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">ESC</span><span>Pausar</span></div>
                </div>
              </div>

              <Button className="w-full" variant="outline" size="lg"
                onClick={() => setGameState(prev => prev === 'playing' ? 'paused' : 'playing')}>
                {gameState === 'paused' ? <Play className="w-4 h-4 mr-2" /> : <Pause className="w-4 h-4 mr-2" />}
                {gameState === 'paused' ? 'Continuar' : 'Pausar'}
              </Button>

              <div className="space-y-2">
                <Button className="w-full" variant="destructive" size="sm" onClick={() => setGameState('menu')}>
                  Sair do Mundo
                </Button>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link href="/"><Home className="h-3 w-3 mr-1" />Voltar ao Início</Link>
                </Button>
              </div>
            </CardContent></Card>
          </div>
        )}

        {/* Game Over */}
        {gameState === 'gameover' && (
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6 text-center">
              <h2 className="text-3xl font-black mb-3">GAME OVER</h2>
              <div className="mb-6">
                <div className="text-sm text-muted-foreground mb-1">Pontuação</div>
                <div className="text-4xl font-black">{score}</div>
                {score === highScore && score > 0 && (
                  <Badge variant="secondary" className="mt-2"><Trophy className="w-3 h-3 mr-1" />Recorde!</Badge>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="default" size="lg" onClick={resetGame} className="flex-1">
                  <RotateCcw className="w-4 h-4 mr-1" />Tentar de Novo
                </Button>
                <Button onClick={() => setGameState('menu')} variant="outline" className="flex-1" size="sm">
                  Menu
                </Button>
                <Button asChild variant="outline" className="flex-1" size="sm">
                  <Link href="/"><Home className="h-3 w-3 mr-1" />Início</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        {gameState === 'menu' && (
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">Erro 404 • Easter Egg Interativo 🎮</p>
          </div>
        )}
      </div>
    </div>
  );
}