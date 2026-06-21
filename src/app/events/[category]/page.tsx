import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import EventsHero from '@/components/EventsHero';
import EventsBrowser from '@/components/EventsBrowser';
import FooterSection from '@/components/FooterSection';
import { CATEGORIES_META, getCategoryBySlug } from '@/data/events';

interface PageProps {
  params: Promise<{ category: string }>;
}

// Pre-render a static page for every category for clean SEO/indexing.
export function generateStaticParams() {
  return CATEGORIES_META.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const meta = getCategoryBySlug(category);

  if (!meta) {
    return { title: 'Category not found — Lumind' };
  }

  return {
    title: `${meta.category} events — Lumind`,
    description: `Browse ${meta.count} ${meta.category} events on Lumind. Filter by date, format, language and price to find your match.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const meta = getCategoryBySlug(category);

  if (!meta) notFound();

  return (
    <main>
      <EventsHero
        title={`${meta.category} events`}
        subtitle={`Discover ${meta.category} hackathons, conferences and meetups — all in one place.`}
      />
      <Suspense fallback={null}>
        <EventsBrowser category={meta.category} heading={`${meta.category} events`} />
      </Suspense>
      <FooterSection />
    </main>
  );
}
