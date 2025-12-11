/**
 * Profile Header Component
 *
 * Cabeçalho de perfil do dashboard com foto de perfil, informações do usuário
 * (nome, email, role) e opções de edição. Suporta upload de avatar, modal de
 * edição de perfil e integração com sistema de autenticação.
 *
 * @module components/domain/dashboard/profile-header
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

import { useAuthContext } from '@/components/providers/auth-context-provider';
import { usersService } from '@/lib/api';
import { authService } from '@/lib/api/services/auth.service';
import { getAvatarUrl, extractInitials, setCloudNameFromUrl } from '@/lib/utils';
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
import { cn } from '@rainersoft/ui';
import { formatDate } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Calendar, Camera, Edit2, Mail, Shield, ShieldAlert, ShieldCheck } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ChangeEmailDialog } from './change-email-dialog';
import { EmailStatusDialog } from './email-status-dialog';

interface ProfileHeaderProps {
  onAvatarChange?: (file: File) => void;
}

export function ProfileHeader({ onAvatarChange }: ProfileHeaderProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { user, updateProfile, checkAuth } = useAuthContext();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [avatarVersion, setAvatarVersion] = useState<number | null>(null);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [showEmailStatusDialog, setShowEmailStatusDialog] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Detectar cloud_name do Cloudinary a partir da URL do avatar retornada pelo backend
  useEffect(() => {
    if (user?.avatar && user.avatar.includes('cloudinary.com')) {
      setCloudNameFromUrl(user.avatar, 'your-cloud-name');
    }
  }, [user?.avatar]);

  /**
   * Determina se o tema atual é dark mode
   * Só retorna true após montagem para evitar hydration mismatch
   */
  const isDark = mounted ? resolvedTheme === 'dark' : false;
  const displayName = user?.fullName || user?.nickname || 'Usuário';
  const displayNickname = user?.nickname || 'Usuário';
  const displayEmail = user?.email || '';
  const memberSinceDate =
    (user as any)?.userCreateDate || (user as any)?.createdAt || undefined;
  const formattedMemberSince = memberSinceDate
    ? formatDate(memberSinceDate, 'long')
    : 'data desconhecida';
  const isEmailVerified = !!user?.emailVerified;
  const [editData, setEditData] = useState({
    name: user?.fullName || '',
    email: user?.email || '',
    bio: user?.bio || '',
    nickname: user?.nickname || '',
    website: (user as any)?.website || '',
    github: (user as any)?.socialLinks?.github || '',
    linkedin: (user as any)?.socialLinks?.linkedin || '',
    twitter: (user as any)?.socialLinks?.twitter || '',
  });

  // URL do avatar: usar diretamente do backend com cache-busting
  const avatarSrc = (() => {
    const avatar = user?.avatar;
    
    // Prioridade 1: URL completa do Cloudinary retornada pelo backend
    if (avatar?.includes('cloudinary.com')) {
      // Cache-busting para forçar reload após upload
      return avatarVersion ? `${avatar}?v=${avatarVersion}` : avatar;
    }

    // Prioridade 2: Tentar construir URL (se cloud_name já foi detectado)
    if (user?.cognitoSub) {
      const url = getAvatarUrl(user.cognitoSub, avatarVersion || undefined);
      if (url) return url;
    }

    return null;
  })();

  // Upload de avatar com conversão automática para WebP
  const handleAvatarClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*'; // Aceita qualquer formato de imagem
    input.onchange = async (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      // Validação mínima: aceitar qualquer imagem (image/*)
      // A conversão para WebP acontece automaticamente no cloudinaryService
      if (!file.type || !file.type.startsWith('image/')) {
        toast.error('Selecione um arquivo de imagem válido para o avatar.');
        return;
      }

      // Limite de tamanho (10MB - será reduzido após conversão para WebP)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Imagem muito grande. Máximo 10MB.');
        return;
      }

      if (onAvatarChange) {
        onAvatarChange(file);
      }

      // Persistir avatar no backend usando usersService.updateUser
      // A conversão para WebP acontece automaticamente no processo de upload
      if (!user?.cognitoSub) {
        toast.error(
          'Não foi possível atualizar o avatar: identificador único (cognitoSub) ausente.'
        );
        return;
      }

      try {
        toast.loading('Processando imagem...', { id: 'avatar-upload' });
        
        // Upload do avatar (conversão WebP acontece automaticamente)
        await usersService.updateUser(user.cognitoSub, {}, file);
        
        // Forçar atualização imediata do avatar com novo timestamp
        // Isso quebra o cache do navegador e do CDN
        const newVersion = Date.now();
        setAvatarVersion(newVersion);
        
        // Atualizar contexto de autenticação para sincronizar em toda a aplicação
        await checkAuth();
        
        toast.success('Avatar atualizado com sucesso!', { id: 'avatar-upload' });
        
        console.log(`✅ Avatar atualizado: ${getAvatarUrl(user.cognitoSub, newVersion)}`);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Erro ao atualizar avatar. Tente novamente.';
        toast.error(message, { id: 'avatar-upload' });
      }
    };
    input.click();
  };

  // Iniciais do usuário para fallback do avatar
  const initials = extractInitials(displayName) || 'AD';

  const handleSaveProfile = async () => {
    if (!user) {
      toast.error('Não foi possível atualizar o perfil: usuário não encontrado.');
      return;
    }

    try {
      setIsSaving(true);

      // Monta socialLinks a partir dos campos individuais
      const socialLinks: Record<string, string> = {};
      if (editData.github) socialLinks.github = editData.github;
      if (editData.linkedin) socialLinks.linkedin = editData.linkedin;
      if (editData.twitter) socialLinks.twitter = editData.twitter;

      const payload = {
        fullName: editData.name || user.fullName || '',
        bio: editData.bio,
        website: editData.website || undefined,
        socialLinks:
          Object.keys(socialLinks).length > 0 ? socialLinks : undefined,
      };

      // 1) Atualiza nome/bio no MongoDB via ProfileService/useAuth
      const updatedUser = await updateProfile(payload);

      // 2) Atualiza nickname via AuthService/Cognito + Mongo (fluxo dedicado)
      const newNickname = (editData.nickname || '').trim();
      const currentNickname = user.nickname || '';

      if (newNickname && newNickname !== currentNickname) {
        const cognitoSub = user.cognitoSub;
        if (!cognitoSub) {
          toast.error(
            'Não foi possível atualizar o nickname: identificador único (cognitoSub) ausente.'
          );
        } else {
          // Garante que o nickname NÃO está em uso por nenhum outro usuário
          const isAvailable = await authService.checkNickname(
            newNickname,
            cognitoSub
          );

          if (!isAvailable) {
            throw new Error(
              'Este nickname já está em uso por outro usuário. Escolha outro nickname único.'
            );
          }

          await authService.updateNickname(cognitoSub, newNickname);
          // Recarrega perfil completo para refletir nickname atualizado
          await checkAuth();
        }
      }

      setEditData(prev => ({
        name: updatedUser?.fullName ?? prev.name,
        email: updatedUser?.email ?? prev.email,
        bio: updatedUser?.bio ?? prev.bio,
        nickname: newNickname || updatedUser?.nickname || prev.nickname,
        website: updatedUser?.website ?? prev.website,
        github:
          (updatedUser as any)?.socialLinks?.github ??
          socialLinks.github ??
          prev.github,
        linkedin:
          (updatedUser as any)?.socialLinks?.linkedin ??
          socialLinks.linkedin ??
          prev.linkedin,
        twitter:
          (updatedUser as any)?.socialLinks?.twitter ??
          socialLinks.twitter ??
          prev.twitter,
      }));

      toast.success('Perfil atualizado com sucesso.');
      setIsEditModalOpen(false);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Erro ao atualizar perfil. Tente novamente.';
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

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
              <AvatarImage key={avatarSrc || 'avatar-fallback'} src={avatarSrc || undefined} alt={displayName} />
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
              {/* Nome principal vindo do MongoDB (fullName) e nickname do Cognito como secundário */}
              <div className="flex flex-col">
                <h1 className="text-3xl font-bold">{displayName}</h1>
                <span className="text-sm text-white/80">@{displayNickname}</span>
              </div>
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
                <span>{displayEmail || 'Email não disponível'}</span>
                {!!displayEmail && (
                  isEmailVerified ? (
                    <ShieldCheck
                      className="w-5 h-5 cursor-pointer hover:text-white/80"
                      onClick={() => setShowEmailStatusDialog(true)}
                      aria-label="Email verificado - gerenciar email"
                    />
                  ) : (
                    <ShieldAlert
                      className="w-5 h-5 cursor-pointer hover:text-white/80"
                      onClick={() => setShowEmailStatusDialog(true)}
                      aria-label="Email não verificado - gerenciar email"
                    />
                  )
                )}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formattedMemberSince === 'data desconhecida'
                  ? 'Membro desde data não disponível'
                  : `Membro desde ${formattedMemberSince}`}
              </div>
            </div>

            {user?.bio && (
              <p className="mt-3 text-white/80 max-w-2xl">{user.bio}</p>
            )}
          </div>

          {/* Ações do Header */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={() => setIsEditModalOpen(true)}
              variant="secondary"
              className="gap-2 bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <Edit2 className="w-4 h-4" />
              Editar Perfil
            </Button>
          </div>
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
              <Label htmlFor="edit-nickname">Nickname</Label>
              <Input
                id="edit-nickname"
                value={editData.nickname}
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement>,
                ) =>
                  setEditData({ ...editData, nickname: e.target.value })}
                placeholder="Seu nickname público (apenas letras e números)"
              />
              <p className="text-xs text-muted-foreground">
                Somente letras e números, 3-30 caracteres. Usado como @handle público.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-website">Website</Label>
              <Input
                id="edit-website"
                value={editData.website}
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement>,
                ) =>
                  setEditData({ ...editData, website: e.target.value })}
                placeholder="https://seusite.com"
              />
            </div>

            <div className="space-y-2">
              <Label>Redes sociais</Label>
              <div className="grid gap-2 sm:grid-cols-3">
                <Input
                  placeholder="GitHub"
                  value={editData.github}
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement>,
                  ) =>
                    setEditData({ ...editData, github: e.target.value })}
                />
                <Input
                  placeholder="LinkedIn"
                  value={editData.linkedin}
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement>,
                  ) =>
                    setEditData({ ...editData, linkedin: e.target.value })}
                />
                <Input
                  placeholder="Twitter / X"
                  value={editData.twitter}
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement>,
                  ) =>
                    setEditData({ ...editData, twitter: e.target.value })}
                />
              </div>
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
              disabled={isSaving}
              className="dark:bg-cyan-600 dark:hover:bg-cyan-700"
            >
              {isSaving ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modais de Email */}
      <EmailStatusDialog
        open={showEmailStatusDialog}
        onOpenChange={setShowEmailStatusDialog}
        email={displayEmail}
        emailVerified={!!user?.emailVerified}
      />

      <ChangeEmailDialog
        open={showEmailDialog}
        onOpenChange={setShowEmailDialog}
        cognitoSub={user?.cognitoSub || ''}
      />
    </>
  );
}
