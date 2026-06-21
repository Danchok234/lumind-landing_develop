import { Suspense } from 'react';
import type { Metadata } from 'next';
import EventsHero from '@/components/EventsHero';
import EventsBrowser from '@/components/EventsBrowser';
import FooterSection from '@/components/FooterSection';

export const metadata: Metadata = {
  title: 'Events — Lumind',
  description:
    'Browse hackathons, conferences and meetups. Find your match across every category, in one place.',
};

export default function EventsPage() {
  return (
    <main>
      <EventsHero />
      <Suspense fallback={null}>
        <EventsBrowser />
      </Suspense>
      <FooterSection />
    </main>
  );
}
