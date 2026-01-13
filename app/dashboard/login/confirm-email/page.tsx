/**
 * Confirm Email Page (Server entry)
 *
 * Server component que apenas injeta o email inicial no componente cliente
 * para evitar problemas de prerender/SSR.
 */

import ConfirmEmailClient from './confirm-email.client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function ConfirmEmailPage({
  searchParams,
}: {
  searchParams: { email?: string };
}) {
  const email = searchParams?.email || '';
  return <ConfirmEmailClient initialEmail={email} />;
}