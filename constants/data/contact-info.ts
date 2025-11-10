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
    borderColor: COLORS.BORDER.DARK_CYAN_20,
    textColor: COLORS.TEXT.DARK_CYAN_200,
    iconColor: COLORS.ACCENT.CYAN,
  },
  {
    icon: MapPin,
    title: 'Localização',
    content: {
      primary: CONTACT_CONFIG.location.city,
      secondary: CONTACT_CONFIG.location.country,
    },
    color: 'purple',
    borderColor: COLORS.BORDER.DARK_PURPLE_20,
    textColor: COLORS.TEXT.DARK_PURPLE_200,
    iconColor: COLORS.ACCENT.PURPLE,
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
    borderColor: COLORS.BORDER.DARK_PINK_20,
    hoverBorder: COLORS.BORDER.DARK_PINK_40,
    textColor: COLORS.TEXT.DARK_PINK_200,
    hoverText: COLORS.TEXT.DARK_PINK_300,
    iconColor: COLORS.ACCENT.PINK,
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
    borderColor: COLORS.BORDER.DARK_ORANGE_20,
    hoverBorder: COLORS.BORDER.DARK_ORANGE_40,
    textColor: COLORS.TEXT.DARK_ORANGE_200,
    hoverText: COLORS.TEXT.DARK_ORANGE_300,
    iconColor: COLORS.ACCENT.ORANGE,
  },
] as const;
