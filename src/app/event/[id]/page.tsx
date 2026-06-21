import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import EventDetailHero from '@/components/EventDetailHero';
import EventFeedback from '@/components/EventFeedback';
import AboutCompany from '@/components/AboutCompany';
import TicketPurchase from '@/components/TicketPurchase';
import EventMap from '@/components/EventMap';
import FooterSection from '@/components/FooterSection';
import { EVENTS, getEventById, getEventSchedule } from '@/data/events';

interface PageProps {
  params: Promise<{ id: string }>;
}

// Pre-render a static page for every seeded event.
export function generateStaticParams() {
  return EVENTS.map((e) => ({ id: e.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const event = getEventById(id);

  if (!event) {
    return { title: 'Event not found — Lumind' };
  }

  return {
    title: `${event.title} — Lumind`,
    description: `${event.category} · ${event.location}. Get your ticket for ${event.title} on Lumind.`,
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params;
  const event = getEventById(id);

  if (!event) notFound();

  const schedule = getEventSchedule(event);

  return (
    <main>
      <EventDetailHero event={event} schedule={schedule} />
      <EventFeedback />
      <AboutCompany image={event.image} imageAlt={event.title} />
      <TicketPurchase event={event} schedule={schedule} />
      <EventMap location={event.location} />
      <FooterSection />
    </main>
  );
}
