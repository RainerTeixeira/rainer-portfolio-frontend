/**
 * Profile Header Component
 *
 * Cabeçalho de perfil do dashboard com foto de perfil, informações do usuário
 * (nome, email, role) e opções de edição. Suporta upload de avatar, modal de
 * edição de perfil e integração com sistema de autenticação.
 *
 * @module components/dashboard/profile-header
 * @fileoverview Cabeçalho de perfil do dashboard com design premium
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * <ProfileHeader onAvatarChange={(file) => handleAvatarUpload(file)} />
 * ```
 *
 * Características:
 * - Avatar editável com upload de imagem
 * - Informações do usuário (nome, email, role)
 * - Modal de edição de perfil
 * - Gradientes adaptativos (light/dark mode)
 * - Animações suaves com Framer Motion
 * - Integração com sistema de autenticação
 */

'use client';

import { useAuth } from '@/components/providers/auth-provider';
import { Avatar, AvatarFallback, AvatarImage } from '@rainersoft/ui';
import { Badge } from '@rainersoft/ui';
import { Button } from '@rainersoft/ui';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@rainersoft/ui';
import { Input } from '@rainersoft/ui';
import { Label } from '@rainersoft/ui';
import { Textarea } from '@rainersoft/ui';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Calendar, Camera, Edit2, Mail, Shield } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface ProfileHeaderProps {
  onAvatarChange?: (file: File) => void;
}

export function ProfileHeader({ onAvatarChange }: ProfileHeaderProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { user } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Determina se o tema atual é dark mode
   * Só retorna true após montagem para evitar hydration mismatch
   */
  const isDark = mounted ? resolvedTheme === 'dark' : false;
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
  });

  // Simular upload de avatar
  const handleAvatarClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file && onAvatarChange) {
        onAvatarChange(file);
      }
    };
    input.click();
  };

  const handleSaveProfile = () => {
    // TODO: Salvar dados do perfil
    console.log('Salvando perfil:', editData);
    setIsEditModalOpen(false);
  };

  // Iniciais do usuário para o avatar
  const initials =
    user?.name
      ?.split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'AD';

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`${isDark ? 'bg-linear-to-r from-cyan-500 via-blue-600 to-purple-700' : 'bg-linear-to-r from-blue-500 via-purple-600 to-pink-600'} rounded-lg p-8 text-white relative overflow-hidden shadow-xl ${isDark ? 'shadow-cyan-500/20' : 'shadow-blue-500/20'}`}
      >
        {/* Pattern de fundo */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Avatar */}
          <div className="relative group">
            <Avatar className="w-24 h-24 border-4 border-white/20">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="text-2xl font-bold bg-linear-to-br from-cyan-400 to-purple-500">
                {initials}
              </AvatarFallback>
            </Avatar>

            {/* Botão de upload de foto */}
            <button
              onClick={handleAvatarClick}
              className={cn(
                'absolute inset-0 rounded-full bg-black/50 backdrop-blur-sm',
                'flex items-center justify-center',
                'opacity-0 group-hover:opacity-100',
                'transition-opacity cursor-pointer'
              )}
              title="Trocar foto"
            >
              <Camera className="w-6 h-6" />
            </button>
          </div>

          {/* Informações do Usuário */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{user?.name || 'Usuário'}</h1>
              <Badge
                variant="secondary"
                className="bg-white/20 text-white border-white/30"
              >
                <Shield className="w-3 h-3 mr-1" />
                Admin
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {user?.email || 'admin@rainersoft.com'}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Membro desde Janeiro 2025
              </div>
            </div>

            {user?.bio && (
              <p className="mt-3 text-white/80 max-w-2xl">{user.bio}</p>
            )}
          </div>

          {/* Botão de Editar */}
          <Button
            onClick={() => setIsEditModalOpen(true)}
            variant="secondary"
            className="gap-2 bg-white/20 hover:bg-white/30 text-white border-white/30"
          >
            <Edit2 className="w-4 h-4" />
            Editar Perfil
          </Button>
        </div>
      </motion.div>

      {/* Modal de Edição */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Perfil</DialogTitle>
            <DialogDescription>
              Atualize suas informações pessoais
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nome Completo</Label>
              <Input
                id="edit-name"
                value={editData.name}
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement>,
                ) =>
                  setEditData({ ...editData, name: e.target.value })}
                placeholder="Seu nome completo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={editData.email}
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement>,
                ) =>
                  setEditData({ ...editData, email: e.target.value })}
                placeholder="seu@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-bio">Bio</Label>
              <Textarea
                id="edit-bio"
                value={editData.bio}
                onChange={(
                  e: React.ChangeEvent<HTMLTextAreaElement>,
                ) =>
                  setEditData({ ...editData, bio: e.target.value })}
                placeholder="Conte um pouco sobre você..."
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleSaveProfile}
              className="dark:bg-cyan-600 dark:hover:bg-cyan-700"
            >
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
