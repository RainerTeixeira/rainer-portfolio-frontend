/**
 * Contact Info Data
 *
 * Configuração dos cards de informações de contato.
 *
 * @module constants/data/contact-info
 * @author Rainer Teixeira
 * @version 2.0.0
 */

import {
  COLOR_CYAN,
  COLOR_ORANGE,
  COLOR_PINK,
  COLOR_PURPLE,
} from '@rainer/design-tokens';
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
    borderColor: 'border-cyan-400/20',
    textColor: 'text-cyan-200',
    iconColor: COLOR_CYAN[400],
  },
  {
    icon: MapPin,
    title: 'Localização',
    content: {
      primary: CONTACT_CONFIG.location.city,
      secondary: CONTACT_CONFIG.location.country,
    },
    color: 'purple',
    borderColor: 'border-purple-400/20',
    textColor: 'text-purple-200',
    iconColor: COLOR_PURPLE[400],
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
    borderColor: 'border-pink-400/20',
    hoverBorder: 'hover:border-pink-400/40',
    textColor: 'text-pink-200',
    hoverText: 'hover:text-pink-300',
    iconColor: COLOR_PINK[400],
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
    borderColor: 'border-orange-400/20',
    textColor: 'text-orange-200',
    hoverBorder: 'hover:border-orange-400/40',
    hoverText: 'hover:text-orange-300',
    iconColor: COLOR_ORANGE[400],
  },
] as const;
