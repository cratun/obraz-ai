export const footerLinks = {
  Wsparcie: {
    'Polityka prywatności': '/privacy-policy',
    Ciasteczka: '/cookies',
    Regulamin: '/terms-of-service',
    Kontakt: '/contact',
  },
  'Twoje obrazy': {
    'Stwórz swój obraz': '/generate',
    'Jak generować?': '/manual',
    'Galeria Twoich obrazów': '/gallery',
  },
};

export const bottomDrawerLinks = {
  'Polityka prywatności': '/privacy-policy',
  Ciasteczka: '/cookies',
  Regulamin: '/terms-of-service',
  Kontakt: '/contact',
};

export const ORIGIN_URL = 'https://www.obraz.ai';

export const CONTACT_EMAIL = 'kontakt@obraz-ai.com';

// ---0-------1----------2---------------3---------
// img path, text, model guidance, prompt style name

export const GENERATION_DATA = [
  ['surprise', 'Dopasowany', 3, '-'],
  ['surrealism', 'Surrealizm', 3, 'Surrealism'],
  ['hyper-realistic', 'Hiperrealizm', 2, 'Hyperrealism, UHD, camera shot'],
  ['cyberpunk', 'Cyberpunk', 3, 'Cyberpunk'],
  ['anime', 'Anime', 3, 'Anime'],
  ['impressionism', 'Impresjonizm', 1.3, 'Impressionistic oil painting'],
  ['pop-art', 'Pop-art', 3, 'Pop Art'],
  ['minimalism', 'Minimalizm', 3, 'Minimalism'],
  ['cubism', 'Kubizm', 4, 'Cubism, Cubist Painting, Angular simple shapes only, Pablo Picasso style'],
  ['psychedelic', 'Psychodelik', 3, 'Psychedelic'],
] as const;

export const MAX_PROMPT_LENGTH = 1500;
