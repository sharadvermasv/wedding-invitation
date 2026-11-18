// All invitation text lives here — edit this file to change wording.
// Photos: drop images into /public/photos and set the paths below
// (e.g. hero: 'photos/hero.jpg'). While a value is null, an Indian
// textile-pattern illustration is shown instead.

export const photos = {
  hero: '/photos/hero.jpg',
  groom: '/photos/groom.jpg',
  bride: '/photos/bride.jpg',
  countdown: '/photos/countdown.jpg',
  doors: '/photos/doors.jpg',
  storyGanesh: '/photos/story_ganesh.jpg',
  storyPanigrahan: '/photos/story_panigrahan.jpg',
  venueFacade: '/photos/venue_facade.jpg',
};

export const couple = {
  monogram: 'S & P',
  groom: {
    initial: 'S',
    name: 'Shubham Verma',
    hindiTitle: 'हृदयांश',
    title: 'The heart of our family',
    lines: [
      ['Grandson of', 'Late Shri Jagdev Prasad', 'Smt. Budhrani'],
      ['Son of', 'Late Shri Purushottam Lal', 'Smt. Sunita Verma'],
    ],
    place: 'Saket Nagar Colony, Hariharganj, Fatehpur',
  },
  bride: {
    initial: 'P',
    name: 'Preeti Kumari',
    hindiTitle: 'हृदयकर्णिका',
    title: 'The beloved of our hearts',
    lines: [['Daughter of', 'Late Shri Arvind Kumar', 'Smt. Jayanti Devi']],
    place: 'Resident of Bihiya, Bihar',
  },
};

export const invocation = {
  ganesh: 'श्री गणेशाय नमः',
  shloka: ['मंगलम् भगवान विष्णुः मंगलम् गरुड़ध्वजः ।', 'मंगलम् पुण्डरीकाक्षः मंगलाय तनो हरिः ॥'],
  shlokaEn:
    'Auspicious is Lord Vishnu, auspicious is he whose banner bears Garuda, auspicious is the lotus-eyed one — Lord Hari is the very abode of all that is auspicious.',
  doha: ['विघ्न हरण मंगल करण, श्री गणनायक महाराज !', 'प्रथम निमंत्रण आपको, सकल सुधारो काज ॥'],
  dohaEn:
    'O Lord Ganesha, remover of obstacles and bringer of all things auspicious — our very first invitation is to you; bless every endeavour with success.',
};

export const ceremonies = [
  {
    key: 'tail', hi: 'तैलपूजन', name: 'Tail Poojan', day: 'Tuesday', date: '1 December 2026', time: '10:00 AM Onwards',
    text: 'The blessing of holy oil and fragrant turmeric — elders affectionately anoint the groom as the celebratory rituals begin.',
    color: 'var(--marigold)', pattern: 'butti', photo: '/photos/ceremony_tail.jpg',
  },
  {
    key: 'matri', hi: 'मातृपूजन', name: 'Matri Poojan', day: 'Wednesday', date: '2 December 2026', time: '11:00 AM Onwards',
    text: 'Worship of the divine mothers and ancestral blessings, invoking peace, happiness, and prosperity for the sacred union.',
    color: 'var(--rust)', pattern: 'jaali', photo: '/photos/ceremony_matri.jpg',
  },
  {
    key: 'vivah', hi: 'शुभविवाह', name: 'Shubh Vivah', day: 'Thursday', date: '3 December 2026', time: '7:00 PM Onwards',
    text: 'The sacred Panigrahan Sanskar & Saat Phere — seven holy vows taken around the sacred Vedic agni fire uniting two souls for eternity.',
    color: 'var(--maroon)', pattern: 'bandhani', main: true, photo: '/photos/ceremony_vivah.jpg',
  },
  {
    key: 'vidai', hi: 'विदाई', name: 'Vidaai', day: 'Friday', date: '4 December 2026', time: '10:00 AM',
    text: 'A heartfelt, tender farewell showered with rose petals, as the bride is lovingly welcomed into her new home and family.',
    color: 'var(--mehendi)', pattern: 'butti', photo: '/photos/ceremony_vidai.jpg',
  },
];

export const travel = {
  baraat: {
    title: 'The Baraat',
    text: 'Departs from our residence, Saket Nagar Colony, Hariharganj, Fatehpur, by private vehicles.',
    time: '8:00 AM · Wedding day',
    map: 'https://www.google.com/maps/search/?api=1&query=Saket+Nagar+Colony+Hariharganj+Fatehpur',
  },
  venue: {
    title: 'The Venue',
    name: 'Hotel Regency',
    text: 'Near Maruti Showroom, Andhrapul, Vijay Nagar Colony, G.T. Road, Varanasi.',
    map: 'https://www.google.com/maps/search/?api=1&query=Hotel+Regency+Andhrapul+GT+Road+Varanasi',
  },
};

export const family = {
  hosts: {
    hi: 'दर्शनाभिलाषी', en: 'Eager to Welcome You',
    names: ['Smt. Sunita Verma', 'Sharad Verma (Brother)', '& the entire Verma Family'],
  },
  regards: {
    hi: 'विनीत', en: 'With Humble Regards',
    names: ['Jai Singh', 'Kamlesh Singh', 'Ramkeshan Singh'],
  },
};

export const contact = {
  sender: 'Smt. Sunita Verma',
  address: 'Nappi ka Hata, Saket Nagar Colony, Hariharganj, Fatehpur',
  phones: ['+91 81305 45740', '+91 73557 53734'],
};

// Baraat departs 3 Dec 2026, 8:00 AM IST
export const countdownTarget = '2026-12-03T08:00:00+05:30';

// Stations & airport for outstation guests (shown in "Arriving in Varanasi")
export const arrivals = [
  { mode: 'Rail', name: 'Varanasi Junction (BSB) / Cantt', dist: '1.2 km', time: '5 – 7 min drive', note: 'Closest major junction, autos & cabs 24/7' },
  { mode: 'Rail', name: 'Banaras Railway Station (BSBS)', dist: '4.5 km', time: '15 min drive', note: 'Modern station with express train connectivity' },
  { mode: 'Rail', name: 'Pt. Deen Dayal Upadhyaya Jn (DDU)', dist: '18 km', time: '40 min drive', note: 'Major national railway junction (Mughalsarai)' },
  { mode: 'Air', name: 'Lal Bahadur Shastri Airport (VNS)', dist: '22 km', time: '35 – 45 min drive', note: 'Babatpur Airport via 4-lane highway' },
];

// Background music: Banarasi Shehnai & Flute Mangal Dhun
export const music = '/audio/shehnai.mp3';
export const musicDetails = {
  src: '/audio/shehnai.mp3',
  title: 'Banarasi Shehnai & Flute Dhun',
  artist: 'Ustad Bismillah Khan & Banaras Gharana',
  tagline: 'Auspicious Wedding Shehnai & Flute from Varanasi',
};


// ---------------------------------------------------------------------------
// Lantern-theme invitation (src/lv) — wording for the new layout.
// ---------------------------------------------------------------------------
export const invite = {
  heroNames: ['SHUBHAM', 'WEDS', 'PREETI'],
  blessingsOf: ['Late Shri Jagdev Prasad & Smt. Budhrani'],
  hosts: ['Smt. Sunita Verma & Late Shri Purushottam Lal'],
  bigWord: 'INVITE',
  joinLine: 'You to join us in the wedding celebrations of',
  groomFirst: 'Shubham',
  brideFirst: 'Preeti',
  brideParents: ['Daughter of', 'Smt. Jayanti Devi & Late Shri Arvind Kumar', 'Bihiya, Bihar'],
  eventsLine: 'On the following events',

  // which map each ceremony's "See the route" opens
  eventPlace: {
    tail: { venue: 'Verma residence, Fatehpur', map: 'baraat' },
    matri: { venue: 'Verma residence, Fatehpur', map: 'baraat' },
    vivah: { venue: 'Hotel Regency, Varanasi', map: 'venue' },
    vidai: { venue: 'Hotel Regency, Varanasi', map: 'venue' },
  },

  message:
    'We are both so delighted that you will be with us as we begin this new chapter together. The love and blessings our families have showered on us since our rishta was fixed have touched us deeply. Your presence at our wedding will make these days complete — we cannot wait to celebrate with you in Varanasi.',

  gallery: [
    { src: '/photos/hero.jpg', alt: 'Shubham and Preeti at the mandap' },
    { src: '/photos/story_ganesh.jpg', alt: 'Ganesh puja before the wedding' },
    { src: '/photos/story_panigrahan.jpg', alt: 'Panigrahan — the joining of hands' },
    { src: '/photos/venue_facade.jpg', alt: 'Hotel Regency, Varanasi, lit for the wedding' },
    { src: '/photos/countdown.jpg', alt: 'The sacred fire at the mandap' },
    { src: '/photos/doors.jpg', alt: 'Decorated doors welcoming guests' },
  ],

  thingsIntro:
    'Essential travel, transit, and hospitality details to make your journey to Varanasi seamless and comfortable.',
  things: [
    {
      icon: '/photos/icons/hashtag.png',
      title: 'Hashtag',
      text: 'While posting memories and stories on social media, please tag our wedding hashtag — #ShubhamPreetiKiShadi',
    },
    {
      icon: '/photos/icons/weather.png',
      title: 'Weather',
      text: 'Varanasi welcomes you with pleasant winter sunshine (22°C daytime) and crisp cool evenings (14°C). Light shawls or jackets recommended.',
    },
    {
      icon: '/photos/icons/car.png',
      title: 'Getting Here',
      text: 'Hotel Regency, Andhrapul is centrally located — just 1.2 km (5 mins) from Varanasi Cantt Railway Station and 22 km (35 mins) from Lal Bahadur Shastri Airport. 24/7 cabs and autos are easily available.',
    },
    {
      icon: '/photos/icons/explore.png',
      title: 'Explore Varanasi',
      text: 'Experience Kashi’s timeless beauty — Kashi Vishwanath Dham, Dashashwamedh Ghat evening Ganga Aarti, Assi Ghat sunrise, and historic Sarnath are all within easy reach.',
    },
  ],

  closingLine:
    'Our families are excited that you are able to join us in celebrating what we hope will be one of the happiest days of our lives.',
};
