// ============================================================
// Seeded event data
// Deterministically generated so cards can be reviewed across
// many categories, tags, prices and image variations.
// 60 events total — the listing page reveals them 9 at a time.
// ============================================================

export type EventTagColor = 'green' | 'purple' | 'orange';

export interface EventTag {
  label: string;
  color: EventTagColor;
}

/** How the event is attended — drives the "Format" search/filter field. */
export type EventFormat = 'In person' | 'Online' | 'Hybrid';

export interface Event {
  id: string;
  title: string;
  category: string;
  /** Sub-category within `category`, e.g. "Web Development" under "Programming". */
  subcategory: string;
  /** Optional highlight badge shown over the image (e.g. "Student free"). */
  tag?: EventTag;
  image: string;
  organizer: string;
  rating: number;
  location: string;
  /** Pre-formatted display date, e.g. "Friday, 28 Apr - 12:30". */
  date: string;
  /** Real start time (ms since epoch) so date-range filtering is possible. */
  startTimestamp: number;
  /** Duration label, e.g. "4 days", "2 hours". */
  duration: string;
  /** Audience level, e.g. "All levels", "Beginner". */
  level: string;
  /** Attendance format, e.g. "Online". */
  format: EventFormat;
  /** Primary language of the event, e.g. "English". */
  language: string;
  /** Price in USD. 0 means the event is free. */
  price: number;
}

// ── Source pools (all images already live in /public) ────────────
export const IMAGES = [
  '/147fcdc4b09482e2e4f1f7b203b4e7e2692c42fe.png', // empowering conference
  '/88aa186813d491884a3c7701e3b4c461c6d5cc76.png', // youtube lounge
  '/67abc3a1984222c5de63281a96adafa991e2f687.png', // keynote stage
  '/eccd3e4dd28303d8ba5ff30743baae447d5af9b6.png', // hackathon
  '/6b73f61f3aca9ffd6fc74b4f7f821697d2d5541d.png', // beanbag meetup
  '/e37a4ac5c029dc0a69d231acf87985a340868406.png', // conference crowd
  '/2dba98f9629e9672ffed9fe7ac1cec393b012438.png', // annual meeting
];

interface SubcategoryDef {
  name: string;
  /** URL-safe identifier, unique within the parent category, e.g. "web-development". */
  slug: string;
}

interface CategoryDef {
  category: string;
  /** URL-safe identifier, e.g. "ux-ui-design". */
  slug: string;
  /** Accent colour used by the pill bar, mega-menu and category hero. */
  accent: string;
  titles: string[];
  /** Sub-categories nested under this category, paired 1:1 with `titles` by index. */
  subcategories: SubcategoryDef[];
}

const CATEGORIES: CategoryDef[] = [
  {
    category: 'Programming',
    slug: 'programming',
    accent: '#8355F8',
    titles: [
      'Full-stack hackathon weekend',
      'TypeScript deep-dive workshop',
      'AI & machine learning summit',
      'Open source contributors day',
      'Cloud-native developers meetup',
    ],
    subcategories: [
      { name: 'Web Development', slug: 'web-development' },
      { name: 'Mobile Development', slug: 'mobile-development' },
      { name: 'AI & Machine Learning', slug: 'ai-machine-learning' },
      { name: 'DevOps & Cloud', slug: 'devops-cloud' },
      { name: 'Game Development', slug: 'game-development' },
    ],
  },
  {
    category: 'UX/UI Design',
    slug: 'ux-ui-design',
    accent: '#F8559E',
    titles: [
      'UX/UI design annual meeting',
      'Design systems masterclass',
      'Product design portfolio review',
      'Figma power-user workshop',
      'Accessibility in design forum',
    ],
    subcategories: [
      { name: 'Product Design', slug: 'product-design' },
      { name: 'Graphic Design', slug: 'graphic-design' },
      { name: 'Design Systems', slug: 'design-systems' },
      { name: 'Motion Design', slug: 'motion-design' },
      { name: 'UX Research', slug: 'ux-research' },
    ],
  },
  {
    category: 'Marketing',
    slug: 'marketing',
    accent: '#F5A623',
    titles: [
      'Growth marketing conference',
      'Brand storytelling workshop',
      'SEO & content strategy day',
      'Social media trends 2026',
      'Performance marketing summit',
    ],
    subcategories: [
      { name: 'Digital Marketing', slug: 'digital-marketing' },
      { name: 'Content Marketing', slug: 'content-marketing' },
      { name: 'SEO & Analytics', slug: 'seo-analytics' },
      { name: 'Social Media', slug: 'social-media' },
      { name: 'Branding', slug: 'branding' },
    ],
  },
  {
    category: 'Business',
    slug: 'business',
    accent: '#2E9E6B',
    titles: [
      'Startup founders networking',
      'Venture capital pitch night',
      'Leadership training for students',
      'Scaling teams roundtable',
      'Future of work conference',
    ],
    subcategories: [
      { name: 'Entrepreneurship', slug: 'entrepreneurship' },
      { name: 'Finance & Investing', slug: 'finance-investing' },
      { name: 'Leadership', slug: 'leadership' },
      { name: 'Sales', slug: 'sales' },
      { name: 'Operations', slug: 'operations' },
    ],
  },
  {
    category: 'Music',
    slug: 'music',
    accent: '#5B6CF8',
    titles: [
      'Indie label showcase night',
      'Electronic producers meetup',
      'Live sound engineering class',
      'Songwriting camp weekend',
      'City jazz festival',
    ],
    subcategories: [
      { name: 'Live Performance', slug: 'live-performance' },
      { name: 'Music Production', slug: 'music-production' },
      { name: 'Songwriting', slug: 'songwriting' },
      { name: 'DJing', slug: 'djing' },
      { name: 'Music Business', slug: 'music-business' },
    ],
  },
  {
    category: 'Photography',
    slug: 'photography',
    accent: '#00B3C4',
    titles: [
      'Street photography walk',
      'Portrait lighting workshop',
      'Documentary photo summit',
      'Editing & color grading lab',
      'Travel photography retreat',
    ],
    subcategories: [
      { name: 'Street Photography', slug: 'street-photography' },
      { name: 'Portrait Photography', slug: 'portrait-photography' },
      { name: 'Documentary Photography', slug: 'documentary-photography' },
      { name: 'Photo Editing', slug: 'photo-editing' },
      { name: 'Travel Photography', slug: 'travel-photography' },
    ],
  },
];

export const LOCATIONS = [
  'Paris, France',
  'Berlin, Germany',
  'Prague, Czechia',
  'Amsterdam, Netherlands',
  'Barcelona, Spain',
  'London, UK',
  'Vienna, Austria',
  'Lisbon, Portugal',
];

const ORGANIZERS = [
  'Orange Events',
  'Elevate Co.',
  'Bright Collective',
  'NovaLab',
  'Summit Group',
  'OpenStage',
  'Pulse Studio',
];

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Sep', 'Oct', 'Nov'];
/** Calendar index (0-11) for each short month label in MONTHS. */
const MONTH_INDEX: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Sep: 8, Oct: 9, Nov: 10,
};
const DURATIONS = ['2 hours', 'Half day', '1 day', '2 days', '3 days', '4 days', '1 week'];
/** Audience levels, exposed for the filter "Level" field. */
export const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
const PRICES = [0, 15, 20, 30, 45, 60, 90, 120];

/** Attendance formats, exposed for the search/filter "Format" field. */
export const FORMATS: EventFormat[] = ['In person', 'Online', 'Hybrid'];

/** Languages an event may run in, exposed for the "Language" field. */
export const LANGUAGES = ['English', 'Czech', 'German', 'Spanish', 'French'];

/** Calendar year all seeded events fall in (keeps date filtering meaningful). */
const EVENT_YEAR = 2026;

const TAGS: (EventTag | undefined)[] = [
  { label: 'Student free', color: 'green' },
  { label: 'Popular', color: 'purple' },
  undefined,
  { label: 'Few seats left', color: 'orange' },
  undefined,
  { label: 'Free entry', color: 'green' },
  undefined,
];

// Deterministic pseudo-random so output is stable between renders/builds.
function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

function buildEvents(count: number): Event[] {
  const events: Event[] = [];

  for (let i = 0; i < count; i++) {
    const catDef = CATEGORIES[i % CATEGORIES.length];
    const titleIndex = Math.floor(i / CATEGORIES.length) % catDef.titles.length;
    const title = catDef.titles[titleIndex];
    const subcategory = catDef.subcategories[titleIndex % catDef.subcategories.length].name;

    const weekday = pick(WEEKDAYS, i * 3 + 1);
    const day = ((i * 7 + 3) % 28) + 1;
    const month = pick(MONTHS, i * 2);
    const hour = 9 + (i % 10);
    const minuteNum = i % 2 === 0 ? 0 : 30;
    const minute = pad(minuteNum);

    const price = pick(PRICES, i * 5 + 2);
    // Free events always read as a "Free entry" badge for clarity.
    const tag = price === 0 ? { label: 'Free entry', color: 'green' as const } : pick(TAGS, i + 2);

    events.push({
      id: `evt-${pad(i + 1)}`,
      title,
      category: catDef.category,
      subcategory,
      tag,
      image: pick(IMAGES, i),
      organizer: pick(ORGANIZERS, i * 2 + 1),
      // Ratings between 4.2 and 5.0
      rating: Math.round((4.2 + ((i * 7) % 9) * 0.1) * 10) / 10,
      location: pick(LOCATIONS, i + 1),
      date: `${weekday}, ${day} ${month} - ${pad(hour)}:${minute}`,
      startTimestamp: new Date(
        EVENT_YEAR,
        MONTH_INDEX[month] ?? 0,
        day,
        hour,
        minuteNum,
      ).getTime(),
      duration: pick(DURATIONS, i * 3),
      level: pick(LEVELS, i + 1),
      format: pick(FORMATS, i * 2 + 1),
      language: pick(LANGUAGES, i * 3 + 2),
      price,
    });
  }

  return events;
}

/** Full pool of seeded events. */
export const EVENTS: Event[] = buildEvents(60);

/** Distinct categories, handy for the "popular categories" chips. */
export const CATEGORY_NAMES: string[] = CATEGORIES.map((c) => c.category);

/** Public, presentation-ready sub-category metadata for pills / mega-menu. */
export interface SubcategoryMeta {
  name: string;
  slug: string;
  /** How many seeded events fall in this sub-category. */
  count: number;
}

/** Public, presentation-ready category metadata for pills / mega-menu / hero. */
export interface CategoryMeta {
  category: string;
  slug: string;
  accent: string;
  /** Sub-categories nested under this category, e.g. "Web Development" under "Programming". */
  subcategories: SubcategoryMeta[];
  /** How many seeded events fall in this category. */
  count: number;
}

export const CATEGORIES_META: CategoryMeta[] = CATEGORIES.map((c) => ({
  category: c.category,
  slug: c.slug,
  accent: c.accent,
  subcategories: c.subcategories.map((s) => ({
    name: s.name,
    slug: s.slug,
    count: EVENTS.filter((e) => e.category === c.category && e.subcategory === s.name).length,
  })),
  count: EVENTS.filter((e) => e.category === c.category).length,
}));

/** The URL slug for a category name (e.g. "UX/UI Design" -> "ux-ui-design"). */
export function categorySlug(name: string): string {
  return CATEGORIES.find((c) => c.category === name)?.slug ?? '';
}

/** The URL slug for a sub-category name within its parent category. */
export function subcategorySlug(categoryName: string, subcategoryName: string): string {
  const cat = CATEGORIES.find((c) => c.category === categoryName);
  return cat?.subcategories.find((s) => s.name === subcategoryName)?.slug ?? '';
}

/** Resolve a category by its URL slug; undefined if the slug is unknown. */
export function getCategoryBySlug(slug: string): CategoryMeta | undefined {
  return CATEGORIES_META.find((c) => c.slug === slug);
}

/** Resolve a sub-category by its parent category slug + its own slug. */
export function getSubcategoryBySlug(
  categorySlugValue: string,
  subcategorySlugValue: string,
): { category: CategoryMeta; subcategory: SubcategoryMeta } | undefined {
  const category = getCategoryBySlug(categorySlugValue);
  const subcategory = category?.subcategories.find((s) => s.slug === subcategorySlugValue);
  if (!category || !subcategory) return undefined;
  return { category, subcategory };
}

/** How many cards are visible before the user clicks "Load more". */
export const INITIAL_VISIBLE = 9;

/** How many more cards each "Load more" click reveals. */
export const LOAD_STEP = 9;

// ============================================================
// Filtering & sorting (shared by the events + category pages)
// ============================================================

export type SortOption = 'recommended' | 'price-asc' | 'price-desc' | 'date' | 'rating';

/** Human labels for the sort dropdown. */
export const SORT_LABELS: Record<SortOption, string> = {
  recommended: 'Recommended',
  'price-asc': 'Sort by price (low to high)',
  'price-desc': 'Sort by price (high to low)',
  date: 'Soonest first',
  rating: 'Highest rated',
};

export interface EventFilters {
  /** Category name (not slug). On category pages this is locked by the route. */
  category?: string;
  /** Sub-category name (not slug). On sub-category pages this is locked by the route. */
  subcategory?: string;
  location?: string;
  format?: EventFormat;
  language?: string;
  level?: string;
  /** Inclusive date range as ms timestamps. */
  from?: number;
  to?: number;
  /** Upper price bound in USD. */
  priceMax?: number;
}

/** Pure: return only the events matching every provided filter. */
export function filterEvents(events: Event[], f: EventFilters): Event[] {
  return events.filter((e) => {
    if (f.category && e.category !== f.category) return false;
    if (f.subcategory && e.subcategory !== f.subcategory) return false;
    if (f.location && e.location !== f.location) return false;
    if (f.format && e.format !== f.format) return false;
    if (f.language && e.language !== f.language) return false;
    if (f.level && e.level !== f.level) return false;
    if (f.from != null && e.startTimestamp < f.from) return false;
    // `to` is treated as inclusive of the whole selected day.
    if (f.to != null && e.startTimestamp > f.to) return false;
    if (f.priceMax != null && e.price > f.priceMax) return false;
    return true;
  });
}

/** Pure: return a new array sorted by the chosen option. */
export function sortEvents(events: Event[], sort: SortOption = 'recommended'): Event[] {
  const out = [...events];
  switch (sort) {
    case 'price-asc':
      return out.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return out.sort((a, b) => b.price - a.price);
    case 'date':
      return out.sort((a, b) => a.startTimestamp - b.startTimestamp);
    case 'rating':
      return out.sort((a, b) => b.rating - a.rating);
    default:
      return out;
  }
}

// ============================================================
// Organizer profile ("/organizer/[slug]") page data
// ============================================================

export interface OrganizerStat {
  value: string;
  label: string;
}

export interface OrganizerProfile {
  slug: string;
  /** Matches `Event.organizer` exactly, so their listing can be filtered. */
  name: string;
  shortName: string;
  tagline: string;
  logo: string;
  stats: OrganizerStat[];
}

export const ORGANIZER_PROFILES: OrganizerProfile[] = [
  {
    slug: 'orange-events',
    name: 'Orange Events',
    shortName: 'Orange',
    tagline: 'Bold, energetic events that bring communities together — from local meetups to citywide festivals.',
    logo: IMAGES[3],
    stats: [
      { value: '6 500+', label: 'tickets sold' },
      { value: '6 years', label: 'making events' },
      { value: '140+', label: 'events organized' },
    ],
  },
  {
    slug: 'elevate-co',
    name: 'Elevate Co.',
    shortName: 'Elevate',
    tagline: 'From hackathons to conferences — we connect people with events. Everything in one place.',
    logo: '/e255a0bf116e635fd175f4a0f11a4274ba54e817.png',
    stats: [
      { value: '12 000+', label: 'tickets sold' },
      { value: '11 years', label: 'making events' },
      { value: '320+', label: 'events organized' },
    ],
  },
  {
    slug: 'bright-collective',
    name: 'Bright Collective',
    shortName: 'Bright',
    tagline: 'A collective of creators and curators crafting thoughtful gatherings for curious minds.',
    logo: IMAGES[4],
    stats: [
      { value: '4 200+', label: 'tickets sold' },
      { value: '4 years', label: 'making events' },
      { value: '95+', label: 'events organized' },
    ],
  },
  {
    slug: 'novalab',
    name: 'NovaLab',
    shortName: 'NovaLab',
    tagline: 'Hands-on labs and workshops for builders who learn best by doing.',
    logo: IMAGES[2],
    stats: [
      { value: '9 800+', label: 'tickets sold' },
      { value: '8 years', label: 'making events' },
      { value: '210+', label: 'events organized' },
    ],
  },
  {
    slug: 'summit-group',
    name: 'Summit Group',
    shortName: 'Summit',
    tagline: 'Premium conferences and summits for leaders shaping their industries.',
    logo: IMAGES[5],
    stats: [
      { value: '15 000+', label: 'tickets sold' },
      { value: '14 years', label: 'making events' },
      { value: '380+', label: 'events organized' },
    ],
  },
  {
    slug: 'openstage',
    name: 'OpenStage',
    shortName: 'OpenStage',
    tagline: 'Open mic nights, showcases and live stages for emerging talent.',
    logo: IMAGES[0],
    stats: [
      { value: '3 100+', label: 'tickets sold' },
      { value: '3 years', label: 'making events' },
      { value: '60+', label: 'events organized' },
    ],
  },
  {
    slug: 'pulse-studio',
    name: 'Pulse Studio',
    shortName: 'Pulse',
    tagline: 'Fast-paced, design-led events with a pulse on what’s next.',
    logo: IMAGES[6],
    stats: [
      { value: '7 400+', label: 'tickets sold' },
      { value: '7 years', label: 'making events' },
      { value: '165+', label: 'events organized' },
    ],
  },
];

/** Look up an organizer's public profile by its URL slug. */
export function getOrganizerBySlug(slug: string): OrganizerProfile | undefined {
  return ORGANIZER_PROFILES.find((o) => o.slug === slug);
}

/** The slug for a given `Event.organizer` name, used to link event cards. */
export function getOrganizerSlugByName(name: string): string {
  return ORGANIZER_PROFILES.find((o) => o.name === name)?.slug ?? '';
}

/** Events belonging to a given organizer, for their profile page. */
export function getOrganizerEvents(name: string): Event[] {
  return EVENTS.filter((e) => e.organizer === name);
}

// ============================================================
// Concrete event ("/event/[id]") page data
// ============================================================

/** Look up a single event by its id (used by the detail page). */
export function getEventById(id: string): Event | undefined {
  return EVENTS.find((e) => e.id === id);
}

/**
 * City centre coordinates for the locations used in the seed data, so the
 * map can drop a pin without a geocoding API. Keys match `LOCATIONS`.
 */
export const LOCATION_COORDS: Record<string, [number, number]> = {
  'Paris, France': [48.8566, 2.3522],
  'Berlin, Germany': [52.52, 13.405],
  'Prague, Czechia': [50.0755, 14.4378],
  'Amsterdam, Netherlands': [52.3676, 4.9041],
  'Barcelona, Spain': [41.3851, 2.1734],
  'London, UK': [51.5074, -0.1278],
  'Vienna, Austria': [48.2082, 16.3738],
  'Lisbon, Portugal': [38.7223, -9.1393],
};

/** Coordinates for an event location, falling back to a sensible centre. */
export function getLocationCoords(location: string): [number, number] {
  return LOCATION_COORDS[location] ?? [50.0755, 14.4378]; // Prague
}

const MONTHS_LONG = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/**
 * Derived, presentation-ready schedule for the detail page.
 * The listing only stores a single `date`; here we expand it into a
 * multi-day range and a daily time window, deterministically per event.
 */
export interface EventSchedule {
  /** e.g. "21 - 23 May" */
  dateRange: string;
  /** e.g. "12:00 - 18:00 UTC" */
  timeRange: string;
  /** Hours from "now" until the purchase deadline (drives the countdown). */
  deadlineOffsetHours: number;
}

export function getEventSchedule(event: Event): EventSchedule {
  const seed = parseInt(event.id.replace(/\D/g, ''), 10) || 1;

  const monthIdx = (seed * 2 + 4) % 12;
  const startDay = ((seed * 7 + 5) % 26) + 1;
  // 1–3 day events, derived so multi-day and single-day both appear.
  const span = (seed % 3) + 1;
  const endDay = startDay + span;
  const month = MONTHS_LONG[monthIdx];

  const startHour = 9 + (seed % 4); // 9:00–12:00
  const endHour = startHour + 6;

  return {
    dateRange:
      span === 0
        ? `${startDay} ${month}`
        : `${startDay} - ${endDay} ${month}`,
    timeRange: `${pad(startHour)}:00 - ${pad(endHour)}:00 UTC`,
    // 1–6 days out so the countdown always reads as something meaningful.
    deadlineOffsetHours: 24 + (seed % 6) * 18 + 12,
  };
}

// ── Ticket perks / notices, derived from each event's real data ──
export type PerkTone = 'purple' | 'orange' | 'green';
export type PerkIconName = 'cap' | 'seats' | 'fire' | 'ticket' | 'discount';

export interface TicketPerk {
  id: string;
  icon: PerkIconName;
  tone: PerkTone;
  title: string;
  text: string;
}

/**
 * Which highlight boxes show in the "Secure your spot" panel for an event.
 * Driven by the event's tag and price so, e.g., "Free for students" only
 * appears on events that actually offer it.
 */
export function getTicketPerks(event: Event): TicketPerk[] {
  const perks: TicketPerk[] = [];
  const seed = parseInt(event.id.replace(/\D/g, ''), 10) || 1;
  const label = event.tag?.label;

  if (label === 'Student free') {
    perks.push({
      id: 'student',
      icon: 'cap',
      tone: 'purple',
      title: 'Free for students',
      text: 'Bring a valid student ID to the door for free entry, subject to availability. Limited student seats per event.',
    });
  }

  if (event.price === 0 || label === 'Free entry') {
    perks.push({
      id: 'free',
      icon: 'ticket',
      tone: 'green',
      title: 'Free entry',
      text: 'This event is free to attend — just reserve your spot, no payment needed.',
    });
  }

  if (label === 'Few seats left') {
    perks.push({
      id: 'seats',
      icon: 'seats',
      tone: 'orange',
      title: 'Only a few seats left',
      text: 'This event is almost sold out. Book now to secure your place before tickets run out.',
    });
  }

  if (label === 'Popular') {
    perks.push({
      id: 'popular',
      icon: 'fire',
      tone: 'orange',
      title: 'Popular event',
      text: 'One of our most in-demand events — tickets are selling fast.',
    });
  }

  // Early-bird discount on a deterministic subset of paid events.
  if (event.price > 0 && seed % 2 === 0) {
    const off = seed % 4 === 0 ? 20 : 15;
    perks.push({
      id: 'early-bird',
      icon: 'discount',
      tone: 'green',
      title: `Early-bird ${off}% off`,
      text: `Use code EARLY${off} at checkout to save ${off}% before the purchase deadline.`,
    });
  }

  // Always leave the attendee with at least one helpful note.
  if (perks.length === 0) {
    perks.push({
      id: 'group',
      icon: 'discount',
      tone: 'purple',
      title: 'Group discounts available',
      text: 'Save when you book 5 or more tickets together — ideal for teams and classmates.',
    });
  }

  return perks;
}

// ── Attendee feedback on previous "Elevate" events ───────────────
export interface Feedback {
  id: string;
  name: string;
  role: string;
  text: string;
  /** Which past event this feedback refers to. */
  eventLabel: string;
}

export const FEEDBACKS: Feedback[] = [
  {
    id: 'fb-1',
    name: 'Tomas Novak',
    role: 'Product Designer',
    text: 'Easily the best-run conference I have attended. The talks were sharp, the networking breaks were actually useful, and everything started on time. I left with three concrete ideas I shipped the week after.',
    eventLabel: 'UX/UI event in Prague',
  },
  {
    id: 'fb-2',
    name: 'Elena Garcia',
    role: 'Marketing Lead',
    text: 'Great speaker line-up and a venue that just worked. The hands-on workshops were the highlight — small groups, real feedback, no fluff. Worth every cent of the ticket.',
    eventLabel: 'Growth marketing summit',
  },
  {
    id: 'fb-3',
    name: 'Marek Dvořák',
    role: 'Frontend Engineer',
    text: 'I came for one talk and stayed for the whole two days. The hallway conversations alone were worth it, and the organizers clearly cared about the details. Already booked for next year.',
    eventLabel: 'Full-stack hackathon weekend',
  },
  {
    id: 'fb-4',
    name: 'Sofia Bianchi',
    role: 'UX Researcher',
    text: 'A welcoming crowd and genuinely fresh content — not the same recycled keynotes. The student discount made it accessible for my whole team of juniors too.',
    eventLabel: 'Design systems masterclass',
  },
  {
    id: 'fb-5',
    name: 'Lukas Schmidt',
    role: 'Startup Founder',
    text: 'Met two of my current collaborators here. The matchmaking sessions were a brilliant idea and the energy in the room was contagious. Highly recommend to any founder.',
    eventLabel: 'Startup founders networking',
  },
  {
    id: 'fb-6',
    name: 'Anna Kowalska',
    role: 'Content Strategist',
    text: 'Polished from registration to the closing party. Clear schedule, friendly staff, and speakers who stuck around to answer questions. This is how events should be done.',
    eventLabel: 'Brand storytelling workshop',
  },
];
