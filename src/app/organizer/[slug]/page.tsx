import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import OrganizerHero from '@/components/OrganizerHero';
import OrganizerEvents from '@/components/OrganizerEvents';
import EventFeedback from '@/components/EventFeedback';
import FooterSection from '@/components/FooterSection';
import { ORGANIZER_PROFILES, getOrganizerBySlug, getOrganizerEvents } from '@/data/events';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Pre-render a static page for every seeded organizer.
export function generateStaticParams() {
  return ORGANIZER_PROFILES.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const organizer = getOrganizerBySlug(slug);

  if (!organizer) {
    return { title: 'Organizer not found — Lumind' };
  }

  return {
    title: `${organizer.name} — Organizer profile — Lumind`,
    description: `${organizer.tagline} See their upcoming events and attendee feedback on Lumind.`,
  };
}

export default async function OrganizerPage({ params }: PageProps) {
  const { slug } = await params;
  const organizer = getOrganizerBySlug(slug);

  if (!organizer) notFound();

  const events = getOrganizerEvents(organizer.name);

  return (
    <main>
      <OrganizerHero organizer={organizer} />
      <OrganizerEvents organizerShortName={organizer.shortName} events={events} />
      <EventFeedback organizerName={organizer.shortName} />
      <FooterSection />
    </main>
  );
}
