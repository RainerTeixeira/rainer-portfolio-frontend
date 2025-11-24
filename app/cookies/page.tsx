/**
 * Cookie Policy Page Component
 *
 * Página de política de cookies completa e profissional.
 * Inclui informações sobre tipos de cookies, finalidades e gerenciamento.
 *
 * @module app/cookies/page
 * @fileoverview Página de política de cookies
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

/// <reference types="react" />

'use client';

import Link from 'next/link';
import {
  Cookie,
  Database,
  Eye,
  Info,
  Mail,
  Settings,
  Shield,
} from 'lucide-react';

import { BackToTop, PageHeader, ParticlesEffect } from '@/components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@rainersoft/ui';
import { cn } from '@/lib/utils';
import { POLICIES_LAST_UPDATED, SITE_CONFIG } from '@/constants';

export default function CookiePolicyPage() {
  return (
    <div className={cn('min-h-screen bg-background dark:bg-black')}>
      <ParticlesEffect variant="alt1" />

      <PageHeader
        title="Política de Cookies"
        description="Informações sobre como utilizamos cookies e tecnologias similares para melhorar sua experiência em nosso site."
      >
        <div className="flex items-center justify-center gap-3 mt-4">
          <Cookie className="h-8 w-8 text-primary dark:text-cyan-400" />
          <span className="text-sm text-muted-foreground">
            Última atualização:{' '}
            {new Date(POLICIES_LAST_UPDATED).toLocaleDateString('pt-BR')}
          </span>
        </div>
      </PageHeader>

      <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        <div className="space-y-8">
          {/* O que são Cookies */}
          <Card className="shadow-lg dark:shadow-cyan-400/10 dark:bg-black/40 dark:border-cyan-400/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 dark:text-cyan-200">
                <Info className="h-6 w-6 text-primary dark:text-cyan-400" />O
                que são Cookies?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Cookies são pequenos arquivos de texto armazenados em seu
                dispositivo (computador, tablet ou smartphone) quando você
                visita um site. Eles são amplamente utilizados para fazer com
                que os sites funcionem de forma mais eficiente, bem como para
                fornecer informações aos proprietários do site.
              </p>
              <p>
                Os cookies nos ajudam a entender como você utiliza nosso site,
                permitindo-nos melhorar sua experiência de navegação e
                personalizar o conteúdo exibido.
              </p>
            </CardContent>
          </Card>

          {/* Tipos de Cookies Utilizados */}
          <Card className="shadow-lg dark:shadow-cyan-400/10 dark:bg-black/40 dark:border-cyan-400/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 dark:text-cyan-200">
                <Settings className="h-6 w-6 text-primary dark:text-cyan-400" />
                Tipos de Cookies Utilizados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div>
                  <h3 className="text-foreground font-semibold mb-2 dark:text-cyan-200">
                    1. Cookies Essenciais
                  </h3>
                  <p>
                    Esses cookies são necessários para o funcionamento básico do
                    site. Eles permitem que você navegue pelo site e use
                    recursos essenciais. Sem esses cookies, alguns serviços não
                    podem ser fornecidos.
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Autenticação de usuário</li>
                    <li>Segurança e prevenção de fraudes</li>
                    <li>Preferências de idioma</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-foreground font-semibold mb-2 dark:text-cyan-200">
                    2. Cookies de Desempenho
                  </h3>
                  <p>
                    Esses cookies coletam informações sobre como você utiliza
                    nosso site, como páginas visitadas e erros encontrados.
                    Essas informações nos ajudam a melhorar o desempenho do
                    site.
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Análise de tráfego do site</li>
                    <li>Monitoramento de erros</li>
                    <li>Otimização de performance</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-foreground font-semibold mb-2 dark:text-cyan-200">
                    3. Cookies de Funcionalidade
                  </h3>
                  <p>
                    Esses cookies permitem que o site se lembre de escolhas que
                    você faz (como seu nome de usuário, idioma ou região) e
                    fornecem recursos aprimorados e mais personalizados.
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Preferências do usuário</li>
                    <li>Personalização de conteúdo</li>
                    <li>Lembrar configurações</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-foreground font-semibold mb-2 dark:text-cyan-200">
                    4. Cookies de Publicidade
                  </h3>
                  <p>
                    Esses cookies são usados para exibir anúncios relevantes
                    para você e seus interesses. Eles também são usados para
                    limitar o número de vezes que você vê um anúncio.
                  </p>
                  <p className="text-sm italic mt-2">
                    Nota: Atualmente não utilizamos cookies de publicidade em
                    nosso site.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cookies de Terceiros */}
          <Card className="shadow-lg dark:shadow-cyan-400/10 dark:bg-black/40 dark:border-cyan-400/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 dark:text-cyan-200">
                <Eye className="h-6 w-6 text-primary dark:text-cyan-400" />
                Cookies de Terceiros
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Alguns cookies são colocados por serviços de terceiros que
                aparecem em nossas páginas. Não temos controle sobre esses
                cookies, portanto, recomendamos que você verifique os sites de
                terceiros para obter mais informações sobre seus cookies.
              </p>
              <p>Serviços de terceiros que podem utilizar cookies:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-foreground">Google Analytics:</strong>{' '}
                  Para análise de tráfego e comportamento do usuário
                </li>
                <li>
                  <strong className="text-foreground">Vercel Analytics:</strong>{' '}
                  Para monitoramento de performance e análise de uso
                </li>
              </ul>
              <p className="text-sm mt-4">
                Para mais informações sobre como o Google utiliza cookies,
                visite:{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline dark:text-cyan-400"
                >
                  Política de Privacidade do Google
                </a>
              </p>
            </CardContent>
          </Card>

          {/* Gerenciamento de Cookies */}
          <Card className="shadow-lg dark:shadow-cyan-400/10 dark:bg-black/40 dark:border-cyan-400/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 dark:text-cyan-200">
                <Settings className="h-6 w-6 text-primary dark:text-cyan-400" />
                Como Gerenciar Cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                A maioria dos navegadores permite que você gerencie suas
                preferências de cookies. Você pode configurar seu navegador para
                recusar cookies ou alertá-lo quando cookies estão sendo
                enviados. No entanto, se você desabilitar cookies, algumas
                partes do nosso site podem não funcionar adequadamente.
              </p>
              <div className="space-y-3">
                <div>
                  <h3 className="text-foreground font-semibold mb-2 dark:text-cyan-200">
                    Configurações do Navegador
                  </h3>
                  <p className="text-sm">
                    Você pode gerenciar cookies através das configurações do seu
                    navegador:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2 text-sm">
                    <li>
                      <strong>Google Chrome:</strong> Configurações →
                      Privacidade e segurança → Cookies
                    </li>
                    <li>
                      <strong>Mozilla Firefox:</strong> Opções → Privacidade e
                      Segurança → Cookies
                    </li>
                    <li>
                      <strong>Safari:</strong> Preferências → Privacidade →
                      Cookies
                    </li>
                    <li>
                      <strong>Microsoft Edge:</strong> Configurações →
                      Privacidade, pesquisa e serviços → Cookies
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Duração dos Cookies */}
          <Card className="shadow-lg dark:shadow-cyan-400/10 dark:bg-black/40 dark:border-cyan-400/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 dark:text-cyan-200">
                <Database className="h-6 w-6 text-primary dark:text-cyan-400" />
                Duração dos Cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Utilizamos dois tipos de cookies em relação à sua duração:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-foreground">
                    Cookies de Sessão:
                  </strong>{' '}
                  Temporários, excluídos automaticamente quando você fecha o
                  navegador
                </li>
                <li>
                  <strong className="text-foreground">
                    Cookies Persistentes:
                  </strong>{' '}
                  Permanecem no seu dispositivo por um período determinado ou
                  até que você os exclua manualmente
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Alterações nesta Política */}
          <Card className="shadow-lg dark:shadow-cyan-400/10 dark:bg-black/40 dark:border-cyan-400/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 dark:text-cyan-200">
                <Shield className="h-6 w-6 text-primary dark:text-cyan-400" />
                Alterações nesta Política
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Podemos atualizar esta Política de Cookies periodicamente para
                refletir mudanças em nossas práticas ou por outras razões
                operacionais, legais ou regulatórias. Notificaremos você sobre
                alterações significativas publicando a nova política nesta
                página e atualizando a data de &quot;Última atualização&quot;.
              </p>
              <p>
                Recomendamos que você revise esta política periodicamente para
                se manter informado sobre como utilizamos cookies.
              </p>
            </CardContent>
          </Card>

          {/* Mais Informações */}
          <Card className="shadow-lg dark:shadow-cyan-400/10 dark:bg-black/40 dark:border-cyan-400/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 dark:text-cyan-200">
                <Info className="h-6 w-6 text-primary dark:text-cyan-400" />
                Mais Informações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Para obter mais informações sobre privacidade e proteção de
                dados, consulte nossa{' '}
                <Link
                  href="/privacidade"
                  className="text-primary hover:underline dark:text-cyan-400"
                >
                  Política de Privacidade
                </Link>
                .
              </p>
              <p>
                Para informações sobre os termos de uso dos nossos serviços,
                consulte nossos{' '}
                <Link
                  href="/termos"
                  className="text-primary hover:underline dark:text-cyan-400"
                >
                  Termos de Uso
                </Link>
                .
              </p>
            </CardContent>
          </Card>

          {/* Contato */}
          <Card className="shadow-lg dark:shadow-cyan-400/10 dark:bg-black/40 dark:border-cyan-400/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 dark:text-cyan-200">
                <Mail className="h-6 w-6 text-primary dark:text-cyan-400" />
                Contato
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Se você tiver dúvidas sobre nossa Política de Cookies, entre em
                contato conosco:
              </p>
              <div className="space-y-2">
                <p>
                  <strong className="text-foreground">E-mail:</strong>{' '}
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email.address}`}
                    className="text-primary hover:underline dark:text-cyan-400"
                  >
                    {SITE_CONFIG.contact.email.address}
                  </a>
                </p>
                <p>
                  <strong className="text-foreground">Telefone:</strong>{' '}
                  <a
                    href={`tel:${SITE_CONFIG.contact.phone.number.replace(/\s/g, '')}`}
                    className="text-primary hover:underline dark:text-cyan-400"
                  >
                    {SITE_CONFIG.contact.phone.number}
                  </a>
                </p>
                <p>
                  <strong className="text-foreground">Localização:</strong>{' '}
                  {SITE_CONFIG.contact.location.city},{' '}
                  {SITE_CONFIG.contact.location.country}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <BackToTop />
    </div>
  );
}
