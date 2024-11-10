import {
  GPT_ADJUSTED_IMPRESSIONISTIC_PAINTING,
  GPT_ADJUSTED_PROMPT,
  GPT_ADJUSTED_PROMPT_ANIME,
  GPT_ADJUSTED_PROMPT_CUBISM,
  GPT_ADJUSTED_PROMPT_CYBERPUNK,
  GPT_ADJUSTED_PROMPT_HYPERREALISM,
  GPT_ADJUSTED_PROMPT_MINIMALISM,
  GPT_ADJUSTED_PROMPT_POPART_PICTURE,
  GPT_ADJUSTED_PROMPT_PSYCHEDELIC,
  GPT_ADJUSTED_PROMPT_SURREALISM,
} from '@/app/generate/_utils/style-prompts';

export const footerLinks = {
  Wsparcie: {
    'Polityka prywatności': '/privacy-policy',
    Ciasteczka: '/cookies',
    Regulamin: '/terms-of-service',
    Kontakt: '/contact',
    'Zostaw opinię': '/contact?review=true',
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
  'Zostaw opinię': '/contact?review=true',
};

export const ORIGIN_URL = 'https://www.obraz.ai';

export const CONTACT_EMAIL = 'kontakt@obraz-ai.com';

export const GENERATION_DATA = [
  {
    generationStyle: 'adjusted',
    text: 'Dopasowany',
    modelConfig: {
      guidance: 3,
    },
    prompt: GPT_ADJUSTED_PROMPT,
    imagePromptWrapper: (prompt: string) => prompt,
  },
  {
    generationStyle: 'surrealism',
    text: 'Surrealizm',
    modelConfig: {
      guidance: 3.5,
    },
    prompt: GPT_ADJUSTED_PROMPT_SURREALISM,
    imagePromptWrapper: (prompt: string) =>
      `A true Surrealistic Painting, surreal scene in the style of the late 19th and early 20th-century surrealistic art movement, using oil on canvas as the primary medium. ${prompt} Surrealistic Style, beautiful, true Surrealism, Dreamlike Atmosphere`,
  },
  {
    generationStyle: 'hyperrealism',
    text: 'Hiperrealizm',
    modelConfig: {
      guidance: 2,
    },
    prompt: GPT_ADJUSTED_PROMPT_HYPERREALISM,
    imagePromptWrapper: (prompt: string) => `${prompt} ultra realistic, hyperrealism, Canon camera shot, UHD`,
  },
  {
    generationStyle: 'cyberpunk',
    text: 'Cyberpunk',
    modelConfig: {
      guidance: 3,
    },
    prompt: GPT_ADJUSTED_PROMPT_CYBERPUNK,
    imagePromptWrapper: (prompt: string) => `A Cyberpunk Style Image of ${prompt} Cyberpunk Style, Cyberpunk 2077`,
  },
  {
    generationStyle: 'anime',
    text: 'Anime',
    modelConfig: {
      guidance: 3,
    },
    prompt: GPT_ADJUSTED_PROMPT_ANIME,
    imagePromptWrapper: (prompt: string) => `Anime style ${prompt} Anime, Anime Style`,
  },
  {
    generationStyle: 'impressionism',
    text: 'Impresjonizm',
    modelConfig: {
      guidance: 1.3,
    },
    prompt: GPT_ADJUSTED_IMPRESSIONISTIC_PAINTING,
    imagePromptWrapper: (prompt: string) =>
      `Impressionistic oil painting of ${prompt} Impressionism, Impressionistic Oil Painting`,
  },
  {
    generationStyle: 'pop-art',
    text: 'Pop-art',
    modelConfig: {
      guidance: 3,
    },
    prompt: GPT_ADJUSTED_PROMPT_POPART_PICTURE,
    imagePromptWrapper: (prompt: string) =>
      `Pop Art Style, Pop Art movement picture of ${prompt} Pop Art, Pop Art Movement`,
  },
  {
    generationStyle: 'minimalism',
    text: 'Minimalizm',
    modelConfig: {
      guidance: 3,
    },
    prompt: GPT_ADJUSTED_PROMPT_MINIMALISM,
    imagePromptWrapper: (prompt: string) =>
      `Beautiful Minimalistic Art Masterpiece of ${prompt} Minimalism, Minimalistic Art`,
  },
  {
    generationStyle: 'psychedelic',
    text: 'Psychodelik',
    modelConfig: {
      // NOTE: Psychedelic pictures are very interesting in flux-schnell
      guidance: 3,
    },
    prompt: GPT_ADJUSTED_PROMPT_PSYCHEDELIC,
    imagePromptWrapper: (prompt: string) =>
      `Psychedelic Style Picture of ${prompt} Psychedelic, Psychedelic Art, Psychedelic Style, Vivid, Vibrant Colors, High Contrast, Glow Effects, Intricate Patterns and Fractals, Saturated Hues like Electric Blues, Neon Pinks, Luminous Greens`,
  },
  {
    generationStyle: 'cubism',
    text: 'Kubizm',
    modelConfig: {
      guidance: 4,
    },
    prompt: GPT_ADJUSTED_PROMPT_CUBISM,
    imagePromptWrapper: (prompt: string) => `Cubist Painting of ${prompt} Cubism, Cubist Art, Cubist Masterpiece`,
  },
] as const;

export type GenerationStyle = (typeof GENERATION_DATA)[number]['generationStyle'];

export const getIsGenerationStyle = (value: any): value is GenerationStyle =>
  GENERATION_DATA.some(({ generationStyle }) => generationStyle === value);

export const MAX_PROMPT_LENGTH = 1000;
