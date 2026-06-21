import type { Metadata } from 'next';
import OrganizersHero from '@/components/OrganizersHero';
import WhyUsSection from '@/components/WhyUsSection';
import OrganizerBenefits from '@/components/OrganizerBenefits';
import StepsSection from '@/components/StepsSection';
import FaqSection from '@/components/FaqSection';
import FooterSection from '@/components/FooterSection';

export const metadata: Metadata = {
  title: 'For organizers — Lumind',
  description:
    'Promote your events to a relevant, engaged audience. Build trust, gain visibility, and become part of one educational ecosystem with Lumind.',
};

export default function OrganizersPage() {
  return (
    <main>
      <OrganizersHero />
      <WhyUsSection />
      <OrganizerBenefits />
      <StepsSection />
      <FaqSection />
      <FooterSection />
    </main>
  );
}
