import { FEATURED_DAOS } from '@/lib/constants';
import { DashboardClient } from './DashboardClient';

// This MUST be in a server component (no 'use client')
export function generateStaticParams() {
  return FEATURED_DAOS.map((dao) => ({
    dao: dao.id,
  }));
}

// Server component that wraps the client component
export default function DashboardPage({ params }: { params: { dao: string } }) {
  return <DashboardClient daoId={params.dao} />;
}