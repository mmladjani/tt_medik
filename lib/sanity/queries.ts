import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    title,
    primaryPhone,
    secondaryPhones,
    email,
    address
  }
`;

export const homePageQuery = groq`
  *[_type == "homePage"][0]{
    heroTitle,
    heroSubtitle,
    "heroImageUrl": heroImage.asset->url,
    quickLinks[]{
      title,
      description,
      linkLabel,
      linkUrl
    },
    aboutTitle,
    aboutBody,
    "programCards": programCards[]->{
      title,
      description,
      "slug": slug.current
    },
    "faqItems": faqItems[]->{
      question,
      answer,
      order
    }
  }
`;
