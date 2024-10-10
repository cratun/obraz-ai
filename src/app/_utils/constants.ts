export const footerLinks = {
  'Polityka prywatności': '/privacy-policy',
  Ciasteczka: '/cookies',
  Regulamin: '/terms-of-service',
  Generator: '/generate',
  Kontakt: '/contact',
};

export const ORIGIN_URL = 'https://www.obraz-ai.com';

export const CONTACT_EMAIL = 'kontakt@obraz-ai.com';

// ---0-------1----------2---------------3---------
// img path, text, model guidance, prompt style name

export const GENERATION_DATA = [
  ['surprise', 'Dopasowany', 3, '-'],
  ['surrealism', 'Surrealizm', 3, 'Surrealism'],
  ['hyper-realistic', 'Hiperrealizm', 2, 'Hyperrealism'],
  ['cyberpunk', 'Cyberpunk', 3, 'Cyberpunk'],
  ['anime', 'Anime', 3, 'Anime'],
  ['impressionism', 'Impresjonizm', 1.3, 'Impressionistic painting'],
  ['pop-art', 'Pop-art', 3, 'Pop Art'],
  ['minimalism', 'Minimalizm', 3, 'Minimalism'],
  ['cubism', 'Kubizm', 4, 'Cubism, Pablo Picasso'],
  ['psychedelic', 'Psychodelik', 3, 'Psychedelic'],
] as const;

export const MAX_PROMPT_LENGTH = 1500;
