/**
 * Contact Info Data
 *
 * Configuração dos cards de informações de contato.
 *
 * @module constants/data/contact-info
 * @author Rainer Teixeira
 * @version 2.0.0
 */

import { COLORS } from '@rainer/design-tokens';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import React from 'react';
import { CONTACT_CONFIG } from '../site/meta';

/**
 * Configuração de card de informação de contato
 */
export interface ContactInfoCardConfig {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  content: {
    primary: string;
    secondary: string | null;
  };
  href?: string;
  color: string;
  borderColor: string;
  hoverBorder?: string;
  textColor: string;
  hoverText?: string;
  iconColor: string;
}

/**
 * Configuração dos cards de informações de contato
 *
 * Array contendo configuração dos cards informativos exibidos na página.
 * Cada card possui ícone, título, conteúdo e estilos personalizados.
 */
export const CONTACT_INFO_CARDS: ReadonlyArray<ContactInfoCardConfig> = [
  {
    icon: Clock,
    title: 'Horário',
    content: {
      primary: CONTACT_CONFIG.workingHours.days,
      secondary: CONTACT_CONFIG.workingHours.hours,
    },
    color: 'cyan',
    borderColor: COLORS.BORDER.DARK_CYAN_20 || 'border-cyan-200',
    textColor: COLORS.TEXT.DARK_CYAN_200 || 'text-cyan-200',
    iconColor: (COLORS.ACCENT as { CYAN: string })?.CYAN || '#06b6d4',
  },
  {
    icon: MapPin,
    title: 'Localização',
    content: {
      primary: CONTACT_CONFIG.location.city,
      secondary: CONTACT_CONFIG.location.country,
    },
    color: 'purple',
    borderColor: COLORS.BORDER.DARK_PURPLE_20 || 'border-purple-200',
    textColor: COLORS.TEXT.DARK_PURPLE_200 || 'text-purple-200',
    iconColor: (COLORS.ACCENT as { PURPLE: string })?.PURPLE || '#a855f7',
  },
  {
    icon: Phone,
    title: 'Telefone',
    content: {
      primary: CONTACT_CONFIG.phone.number,
      secondary: CONTACT_CONFIG.phone.whatsapp ? 'WhatsApp disponível' : null,
    },
    href: `tel:${CONTACT_CONFIG.phone.number.replace(/\s/g, '')}`,
    color: 'pink',
    borderColor: COLORS.BORDER.DARK_PINK_20 || 'border-pink-200',
    hoverBorder: COLORS.BORDER.DARK_PINK_40 || 'border-pink-400',
    textColor: COLORS.TEXT.DARK_PINK_200 || 'text-pink-200',
    hoverText: COLORS.TEXT.DARK_PINK_300 || 'text-pink-300',
    iconColor: (COLORS.ACCENT as { PINK: string })?.PINK || '#ec4899',
  },
  {
    icon: Mail,
    title: 'Email',
    content: {
      primary: CONTACT_CONFIG.email.address,
      secondary: CONTACT_CONFIG.email.responseTime,
    },
    href: `mailto:${CONTACT_CONFIG.email.address}`,
    color: 'orange',
    borderColor: COLORS.BORDER.DARK_ORANGE_20 || 'border-orange-200',
    textColor: COLORS.TEXT.DARK_ORANGE_200 || 'text-orange-200',
    hoverBorder: COLORS.BORDER.DARK_ORANGE_40 || 'border-orange-400',
    hoverText: COLORS.TEXT.DARK_ORANGE_300 || 'text-orange-300',
    iconColor: (COLORS.ACCENT as { ORANGE: string })?.ORANGE || '#f97316',
  },
] as const;
