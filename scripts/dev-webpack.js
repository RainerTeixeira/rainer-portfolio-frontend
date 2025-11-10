#!/usr/bin/env node
/**
 * Script para iniciar o Next.js com webpack tradicional
 *
 * Este script força o uso do webpack ao invés do Turbopack,
 * que tem limitação conhecida com módulos locais (npm link, file: protocol)
 */

const { spawn } = require('child_process');
const path = require('path');

// Desabilita Turbopack via variável de ambiente
process.env.NEXT_PRIVATE_SKIP_TURBOPACK = '1';

// Inicia o Next.js
const next = spawn('npx', ['next', 'dev'], {
  stdio: 'inherit',
  shell: true,
  cwd: path.resolve(__dirname, '..'),
});

next.on('error', error => {
  console.error('Erro ao iniciar Next.js:', error);
  process.exit(1);
});

next.on('exit', code => {
  process.exit(code || 0);
});

// Captura Ctrl+C
process.on('SIGINT', () => {
  next.kill('SIGINT');
});

process.on('SIGTERM', () => {
  next.kill('SIGTERM');
});
