/**
 * Portfolio Projects Data
 * 
 * Contains all portfolio project information including:
 * - Title, category, description
 * - Website URL
 * - Image path
 * - Grid layout configuration (colSpan, rowSpan, size)
 */

export const portfolioProjects = [
  {
    title: "White Effect",
    category: "Usługi Sprzątające",
    description: "Profesjonalne sprzątanie biur i mieszkań",
    url: "https://www.whiteeffect.pl/",
    image: "/img/projects/whiteportfolio.webp",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
    size: "large",
    order: 1, // Featured - top left, spans 2x2
  },
  {
    title: "Autyzm od Kuchni",
    category: "Dieta, Zdrowie",
    description: "Blog o zdrowym odżywianiu i diecie",
    url: "https://www.autyzmodkuchni.pl/",
    image: "/img/projects/autyzmportfolio.webp",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    size: "medium",
    order: 2, // Top right column, first
  },
  {
    title: "Studio Figura",
    category: "Fitness, Wellness",
    description: "Studio fitness i wellness - treningi personalne",
    url: "https://www.studiofigurastablowice.pl/",
    image: "/img/projects/figuraportfolio.webp",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    size: "medium",
    order: 3, // Top right column, second
  },
  {
    title: "Zielone Mile",
    category: "Usługi Lokalne (Ogrody, Tarasy)",
    description: "Projektowanie i wykonawstwo ogrodów i tarasów",
    url: "https://www.zielonemile.pl/",
    image: "/img/projects/zieloneportfolio.webp",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    size: "medium",
    order: 4, // Top right column, third
  },
  {
    title: "Fryzjerka Małgosia",
    category: "Usługi Lokalne, Fryzjer",
    description: "Salon fryzjerski - profesjonalne usługi",
    url: "https://www.fryzjerkamalgosia.pl/",
    image: "/img/projects/fryzjerkaportfolio.webp",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    size: "medium",
    order: 5, // Bottom row, first
  },
  {
    title: "Oranzeria",
    category: "Usługi Kosmetyczne, Kosmetologia",
    description: "Salon kosmetyczny - zabiegi pielęgnacyjne",
    url: "https://oraneria.vercel.app/",
    image: "/img/projects/oranzeriaportfolio.webp",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    size: "medium",
    order: 6, // Bottom row, second
  },
  {
    title: "OpenPol",
    category: "Usługi Konsultacje AI",
    description: "Konsultacje i rozwiązania z zakresu sztucznej inteligencji",
    url: "https://openpol.pl/",
    image: "/img/projects/openpolportfolio.webp",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-1",
    size: "wide",
    order: 7, // Bottom row, wide - spans 2 columns
  }
];

