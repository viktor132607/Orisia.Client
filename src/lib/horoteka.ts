export type HorotekaVideo = {
  contentUrl?: string;
  embedUrl?: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
};

export type HorotekaDance = {
  slug: string;
  titleBg: string;
  titleEn: string;
  regionBg: string;
  regionEn: string;
  rhythm: string;
  descriptionBg: string;
  descriptionEn: string;
  video?: HorotekaVideo;
};

export const horotekaDances: HorotekaDance[] = [
  {
    slug: "pravo-horo",
    titleBg: "Право хоро",
    titleEn: "Pravo Horo",
    regionBg: "Широко разпространено",
    regionEn: "Widely spread",
    rhythm: "2/4",
    descriptionBg:
      "Базово право хоро с равномерна стъпка и лесен ритъм за проследяване.",
    descriptionEn:
      "A basic pravo horo with an even step and an easy rhythm to follow.",
  },
  {
    slug: "dunavsko-horo",
    titleBg: "Дунавско хоро",
    titleEn: "Danube Horo",
    regionBg: "Северна България",
    regionEn: "Northern Bulgaria",
    rhythm: "2/4",
    descriptionBg:
      "Енергично българско хоро с характерна последователност и ясно изразен ритъм.",
    descriptionEn:
      "An energetic Bulgarian horo with a characteristic sequence and a clearly defined rhythm.",
  },
  {
    slug: "elenino-horo",
    titleBg: "Еленино хоро",
    titleEn: "Elenino Horo",
    regionBg: "Северна България",
    regionEn: "Northern Bulgaria",
    rhythm: "7/8",
    descriptionBg:
      "Хоро с неравноделен размер и отличима стъпкова структура.",
    descriptionEn:
      "A horo in an asymmetric meter with a distinctive step structure.",
  },
  {
    slug: "paidushko-horo",
    titleBg: "Пайдушко хоро",
    titleEn: "Paidushko Horo",
    regionBg: "Различни фолклорни области",
    regionEn: "Various folklore regions",
    rhythm: "5/8",
    descriptionBg:
      "Живо хоро в неравноделен ритъм, разпознаваемо по характерното редуване на стъпките.",
    descriptionEn:
      "A lively horo in an asymmetric rhythm, recognizable by its characteristic alternating steps.",
  },
];

export function getHorotekaDance(slug: string) {
  return horotekaDances.find((dance) => dance.slug === slug);
}
