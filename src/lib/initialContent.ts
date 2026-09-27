import type { EventResponse, PostResponse } from "./api";

// These records are also seeded by Orisia.Server. Static export needs them
// when the API is unavailable at build time; live API responses take precedence.
const createdOn = "2026-09-27T00:00:00Z";

export const initialPosts: PostResponse[] = [
  {
    id: "initial-beginners-news",
    slug: "nova-grupa-nachinaeshti-oktomvri-2026",
    type: 0, status: 1,
    titleBg: "Нова група за начинаещи от 12 октомври",
    titleEn: "New beginners' group starting 12 October",
    excerptBg: "Народни танци за начинаещи в Русе — понеделник и сряда от 19:40 ч.",
    excerptEn: "Beginner folk dances in Ruse — Mondays and Wednesdays at 19:40.",
    bodyBg: "Даскало за фолклор „Орисия“ открива нова група за начинаещи на 12 октомври 2026 г. Занятията са в понеделник и сряда от 19:40 ч. в залата на бул. Родина 80, на гърба на боулинг залата в Русе. За записване и допълнителна информация се свържете с нас чрез страницата ни във Facebook.",
    bodyEn: "ORISIA Folklore School is opening a new beginners' group on 12 October 2026. Classes are on Mondays and Wednesdays at 19:40 at 80 Rodina Boulevard, behind the bowling hall in Ruse. Contact us through our Facebook page for registration and more information.",
    seoTitleBg: "", seoTitleEn: "", seoDescriptionBg: "", seoDescriptionEn: "",
    featured: true, publishedAt: createdOn, createdOn, modifiedOn: createdOn,
  },
  {
    id: "initial-sandrovo-news",
    slug: "orisiya-sandrovo-pee-i-tancuva-2026",
    type: 0, status: 1,
    titleBg: "„Орисия“ на фестивала „Сандрово пее и танцува“",
    titleEn: "ORISIA at the Sandrovo Sings and Dances festival",
    excerptBg: "Школата участва с демонстрации в XIV издание на фолклорния фестивал в Сандрово.",
    excerptEn: "The school took part in the 14th folklore festival in Sandrovo with dance demonstrations.",
    bodyBg: "На 4 юли 2026 г. в село Сандрово се проведе XIV фолклорен фестивал „Сандрово пее и танцува“. Във вечерната програма Даскало за фолклор „Орисия“ — Русе представи демонстрации на български народни танци.",
    bodyEn: "The 14th Sandrovo Sings and Dances folklore festival took place on 4 July 2026. ORISIA Folklore School from Ruse presented Bulgarian folk dance demonstrations during the evening programme.",
    seoTitleBg: "", seoTitleEn: "", seoDescriptionBg: "", seoDescriptionEn: "",
    featured: false, publishedAt: createdOn, createdOn, modifiedOn: createdOn,
  },
];

export const initialEvents: EventResponse[] = [
  {
    id: "initial-za-galya-event",
    slug: "blagotvoritelen-koncert-za-galya-2026",
    titleBg: "Благотворителен концерт „За Галя“",
    titleEn: "Charity concert “For Galya”",
    descriptionBg: "На 27 септември различни хора, таланти и светове се събират на една сцена с една обща цел — да бъдем до Галя.\n\nГаля е преподавател и творец, който е давал знание, музика и изкуство на другите. Сега е наш ред да я подкрепим.\n\nНа сцената: Михаел Лашев — авторска музика; Адриана Витанова; Веселина Няголова — български фолклор; „Сладките на Светлозара Савова“; Даскало за фолклор „Орисия“ — хоротека за малки и големи; аниматорска агенция „БАМ-БАМ“ — специална детска програма с игри и забавления.\n\nЕлате с децата, приятелите и близките си. Нека превърнем този неделен следобед в среща, която има значение.\n\nЕдна сцена. Много сърца. Една кауза — за Галя.",
    descriptionEn: "On 27 September, different people, talents and worlds come together on one stage for one shared cause — to support Galya.\n\nGalya is a teacher and artist who has shared knowledge, music and creativity with others. Now it is our turn to stand by her.\n\nOn stage: Mihael Lashev with original music; Adriana Vitanova; Veselina Nyagolova with Bulgarian folklore; Sladkite na Svetlozara Savova; ORISIA Folklore School with an open horoteka for children and adults; and BAM-BAM animation agency with a special children’s programme of games and entertainment.\n\nCome with your children, friends and family. Let us turn this Sunday afternoon into a gathering that matters.\n\nOne stage. Many hearts. One cause — for Galya.",
    startAt: "2026-09-27T13:00:00Z", allDay: false, eventType: 1,
    location: "Сцената на Ruse Stage, Русе",
    mediaType: 1, mediaUrl: "/events/za-galya.webp", slideshowUrls: [],
    featured: true, status: 1, createdOn, modifiedOn: createdOn,
  },
  {
    id: "initial-beginners-event",
    slug: "nachalo-na-grupa-za-nachinaeshti-2026",
    titleBg: "Начало на новата група за начинаещи",
    titleEn: "New beginners' group begins",
    descriptionBg: "Първо занятие на новата група на „Орисия“. Редовните занятия са всеки понеделник и сряда от 19:40 ч. За записване вижте страницата ни във Facebook.",
    descriptionEn: "The first class of ORISIA's new beginners' group. Regular classes are every Monday and Wednesday at 19:40. Visit our Facebook page to register.",
    startAt: "2026-10-12T16:40:00Z", allDay: false, eventType: 0,
    location: "гр. Русе, бул. Родина 80 (на гърба на боулинг залата)",
    featured: true, status: 1, createdOn, modifiedOn: createdOn,
  },
  {
    id: "initial-sandrovo-event",
    slug: "sandrovo-pee-i-tancuva-2026",
    titleBg: "Фестивал „Сандрово пее и танцува“",
    titleEn: "Sandrovo Sings and Dances festival",
    descriptionBg: "XIV издание на фолклорния фестивал в Сандрово с демонстрации на Даскало за фолклор „Орисия“ — Русе във вечерната програма.",
    descriptionEn: "The 14th folklore festival in Sandrovo, with dance demonstrations by ORISIA Folklore School from Ruse in the evening programme.",
    startAt: "2026-07-04T00:00:00Z", allDay: true, eventType: 3,
    location: "с. Сандрово, община Русе",
    featured: false, status: 1, createdOn, modifiedOn: createdOn,
  },
];

export const initialPostBySlug = (slug: string) => initialPosts.find((post) => post.slug === slug) ?? null;
export const initialEventBySlug = (slug: string) => initialEvents.find((event) => event.slug === slug) ?? null;
