/**
 * Hook para avaliar força de senha
 * Calcula pontuação baseada em critérios de segurança
 */
import { useState, useEffect } from 'react';

export interface PasswordStrengthResult {
  score: number; // 0-100
  label: string;
  color: string;
  feedback: string[];
}

export function usePasswordStrength(password: string) {
  const [strength, setStrength] = useState<PasswordStrengthResult>({
    score: 0,
    label: 'Vazia',
    color: 'bg-gray-300',
    feedback: []
  });

  useEffect(() => {
    if (!password) {
      setStrength({
        score: 0,
        label: 'Vazia',
        color: 'bg-gray-300',
        feedback: []
      });
      return;
    }

    let score = 0;
    const feedback: string[] = [];

    // Comprimento mínimo
    if (password.length >= 8) {
      score += 25;
    } else {
      feedback.push('Mínimo de 8 caracteres');
    }

    // Letras minúsculas
    if (/[a-z]/.test(password)) {
      score += 15;
    } else {
      feedback.push('Inclua letras minúsculas');
    }

    // Letras maiúsculas
    if (/[A-Z]/.test(password)) {
      score += 15;
    } else {
      feedback.push('Inclua letras maiúsculas');
    }

    // Números
    if (/\d/.test(password)) {
      score += 15;
    } else {
      feedback.push('Inclua números');
    }

    // Caracteres especiais
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      score += 20;
    } else {
      feedback.push('Inclua caracteres especiais');
    }

    // Bônus para senhas longas
    if (password.length >= 12) {
      score += 10;
    }

    // Determinar label e cor
    let label: string;
    let color: string;

    if (score < 30) {
      label = 'Muito Fraca';
      color = 'bg-red-500';
    } else if (score < 50) {
      label = 'Fraca';
      color = 'bg-orange-500';
    } else if (score < 70) {
      label = 'Média';
      color = 'bg-yellow-500';
    } else if (score < 90) {
      label = 'Forte';
      color = 'bg-green-500';
    } else {
      label = 'Muito Forte';
      color = 'bg-emerald-500';
    }

    setStrength({
      score: Math.min(score, 100),
      label,
      color,
      feedback
    });
  }, [password]);

  return strength;
}
