import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import EventsHero from '@/components/EventsHero';
import EventsBrowser from '@/components/EventsBrowser';
import FooterSection from '@/components/FooterSection';
import { CATEGORIES_META, getSubcategoryBySlug } from '@/data/events';

interface PageProps {
  params: Promise<{ category: string; subcategory: string }>;
}

// Pre-render a static page for every (category, sub-category) pair.
export function generateStaticParams() {
  return CATEGORIES_META.flatMap((c) =>
    c.subcategories.map((s) => ({ category: c.slug, subcategory: s.slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, subcategory } = await params;
  const resolved = getSubcategoryBySlug(category, subcategory);

  if (!resolved) {
    return { title: 'Category not found — Lumind' };
  }

  const { category: cat, subcategory: sub } = resolved;
  return {
    title: `${sub.name} ${cat.category} events — Lumind`,
    description: `Browse ${sub.count} ${sub.name} events in ${cat.category} on Lumind. Filter by date, format, language and price to find your match.`,
  };
}

export default async function SubcategoryPage({ params }: PageProps) {
  const { category, subcategory } = await params;
  const resolved = getSubcategoryBySlug(category, subcategory);

  if (!resolved) notFound();

  const { category: cat, subcategory: sub } = resolved;

  return (
    <main>
      <EventsHero
        title={`${sub.name} events`}
        subtitle={`Discover ${sub.name} hackathons, conferences and meetups in ${cat.category} — all in one place.`}
      />
      <Suspense fallback={null}>
        <EventsBrowser
          category={cat.category}
          subcategory={sub.name}
          heading={`${sub.name} events`}
        />
      </Suspense>
      <FooterSection />
    </main>
  );
}
