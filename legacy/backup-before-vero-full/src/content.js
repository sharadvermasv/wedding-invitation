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
    names: ['Smt. Sunita Verma', 'Sharad Verma (son)', '& the entire Verma Family'],
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
