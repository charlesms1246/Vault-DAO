import { FEATURED_DAOS } from '@/lib/constants';
import { DashboardClient } from './DashboardClient';

// This MUST be in a server component (no 'use client')
export function generateStaticParams() {
  return FEATURED_DAOS.map((dao) => ({
    dao: dao.id,
  }));
}

// Server component that wraps the client component
// ✅ Make it async and await params
export default async function DashboardPage({ 
  params 
}: { 
  params: Promise<{ dao: string }> 
}) {
  const { dao } = await params;
  return <DashboardClient daoId={dao} />;
}